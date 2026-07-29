import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ChevronRight, Mail, Edit, ShieldCheck, LogIn, Shield, Coffee } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { ToggleSwitch } from '../../TradePage/components/ToggleSwitch';
import { SecurityRiskSheet } from './components/SecurityRiskSheet';

export const EmailSettingsScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const changeEmailSheetRef = useRef<any>(null);
    const [loginEnabled, setLoginEnabled] = useState(true);
    const [securityEnabled, setSecurityEnabled] = useState(true);
    const [withdrawalEnabled, setWithdrawalEnabled] = useState(true);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                    Email Settings
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.emailSettingBanner}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Linked Email Card */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Mail color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Linked Email
                            </Typography>
                        </View>
                        <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                            r***9@gmail.com
                        </Typography>
                    </View>
                </View>

                {/* Change Email Card */}
                <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => changeEmailSheetRef.current?.open()}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Edit color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Change Email
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={20} />
                    </View>
                </TouchableOpacity>

                {/* Info Card */}
                <View style={[styles.card, { alignItems: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <ShieldCheck color={colors.cyan} size={20} style={{ marginTop: 2 }} />
                        <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 12, flex: 1, lineHeight: 20 }}>
                            Used for account security alerts, login verification, withdrawal confirmation, and important account notifications.
                        </Typography>
                    </View>
                </View>

                {/* Toggles */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <LogIn color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Login
                            </Typography>
                        </View>
                        <ToggleSwitch
                            onValueChange={setLoginEnabled}
                            value={loginEnabled}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Shield color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Security Settings
                            </Typography>
                        </View>
                        <ToggleSwitch
                            onValueChange={setSecurityEnabled}
                            value={securityEnabled}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Coffee color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Withdrawal
                            </Typography>
                        </View>
                        <ToggleSwitch
                            onValueChange={setWithdrawalEnabled}
                            value={withdrawalEnabled}
                        />
                    </View>
                </View>

            </ScrollView>

            <SecurityRiskSheet
                sheetRef={changeEmailSheetRef}
                image={ImageAssets.securityRiskIcon}
                title={
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center', lineHeight: 30 }}>
                        Are you sure you want to{'\n'}change your email?
                    </Typography>
                }
                description="To protect your account and assets, withdrawals and P2P transactions will be temporarily restricted for 24 hours after updating your email address."
                height={480}
            >
                <View style={{ flexDirection: 'row', gap: 16, marginTop: 10, paddingHorizontal: 16 }}>
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 16, borderRadius: 30, alignItems: 'center' }}
                        activeOpacity={0.8}
                        onPress={() => changeEmailSheetRef.current?.close()}
                    >
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.medium }}>Cancel</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: colors.cyan, paddingVertical: 16, borderRadius: 30, alignItems: 'center' }}
                        activeOpacity={0.8}
                        onPress={() => {
                            changeEmailSheetRef.current?.close();
                            setTimeout(() => {
                                navigation.navigate('ChangeEmailAddressScreen' as any);
                            }, 200);
                        }}
                    >
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.medium }}>Continue</Typography>
                    </TouchableOpacity>
                </View>
            </SecurityRiskSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
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
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    heroImage: {
        width: 240,
        height: 200,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
