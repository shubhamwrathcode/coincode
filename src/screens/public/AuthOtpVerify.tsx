import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/RootNavigator';
import { useAuthStore } from '../../store/authStore';
import {
    useSendRegistrationOtpMutation,
    useVerifyRegistrationOtpMutation,
} from '../../api/mutations/useSignupMutations';
import { useToastStore } from '../../store/toastStore';
import { AuthService } from '../../api/services/authService';

const getMaskedSignId = (signId: string, registeredBy: 'email' | 'phone') => {
    const value = String(signId || '').trim();
    if (!value) return '';

    if (registeredBy === 'email' && value.includes('@')) {
        const [local, domain] = value.split('@');
        if (!local?.length) return value;
        return `${local[0]}***@${domain || ''}`;
    }

    let countryPrefix = '+91';
    let mobilePart = value;
    const prefixMatch = value.match(/^(\+\d{1,4})\s*(.*)$/);
    if (prefixMatch) {
        countryPrefix = prefixMatch[1];
        mobilePart = prefixMatch[2] || '';
    }

    const digits = mobilePart.replace(/\D/g, '');
    if (!digits) return `${countryPrefix} `;
    if (digits.length <= 4) return `${countryPrefix} ${digits}`;
    return `${countryPrefix} ${digits.slice(0, 2)}***${digits.slice(-2)}`;
};

const AuthOtpVerify = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'AuthOtpVerify'>>();
    const showToast = useToastStore((state) => state.showToast);
    const setSession = useAuthStore((state) => state.setSession);

    const { signId, registeredBy } = route.params;

    const sendOtpMutation = useSendRegistrationOtpMutation();
    const verifyOtpMutation = useVerifyRegistrationOtpMutation();

    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const hasAutoSent = useRef(false);
    const isVerifyingRef = useRef(false);

    const startResendCooldown = () => {
        setResendTimer(60);
    };

    const sendOtp = async () => {
        await sendOtpMutation.mutateAsync({
            signId,
            registeredBy,
        });
        startResendCooldown();
    };

    const handleResend = async () => {
        if (resendTimer > 0 || sendOtpMutation.isPending) return;
        try {
            await sendOtp();
        } catch {
            // toast handled in mutation
        }
    };

    useEffect(() => {
        if (!signId || hasAutoSent.current) return;
        hasAutoSent.current = true;
        sendOtp().catch(() => undefined);
    }, [signId, registeredBy]);

    useEffect(() => {
        if (resendTimer <= 0) return;

        const interval = setInterval(() => {
            setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer > 0]);

    const handleVerify = async (codeOverride?: string) => {
        if (isVerifyingRef.current || verifyOtpMutation.isPending) return;

        const codeStr = String(codeOverride ?? otp ?? '')
            .replace(/\D/g, '')
            .slice(0, 6);

        if (codeStr.length !== 6) {
            showToast('Please enter the 6-digit verification code', 'error');
            return;
        }

        setOtp(codeStr);
        isVerifyingRef.current = true;

        try {
            const response: any = await verifyOtpMutation.mutateAsync({
                signId,
                verification_code: parseInt(codeStr, 10),
                registeredBy,
                token: '',
            });

            console.log('[AuthOtpVerify] verify response:', response);

            if (response?.success !== true) {
                showToast(response?.message || 'Verification failed', 'error');
                return;
            }

            const session = AuthService.parseSession(response);
            const accessToken = session.accessToken || useAuthStore.getState().accessToken;

            if (accessToken) {
                setSession({
                    accessToken,
                    refreshToken: session.refreshToken,
                    user: session.user,
                });
            } else {
                showToast('Verified but session token missing', 'error');
            }
        } catch {
            // toast handled in mutation
        } finally {
            isVerifyingRef.current = false;
        }
    };

    const handlePaste = async () => {
        const text = await Clipboard.getString();
        const parsed = String(text || '').replace(/\D/g, '').slice(0, 6);
        if (!parsed) {
            showToast('Clipboard does not contain a valid code', 'error');
            return;
        }
        setOtp(parsed);
        if (parsed.length === 6) {
            handleVerify(parsed);
        }
    };

    const verifyLabel = registeredBy === 'email' ? 'Email' : 'Phone';
    const maskedSignId = getMaskedSignId(signId, registeredBy);

    return (
        <Screen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                            Verify Your <Typography color={colors.cyan} size={25} style={styles.title}>{verifyLabel}</Typography>
                        </Typography>

                        <Typography color={colors.darkShadeColorText} size={14} align="center" style={styles.subtitle}>
                            A verification code has been sent to{' '}
                            <Typography color={colors.white} size={14} style={styles.boldText}>{maskedSignId}</Typography>.
                            It is valid for <Typography color={colors.cyan} size={14} style={styles.boldText}>60 seconds.</Typography>
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
                        {resendTimer > 0 ? (
                            <View style={styles.actionLinkButton}>
                                <Typography color={colors.darkShadeColorText} size={14} style={styles.actionLinkTextNoIcon}>
                                    Resend in{' '}
                                    <Typography color={colors.cyan} size={14} style={styles.boldText}>
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
                                <Typography color={colors.cyan} size={14} style={styles.actionLinkText}>
                                    Resend Code
                                </Typography>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={styles.actionLinkButton} onPress={handlePaste}>
                            <ClipboardIcon color={colors.darkShadeColorText} size={16} />
                            <Typography color={colors.darkShadeColorText} size={14} style={styles.actionLinkText}>
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

                    <View style={[styles.infoBox, { backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor }]}>
                        <View style={styles.lockIconContainer}>
                            <FastImage source={ImageAssets.lock} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <Typography color={colors.darkShadeColorText} size={13} style={styles.infoText}>
                            Your verification code is for your security. Do not share it with anyone.
                        </Typography>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
};

export default AuthOtpVerify;

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
});
