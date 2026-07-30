import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, MessageSquare, Mail, Shield, Lock, Star } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ToggleSwitch } from '../../TradePage/components/ToggleSwitch';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const LoginVerificationScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [isGoogleAuthEnabled, setIsGoogleAuthEnabled] = useState(false);
    const [isSmsEnabled, setIsSmsEnabled] = useState(false);
    const [isEmailEnabled, setIsEmailEnabled] = useState(true);
    const [isAuthenticatorEnabled, setIsAuthenticatorEnabled] = useState(false);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                    Login 2-Step Verification
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Google Authenticator */}
                <View style={[styles.card, isGoogleAuthEnabled && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.08)' }]}>
                    <View style={styles.cardLeft}>
                        <View style={styles.iconContainer}>
                            <FastImage source={ImageAssets.googleAuthneticatorIcon} style={{ width: 18, height: 18 }} resizeMode="contain" />
                        </View>
                        <View style={styles.textContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Google Authenticator
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Use authenticator app to generate code
                            </Typography>
                        </View>
                    </View>
                    <ToggleSwitch
                        onValueChange={setIsGoogleAuthEnabled}
                        value={isGoogleAuthEnabled}
                    />
                </View>

                {/* SMS Verification */}
                <View style={[styles.card, isSmsEnabled && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.08)' }]}>
                    <View style={styles.cardLeft}>
                        <View style={styles.iconContainer}>
                            <MessageSquare color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.textContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                SMS verification
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Receive codes via SMS
                            </Typography>
                        </View>
                    </View>
                    <ToggleSwitch
                        onValueChange={setIsSmsEnabled}
                        value={isSmsEnabled}
                    />
                </View>

                {/* Email Verification */}
                <View style={[styles.card, isEmailEnabled && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.08)' }]}>
                    <View style={styles.cardLeft}>
                        <View style={styles.iconContainer}>
                            <Mail color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.textContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Email verification
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Receive codes via Email
                            </Typography>
                        </View>
                    </View>
                    <ToggleSwitch
                        onValueChange={setIsEmailEnabled}
                        value={isEmailEnabled}
                    />
                </View>

                {/* Authenticator */}
                <View style={[styles.card, isAuthenticatorEnabled && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.08)' }]}>
                    <View style={styles.cardLeft}>
                        <View style={styles.iconContainer}>
                            <Shield color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.textContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Authenticator
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Use device authenticator to verify
                            </Typography>
                        </View>
                    </View>
                    <ToggleSwitch
                        onValueChange={setIsAuthenticatorEnabled}
                        value={isAuthenticatorEnabled}
                    />
                </View>

                {/* Info Note */}
                <View style={styles.infoCard}>
                    <View style={styles.infoCardLeft}>
                        <View style={styles.iconContainer}>
                            <Lock color={colors.cyan} size={18} />
                        </View>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <View style={styles.infoTitleRow}>
                            <Star color={colors.cyan} size={14} fill={colors.cyan} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginLeft: 6 }}>
                                Keep your account secure
                            </Typography>
                        </View>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                            Enabling 2-step verification adds an extra layer of protection against unauthorized access to your account.
                        </Typography>
                    </View>
                </View>

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
        paddingBottom: 20,
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
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 204, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    infoCardLeft: {
        marginRight: 4,
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    infoTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
});
