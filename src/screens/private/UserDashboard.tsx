import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { HomeHeader } from '../../components/common/HomeHeader';
import { AccountSetupProgress } from '../../components/dashboard/AccountSetupProgress';
import { VerifyBanner } from '../../components/dashboard/VerifyBanner';
import { QuickLinks } from '../../components/dashboard/QuickLinks';
import { EventsCard } from '../../components/dashboard/EventsCard';
import { PromoCards } from '../../components/dashboard/PromoCards';
import { MarketOverview } from '../../components/dashboard/MarketOverview';
import { EarnSection } from '../../components/dashboard/EarnSection';
import { LatestNews } from '../../components/dashboard/LatestNews';
import { IdentityVerificationSheet } from '../../components/dashboard/IdentityVerificationSheet';

const UserDashboard = () => {
    const { colors } = useTheme();
    const verifySheetRef = useRef<any>(null);

    const handleOpenVerifySheet = () => {
        verifySheetRef.current?.open();
    };
    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100, gap: 12 }} showsVerticalScrollIndicator={false}>
                    <HomeHeader />
                    <AccountSetupProgress />
                    <VerifyBanner onVerifyPress={handleOpenVerifySheet} />
                    <QuickLinks />
                    <EventsCard />
                    <PromoCards />
                    <MarketOverview />
                    <EarnSection />
                    <LatestNews />
                </ScrollView>
            </SafeAreaView>
            <IdentityVerificationSheet sheetRef={verifySheetRef} />
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

});
