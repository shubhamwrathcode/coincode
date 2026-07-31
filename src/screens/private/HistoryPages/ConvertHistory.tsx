import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const convertOrdersData = [
    {
        id: '1',
        fromCoin: 'BTC',
        toCoin: 'USDT',
        logoText: '₿',
        logoColor: '#F7931A',
        date: '2026-04-20 · 14:22:10',
        orderId: 'CV-1001',
        status: 'Completed',
        spendAmount: '0.0543 BTC',
        receiveAmount: '3,245.80 USDT',
        conversionRate: '1 BTC = 59,756.21 USDT'
    },
    {
        id: '2',
        fromCoin: 'ETH',
        toCoin: 'USDT',
        logoText: '♦',
        logoColor: '#627EEA',
        date: '2026-04-20 · 13:10:45',
        orderId: 'CV-1002',
        status: 'Completed',
        spendAmount: '1.200 ETH',
        receiveAmount: '4,182.60 USDT',
        conversionRate: '1 ETH = 3,485.50 USDT'
    },
    {
        id: '3',
        fromCoin: 'BTC',
        toCoin: 'ETH',
        logoText: '₿',
        logoColor: '#F7931A',
        date: '2026-04-20 · 11:55:30',
        orderId: 'CV-1003',
        status: 'Completed',
        spendAmount: '0.1000 BTC',
        receiveAmount: '1.712 ETH',
        conversionRate: '1 BTC = 17.12 ETH'
    }
];

const ConvertOrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.cardContainer, { borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.02)', marginVertical: 10 }]}>

            {/* Top Border Glow */}
            {/* <View style={[
                styles.cardTopBorder,
                {
                    backgroundColor: 'rgba(0,194,255,0.5)',
                    shadowColor: '#00C2FF',
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
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 8 }}>
                                {order.fromCoin} <ArrowRight color={colors.white} size={14} style={{ marginHorizontal: 2 }} /> {order.toCoin}
                            </Typography>
                        </View>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                            {order.date}
                        </Typography>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={[styles.statusBadge, { borderColor: 'rgba(0,255,100,0.3)', backgroundColor: 'rgba(0,255,100,0.1)' }]}>
                        <CheckCircle2 color="#00FF64" size={12} style={{ marginRight: 4 }} />
                        <Typography size={11} style={{ color: '#00FF64', fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 8 }}>
                        {order.orderId}
                    </Typography>
                </View>
            </View>

            {/* Exchange Stats Grid */}
            <View style={styles.statsRow}>
                <View style={[styles.statBox, { backgroundColor: '#EF444424', borderColor: 'rgba(255,59,48,0.2)', flex: 1 }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>Spend</Typography>
                    <Typography size={16} numberOfLines={1} adjustsFontSizeToFit style={{ color: '#FF3B30', fontFamily: fonts.semiBold }}>{order.spendAmount}</Typography>
                </View>

                <View style={styles.arrowCircleWrapper}>
                    <View style={[styles.arrowCircle, { backgroundColor: 'rgba(0,194,255,0.15)', borderColor: 'rgba(0,194,255,0.3)' }]}>
                        <ArrowRight color={colors.cyan} size={16} />
                    </View>
                </View>

                <View style={[styles.statBox, { backgroundColor: '#22C55E24', borderColor: 'rgba(0,255,100,0.2)', flex: 1 }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>Receive</Typography>
                    <Typography size={16} numberOfLines={1} adjustsFontSizeToFit style={{ color: '#00FF64', fontFamily: fonts.semiBold }}>{order.receiveAmount}</Typography>
                </View>
            </View>

            {/* Conversion Rate Box */}
            <View style={[styles.rateBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TrendingUp color={colors.grey} size={14} style={{ marginRight: 8 }} />
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>Conversion Rate</Typography>
                </View>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>{order.conversionRate}</Typography>
            </View>

        </View>
    );
});

export const ConvertHistory = () => {
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
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Convert</Typography>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        <ListFilter color={colors.white} size={20} />
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
                        data={convertOrdersData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ConvertOrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'convert'}
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
        paddingBottom: 5,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 10,
        overflow: 'hidden',
    },
    cardTopBorder: {
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
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
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statBox: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
    },
    arrowCircleWrapper: {
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
});
