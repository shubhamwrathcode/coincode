import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonInput } from '../../components/common/CommonInput';
import { PasswordRules } from '../../components/common/PasswordRules';
import { fonts } from '../../theme/fonts';
import { ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/RootNavigator';
import { useAuthStore } from '../../store/authStore';
import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import {
    useRegisterEmailMutation,
    useRegisterPhoneMutation,
} from '../../api/mutations/useSignupMutations';
import { getSignupUsernamePart, isPasswordReadyForSignup } from '../../utils/validation';
import { useToastStore } from '../../store/toastStore';

const SetPasswordScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'SetPassword'>>();
    const showToast = useToastStore((state) => state.showToast);
    const setPendingVerification = useAuthStore((state) => state.setPendingVerification);

    const registerEmailMutation = useRegisterEmailMutation();
    const registerPhoneMutation = useRegisterPhoneMutation();

    const { signupType, signUpId, countryCode, referCode = '' } = route.params;

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const username = useMemo(
        () => getSignupUsernamePart(signupType, signUpId),
        [signupType, signUpId],
    );

    const isReady = useMemo(
        () => isPasswordReadyForSignup(password, signupType, signUpId),
        [password, signupType, signUpId],
    );

    const buildSignId = () => {
        if (signupType === 'email') {
            return signUpId.trim();
        }
        const digits = signUpId.replace(/\D/g, '');
        return `${countryCode}${digits}`;
    };

    const handleConfirm = async () => {
        if (!isReady) {
            showToast('Please meet all password requirements', 'error');
            return;
        }

        try {
            let response: any;

            if (signupType === 'email') {
                response = await registerEmailMutation.mutateAsync({
                    email: signUpId.trim(),
                    password,
                    referral_code: referCode || '',
                    token: '',
                });
            } else {
                response = await registerPhoneMutation.mutateAsync({
                    country_code: countryCode || '+91',
                    phone: Number(signUpId.replace(/\D/g, '')),
                    password,
                    referral_code: referCode || '',
                    token: '',
                });
            }

            console.log('[SetPasswordScreen] register response:', response);

            if (response?.success !== true) {
                showToast(response?.message || 'Registration failed', 'error');
                return;
            }

            const token = response?.token || response?.data?.token;
            if (!token) {
                showToast('Registration succeeded but no token received', 'error');
                return;
            }

            setPendingVerification(token);

            navigation.navigate('AuthOtpVerify', {
                signId: buildSignId(),
                registeredBy: signupType,
            });
        } catch {
            // toast handled in mutation
        }
    };

    const isLoading = registerEmailMutation.isPending || registerPhoneMutation.isPending;

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
                            source={ImageAssets.setPasswordImg}
                            style={styles.illustrationImage}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Typography size={25} align="center" style={styles.title}>
                            Set Your Password
                        </Typography>

                        <Typography color={colors.darkShadeColorText} size={14} align="center" style={styles.subtitle}>
                            Set the password to complete the signup
                        </Typography>
                    </View>

                    <View style={styles.inputContainer}>
                        <Typography color={colors.white} size={14} style={styles.inputLabel}>
                            Password
                        </Typography>
                        <CommonInput
                            placeholder="Enter a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <Eye color={colors.darkShadeColorText} size={20} />
                                    ) : (
                                        <EyeOff color={colors.darkShadeColorText} size={20} />
                                    )}
                                </TouchableOpacity>
                            }
                            containerStyle={styles.inputField}
                        />
                    </View>

                    <PasswordRules password={password} username={username} />

                    <View style={styles.buttonWrapper}>
                        <CommonButton
                            title="Confirm"
                            onPress={handleConfirm}
                            loading={isLoading}
                            disabled={!isReady || isLoading}
                            shrinkOnLoad
                            rightIcon={
                                <View style={styles.nextIconWrapper}>
                                    <ArrowRight color={colors.white} size={14} />
                                </View>
                            }
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
};

export default SetPasswordScreen;

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
        marginTop: 10,
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
        marginBottom: 8,
    },
    subtitle: {
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginTop: 24,
    },
    inputLabel: {
        fontFamily: fonts.medium,
        marginBottom: 8,
    },
    inputField: {
        width: '100%',
    },
    buttonWrapper: {
        alignItems: 'center',
        width: '100%',
        marginTop: 24,
    },
    nextIconWrapper: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
