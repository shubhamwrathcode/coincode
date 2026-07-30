import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Lock, Eye, EyeOff, CheckCircle2, ShieldQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { colors } from '../../../../theme/colors';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

export const ChangePasswordScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Placeholder validation checks for the new password
    const hasLength = newPassword.length >= 8 && newPassword.length <= 20;
    const hasValidChars = /^[a-zA-Z0-9_]*$/.test(newPassword) && newPassword.length > 0;
    const isNotSameChars = newPassword.length > 0 && new Set(newPassword).size > 1;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Password
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Banner Section */}
                <View style={styles.bannerRow}>
                    <Typography size={25} style={{ flex: 1, color: colors.white, fontFamily: fonts.semiBold, lineHeight: 36, bottom: 10 }}>
                        Change Login{'\n'}Password
                    </Typography>
                    <FastImage
                        source={ImageAssets.loginPasswordBanner}
                        style={{ width: width * 0.45, height: width * 0.45 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Old Password Input */}
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 8 }}>
                    Old Password
                </Typography>
                <CommonInput
                    placeholder="Enter your current password"
                    secureTextEntry={!showOld}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    leftIcon={<Lock color={colors.grey} size={20} />}
                    rightIcon={
                        <TouchableOpacity onPress={() => setShowOld(!showOld)} style={styles.eyeBtn}>
                            {showOld ? <Eye color={colors.grey} size={20} /> : <EyeOff color={colors.grey} size={20} />}
                        </TouchableOpacity>
                    }
                    containerStyle={styles.inputWrapper}
                    style={{ color: colors.white, fontFamily: fonts.regular }}
                />

                {/* New Password Input */}
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginTop: 24, marginBottom: 8 }}>
                    New Password
                </Typography>
                <CommonInput
                    placeholder="Enter your new password"
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

                {/* Password Strength and Rules */}
                <View style={styles.strengthRow}>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginRight: 12 }}>
                        Password strength
                    </Typography>
                    <View style={styles.strengthBarBg}>
                        <View style={[styles.strengthBarFill, { width: newPassword.length > 5 ? '60%' : '0%' }]} />
                    </View>
                </View>

                <View style={styles.ruleRow}>
                    <CheckCircle2 color={hasLength ? colors.cyan : colors.grey} size={16} style={{ marginRight: 8 }} />
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                        8~20 characters
                    </Typography>
                </View>
                <View style={styles.ruleRow}>
                    <CheckCircle2 color={hasValidChars ? colors.cyan : colors.grey} size={16} style={{ marginRight: 8 }} />
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                        Only letters, digits or underscore (A~Z, a~z, 0~9, _)
                    </Typography>
                </View>
                <View style={styles.ruleRow}>
                    <CheckCircle2 color={isNotSameChars ? colors.cyan : colors.grey} size={16} style={{ marginRight: 8 }} />
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                        Characters cannot be all the same
                    </Typography>
                </View>

                {/* Confirm Password Input */}
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginTop: 24, marginBottom: 8 }}>
                    Confirm Password
                </Typography>
                <CommonInput
                    placeholder="Re-enter your new password"
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

                {/* Confirm Button */}
                <CommonButton 
                    title="Confirm" 
                    onPress={() => navigation.navigate('ResetYourPasswordScreen' as any)}
                    style={{ marginTop: 40, marginBottom: 30 }}
                />

                {/* OR divider */}
                <View style={styles.orDividerRow}>
                    <View style={styles.orLine} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, marginHorizontal: 12 }}>
                        OR
                    </Typography>
                    <View style={styles.orLine} />
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotBtn}>
                    <ShieldQuestion color={colors.cyan} size={16} style={{ marginRight: 6 }} />
                    <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.bold }}>
                        Forgot password
                    </Typography>
                </TouchableOpacity>

            </ScrollView>
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
        paddingBottom: 40,
    },
    bannerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputWrapper: {
        height: 56,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 0,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 14,
    },
    eyeBtn: {
        padding: 4,
    },
    strengthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 16,
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
        backgroundColor: '#00C076',
    },
    ruleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    orDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        paddingHorizontal: 40,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    forgotBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
