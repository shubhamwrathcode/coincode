import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Lock, CheckCircle2, ShieldCheck, Mail, Smartphone, Key } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ToggleSwitch } from '../../TradePage/components/ToggleSwitch';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { EyeOff, X } from 'lucide-react-native';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

export const WithdrawalSettingsScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [isPasswordFree, setIsPasswordFree] = useState(true);
    const [isVerificationFree, setIsVerificationFree] = useState(false);
    const [isEmailVerification, setIsEmailVerification] = useState(true);
    const [isSmsVerification, setIsSmsVerification] = useState(false);
    const [isFundPassword, setIsFundPassword] = useState(true);

    const sheetRef = React.useRef<any>(null);
    const [fundPassword, setFundPassword] = useState('');
    const [isFundPasswordHidden, setIsFundPasswordHidden] = useState(true);

    const handleToggleEmail = (val: boolean) => {
        setIsEmailVerification(val);
        if (val) navigation.navigate('VerifyEmailScreen' as any);
    };

    const handleToggleSms = (val: boolean) => {
        setIsSmsVerification(val);
        if (val) navigation.navigate('VerifyPhoneScreen' as any);
    };

    const handleRequireFundPassword = () => {
        sheetRef.current?.open();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                    Withdrawal Settings
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Section 1 */}
                <View style={styles.cardGroup}>
                    {/* Password-Free Withdrawal */}
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Lock color={colors.cyan} size={18} />
                            </View>
                            <View style={styles.textContainer}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>
                                    Password-Free Withdrawal
                                </Typography>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                    After opening, use the pass key to quickly verify the withdrawal
                                </Typography>
                            </View>
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleSwitch
                                onValueChange={setIsPasswordFree}
                                value={isPasswordFree}
                            />
                            {isPasswordFree && (
                                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium, marginTop: 4 }}>
                                    Turn On
                                </Typography>
                            )}
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Verification-Free Address Withdrawal */}
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <CheckCircle2 color={colors.cyan} size={18} />
                            </View>
                            <View style={styles.textContainer}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>
                                    Verification-Free Address{'\n'}Withdrawal
                                </Typography>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                    Activate the feature to restrict withdrawals to verification-free addresses only.
                                </Typography>
                            </View>
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleSwitch
                                onValueChange={setIsVerificationFree}
                                value={isVerificationFree}
                            />
                        </View>
                    </View>
                </View>

                {/* Section 2 */}
                <View style={styles.sectionHeader}>
                    <ShieldCheck color={colors.cyan} size={16} style={{ marginRight: 6 }} />
                    <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                        Security Settings
                    </Typography>
                </View>

                <View style={styles.cardGroup}>
                    {/* Email Verification */}
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Mail color={colors.cyan} size={18} />
                            </View>
                            <View style={styles.textContainer}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>
                                    Email Verification
                                </Typography>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                    Verify your email for withdrawal security
                                </Typography>
                            </View>
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleSwitch
                                onValueChange={handleToggleEmail}
                                value={isEmailVerification}
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* SMS Verification */}
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Smartphone color={colors.cyan} size={18} />
                            </View>
                            <View style={styles.textContainer}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>
                                    SMS Verification
                                </Typography>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                    Verify your phone number for additional withdrawal security
                                </Typography>
                            </View>
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleSwitch
                                onValueChange={handleToggleSms}
                                value={isSmsVerification}
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Fund Password */}
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View style={styles.iconContainer}>
                                <Key color={colors.cyan} size={18} />
                            </View>
                            <View style={styles.textContainer}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>
                                    Fund Password
                                </Typography>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                    Set a fund password to protect your transactions.
                                </Typography>
                            </View>
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleSwitch
                                onValueChange={(val) => {
                                    setIsFundPassword(val);
                                    if (val) handleRequireFundPassword();
                                }}
                                value={isFundPassword}
                            />
                        </View>
                    </View>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>
                        {/* Placeholder for the glowing shield image from the screenshot */}
                        <FastImage
                            source={ImageAssets.SecurityVerificationBanner}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            Your security is our priority
                        </Typography>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                            Enable these settings to keep your withdrawals safe and secure.
                        </Typography>
                    </View>
                </View>

            </ScrollView>

            {/* Verification Bottom Sheet */}
            <CustomBottomSheet sheetRef={sheetRef} height={360}>
                <View style={styles.sheetHeader}>
                    <View style={styles.sheetHeaderLeft}>
                        <View style={styles.sheetIconBox}>
                            <ShieldCheck color={colors.cyan} size={18} />
                        </View>
                        <View>
                            <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 2 }}>
                                Verification
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                For your security, please enter your{'\n'}fund password.
                            </Typography>
                        </View>
                    </View>
                </View>

                <View style={styles.sheetContent}>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 12 }}>
                        Fund Password
                    </Typography>
                    
                    <CommonInput
                        value={fundPassword}
                        onChangeText={setFundPassword}
                        placeholder="Enter fund password"
                        secureTextEntry={isFundPasswordHidden}
                        containerStyle={styles.sheetInput}
                        leftIcon={<Lock color={colors.grey} size={18} style={{ marginRight: 8 }} />}
                        rightIcon={
                            <TouchableOpacity onPress={() => setIsFundPasswordHidden(!isFundPasswordHidden)}>
                                <EyeOff color={colors.grey} size={18} />
                            </TouchableOpacity>
                        }
                    />

                    <TouchableOpacity style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
                        <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                            Forgot Password? <ChevronLeft color={colors.cyan} size={12} style={{ transform: [{ rotate: '180deg' }] }} />
                        </Typography>
                    </TouchableOpacity>

                    <CommonButton
                        title="Confirm"
                        onPress={() => {
                            sheetRef.current?.close();
                        }}
                    />
                </View>
            </CustomBottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 24,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 8,
    },
    cardGroup: {
        backgroundColor: '#0F161A',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 24,
        paddingVertical: 8,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    cardLeft: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 16,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    toggleContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginHorizontal: 16,
        marginVertical: 4,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#0F161A',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        alignItems: 'center',
    },
    infoIconContainer: {
        marginRight: 16,
    },
    infoTextContainer: {
        flex: 1,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    sheetHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sheetIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 204, 255, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    sheetContent: {
        paddingHorizontal: 20,
    },
    sheetInput: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        marginBottom: 16,
    }
});
