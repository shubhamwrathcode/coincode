import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

export const SetNewPasswordScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Placeholder validation checks
    const hasLength = newPassword.length >= 6 && newPassword.length <= 8;
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
                        Reset Your Password
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* New Password Header */}
                <View style={styles.labelRow}>
                    <Lock color={colors.cyan} size={16} style={{ marginRight: 8 }} />
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>
                        New Password
                    </Typography>
                </View>
                <CommonInput
                    placeholder="Please enter password"
                    secureTextEntry={!showNew}
                    value={newPassword}
                    onChangeText={setNewPassword}
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

                {/* Rules Row */}
                <View style={styles.rulesContainer}>
                    <View style={styles.ruleItem}>
                        <CheckCircle2 color={hasLength ? colors.cyan : colors.grey} size={14} style={{ marginRight: 4 }} />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                            6~8 characters
                        </Typography>
                    </View>
                    <View style={styles.ruleItem}>
                        <CheckCircle2 color={hasValidChars ? colors.cyan : colors.grey} size={14} style={{ marginRight: 4 }} />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                            A~Z, a~z, 0~9, _
                        </Typography>
                    </View>
                    <View style={styles.ruleItem}>
                        <CheckCircle2 color={isNotSameChars ? colors.cyan : colors.grey} size={14} style={{ marginRight: 4 }} />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                            Not all same
                        </Typography>
                    </View>
                </View>

                {/* Enter Password Again Header */}
                <View style={[styles.labelRow, { marginTop: 20 }]}>
                    <Lock color={colors.cyan} size={16} style={{ marginRight: 8 }} />
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>
                        Enter Password Again
                    </Typography>
                </View>
                <CommonInput
                    placeholder="Confirm password"
                    secureTextEntry={!showConfirm}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    rightIcon={
                        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                            {showConfirm ? <Eye color={colors.grey} size={20} /> : <EyeOff color={colors.grey} size={20} />}
                        </TouchableOpacity>
                    }
                    containerStyle={styles.inputWrapper}
                    style={{ color: colors.white, fontFamily: fonts.regular }}
                />

            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <CommonButton title="Reset" />
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
        paddingTop: 20,
        paddingBottom: 40,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    inputWrapper: {
        height: 56,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 0,
    },
    eyeBtn: {
        padding: 4,
    },
    strengthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
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
    rulesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
