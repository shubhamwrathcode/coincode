import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Copy, ChevronRight, Users, Monitor, Gift, Calendar } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { CommonButton } from '../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

const leaderboardData = [
    { rank: 1, uid: '****563', invites: 2713, bonus: '50313.3286' },
    { rank: 2, uid: '****882', invites: 2161, bonus: '44267.7218' },
    { rank: 3, uid: '****828', invites: 928, bonus: '23434.4271' },
    { rank: 4, uid: '****932', invites: 10, bonus: '13911.6672' },
    { rank: 5, uid: '****938', invites: 762, bonus: '9839.4252' },
];

export const ReferralScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const renderRank = (rank: number) => {
        if (rank === 1) return <Typography size={16}>🥇</Typography>;
        if (rank === 2) return <Typography size={16}>🥈</Typography>;
        if (rank === 3) return <Typography size={16}>🥉</Typography>;
        return (
            <View style={[styles.rankCircle, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.semiBold }}>{rank}</Typography>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>

                {/* Header Absolute */}
                <View style={[styles.headerAbsolute, { top: Math.max(insets.top, 10) }]}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* Banner Section */}
                    <View style={styles.bannerContainer}>
                        <FastImage source={ImageAssets.referalBanner} style={styles.bannerImage} resizeMode="cover" />
                        <View style={styles.bannerTextContainer}>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium, marginBottom: 8 }}>
                                Refer Friends
                            </Typography>
                            <Typography size={28} style={{ color: colors.white, fontFamily: fonts.bold }}>
                                Earn Up to <Typography size={28} style={{ color: colors.cyan, fontFamily: fonts.bold }}>20%</Typography>
                            </Typography>
                            <Typography size={28} style={{ color: colors.white, fontFamily: fonts.bold }}>
                                in Bonuses
                            </Typography>
                        </View>
                    </View>

                    {/* How referral works */}
                    <View style={styles.section}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 16 }}>
                            How referral works
                        </Typography>
                        <View style={styles.howItWorksRow}>
                            {[
                                { step: '01', text: 'Send\nInvitation by\nLink' },
                                { step: '02', text: 'Friends\nRegister and\nTrade' },
                                { step: '03', text: 'Get\nCorresponding\nRewards' },
                            ].map((item) => (
                                <View key={item.step} style={styles.stepCard}>
                                    <View style={[styles.stepNumberBadge, { backgroundColor: colors.cyan }]}>
                                        <Typography size={10} style={{ color: colors.white, fontFamily: fonts.bold }}>{item.step}</Typography>
                                    </View>
                                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium, textAlign: 'center', marginTop: 12, lineHeight: 14 }}>
                                        {item.text}
                                    </Typography>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Your Referral Stats */}
                    <View style={[styles.statsCard, { borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>
                        <View style={styles.statsHeader}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Your Referral Stats
                            </Typography>
                            <TouchableOpacity style={[styles.timeFilterBtn, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Calendar color={colors.grey} size={10} style={{ marginRight: 4 }} />
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium }}>Last 30 Days</Typography>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.statsGrid}>
                            <View style={styles.statItem}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total Referrals</Typography>
                                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>128</Typography>
                            </View>
                            <View style={styles.statItem}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Active Referrals</Typography>
                                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>86</Typography>
                            </View>
                            <View style={[styles.statItem, { marginTop: 16 }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total Earnings</Typography>
                                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>
                                    1,245.50 <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium }}>USDT</Typography>
                                </Typography>
                            </View>
                            <View style={[styles.statItem, { marginTop: 16 }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Pending Rewards</Typography>
                                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>
                                    245.30 <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium }}>USDT</Typography>
                                </Typography>
                            </View>
                        </View>
                    </View>

                    {/* Default Referral */}
                    <View style={[styles.statsCard, { borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)', marginTop: 16 }]}>
                        <View style={styles.statsHeader}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Default Referral
                            </Typography>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium, marginRight: 4 }}>Manage</Typography>
                                <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: colors.cyan, alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography size={10} style={{ color: colors.black, fontFamily: fonts.bold }}>?</Typography>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 24, flexDirection: 'row', alignItems: 'center' }}>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium, marginRight: 16 }}>Referral Code</Typography>
                            <TouchableOpacity style={[styles.codeBox, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold, marginRight: 8 }}>919826</Typography>
                                <Copy color={colors.grey} size={14} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Tasks Section */}
                    <View style={[styles.statsCard, { borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)', marginTop: 16, paddingRight: 0 }]}>
                        <View style={[styles.statsHeader, { paddingRight: 16 }]}>
                            <View>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 2 }}>Earn up to</Typography>
                                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>
                                    6060 USDT <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>reward</Typography>
                                </Typography>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>
                                    when your friend completes the task
                                </Typography>
                            </View>
                            <TouchableOpacity style={[styles.timeFilterBtn, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium, marginRight: 4 }}>View All Tasks</Typography>
                                <ChevronRight color={colors.cyan} size={12} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }} contentContainerStyle={{ paddingRight: 16 }}>
                            <View style={[styles.taskCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <View style={[styles.taskIconBox, { backgroundColor: 'rgba(0,194,255,0.1)' }]}>
                                    <Monitor color={colors.cyan} size={14} />
                                </View>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.semiBold, marginTop: 12, marginBottom: 12 }}>
                                    Successful{'\n'}Registration
                                </Typography>
                                <Typography size={9} style={{ color: colors.grey, fontFamily: fonts.regular }}>Unlock</Typography>
                                <Typography size={11} style={{ color: colors.cyan, fontFamily: fonts.bold, marginTop: 2 }}>11 USDT</Typography>
                                <Typography size={9} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>Futures Fee{'\n'}Voucher</Typography>
                            </View>
                            <View style={[styles.taskCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <View style={[styles.taskIconBox, { backgroundColor: 'rgba(0,194,255,0.1)' }]}>
                                    <Users color={colors.cyan} size={14} />
                                </View>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.semiBold, marginTop: 12, marginBottom: 12 }}>
                                    Standard KYC{'\n'}
                                </Typography>
                                <Typography size={9} style={{ color: colors.grey, fontFamily: fonts.regular }}>Unlock</Typography>
                                <Typography size={11} style={{ color: colors.cyan, fontFamily: fonts.bold, marginTop: 2 }}>44.247 / 318{'\n'}USDT</Typography>
                            </View>
                            <View style={[styles.taskCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <View style={[styles.taskIconBox, { backgroundColor: 'rgba(0,194,255,0.1)' }]}>
                                    <Gift color={colors.cyan} size={14} />
                                </View>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.semiBold, marginTop: 12, marginBottom: 12 }}>
                                    First Deposit{'\n'}
                                </Typography>
                                <Typography size={9} style={{ color: colors.grey, fontFamily: fonts.regular }}>Unlock</Typography>
                                <Typography size={11} style={{ color: colors.cyan, fontFamily: fonts.bold, marginTop: 2 }}>44.3471 USDT</Typography>
                                <Typography size={9} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>Futures Fee{'\n'}Voucher</Typography>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Leaderboard */}
                    <View style={[styles.section, { marginTop: 24, paddingBottom: 120 }]}>
                        <View style={styles.statsHeader}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Leaderboard
                            </Typography>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium, marginRight: 2 }}>View Full Leaderboard</Typography>
                                <ChevronRight color={colors.cyan} size={12} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tableHeader}>
                            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, flex: 1 }}>Ranking (UID)</Typography>
                            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, flex: 0.6 }}>Invites</Typography>
                            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, flex: 1, textAlign: 'right' }}>Referral Bonus (USDT)</Typography>
                        </View>

                        {leaderboardData.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.rankIconContainer}>
                                        {renderRank(item.rank)}
                                    </View>
                                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>{item.uid}</Typography>
                                </View>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, flex: 0.6 }}>{item.invites}</Typography>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.bold, flex: 1, textAlign: 'right' }}>{item.bonus} USDT</Typography>
                            </View>
                        ))}
                    </View>

                </ScrollView>

                {/* Sticky Invite Button Area */}
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
                    style={[styles.stickyFooter, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}
                    pointerEvents="box-none"
                >
                    <CommonButton
                        title="Invite Friends"
                        onPress={() => { }}
                        style={{ marginHorizontal: 16 }}
                        leftIcon={<Users color={colors.white} size={18} style={{ marginRight: 8 }} />}
                    />
                </LinearGradient>

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerAbsolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    scrollContent: {
        paddingBottom: 0,
    },
    bannerContainer: {
        width: '100%',
        height: width * 0.75,
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    bannerTextContainer: {
        position: 'absolute',
        top: 80,
        left: 20,
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    howItWorksRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepCard: {
        width: (width - 48) / 3,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)'
    },
    stepNumberBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsCard: {
        marginHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginTop: 16,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeFilterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
    },
    statItem: {
        width: '50%',
    },
    codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    taskCard: {
        width: 120,
        borderRadius: 12,
        padding: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)'
    },
    taskIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        marginTop: 16,
        paddingBottom: 12,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    rankIconContainer: {
        width: 28,
        alignItems: 'flex-start',
    },
    rankCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickyFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 40,
    }
});
