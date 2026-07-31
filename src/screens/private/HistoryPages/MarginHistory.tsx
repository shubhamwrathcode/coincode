import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const marginOrdersData = [
    {
        id: '1',
        pair: 'BTC/USDT',
        coinType: 'BTC',
        logoText: '₿',
        logoColor: '#F7931A',
        isLong: true,
        leverage: '10x',
        orderId: 'MO-1001',
        date: '2026-06-20',
        amount: '0.5',
        entry: '$64,250.00',
        exit: '$3,195.20',
        pnl: '+4,650.00 USDT',
        pnlPercent: '+14.47%',
        isProfit: true,
    },
    {
        id: '2',
        pair: 'ETH/USDT',
        coinType: 'ETH',
        logoText: '♦',
        logoColor: '#627EEA',
        isLong: false,
        leverage: '5x',
        orderId: 'MO-1002',
        date: '2026-06-21',
        amount: '0.5',
        entry: '$64,250.00',
        exit: '$3,195.20',
        pnl: '+4,650.00 USDT',
        pnlPercent: '+14.47%',
        isProfit: true,
    },
    {
        id: '3',
        pair: 'BNB/USDT',
        coinType: 'BNB',
        logoText: 'B',
        logoColor: '#F3BA2F',
        isLong: true,
        leverage: '10x',
        orderId: 'MO-1003',
        date: '2026-06-21',
        amount: '0.5',
        entry: '$64,250.00',
        exit: '$3,195.20',
        pnl: '+4,650.00 USDT',
        pnlPercent: '+14.47%',
        isProfit: true,
    }
];

const MarginOrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.cardContainer, { borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>

            {/* Top Border Glow */}
            {/* <View style={[
                styles.cardTopBorder,
                {
                    backgroundColor: order.isProfit ? 'rgba(0,255,100,0.5)' : 'rgba(255,59,48,0.5)',
                    shadowColor: order.isProfit ? '#00FF64' : '#FF3B30',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                }
            ]} /> */}

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <View style={styles.pairTagRow}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 8 }}>{order.pair}</Typography>
                            <View style={[styles.tag, { backgroundColor: order.isLong ? 'rgba(0,255,100,0.1)' : 'rgba(255,59,48,0.1)' }]}>
                                {order.isLong ? (
                                    <TrendingUp color={order.isLong ? '#00FF64' : '#FF3B30'} size={10} style={{ marginRight: 4 }} />
                                ) : (
                                    <TrendingDown color={order.isLong ? '#00FF64' : '#FF3B30'} size={10} style={{ marginRight: 4 }} />
                                )}
                                <Typography size={10} style={{ color: order.isLong ? '#00FF64' : '#FF3B30', fontFamily: fonts.medium }}>{order.isLong ? 'Long' : 'Short'}</Typography>
                            </View>
                            <View style={[styles.leverageBadge, { backgroundColor: 'rgba(0,194,255,0.15)' }]}>
                                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>{order.leverage}</Typography>
                            </View>
                        </View>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                            {order.orderId} · {order.date}
                        </Typography>
                    </View>
                </View>
                <TouchableOpacity style={[styles.closeBtn, { borderColor: 'rgba(255, 59, 48, 0.2)', backgroundColor: 'rgba(255,59,48,0.1)' }]}>
                    <Typography size={12} style={{ color: '#FF3B30', fontFamily: fonts.medium }}>Close</Typography>
                </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsRow}>
                <View style={[styles.statBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Amount</Typography>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.amount}</Typography>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>{order.coinType}</Typography>
                </View>
                <View style={[styles.statBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Entry</Typography>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.entry}</Typography>
                </View>
                <View style={[styles.statBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Exit</Typography>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.exit}</Typography>
                </View>
            </View>

            {/* Profit Loss Box */}
            <View style={[
                styles.pnlBox,
                {
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: order.isProfit ? 'rgba(0,255,100,0.15)' : 'rgba(255,59,48,0.15)'
                }
            ]}>
                <View>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Profit / Loss</Typography>
                    <Typography size={16} style={{ color: order.isProfit ? '#00FF64' : '#FF3B30', fontFamily: fonts.semiBold }}>{order.pnl}</Typography>
                </View>
                <View style={[styles.pnlBadge, { backgroundColor: order.isProfit ? 'rgba(0,255,100,0.1)' : 'rgba(255,59,48,0.1)', borderColor: order.isProfit ? 'rgba(0,255,100,0.3)' : 'rgba(255,59,48,0.3)' }]}>
                    <Typography size={12} style={{ color: order.isProfit ? '#00FF64' : '#FF3B30', fontFamily: fonts.semiBold }}>{order.pnlPercent}</Typography>
                </View>
            </View>

        </View>
    );
});

export const MarginHistory = () => {
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
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Margin Orders</Typography>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        {/* Share icon placeholder if needed */}
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filtersRow}>
                    <View style={styles.filterPillsRow}>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>All Pairs</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>01 May 2024 - 31 May 2024</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.filterIconBtn}>
                        <ListFilter color={colors.white} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Results Count Row */}
                <View style={styles.resultsRow}>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Showing 8 of 8 results</Typography>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Page 1</Typography>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={marginOrdersData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <MarginOrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'margin'}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    filterPillsRow: {
        flexDirection: 'row',
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    filterIconBtn: {
        padding: 4,
    },
    resultsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
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
        overflow: 'hidden',
    },
    cardTopBorder: {
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 2,
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
    pairTagRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leverageBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 4,
    },
    closeBtn: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 4,
    },
    pnlBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
        marginHorizontal: 4,
    },
    pnlBadge: {
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
});
