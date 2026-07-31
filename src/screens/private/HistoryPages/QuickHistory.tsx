import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const quickOrdersData = [
    {
        id: '1',
        logoText: '₿',
        logoColor: '#F7931A',
        pair: 'BTC/USDT',
        marketType: 'Spot',
        side: 'Buy',
        orderType: 'Limit',
        orderId: '#7841234',
        orderPrice: '64,250.00 USDT',
        orderAmount: '0.025 BTC',
        total: '1,606.25 USDT',
        filled: '0.010 / 0.025 BTC',
        avgPrice: '64,200.00',
        status: 'Partially Filled',
        statusColor: '#F59E0B',
        time: '20 May 2024, 03:35 PM',
        progress: 40,
    },
    {
        id: '2',
        logoText: '♦',
        logoColor: '#627EEA',
        pair: 'ETH/USDT',
        marketType: 'Spot',
        side: 'Buy',
        orderType: 'Limit',
        orderId: '#8901334',
        orderPrice: '3,460.00 USDT',
        orderAmount: '1.250 ETH',
        total: '4,312.50 USDT',
        filled: '1.0 / 1.250 ETH',
        avgPrice: '--',
        status: 'Partially Filled',
        statusColor: '#F59E0B',
        time: '20 May 2024, 02:53 PM',
        progress: 0,
    },
    {
        id: '3',
        logoText: 'T',
        logoColor: '#26A17B',
        pair: 'USDT/INR',
        marketType: 'Spot',
        side: 'Buy',
        orderType: 'Limit',
        orderId: '#9012334',
        orderPrice: '83.50 INR',
        orderAmount: '5,000 USDT',
        total: '4,17,500.00 INR',
        filled: '2,000 / 5,000 USDT',
        avgPrice: '83.40 INR',
        status: 'Partially Filled',
        statusColor: '#F59E0B',
        time: '20 May 2024, 01:43 PM',
        progress: 40,
    }
];

const QuickOrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

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
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 8 }}>{order.pair}</Typography>
                            <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium }}>{order.marketType}</Typography>
                            </View>
                            <View style={[styles.badge, { backgroundColor: 'rgba(0,255,100,0.15)', borderColor: 'rgba(0,255,100,0.3)' }]}>
                                <Typography size={10} style={{ color: '#00FF64', fontFamily: fonts.medium }}>{order.side}</Typography>
                            </View>
                            <View style={[styles.badge, { backgroundColor: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' }]}>
                                <Typography size={10} style={{ color: '#F59E0B', fontFamily: fonts.medium }}>{order.orderType}</Typography>
                            </View>
                        </View>
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                            Order ID: {order.orderId}
                        </Typography>
                    </View>
                </View>

            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'center', }}>
                <TouchableOpacity style={[styles.cancelBtn, { borderColor: 'rgba(255,59,48,0.3)', backgroundColor: 'rgba(255,59,48,0.1)' }]}>
                    <Typography size={12} style={{ color: '#FF3B30', fontFamily: fonts.medium }}>Cancel</Typography>
                </TouchableOpacity>
            </View>
            <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />

            {/* Grid Row 1 */}
            <View style={styles.gridRow}>
                <View style={styles.gridBox}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Order Price</Typography>
                    <Typography size={13} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.orderPrice}</Typography>
                </View>
                <View style={styles.gridBox}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Order Amount</Typography>
                    <Typography size={13} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.orderAmount}</Typography>
                </View>
                <View style={styles.gridBox}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total</Typography>
                    <Typography size={13} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.total}</Typography>
                </View>
            </View>

            <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />

            {/* Grid Row 2 */}
            <View style={styles.gridRow}>
                <View style={styles.gridBox}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Filled</Typography>
                    <Typography size={13} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.filled}</Typography>
                </View>
                <View style={styles.gridBox}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Avg. Price</Typography>
                    <Typography size={13} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.avgPrice}</Typography>
                </View>
                <View style={styles.gridBox}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Status / Time</Typography>
                    <View style={styles.statusRow}>
                        <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
                        <Typography size={12} numberOfLines={1} adjustsFontSizeToFit style={{ color: order.statusColor, fontFamily: fonts.semiBold }}>{order.status}</Typography>
                    </View>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>{order.time}</Typography>
                </View>
            </View>

            <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />

            {/* Progress Bar Row */}
            <View style={styles.progressRow}>
                <View style={styles.progressTextRow}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>Fill Progress</Typography>
                    <Typography size={11} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.progress}%</Typography>
                </View>
                <View style={[styles.progressBarTrack, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View style={[styles.progressBarFill, { width: `${order.progress}%`, backgroundColor: '#00FF64' }]} />
                </View>
            </View>

        </View>
    );
});

export const QuickHistory = () => {
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
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Quick Buy/Sell</Typography>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        {/* Empty view for alignment or share icon */}
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filtersRow}>
                    <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                        <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>All Pairs</Typography>
                        <ChevronDown color={colors.grey} size={12} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterIconBtn}>
                        <ListFilter color={colors.white} size={20} />
                    </TouchableOpacity>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={quickOrdersData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <QuickOrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'quick'}
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
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    filterIconBtn: {
        padding: 4,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        paddingTop: 10,
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
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
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    titleBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        marginRight: 6,
    },
    cancelBtn: {
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
    },
    divider: {
        height: 1,
        marginVertical: 14,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridBox: {
        flex: 1,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    progressRow: {
        marginTop: 4,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressBarTrack: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
});
