import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter, Clock, Lock, Unlock, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const stakingOrdersData = [
    {
        id: '1',
        logoText: '₿',
        logoColor: '#F7931A',
        coin: 'BTC',
        type: 'Locked',
        status: 'Active',
        orderId: 'SK-001',
        date: '2026-04-15',
        apy: '5.2% APY',
        stakedAmount: '0.5000',
        stakedCurrency: 'BTC',
        earnedAmount: '0.00780',
        earnedValue: '$466.20',
        duration: '90 days',
    },
    {
        id: '2',
        logoText: '♦',
        logoColor: '#627EEA',
        coin: 'ETH',
        type: 'Flexible',
        status: 'Active',
        orderId: 'SK-002',
        date: '2026-04-15',
        apy: '5.2% APY',
        stakedAmount: '10.000',
        stakedCurrency: 'ETH',
        earnedAmount: '0.01560',
        earnedValue: '$54.37',
        duration: 'Anytime',
    },
    {
        id: '3',
        logoText: 'T',
        logoColor: '#26A17B',
        coin: 'USDT',
        type: 'Locked',
        status: 'Active',
        orderId: 'SK-003',
        date: '2026-04-15',
        apy: '5.2% APY',
        stakedAmount: '5.000',
        stakedCurrency: 'USDT',
        earnedAmount: '7.800',
        earnedValue: '$7.80',
        duration: '90 days',
    }
];

const StakingOrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

    const isLocked = order.type === 'Locked';
    const typeColor = isLocked ? '#F59E0B' : colors.cyan;

    return (
        <View style={[styles.cardContainer, { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <View style={styles.titleBadgeRow}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 8 }}>{order.coin}</Typography>
                            <View style={[styles.typeBadge, { borderColor: isLocked ? 'rgba(245,158,11,0.3)' : 'rgba(0,194,255,0.3)', backgroundColor: isLocked ? 'rgba(245,158,11,0.1)' : 'rgba(0,194,255,0.1)' }]}>
                                {isLocked ? (
                                    <Lock color={typeColor} size={10} style={{ marginRight: 4 }} />
                                ) : (
                                    <Unlock color={typeColor} size={10} style={{ marginRight: 4 }} />
                                )}
                                <Typography size={10} style={{ color: typeColor, fontFamily: fonts.medium }}>{order.type}</Typography>
                            </View>
                        </View>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                            {order.orderId} · {order.date}
                        </Typography>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={[styles.statusTag, { borderColor: 'rgba(0,255,100,0.3)', backgroundColor: 'rgba(0,255,100,0.1)' }]}>
                        <Typography size={11} style={{ color: '#00FF64', fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                    <View style={styles.apyRow}>
                        <TrendingUp color="#00FF64" size={12} style={{ marginRight: 4 }} />
                        <Typography size={13} style={{ color: '#00FF64', fontFamily: fonts.semiBold }}>
                            {order.apy}
                        </Typography>
                    </View>
                </View>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsRow}>
                <View style={[styles.statBox, { backgroundColor: '#F59E0B1F', borderColor: 'rgba(255,255,255,0.08)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>Staked</Typography>
                    <Typography size={18} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.bold }}>{order.stakedAmount}</Typography>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>{order.stakedCurrency}</Typography>
                </View>
                <View style={[styles.statBox, { backgroundColor: 'rgba(0,255,100,0.05)', borderColor: 'rgba(0,255,100,0.15)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>Earned</Typography>
                    <Typography size={18} numberOfLines={1} adjustsFontSizeToFit style={{ color: '#00FF64', fontFamily: fonts.bold }}>{order.earnedAmount}</Typography>
                    <Typography size={11} style={{ color: '#00FF64', fontFamily: fonts.regular, marginTop: 4 }}>{order.earnedValue}</Typography>
                </View>
            </View>

            {/* Footer Row */}
            <View style={[styles.footerRow, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Clock color={colors.grey} size={14} style={{ marginRight: 8 }} />
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>Duration: </Typography>
                    <Typography size={12} style={{ color: typeColor, fontFamily: fonts.semiBold }}>{order.duration}</Typography>
                </View>
                <TouchableOpacity style={[
                    styles.actionBtn,
                    {
                        borderColor: typeColor,
                        backgroundColor: isLocked ? 'rgba(245,158,11,0.1)' : 'rgba(0,194,255,0.1)',
                    }
                ]}>
                    <Typography size={13} style={{ color: typeColor, fontFamily: fonts.semiBold }}>
                        {isLocked ? 'View' : 'Unstake'}
                    </Typography>
                </TouchableOpacity>
            </View>

        </View>
    );
});

export const StakingHistory = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleSelectType = (type: string, title: string) => {
        setIsDropdownVisible(false);
        const screenMap: any = {
            spot: 'SpotHistory',
            futures: 'FuturesHistory',
            margin: 'MarginHistory',
            convert: 'ConvertHistory',
            launchpad: 'LaunchpadHistory',
            staking: 'StakingHistory',
            quick: 'QuickHistory',
            asset: 'AssetHistory'
        };
        if (screenMap[type]) {
            (navigation as any).replace(screenMap[type]);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <FastImage source={ImageAssets.backButtonImg} style={{ width: 35, height: 35 }} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headerTitleRow} onPress={() => setIsDropdownVisible(true)}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 4 }}>My Trades</Typography>
                                <ChevronDown color={colors.white} size={16} />
                            </View>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Staking</Typography>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        {/* Empty view for alignment or share icon */}
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filtersRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterPillsRow} contentContainerStyle={{ paddingRight: 16 }}>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>All Pairs</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>All Type</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>01 May 2024 - 31 May 2024</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.filterIconContainer}>
                        <TouchableOpacity style={styles.filterIconBtn}>
                            <ListFilter color={colors.white} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Results Count Row */}
                <View style={styles.resultsRow}>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Showing {stakingOrdersData.length} of {stakingOrdersData.length} results</Typography>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Page 1</Typography>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={stakingOrdersData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <StakingOrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'staking'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
    },
    iconBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitleRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filtersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    filterPillsRow: {
        flex: 1,
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    filterIconContainer: {
        paddingRight: 16,
    },
    filterIconBtn: {
        padding: 4,
    },
    resultsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 10,
        marginBottom: 16,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        flex: 1,
    },
    coinLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    titleBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusTag: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    apyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 12,
    },
    statBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 4,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 0,
    },
    actionBtn: {
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
});
