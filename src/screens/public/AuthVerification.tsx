import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonOtpInput } from '../../components/common/CommonOtpInput';
import { fonts } from '../../theme/fonts';
import { RefreshCw, Clipboard as ClipboardIcon } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/RootNavigator';
import { useAuthStore } from '../../store/authStore';
import {
  useSendLoginOtpMutation,
  useVerifyLoginOtpMutation,
} from '../../api/mutations/useAuthMutations';
import { useToastStore } from '../../store/toastStore';
import {
  AUTH_METHOD,
  AuthMethodOption,
} from '../../types/auth';
import { authMethodLabel } from '../../utils/authHelpers';

const getMaskedSignId = (signId: string, methodType: number) => {
  const value = String(signId || '').trim();
  if (!value) return '';

  if (methodType === AUTH_METHOD.EMAIL || value.includes('@')) {
    const [local, domain] = value.split('@');
    if (!local?.length || !domain) return value;
    return `${local[0]}***@${domain}`;
  }

  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return value;
  return `${digits.slice(0, 2)}***${digits.slice(-2)}`;
};

const AuthVerification = () => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const showToast = useToastStore((state) => state.showToast);

  const pending2FA = useAuthStore((state) => state.pending2FA);
  const updatePending2FA = useAuthStore((state) => state.updatePending2FA);
  const clearPending2FA = useAuthStore((state) => state.clearPending2FA);

  const sendOtpMutation = useSendLoginOtpMutation();
  const verifyOtpMutation = useVerifyLoginOtpMutation();

  const methods = pending2FA?.availableMethods ?? [];
  const completed = pending2FA?.completedMethods ?? [];
  const isMethodsStep = pending2FA?.verifySubStep === 'methods';

  const resolveInitialMethod = () => {
    if (!pending2FA) return AUTH_METHOD.EMAIL;
    const active = Number(pending2FA.activeMethod);
    if (active) return active;
    return Number(pending2FA.defaultMethod) || AUTH_METHOD.EMAIL;
  };

  const [selectedMethod, setSelectedMethod] = useState(resolveInitialMethod);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const hasAutoSent = useRef(false);
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    if (!pending2FA) {
      navigation.navigate('Login');
    }
  }, [pending2FA, navigation]);

  useEffect(() => {
    if (!pending2FA || isMethodsStep) return;
    const next = resolveInitialMethod();
    setSelectedMethod(next);
    setOtp('');
    hasAutoSent.current = false;
  }, [
    pending2FA?.verifySubStep,
    pending2FA?.activeMethod,
    pending2FA?.completedMethods,
  ]);

  const getVerifySignId = (methodType: number) => {
    if (!pending2FA) return '';
    const match = methods.find((m) => Number(m.type) === methodType);
    return String(match?.value || pending2FA.loginSignId || '');
  };

  const startResendCooldown = () => setResendTimer(60);

  const sendOtp = async (methodType = selectedMethod) => {
    if (methodType !== AUTH_METHOD.EMAIL && methodType !== AUTH_METHOD.PHONE) {
      return;
    }
    const signId = getVerifySignId(methodType);
    const sendTo =
      methodType === AUTH_METHOD.PHONE ||
      (!signId.includes('@') && /^[\+\d\s\-\(\)]+$/.test(signId))
        ? 'mobile'
        : 'email';

    await sendOtpMutation.mutateAsync({
      email_or_phone: signId,
      sendTo,
    });
    startResendCooldown();
  };

  useEffect(() => {
    if (!pending2FA || isMethodsStep) return;
    if (hasAutoSent.current) return;
    if (
      selectedMethod !== AUTH_METHOD.EMAIL &&
      selectedMethod !== AUTH_METHOD.PHONE
    ) {
      return;
    }
    hasAutoSent.current = true;
    sendOtp(selectedMethod).catch(() => undefined);
  }, [pending2FA, isMethodsStep, selectedMethod]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer > 0]);

  const handleSelectMethod = (method: AuthMethodOption) => {
    const type = Number(method.type);
    if (type === AUTH_METHOD.PASSKEY) {
      showToast('Passkey login is not available in this build yet', 'info');
      return;
    }
    if (
      completed.includes(type) &&
      pending2FA?.verificationMode === 'ALL_REQUIRED'
    ) {
      return;
    }
    updatePending2FA({
      verifySubStep: 'code',
      activeMethod: type,
    });
    setSelectedMethod(type);
    setOtp('');
    hasAutoSent.current = false;
  };

  const handleVerify = async (codeOverride?: string) => {
    if (isVerifyingRef.current || verifyOtpMutation.isPending) return;
    if (!pending2FA) return;

    const codeStr = String(codeOverride ?? otp ?? '')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (codeStr.length !== 6) {
      showToast('Please enter the 6-digit verification code', 'error');
      return;
    }

    setOtp(codeStr);
    isVerifyingRef.current = true;
    Keyboard.dismiss();

    try {
      await verifyOtpMutation.mutateAsync({
        email_or_phone: getVerifySignId(selectedMethod),
        otp: codeStr,
        type: selectedMethod,
      });
    } catch {
      // toast handled in mutation
    } finally {
      isVerifyingRef.current = false;
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || sendOtpMutation.isPending) return;
    try {
      await sendOtp();
    } catch {
      // toast handled
    }
  };

  const handlePaste = async () => {
    const text = await Clipboard.getString();
    const parsed = String(text || '')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (!parsed) {
      showToast('Clipboard does not contain a valid code', 'error');
      return;
    }
    setOtp(parsed);
    if (parsed.length === 6) {
      handleVerify(parsed);
    }
  };

  const handleBack = () => {
    clearPending2FA();
    navigation.navigate('Login');
  };

  if (!pending2FA) {
    return null;
  }

  const methodLabel = authMethodLabel(selectedMethod);
  const maskedSignId = getMaskedSignId(
    getVerifySignId(selectedMethod),
    selectedMethod,
  );
  const needsResend =
    selectedMethod === AUTH_METHOD.EMAIL ||
    selectedMethod === AUTH_METHOD.PHONE;

  if (isMethodsStep) {
    return (
      <Screen>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBack}>
              <FastImage
                source={ImageAssets.authBackIcon}
                style={styles.iconButton}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <Typography size={25} align="center" style={styles.title}>
              Verify Your{' '}
              <Typography color={colors.cyan} size={25} style={styles.title}>
                Identity
              </Typography>
            </Typography>
            <Typography
              color={colors.darkShadeColorText}
              size={14}
              align="center"
              style={styles.subtitle}
            >
              {pending2FA.verificationMode === 'ALL_REQUIRED'
                ? 'New device: verify every method below to finish sign-in.'
                : 'Choose a method to verify your identity.'}
            </Typography>
          </View>

          <View style={styles.methodsList}>
            {methods.map((method) => {
              const type = Number(method.type);
              const isDone = completed.includes(type);
              const disabled =
                isDone && pending2FA.verificationMode === 'ALL_REQUIRED';
              return (
                <TouchableOpacity
                  key={`${type}-${method.label || method.name}`}
                  style={[
                    styles.methodRow,
                    {
                      backgroundColor: colors.inputBgColor,
                      borderColor: colors.inputBorderColor,
                      opacity: disabled ? 0.5 : 1,
                    },
                  ]}
                  disabled={disabled}
                  onPress={() => handleSelectMethod(method)}
                >
                  <View style={{ flex: 1 }}>
                    <Typography size={16} style={styles.methodTitle}>
                      {method.label || method.name || authMethodLabel(type)}
                      {isDone ? ' ✓' : ''}
                    </Typography>
                    {method.maskedValue || method.description ? (
                      <Typography
                        color={colors.darkShadeColorText}
                        size={13}
                        style={{ marginTop: 4 }}
                      >
                        {String(method.maskedValue || method.description)}
                      </Typography>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                if (methods.length > 1) {
                  updatePending2FA({
                    verifySubStep: 'methods',
                    activeMethod: undefined,
                  });
                  setOtp('');
                  return;
                }
                handleBack();
              }}
            >
              <FastImage
                source={ImageAssets.authBackIcon}
                style={styles.iconButton}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <FastImage
              source={ImageAssets.authBellImg}
              style={styles.iconButton}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View style={styles.illustrationContainer}>
            <FastImage
              source={ImageAssets.verifyEmailImg}
              style={styles.illustrationImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View style={styles.textContainer}>
            <Typography size={25} align="center" style={styles.title}>
              Verify Your{' '}
              <Typography color={colors.cyan} size={25} style={styles.title}>
                {methodLabel}
              </Typography>
            </Typography>

            <Typography
              color={colors.darkShadeColorText}
              size={14}
              align="center"
              style={styles.subtitle}
            >
              {selectedMethod === AUTH_METHOD.AUTHENTICATOR ? (
                <>
                  Enter the 6-digit code from your authenticator app.
                </>
              ) : (
                <>
                  A verification code has been sent to{' '}
                  <Typography
                    color={colors.white}
                    size={14}
                    style={styles.boldText}
                  >
                    {maskedSignId}
                  </Typography>
                  . It is valid for{' '}
                  <Typography
                    color={colors.cyan}
                    size={14}
                    style={styles.boldText}
                  >
                    60 seconds.
                  </Typography>
                </>
              )}
            </Typography>
          </View>

          <View style={styles.otpContainer}>
            <CommonOtpInput
              autoFocus
              onTextChange={setOtp}
              onFilled={(code) => handleVerify(code)}
            />
          </View>

          <View style={styles.actionLinksContainer}>
            {needsResend ? (
              resendTimer > 0 ? (
                <View style={styles.actionLinkButton}>
                  <Typography
                    color={colors.darkShadeColorText}
                    size={14}
                    style={styles.actionLinkTextNoIcon}
                  >
                    Resend in{' '}
                    <Typography
                      color={colors.cyan}
                      size={14}
                      style={styles.boldText}
                    >
                      {String(resendTimer).padStart(2, '0')}s
                    </Typography>
                  </Typography>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.actionLinkButton}
                  onPress={handleResend}
                  disabled={sendOtpMutation.isPending}
                >
                  <RefreshCw color={colors.cyan} size={16} />
                  <Typography
                    color={colors.cyan}
                    size={14}
                    style={styles.actionLinkText}
                  >
                    Resend Code
                  </Typography>
                </TouchableOpacity>
              )
            ) : (
              <View />
            )}

            <TouchableOpacity
              style={styles.actionLinkButton}
              onPress={handlePaste}
            >
              <ClipboardIcon color={colors.darkShadeColorText} size={16} />
              <Typography
                color={colors.darkShadeColorText}
                size={14}
                style={styles.actionLinkText}
              >
                Paste
              </Typography>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonWrapper}>
            <CommonButton
              title="Next"
              onPress={handleVerify}
              loading={verifyOtpMutation.isPending}
              shrinkOnLoad
            />
          </View>

          <View
            style={[
              styles.infoBox,
              {
                backgroundColor: colors.inputBgColor,
                borderColor: colors.inputBorderColor,
              },
            ]}
          >
            <View style={styles.lockIconContainer}>
              <FastImage
                source={ImageAssets.lock}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </View>
            <Typography
              color={colors.darkShadeColorText}
              size={13}
              style={styles.infoText}
            >
              Your verification code is for your security. Do not share it with
              anyone.
            </Typography>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AuthVerification;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginBottom: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  illustrationImage: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontFamily: fonts.bold,
    marginBottom: 12,
  },
  subtitle: {
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  boldText: {
    fontFamily: fonts.regular,
  },
  otpContainer: {
    marginTop: 24,
  },
  actionLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  actionLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLinkText: {
    fontFamily: fonts.medium,
    marginLeft: 8,
  },
  actionLinkTextNoIcon: {
    fontFamily: fonts.medium,
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 24,
  },
  lockIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2BC2874D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 0.8,
    borderColor: '#2BC287',
  },
  infoText: {
    flex: 1,
    lineHeight: 20,
  },
  methodsList: {
    marginTop: 28,
    gap: 12,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  methodTitle: {
    fontFamily: fonts.medium,
  },
});
