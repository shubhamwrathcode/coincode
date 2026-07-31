import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter, TrendingUp, TrendingDown, Zap } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const tabs = ['Open Orders (3)', 'Order History', 'Trades History', 'Positions'];

const futuresOpenOrders = [
    {
        id: '1',
        pair: 'BTC/USDT',
        leverage: '20x',
        logoText: '₿',
        logoColor: '#F7931A',
        tags: [
            { id: '1', text: 'Long', bg: 'rgba(0,255,100,0.1)', color: '#00FF64', isUp: true },
            { id: '2', text: 'Limit', bg: 'rgba(100,100,255,0.1)', color: '#8A8AFF' }
        ],
        orderId: '#FT-9841',
        price: '67,420.00',
        qty: '0.050',
        value: '3,371.00',
        progress: 62,
        tpSl: 'TP: 71,000 / SL: 65,000',
        time: 'Today, 09:14 AM',
    },
    {
        id: '2',
        pair: 'ETH/USDT',
        leverage: '10x',
        logoText: '♦',
        logoColor: '#627EEA',
        tags: [
            { id: '1', text: 'Short', bg: 'rgba(255,59,48,0.1)', color: '#FF3B30', isUp: false },
            { id: '2', text: 'Limit', bg: 'rgba(255,255,255,0.1)', color: '#8A8AFF' }
        ],
        orderId: '#FT-9837',
        price: '3,512.50',
        qty: '1.200',
        value: '4,215.00',
        progress: 0,
        tpSl: 'TP: 3,200 / SL: 3,650',
        time: 'Today, 08:52 AM',
    },
    {
        id: '3',
        pair: 'SOL/USDT',
        leverage: '15x',
        logoText: 'S',
        logoColor: '#14F195',
        tags: [
            { id: '1', text: 'Long', bg: 'rgba(0,255,100,0.1)', color: '#00FF64', isUp: true },
            { id: '2', text: 'Conditional', bg: 'rgba(150,50,255,0.1)', color: '#B366FF' },
            { id: '3', text: 'Reduce', bg: 'rgba(150,50,255,0.1)', color: '#B366FF' }
        ],
        orderId: '#FT-9831',
        price: '--',
        qty: '--',
        value: '--',
        progress: 0,
        tpSl: 'TP: -- / SL: --',
        time: 'Today, 08:40 AM',
    }
];

const OrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.cardContainer, { borderColor: 'rgba(0,194,255,0.2)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>

            {/* Top Border Glow */}
            <View style={[styles.cardTopBorder, { backgroundColor: colors.cyan }]} />

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold }}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <View style={styles.pairTagRow}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold, marginRight: 8 }}>{order.pair}</Typography>
                            <View style={[styles.leverageBadge, { backgroundColor: 'rgba(0,194,255,0.15)' }]}>
                                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>{order.leverage}</Typography>
                            </View>
                        </View>
                        <View style={styles.tagsRow}>
                            {order.tags.map((tag: any) => (
                                <View key={tag.id} style={[styles.tag, { backgroundColor: tag.bg }]}>
                                    {tag.text === 'Long' && <TrendingUp color={tag.color} size={10} style={{ marginRight: 4 }} />}
                                    {tag.text === 'Short' && <TrendingDown color={tag.color} size={10} style={{ marginRight: 4 }} />}
                                    <Typography size={10} style={{ color: tag.color, fontFamily: fonts.medium }}>{tag.text}</Typography>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={[styles.cancelBtn, { borderColor: 'rgba(255, 59, 48, 0.4)' }]}>
                        <Typography size={12} style={{ color: '#FF3B30', fontFamily: fonts.medium }}>Cancel</Typography>
                    </TouchableOpacity>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                        {order.orderId}
                    </Typography>
                </View>
            </View>

            <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />

            {/* Details Grid */}
            <View style={styles.detailsRow}>
                <View style={styles.detailColLeft}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>PRICE</Typography>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.price}</Typography>
                </View>
                <View style={styles.detailColCenter}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>QTY</Typography>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.qty}</Typography>
                </View>
                <View style={styles.detailColRight}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>VALUE (USDT)</Typography>
                    <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>{order.value}</Typography>
                </View>
            </View>

            {/* Progress Bar Section */}
            <View style={styles.progressSection}>
                <View style={styles.progressLabelRow}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, textTransform: 'uppercase' }}>Fill Progress</Typography>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View style={[styles.progressBarFill, { width: `${order.progress}%`, backgroundColor: '#00FF64' }]} />
                </View>
                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.bold, textAlign: 'right', marginTop: 4 }}>{order.progress}%</Typography>
            </View>

            {/* Footer */}
            <View style={styles.footerRow}>
                <View style={styles.footerLeft}>
                    <Zap color={'#F7931A'} size={12} style={{ marginRight: 4 }} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>{order.tpSl}</Typography>
                </View>
                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>{order.time}</Typography>
            </View>

        </View>
    );
});

