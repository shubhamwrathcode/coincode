import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Share2, ChevronDown, ListFilter } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const tabs = ['Open Orders (3)', 'Order History', 'Trades History'];

const openOrdersData = [
    {
        id: '1',
        pair: 'BTC/USDT',
        logoText: '₿',
        logoColor: '#F7931A',
        tags: [
            { id: '1', text: 'Spot', bg: 'rgba(255,255,255,0.08)', color: '#FFFFFF' },
            { id: '2', text: 'Buy', bg: 'rgba(0,255,100,0.15)', color: '#00FF64' },
            { id: '3', text: 'Limit', bg: 'rgba(247,147,26,0.15)', color: '#F7931A' }
        ],
        orderId: '#7841234',
        orderPrice: '64,250.00 USDT',
        orderAmount: '0.025 BTC',
        total: '1,606.25 USDT',
        filled: '0.010 / 0.025 BTC',
        avgPrice: '64,200.00',
        status: 'Partially Filled',
        statusColor: '#F7931A',
        time: '20 May 2024, 03:35 PM',
        progress: 40
    },
    {
        id: '2',
        pair: 'ETH/USDT',
        logoText: '♦',
        logoColor: '#627EEA',
        tags: [
            { id: '1', text: 'Spot', bg: 'rgba(255,255,255,0.08)', color: '#FFFFFF' },
            { id: '2', text: 'Buy', bg: 'rgba(0,255,100,0.15)', color: '#00FF64' },
            { id: '3', text: 'Limit', bg: 'rgba(247,147,26,0.15)', color: '#F7931A' }
        ],
        orderId: '#8901334',
        orderPrice: '3,460.00 USDT',
        orderAmount: '1.250 ETH',
        total: '4,312.50 USDT',
        filled: '1.0 / 1.250 ETH',
        avgPrice: '--',
        status: 'Partially Filled',
        statusColor: '#F7931A',
        time: '20 May 2024, 02:53 PM',
        progress: 0
    },
    {
        id: '3',
        pair: 'USDT/INR',
        logoText: '₮',
        logoColor: '#26A17B',
        tags: [
            { id: '1', text: 'Spot', bg: 'rgba(255,255,255,0.08)', color: '#FFFFFF' },
            { id: '2', text: 'Buy', bg: 'rgba(0,255,100,0.15)', color: '#00FF64' },
            { id: '3', text: 'Limit', bg: 'rgba(247,147,26,0.15)', color: '#F7931A' }
        ],
        orderId: '#9012334',
        orderPrice: '83.50 INR',
        orderAmount: '5,000 USDT',
        total: '4,17,500.00 INR',
        filled: '2,000 / 5,000 USDT',
        avgPrice: '83.40 INR',
        status: 'Partially Filled',
        statusColor: '#F7931A',
        time: '20 May 2024, 01:43 PM',
        progress: 40
    },
];

const OrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.cardContainer, { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold }}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <View style={styles.pairTagRow}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold, marginRight: 8 }}>{order.pair}</Typography>
                            {order.tags.map((tag: any) => (
                                <View key={tag.id} style={[styles.tag, { backgroundColor: tag.bg }]}>
                                    <Typography size={10} style={{ color: tag.color, fontFamily: fonts.medium }}>{tag.text}</Typography>
                                </View>
                            ))}
                        </View>
                        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                            Order ID: {order.orderId}
                        </Typography>
                    </View>
                </View>
                <TouchableOpacity style={[styles.cancelBtn, { borderColor: 'rgba(255, 59, 48, 0.4)' }]}>
                    <Typography size={12} style={{ color: '#FF3B30', fontFamily: fonts.medium }}>Cancel</Typography>
                </TouchableOpacity>
            </View>

            <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />

            {/* Details Grid - Top Row */}
            <View style={styles.detailsRow}>
                <View style={styles.detailColLeft}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Order Price</Typography>
                    <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.orderPrice}</Typography>
                </View>
                <View style={styles.detailColCenter}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Order Amount</Typography>
                    <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.orderAmount}</Typography>
                </View>
                <View style={styles.detailColRight}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total</Typography>
                    <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.total}</Typography>
                </View>
            </View>

            {/* Details Grid - Bottom Row */}
            <View style={[styles.detailsRow, { marginTop: 16 }]}>
                <View style={styles.detailColLeft}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Filled</Typography>
                    <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.filled}</Typography>
                </View>
                <View style={styles.detailColCenter}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Avg. Price</Typography>
                    <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.avgPrice}</Typography>
                </View>
                <View style={styles.detailColRight}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Status / Time</Typography>
                    <View style={styles.statusDotRow}>
                        <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
                        <Typography size={11} style={{ color: order.statusColor, fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>{order.time}</Typography>
                </View>
            </View>

            {/* Progress Bar Section */}
            <View style={styles.progressSection}>
                <View style={styles.progressLabelRow}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Fill Progress</Typography>
                    <Typography size={10} style={{ color: colors.white, fontFamily: fonts.bold }}>{order.progress}%</Typography>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View style={[styles.progressBarFill, { width: `${order.progress}%`, backgroundColor: colors.cyan }]} />
                </View>
            </View>

        </View>
    );
});

export const SpotHistory = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Open Orders (3)');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentType, setCurrentType] = useState('spot');
    const [currentTypeTitle, setCurrentTypeTitle] = useState('Spot');

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
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>{currentTypeTitle}</Typography>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.iconBtn}>
                        {/* <Share2 color={colors.white} size={20} /> */}
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={styles.tabBtn}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Typography
                                    size={14}
                                    style={{
                                        color: isActive ? colors.white : colors.grey,
                                        fontFamily: fonts.medium
                                    }}
                                >
                                    {tab}
                                </Typography>
                                {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Filters */}
                <View style={styles.filtersRow}>
                    <View style={styles.filterPillsRow}>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium, marginRight: 4 }}>All Pairs</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium, marginRight: 4 }}>All Type</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterPill, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium, marginRight: 4 }}>All Side</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.filterIconBtn}>
                        <ListFilter color={colors.white} size={20} />
                    </TouchableOpacity>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={openOrdersData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <OrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </SafeAreaView>
            
            <HistoryTypeSelectorModal 
                visible={isDropdownVisible} 
                onClose={() => setIsDropdownVisible(false)} 
                onSelect={handleSelectType}
                currentType={currentType}
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
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    tabBtn: {
        marginRight: 24,
        paddingBottom: 12,
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 25,
        right: 0,
        height: 2,
        borderRadius: 1,
        width: 40,
    },
    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    filterPillsRow: {
        flexDirection: 'row',
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
    },
    filterIconBtn: {
        padding: 4,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
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
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    pairTagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 4,
    },
    cancelBtn: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 10,
        backgroundColor: 'rgba(255,59,48,0.05)',
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 16,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailColLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    detailColCenter: {
        flex: 1,
        alignItems: 'flex-start',
    },
    detailColRight: {
        flex: 1,
        alignItems: 'flex-start',
    },
    statusDotRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    progressSection: {
        marginTop: 20,
    },
    progressLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressBarBg: {
        height: 4,
        borderRadius: 2,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    }
});
