import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { HomeHeader } from '../../components/common/HomeHeader';
import { AccountSetupProgress } from '../../components/dashboard/AccountSetupProgress';
import FastImage from 'react-native-fast-image';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { ImageAssets } from '../../components/common/ImageAssets';
import { CommonButton } from '../../components/common/CommonButton';
import { EventsCard } from '../../components/dashboard/EventsCard';
import { PromoCards } from '../../components/dashboard/PromoCards';
import { MarketOverview } from '../../components/dashboard/MarketOverview';
import { EarnSection } from '../../components/dashboard/EarnSection';
import { LatestNews } from '../../components/dashboard/LatestNews';
const QUICK_LINKS = [
    { id: '1', title: 'Spot', icon: ImageAssets.spotIcon },
    { id: '2', title: 'Margin', icon: ImageAssets.marginIcon },
    { id: '3', title: 'Wallet', icon: ImageAssets.walletIcon },
    { id: '4', title: 'Swap', icon: ImageAssets.swapIcon },
    { id: '5', title: 'More', icon: ImageAssets.moreIcon },
];

const UserDashboard = () => {
    const { colors } = useTheme();

    const renderBanner = () => (
        <View style={[styles.banner, {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: '#111214',
        }]}>
            <View style={{ position: 'absolute', top: 0, left: 0, width: 180, height: 200, overflow: 'hidden', borderTopLeftRadius: 20 }}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <RadialGradient id="glow" cx="0%" cy="0%" rx="100%" ry="100%">
                            <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                            <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
                </Svg>
            </View>
            <View style={styles.bannerLeft}>
                <Typography color={colors.cyan} size={11} style={{
                    fontFamily: fonts.medium,
                    textShadowColor: colors.cyan,
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10
                }}>Unlock Full Access</Typography>
                <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold, marginTop: 5, lineHeight: 22 }}>
                    Verify your identity{'\n'}to unlock full features
                </Typography>
                <Typography color={colors.darkShadeColorText} size={11} style={{ marginTop: 5, lineHeight: 16 }}>
                    Complete verification to enjoy{'\n'}all features and higher limits.
                </Typography>
                <CommonButton
                    title="Verify Now →"
                    onPress={() => { }}
                    style={{ width: 130, height: 34, marginTop: 8 }}
                    titleStyle={{ fontSize: 13, fontFamily: fonts.semiBold }}
                />
            </View>
            <FastImage source={ImageAssets.verifyIdentity}
                style={{ width: 185, height: 200, position: "absolute", right: 0, top: -30 }}
                resizeMode={FastImage.resizeMode.contain} />
        </View>
    );

    const renderQuickLinks = () => (
        <View style={styles.quickLinksContainer}>
            {QUICK_LINKS.map((link) => {
                return (
                    <TouchableOpacity key={link.id} style={styles.quickLinkItem}>
                        <View style={styles.quickLinkIconCircle}>
                            <FastImage
                                source={link.icon}
                                style={{ width: 24, height: 24 }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        <Typography color={colors.white} size={11} style={{ fontFamily: fonts.medium, marginTop: 8 }}>
                            {link.title}
                        </Typography>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100, gap: 12 }} showsVerticalScrollIndicator={false}>
                    <HomeHeader />
                    <AccountSetupProgress />
                    {renderBanner()}
                    {renderQuickLinks()}
                    <EventsCard />
                    <PromoCards />
                    <MarketOverview />
                    <EarnSection />
                    <LatestNews />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default UserDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    banner: {
        flexDirection: 'row',
        marginHorizontal: 16,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        overflow: 'hidden',
        backgroundColor: "#08090B"
    },
    bannerLeft: {
        flex: 1,
        zIndex: 2,
    },
    quickLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    quickLinkItem: {
        alignItems: 'center',
    },
    quickLinkIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#0F1012',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
