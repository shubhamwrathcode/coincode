import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

export const ResetFundPasswordScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                        Reset Fund Password
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Illustration */}
                <View style={styles.illustrationContainer}>
                    <FastImage
                        source={ImageAssets.resetFundPasswordBanner}
                        style={{ width: width * 0.7, height: width * 0.5 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Title & Description */}
                <View style={styles.textContainer}>
                    <Typography size={24} style={{ color: colors.white, fontFamily: fonts.semiBold, textAlign: 'center', }}>
                        Reset
                    </Typography>
                    <Typography size={24} style={{ color: colors.cyan, fontFamily: fonts.semiBold, textAlign: 'center', marginBottom: 12 }}>
                        Fund Password
                    </Typography>
                    <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', lineHeight: 22 }}>
                        Create a new fund password to keep your assets secure.
                    </Typography>
                </View>

                {/* New Password */}
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8 }}>
                    New Password
                </Typography>
                <CommonInput
                    placeholder="Enter new fund password"
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

                {/* Password Strength & Rules */}
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

                <View style={styles.ruleRow}>
                    <ShieldCheck color={colors.cyan} size={14} style={{ marginRight: 6 }} />
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                        Fund password 6 characters minimum
                    </Typography>
                </View>

                {/* New Password Again */}
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, marginTop: 10 }}>
                    New Password Again
                </Typography>
                <CommonInput
                    placeholder="Re-enter new fund password"
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

            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
                <CommonButton 
                    title="Confirm" 
                    onPress={() => navigation.navigate('SecurityVerificationScreen' as any, { nextScreen: 'FundPasswordSuccessScreen' })} 
                />
            </View>
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
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 10,
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
        marginBottom: 8,
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
    ruleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
