import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Lock, Eye, EyeOff, Mail, ShieldCheck, ShieldQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

export const ChangeFundPasswordScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Change fund password
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    {/* Current Password */}
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8 }}>
                        Current Password
                    </Typography>
                    <CommonInput
                        placeholder="Please enter current password"
                        secureTextEntry={!showCurrent}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        leftIcon={<Lock color={colors.grey} size={20} />}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={styles.eyeBtn}>
                                {showCurrent ? <Eye color={colors.grey} size={20} /> : <EyeOff color={colors.grey} size={20} />}
                            </TouchableOpacity>
                        }
                        containerStyle={styles.inputWrapper}
                        style={{ color: colors.white, fontFamily: fonts.regular }}
                    />

                    {/* New Password */}
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8 }}>
                        New Password
                    </Typography>
                    <CommonInput
                        placeholder="Please enter new password"
                        secureTextEntry={!showNew}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        leftIcon={<Lock color={colors.grey} size={20} />}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeBtn}>
                                {showNew ? <Eye color={colors.grey} size={20} /> : <EyeOff color={colors.grey} size={20} />}
                            </TouchableOpacity>
                        }
                        containerStyle={styles.inputWrapper}
                        style={{ color: colors.white, fontFamily: fonts.regular }}
                    />

                    {/* Password Strength */}
                    <View style={styles.strengthRow}>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginRight: 8 }}>
                            Password strength
                        </Typography>
                        <Typography size={12} style={{ color: colors.red, fontFamily: fonts.semiBold, marginRight: 12 }}>
                            Weak
                        </Typography>
                        <View style={styles.strengthBarBg}>
                            <View style={[styles.strengthBarFill, { width: newPassword.length > 0 ? '30%' : '0%', backgroundColor: colors.red }]} />
                        </View>
                    </View>

                    {/* New Password Again */}
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, marginTop: 10 }}>
                        New Password Again
                    </Typography>
                    <CommonInput
                        placeholder="Please re-enter new password"
                        secureTextEntry={!showConfirm}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        leftIcon={<Lock color={colors.grey} size={20} />}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                                {showConfirm ? <Eye color={colors.grey} size={20} /> : <EyeOff color={colors.grey} size={20} />}
                            </TouchableOpacity>
                        }
                        containerStyle={styles.inputWrapper}
                        style={{ color: colors.white, fontFamily: fonts.regular }}
                    />

                    {/* Email Verification Code */}
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, marginTop: 10 }}>
                        Email Verification Code
                    </Typography>
                    <CommonInput
                        placeholder="Please enter verification code"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        keyboardType="number-pad"
                        leftIcon={<Mail color={colors.grey} size={20} />}
                        rightIcon={
                            <TouchableOpacity>
                                <Typography size={15} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                                    Send
                                </Typography>
                            </TouchableOpacity>
                        }
                        containerStyle={styles.inputWrapper}
                        style={{ color: colors.white, fontFamily: fonts.regular }}
                    />

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <ShieldCheck color={colors.cyan} size={18} style={{ marginRight: 12, marginTop: 2 }} />
                        <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                            For your security, do not share your password with anyone. <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Coincode</Typography> will never ask for your password.
                        </Typography>
                    </View>

                </ScrollView>

                {/* Bottom Section */}
                <View style={styles.bottomContainer}>
                    <CommonButton 
                        title="Confirm" 
                        onPress={() => navigation.navigate('SecurityVerificationScreen' as any, { nextScreen: 'FundPasswordSuccessScreen' })} 
                    />
                    
                    {/* OR divider */}
                    <View style={styles.orDividerRow}>
                        <View style={styles.orLine} />
                        <Typography size={11} style={{ color: colors.darkShadeColorText || '#4A4A4A', fontFamily: fonts.medium, marginHorizontal: 12 }}>
                            OR
                        </Typography>
                        <View style={styles.orLine} />
                    </View>

                    {/* Unable to Verify */}
                    <TouchableOpacity style={styles.unableBtn}>
                        <ShieldQuestion color={colors.cyan} size={16} style={{ marginRight: 6 }} />
                        <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                            Unable to Verify?
                        </Typography>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        paddingBottom: 16,
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
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },
    inputWrapper: {
        height: 56,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    eyeBtn: {
        padding: 4,
    },
    strengthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    strengthBarBg: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    strengthBarFill: {
        height: '100%',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 194, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0, 194, 255, 0.15)',
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    },
    orDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    unableBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
