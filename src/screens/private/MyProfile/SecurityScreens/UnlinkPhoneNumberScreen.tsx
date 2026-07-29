import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, TriangleAlert, ShieldCheck, Link2Off } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';

export const UnlinkPhoneNumberScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                    Unlink Phone Number
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.unlinkPhoneNumberBanner}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Warning Badge */}
                <View style={styles.warningBadgeWrapper}>
                    <View style={styles.warningBadge}>
                        <TriangleAlert color="#F59E0B" size={16} />
                        <Typography size={13} style={{ color: '#F59E0B', fontFamily: fonts.medium, marginLeft: 6 }}>
                            Action Required
                        </Typography>
                    </View>
                </View>

                {/* Title */}
                <Typography size={20} style={{ color: colors.white, fontFamily: fonts.semiBold, textAlign: 'center', marginBottom: 12, lineHeight: 32 }}>
                    Are you sure you want to <Typography size={20} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>unlink</Typography>{'\n'}the phone number?
                </Typography>

                {/* Phone Number Badge */}
                <View style={styles.phoneBadgeWrapper}>
                    <View style={styles.phoneBadge}>
                        <Typography size={15} style={{ color: colors.white, fontFamily: fonts.regular }}>
                            +91 ****0
                        </Typography>
                    </View>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <ShieldCheck color={colors.cyan} size={20} style={{ marginTop: 2 }} />
                    <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 12, flex: 1, lineHeight: 22 }}>
                        After unlinking, you will no longer receive security alerts and verification codes on this number.
                    </Typography>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.footer}>
                <CommonButton
                    title="Confirm to Unlink"
                    leftIcon={<Link2Off color={colors.white} size={20} style={{ marginRight: 8 }} />}
                    onPress={() => {
                        navigation.navigate('DeviceRemovedScreen' as any);
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
        marginBottom: 10,
        marginTop: 10,
    },
    heroImage: {
        width: 220,
        height: 220,
    },
    warningBadgeWrapper: {
        alignItems: 'center',
        marginBottom: 12,
    },
    warningBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(245, 158, 11, 0.1)', // #F59E0B with opacity
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.2)',
    },
    phoneBadgeWrapper: {
        alignItems: 'center',
        marginBottom: 16,
    },
    phoneBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
    },
});
