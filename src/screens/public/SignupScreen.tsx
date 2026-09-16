import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonInput } from '../../components/common/CommonInput';
import { EmailInputWithSuggestions } from '../../components/common/EmailInputWithSuggestions';
import { PhoneInput } from '../../components/common/PhoneInput';
import { fonts } from '../../theme/fonts';
import { CustomAuthTab } from '../../components/common/CustomAuthTab';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/RootNavigator';
import { useCheckIdentifierMutation } from '../../api/mutations/useSignupMutations';
import { useToastStore } from '../../store/toastStore';
import { validateEmail } from '../../utils/validation';
import { getErrorMessage } from '../../api/errors';

export const SignupScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const showToast = useToastStore((state) => state.showToast);
    const checkIdentifierMutation = useCheckIdentifierMutation();

    const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
    const [signUpId, setSignUpId] = useState('');
    const [referCode, setReferCode] = useState('');
    const [showReferral, setShowReferral] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');

    const handleSignup = async () => {
        const identifier = signUpId.trim();

        if (!identifier) {
            showToast(
                activeTab === 'email' ? 'Please enter your email' : 'Please enter your phone number',
                'error',
            );
            return;
        }

        if (activeTab === 'email' && !validateEmail(identifier)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        if (activeTab === 'phone') {
            const digits = identifier.replace(/\D/g, '');
            if (digits.length < 8) {
                showToast('Please enter a valid phone number', 'error');
                return;
            }
        }

        try {
            const response: any = await checkIdentifierMutation.mutateAsync({
                identifier,
                kind: activeTab,
                purpose: 'signup',
                countryCode: activeTab === 'phone' ? countryCode : undefined,
                referralCode: referCode.trim() || undefined,
            });

            console.log('[SignupScreen] checkIdentifier response:', response);

            if (response?.referral?.success === false) {
                showToast(response?.referral?.message || 'Invalid referral code', 'error');
                return;
            }

            if (response?.success !== true) {
                showToast(response?.message || 'Request failed', 'error');
                return;
            }

            navigation.navigate('SetPassword', {
                signupType: activeTab,
                signUpId: identifier,
                countryCode,
                referCode: referCode.trim(),
            });
        } catch (error) {
            showToast(getErrorMessage(error, 'Unable to verify details'), 'error');
        }
    };

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FastImage
                            source={ImageAssets.authBackIcon}
                            style={styles.headerIcon}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>

                    <FastImage
                        source={ImageAssets.authBellImg}
                        style={styles.headerIcon}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>

                <View style={styles.welcomeContainer}>
                    <View style={styles.welcomeTextContainer}>
                        <Typography size={26} style={styles.welcomeTitle}>Create Account</Typography>
                        <Typography color={colors.darkShadeColorText} size={15} style={styles.welcomeSubtitle}>
                            {`Start your crypto journey in \nfew steps`}
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
                        setSignUpId('');
                    }}
                />

                <View style={styles.formContainer}>
                    {activeTab === 'email' ? (
                        <EmailInputWithSuggestions
                            placeholder="Enter email address"
                            value={signUpId}
                            onChangeText={setSignUpId}
                            maxLength={100}
                        />
                    ) : (
                        <PhoneInput
                            placeholder="Enter Phone number"
                            value={signUpId}
                            onChangeText={setSignUpId}
                            onCountryChange={(_country, callingCode) => {
                                setCountryCode(`+${callingCode}`);
                            }}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.referralToggle}
                        onPress={() => setShowReferral((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.referralToggleRow}>
                            <Typography color={colors.grey} size={14} style={styles.referralToggleText}>
                                Referral code
                            </Typography>
                            <View style={styles.referralIconWrap}>
                                {showReferral ? (
                                    <ChevronUp color={colors.darkShadeColorText} size={16} />
                                ) : (
                                    <ChevronDown color={colors.darkShadeColorText} size={16} />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>

                    {showReferral && (
                        <CommonInput
                            placeholder="Referral code (optional)"
                            value={referCode}
                            onChangeText={setReferCode}
                            autoCapitalize="none"
                        />
                    )}

                    <View style={styles.buttonWrapper}>
                        <CommonButton
                            title="Next"
                            onPress={handleSignup}
                            loading={checkIdentifierMutation.isPending}
                            shrinkOnLoad
                            rightIcon={<View style={styles.nextIconWrapper}><ArrowRight color={colors.white} size={14} /></View>}
                            style={{ marginTop: 8 }}
                        />
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={[styles.dividerLine, { backgroundColor: colors.inputBorderColor }]} />
                        <Typography color={colors.darkShadeColorText} style={styles.dividerText}>Or log in with</Typography>
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
                        title="Continue with Apple"
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

                    <View style={styles.footerLinkContainer}>
                        <Typography color={colors.darkShadeColorText} size={14}>
                            Already have an account?{' '}
                        </Typography>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ bottom: 1 }}>
                            <Typography color={colors.cyan} style={styles.footerLinkText} size={15.5}>
                                Log In
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    headerIcon: {
        width: 38,
        height: 38,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        marginBottom: 24,
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
    referralToggle: {
        alignSelf: 'flex-start',
        marginTop: 4,
        marginBottom: 8,
    },
    referralToggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    referralToggleText: {
        fontFamily: fonts.medium,
        includeFontPadding: false,
    },
    referralIconWrap: {
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        alignItems: 'center',
    },
    nextIconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
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
        fontSize: 14,
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
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 10,
    },
    footerLinkText: {
        fontFamily: fonts.medium,
        textDecorationLine: 'none',
    },
});