export const FuturesHistory = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [activeTypeTab, setActiveTypeTab] = useState('Options Order');
    const [activeTab, setActiveTab] = useState('Open Orders (3)');
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
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Futures</Typography>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.iconBtn} />
                </View>

                {/* Sub-type Tabs */}
                <View style={styles.typeTabsContainer}>
                    <View style={styles.typeTabsInner}>
                        <TouchableOpacity
                            style={[
                                styles.typeTab,
                                activeTypeTab === 'Perpetual Futures Order' ? styles.typeTabActive : {}
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setActiveTypeTab('Perpetual Futures Order')}
                        >
                            <LinearGradient
                                colors={activeTypeTab === 'Perpetual Futures Order' ? ['rgba(0, 255, 255, 0.15)', 'transparent'] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={StyleSheet.absoluteFill}
                            />

                            <Text style={{ fontSize: 12, fontFamily: fonts.semiBold, color: activeTypeTab === 'Perpetual Futures Order' ? colors.white : colors.grey }}>
                                {' '}Perpetual Futures Order
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.typeTab,
                                activeTypeTab === 'Options Order' ? styles.typeTabActive : {}
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setActiveTypeTab('Options Order')}
                        >
                            <LinearGradient
                                colors={activeTypeTab === 'Options Order' ? ['rgba(0, 255, 255, 0.15)', 'transparent'] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={StyleSheet.absoluteFill}
                            />

                            <Text style={{ fontSize: 12, fontFamily: fonts.semiBold, color: activeTypeTab === 'Options Order' ? colors.white : colors.grey }}>
                                {' '}Options Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Scrollable Tabs */}
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
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
                                            fontFamily: isActive ? fonts.bold : fonts.medium
                                        }}
                                    >
                                        {tab}
                                    </Typography>
                                    {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Filters & Summary */}
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

                <View style={[styles.summaryCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                    <View style={styles.summaryLeft}>
                        <TrendingUp color="#00FF64" size={14} style={{ marginRight: 4 }} />
                        <Typography size={12} style={{ color: "#00FF64", fontFamily: fonts.semiBold, marginRight: 16 }}>3 Long</Typography>
                        <TrendingDown color="#FF3B30" size={14} style={{ marginRight: 4 }} />
                        <Typography size={12} style={{ color: "#FF3B30", fontFamily: fonts.semiBold }}>2 Short</Typography>
                    </View>
                    <View style={styles.summaryRight}>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium, marginRight: 4 }}>Total:</Typography>
                        <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.bold }}>$14,181.00</Typography>
                    </View>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={futuresOpenOrders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <OrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    // estimatedItemSize={250}
                    />
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'futures'}
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
    typeTabsContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    typeTabsInner: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 8,
        height: 44,
        width: '80%',
    },
    typeTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    typeTabActive: {
        // backgroundColor handled by LinearGradient
    },
    activeLeftBorder: {
        position: 'absolute',
        left: 0,
        top: '20%',
        bottom: '20%',
        width: 3,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 2,
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
        left: '10%',
        width: '80%',
        height: 2,
        borderRadius: 1,
    },
    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
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
    summaryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 16,
    },
    summaryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryRight: {
        flexDirection: 'row',
        alignItems: 'center',
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
        overflow: 'hidden',
    },
    cardTopBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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
    },
    leverageBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    tagsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        flexWrap: 'wrap',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 4,
    },
    cancelBtn: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 6,
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
        alignItems: 'flex-end',
    },
    progressSection: {
        marginTop: 16,
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
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
