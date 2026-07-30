import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ShieldCheck, Mail, Shield, UserCheck } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';

export const AntiPhishingScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                    Anti-Phishing Code
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.antiPhisingBanner}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Main Info Card */}
                <View style={styles.mainInfoCard}>
                    <View style={styles.mainInfoTitleRow}>
                        <View style={styles.iconContainer}>
                            <ShieldCheck color={colors.cyan} size={16} />
                        </View>
                        <Typography size={15} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, marginLeft: 12 }}>
                            How Does the Anti-Phishing Code Work?
                        </Typography>
                    </View>
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 22 }}>
                        You can create your own anti-phishing code to appear in official Coincode emails and SMS messages. This feature helps you verify the authenticity of communications from Coincode.
                    </Typography>
                </View>

                {/* Grid Cards */}
                <View style={styles.gridContainer}>
                    {/* Card 1 */}
                    <View style={styles.gridCard}>
                        <View style={styles.gridIconContainer}>
                            <Mail color={colors.cyan} size={18} />
                        </View>
                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, lineHeight: 18 }}>
                            Identify Official Messages
                        </Typography>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                            Your code will appear in Coincode emails and SMS.
                        </Typography>
                    </View>

                    {/* Card 2 */}
                    <View style={styles.gridCard}>
                        <View style={styles.gridIconContainer}>
                            <ShieldCheck color={colors.cyan} size={18} />
                        </View>
                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, lineHeight: 18 }}>
                            Verify Authenticity Easily
                        </Typography>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                            Check the code in messages to ensure they are from Coincode.
                        </Typography>
                    </View>

                    {/* Card 3 */}
                    <View style={styles.gridCard}>
                        <View style={styles.gridIconContainer}>
                            <UserCheck color={colors.cyan} size={18} />
                        </View>
                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, lineHeight: 18 }}>
                            Protect Your Account
                        </Typography>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                            Prevent phishing attacks and keep your account safe.
                        </Typography>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.footer}>
                <CommonButton
                    title="Create"
                    onPress={() => {
                        navigation.navigate('CreateAntiPhishingCodeScreen' as any);
                    }}
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
        marginBottom: 20,
        marginTop: 10,
    },
    heroImage: {
        width: 260,
        height: 200,
    },
    mainInfoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    mainInfoTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 204, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    gridCard: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    gridIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 204, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
    },
});
