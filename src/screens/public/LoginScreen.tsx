import React, { useState } from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonInput } from '../../components/common/CommonInput';
import { PhoneInput } from '../../components/common/PhoneInput';
import { EmailInputWithSuggestions } from '../../components/common/EmailInputWithSuggestions';
import { useToastStore } from '../../store/toastStore';
import { fonts } from '../../theme/fonts';
import { CustomAuthTab } from '../../components/common/CustomAuthTab';
import { EyeOff, Eye, ArrowRight } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../api/mutations/useAuthMutations';
import { useCheckIdentifierMutation } from '../../api/mutations/useSignupMutations';
import { validateEmail } from '../../utils/validation';
import {
  classifyLoginFailureMessage,
  parseIdentifierCheckResponse,
} from '../../utils/authHelpers';
import { getErrorMessage } from '../../api/errors';

export const LoginScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const showToast = useToastStore((state) => state.showToast);
  const loginMutation = useLoginMutation();
  const checkIdentifierMutation = useCheckIdentifierMutation();

  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassField, setShowPassField] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [checkingUser, setCheckingUser] = useState(false);

  const getNormalizedLoginId = () => {
    if (activeTab === 'email') {
      return String(emailOrPhone || '').trim();
    }
    return String(emailOrPhone || '').replace(/\D/g, '').replace(/^0+/, '') || '';
  };

  const validateEmailOrUsername = (raw: string) => {
    const id = String(raw || '').trim();
    if (!id) {
      showToast('Please enter your email or username', 'error');
      return false;
    }
    if (id.includes('@')) {
      if (!validateEmail(id)) {
        showToast('Please enter a valid email address', 'error');
        return false;
      }
      return true;
    }
    if (id.length < 3) {
      showToast('Username must be at least 3 characters', 'error');
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(id)) {
      showToast('Username contains invalid characters', 'error');
      return false;
    }
    return true;
  };

  const changeIdentifier = (val: string) => {
    setEmailOrPhone(val);
    if (showPassField) {
      setShowPassField(false);
      setPassword('');
    }
  };

  /** Step 1 — AGCE onNext: check-signup-email (purpose=login) then reveal password */
  const onNext = async () => {
    Keyboard.dismiss();

    if (activeTab === 'email') {
      if (!validateEmailOrUsername(emailOrPhone)) return;
    } else {
      const digits = String(emailOrPhone || '').replace(/\D/g, '').replace(/^0+/, '');
      if (!digits) {
        showToast('Please enter your phone number', 'error');
        return;
      }
      if (digits.length < 8) {
        showToast('Please enter a valid phone number', 'error');
        return;
      }
      if (digits !== emailOrPhone) {
        setEmailOrPhone(digits);
      }
    }

    const normalizedId = getNormalizedLoginId();
    const identifierKind: 'email' | 'phone' | 'username' =
      activeTab === 'phone'
        ? 'phone'
        : normalizedId.includes('@')
          ? 'email'
          : 'username';

    const payload = {
      identifier: normalizedId,
      kind: identifierKind,
      purpose: 'login' as const,
      countryCode: activeTab === 'phone' ? countryCode : undefined,
    };

    console.log('[Login][onNext] checkIdentifier payload:', JSON.stringify(payload));

    setCheckingUser(true);
    try {
      const loginCheck: any = await checkIdentifierMutation.mutateAsync(payload);
      console.log('[Login][onNext] checkIdentifier response:', JSON.stringify(loginCheck));

      const accountCheck = parseIdentifierCheckResponse(loginCheck, 'login');
      if (!accountCheck.ok || !accountCheck.exists) {
        showToast(accountCheck.message || 'User not found', 'error');
        return;
      }

      // AGCE: passkey silent attempt skipped here — show password field
      console.log('[Login][onNext] setShowPassField(true)');
      setShowPassField(true);
    } catch (e: any) {
      const errorObj = {
        success: false,
        code: e?.code || null,
        message: getErrorMessage(e, 'Could not verify account. Please try again.'),
      };
      const accountCheck = parseIdentifierCheckResponse(errorObj, 'login');
      showToast(accountCheck.message || 'User not found', 'error');
    } finally {
      setCheckingUser(false);
    }
  };

  /** Step 2 — AGCE onLogin: POST /v1/user/login */
  const onLogin = async () => {
    Keyboard.dismiss();

    if (!password) {
      showToast('Please enter password', 'error');
      return;
    }

    const normalizedId = getNormalizedLoginId();
    console.log('[Login][onLogin] payload', {
      email_or_phone: normalizedId,
      passwordLength: String(password || '').length,
    });

    loginMutation.mutate(
      {
        email_or_phone: normalizedId,
        password,
        token: '',
      },
      {
        onError: (error) => {
          const msg = getErrorMessage(error, 'Login failed');
          const kind = classifyLoginFailureMessage(msg);
          if (kind === 'wrong_password' || kind === 'auth_failed') {
            // password step stays visible
          }
        },
      },
    );
  };

  const isBusy = checkingUser || checkIdentifierMutation.isPending || loginMutation.isPending;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <FastImage
            source={ImageAssets.authUserImg}
            style={styles.headerIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeTextContainer}>
            <Typography size={26} style={styles.welcomeTitle}>Welcome Back</Typography>
            <Typography color={colors.darkShadeColorText} size={15} style={styles.welcomeSubtitle}>
              {` Log in to continue your \n journey`}
            </Typography>
          </View>
          <View style={styles.promoImageContainer}>
            <FastImage
              source={ImageAssets.loginPromoImg}
              style={styles.promoImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>

        <CustomAuthTab
          tabs={[
            { id: 'email', label: 'Email' },
            { id: 'phone', label: 'Phone' },
          ]}
          activeTab={activeTab}
          onTabChange={(id) => {
            setActiveTab(id as 'email' | 'phone');
            setEmailOrPhone('');
            setPassword('');
            setShowPassField(false);
          }}
        />

        <View style={styles.formContainer}>
          {activeTab === 'email' ? (
            <EmailInputWithSuggestions
              placeholder="Enter email address"
              value={emailOrPhone}
              onChangeText={changeIdentifier}
              maxLength={100}
            />
          ) : (
            <PhoneInput
              placeholder="Enter Phone number"
              value={emailOrPhone}
              onChangeText={changeIdentifier}
              onCountryChange={(_country, callingCode) => {
                setCountryCode(`+${callingCode}`);
              }}
            />
          )}

          {!showPassField && (
            <View style={styles.buttonWrapper}>
              <CommonButton
                title="Next"
                onPress={onNext}
                loading={isBusy}
                shrinkOnLoad
                rightIcon={
                  <View style={styles.nextIconWrapper}>
                    <ArrowRight color={colors.white} size={14} />
                  </View>
                }
                style={{ marginTop: 8 }}
              />
            </View>
          )}

          {showPassField && (
            <>
              <CommonInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye color={colors.darkShadeColorText} size={20} />
                    ) : (
                      <EyeOff color={colors.darkShadeColorText} size={20} />
                    )}
                  </TouchableOpacity>
                }
              />

              <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
                <Typography color={colors.white} size={13} style={styles.forgotText}>
                  Forgot Password?
                </Typography>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <CommonButton
                  title="Login"
                  onPress={onLogin}
                  loading={loginMutation.isPending}
                  shrinkOnLoad
                  rightIcon={
                    <View style={styles.nextIconWrapper}>
                      <ArrowRight color={colors.white} size={14} />
                    </View>
                  }
                  style={{ marginTop: 8 }}
                />
              </View>
            </>
          )}

          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: colors.inputBorderColor }]} />
            <Typography color={colors.grey} style={styles.dividerText}>Or</Typography>
            <View style={[styles.dividerLine, { backgroundColor: colors.inputBorderColor }]} />
          </View>

          <CommonButton
            title="Continue with Google"
            variant="outline"
            leftIcon={
              <FastImage
                source={ImageAssets.googleIcon}
                style={styles.socialIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            }
            titleStyle={styles.socialButtonTitle}
            style={[styles.socialButton]}
          />
          <CommonButton
            title="Continue with Passkey"
            variant="outline"
            leftIcon={
              <FastImage
                source={ImageAssets.passkeyIcon}
                style={styles.socialIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            }
            titleStyle={styles.socialButtonTitle}
            style={[styles.socialButton]}
          />

          <TouchableOpacity
            style={styles.footerLinkContainer}
            onPress={() => navigation.navigate('Signup')}
          >
            <Typography color={colors.cyan} style={styles.footerLinkText} size={14}>
              Create a Coincode Account
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  headerIcon: {
    width: 38,
    height: 38,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  welcomeTitle: {
    fontFamily: fonts.bold,
    marginBottom: 8,
    lineHeight: 30,
  },
  welcomeSubtitle: {
    lineHeight: 18,
  },
  promoImageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginRight: 10,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  nextIconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 4,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 4,
    marginTop: -4,
  },
  forgotText: {
    fontFamily: fonts.medium,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialButtonTitle: {
    fontFamily: fonts.medium,
    color: '#D1D5DC',
  },
  socialButton: {
    backgroundColor: colors.inputBgColor,
    borderColor: colors.inputBorderColor,
    marginBottom: 15,
  },
  footerLinkContainer: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  footerLinkText: {
    fontFamily: fonts.medium,
    textDecorationLine: 'underline',
  },
});
