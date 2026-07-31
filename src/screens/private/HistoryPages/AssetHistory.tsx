import React, { memo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter, CheckCircle2, Clock, Copy, ExternalLink, Wallet, ArrowRight, ArrowRightLeft, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../theme/colors';

const { width } = Dimensions.get('window');

const TabItem = ({ tab, isActive, onPress, colors }: any) => {
    const animValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: isActive ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isActive]);

    const textColor = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.grey, colors.white],
    });

    const indicatorOpacity = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const indicatorScaleX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.tabBtn}>
            <Animated.Text style={{ fontFamily: isActive ? fonts.semiBold : fonts.medium, color: textColor, fontSize: 14 }}>
                {tab}
            </Animated.Text>
            <Animated.View
                style={[
                    styles.activeIndicator,
                    {
                        backgroundColor: colors.cyan,
                        opacity: indicatorOpacity,
                        transform: [{ scaleX: indicatorScaleX }]
                    }
                ]}
            />
        </TouchableOpacity>
    );
};

const assetHistoryData = [
    {
        id: '1',
        logoText: '₿',
        logoColor: '#F7931A',
        title: 'Bitcoin',
        badge: 'Crypto',
        info: '2026-04-20 · 14:22:10 · DP-001',
        status: 'Completed',
        statusColor: colors.green,
        amount: '0.125000',
        currency: 'BTC',
        destination: 'Spot Wallet',
        depositWallet: '0x742d...8c3a',
        txId: '8f7e...2b9c',
        confirmations: '6/6',
        confirmationsColor: colors.green,
    },
    {
        id: '2',
        logoText: '♦',
        logoColor: '#627EEA',
        title: 'Ethereum',
        badge: 'Crypto',
        info: '2026-04-20 · 14:22:10 · DP-002',
        status: 'Pending',
        statusColor: '#F59E0B',
        amount: '0.125000',
        currency: 'ETH',
        destination: 'Futures Wallet',
        depositWallet: '0x9a1b...4f2e',
        txId: '3d2a...5e8f',
        confirmations: '12/12',
        confirmationsColor: '#F59E0B',
    }
];

const transferHistoryData = [
    {
        id: '1',
        logoText: '♦',
        logoColor: '#627EEA',
        title: 'Ethereum',
        currency: 'ETH',
        info: '2026-04-20 · 14:22:10 · TR-002',
        status: 'Completed',
        statusColor: colors.green,
        amount: '0.125000',
        from: 'Futures',
        to: 'Spot',
    },
    {
        id: '2',
        logoText: '♦',
        logoColor: '#627EEA',
        title: 'Ethereum',
        currency: 'ETH',
        info: '2026-04-20 · 14:22:10 · TR-004',
        status: 'Completed',
        statusColor: colors.green,
        amount: '0.125000',
        from: 'Futures',
        to: 'Spot',
    }
];

const referralHistoryData = [
    {
        id: '1',
        logoText: '₿',
        logoColor: '#F7931A',
        title: 'BTC → USDT',
        info: '2026-04-20 · 14:22:10',
        reference: 'CV-1001',
        status: 'Completed',
        statusColor: colors.green,
        spendAmount: '0.0543',
        spendCurrency: 'BTC',
        receiveAmount: '3,245.80',
        receiveCurrency: 'USDT',
        conversionRate: '1 BTC = 59,756.21 USDT'
    },
    {
        id: '2',
        logoText: '♦',
        logoColor: '#627EEA',
        title: 'ETH → USDT',
        info: '2026-04-20 · 13:10:45',
        reference: 'CV-1002',
        status: 'Completed',
        statusColor: colors.green,
        spendAmount: '1.200',
        spendCurrency: 'ETH',
        receiveAmount: '4,182.60',
        receiveCurrency: 'USDT',
        conversionRate: '1 ETH = 3,485.50 USDT'
    },
    {
        id: '3',
        logoText: '₿',
        logoColor: '#F7931A',
        title: 'BTC → ETH',
        info: '2026-04-20 · 11:55:30',
        reference: 'CV-1003',
        status: 'Completed',
        statusColor: colors.green,
        spendAmount: '0.1000',
        spendCurrency: 'BTC',
        receiveAmount: '1.712',
        receiveCurrency: 'ETH',
        conversionRate: '1 BTC = 17.12 ETH'
    }
];

const AssetHistoryCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();
    const isCompleted = order.status === 'Completed';

    return (
        <View style={[styles.cardContainer, styles.extractedStyle79]}>

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        <Typography size={18} style={styles.extractedStyle1}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <View style={styles.titleBadgeRow}>
                            <Typography size={18} style={styles.extractedStyle2}>{order.title}</Typography>
                            <View style={[styles.badge, styles.extractedStyle81]}>
                                <Typography size={10} style={styles.extractedStyle3}>{order.badge}</Typography>
                            </View>
                        </View>
                        <Typography size={11} style={styles.extractedStyle4}>
                            {order.info}
                        </Typography>
                    </View>
                </View>
                <View style={styles.extractedStyle5}>
                    <View style={[styles.statusTag, { borderColor: isCompleted ? 'rgba(0,255,100,0.3)' : 'rgba(245,158,11,0.3)', backgroundColor: isCompleted ? 'rgba(0,255,100,0.1)' : 'rgba(245,158,11,0.1)' }]}>
                        {isCompleted ? (
                            <CheckCircle2 color={order.statusColor} size={12} style={styles.extractedStyle6} />
                        ) : (
                            <Clock color={order.statusColor} size={12} style={styles.extractedStyle7} />
                        )}
                        <Typography size={11} style={{ color: order.statusColor, fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                </View>
            </View>

            {/* Grid Row */}
            <View style={styles.gridRow}>
                <View style={[styles.gridBox, styles.extractedStyle82]}>
                    <Typography size={11} style={styles.extractedStyle9}>Amount</Typography>
                    <Typography size={18} numberOfLines={1} adjustsFontSizeToFit style={styles.extractedStyle10}>{order.amount}</Typography>
                    <Typography size={11} style={styles.extractedStyle11}>{order.currency}</Typography>
                </View>
                <View style={[styles.gridBox, styles.extractedStyle83]}>
                    <Typography size={11} style={styles.extractedStyle12}>Destination</Typography>
                    <View style={styles.extractedStyle13}>
                        <View style={[styles.destinationBadge, styles.extractedStyle84]}>
                            <Typography size={13} style={styles.extractedStyle14}>{order.destination}</Typography>
                        </View>
                    </View>
                </View>
            </View>

            {/* Wallet Row */}
            <View style={[styles.infoRow, styles.extractedStyle85]}>
                <View style={styles.infoLeft}>
                    <View style={[styles.iconBox, styles.extractedStyle86]}>
                        <Wallet color={colors.cyan} size={12} />
                    </View>
                    <View>
                        <Typography size={10} style={styles.extractedStyle15}>Deposit Wallet</Typography>
                        <Typography size={12} style={styles.extractedStyle16}>{order.depositWallet}</Typography>
                    </View>
                </View>
                <TouchableOpacity style={styles.copyBtn}>
                    <Copy color={colors.grey} size={16} />
                </TouchableOpacity>
            </View>

            {/* TxID Row */}
            <View style={[styles.infoRow, styles.extractedStyle87]}>
                <View style={styles.infoLeft}>
                    <View style={[styles.iconBox, styles.extractedStyle88]}>
                        <ExternalLink color={colors.cyan} size={12} />
                    </View>
                    <View>
                        <Typography size={10} style={styles.extractedStyle17}>TxID</Typography>
                        <Typography size={12} style={styles.extractedStyle18}>{order.txId}</Typography>
                    </View>
                </View>
                <View style={[styles.confirmationsTag, { backgroundColor: isCompleted ? 'rgba(0,255,100,0.1)' : 'rgba(245,158,11,0.1)' }]}>
                    <View style={[styles.dot, { backgroundColor: order.confirmationsColor }]} />
                    <Typography size={12} style={{ color: order.confirmationsColor, fontFamily: fonts.semiBold }}>{order.confirmations}</Typography>
                </View>
            </View>

        </View>
    );
});

const TransferCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();
    const isCompleted = order.status === 'Completed';

    return (
        <View style={[styles.cardContainer, styles.extractedStyle90]}>

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        {/* <FastImage source={ImageAssets.ethIcon} style={styles.extractedStyle20} resizeMode='contain' /> */}
                    </View>
                    <View>
                        <View style={styles.titleBadgeRow}>
                            <Typography size={18} style={styles.extractedStyle21}>{order.title}</Typography>
                            <Typography size={10} style={styles.extractedStyle22}>({order.currency})</Typography>
                        </View>
                        <Typography size={11} style={styles.extractedStyle23}>
                            {order.info}
                        </Typography>
                    </View>
                </View>
                <View style={styles.extractedStyle24}>
                    <View style={[styles.statusTag, { borderColor: isCompleted ? 'rgba(0,255,100,0.3)' : 'rgba(245,158,11,0.3)', backgroundColor: isCompleted ? 'rgba(0,255,100,0.1)' : 'rgba(245,158,11,0.1)' }]}>
                        {isCompleted ? (
                            <CheckCircle2 color={order.statusColor} size={12} style={styles.extractedStyle25} />
                        ) : (
                            <Clock color={order.statusColor} size={12} style={styles.extractedStyle26} />
                        )}
                        <Typography size={11} style={{ color: order.statusColor, fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                </View>
            </View>

            {/* Center Block */}
            <LinearGradient
                colors={['rgba(0,194,255,0.08)', 'rgba(0,0,0,0.2)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.extractedStyle28}
            >
                <Typography size={25} style={styles.extractedStyle29}>{order.amount}</Typography>
                <Typography size={16} style={styles.extractedStyle30}>{order.currency}</Typography>
            </LinearGradient>

            {/* Bottom Row */}
            <View style={styles.extractedStyle31}>
                <View style={styles.extractedStyle32}>
                    <Typography size={10} style={styles.extractedStyle33}>From</Typography>
                    <Typography size={14} style={styles.extractedStyle34}>{order.from}</Typography>
                    <Typography size={10} style={styles.extractedStyle35}>Wallet</Typography>
                </View>

                <View style={styles.extractedStyle36}>
                    <ArrowRight color={colors.black} size={16} />
                </View>

                <View style={styles.extractedStyle37}>
                    <Typography size={10} style={styles.extractedStyle38}>To</Typography>
                    <Typography size={14} style={styles.extractedStyle39}>{order.to}</Typography>
                    <Typography size={10} style={styles.extractedStyle40}>Wallet</Typography>
                </View>
            </View>
        </View>
    );
});

const ReferralCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();
    const isCompleted = order.status === 'Completed';

    return (
        <View style={[styles.cardContainer, styles.extractedStyle92]}>
            {/* Header Row */}
            <View style={[styles.cardHeaderRow, styles.extractedStyle93]}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.coinLogo, { backgroundColor: order.logoColor }]}>
                        <Typography size={18} style={styles.extractedStyle41}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <Typography size={16} style={styles.extractedStyle42}>{order.title}</Typography>
                        <Typography size={11} style={styles.extractedStyle43}>
                            {order.info}
                        </Typography>
                    </View>
                </View>
                <View style={styles.extractedStyle44}>
                    <View style={[styles.statusTag, { borderColor: isCompleted ? 'rgba(0,255,100,0.3)' : 'rgba(245,158,11,0.3)', backgroundColor: isCompleted ? 'rgba(0,255,100,0.1)' : 'rgba(245,158,11,0.1)', marginBottom: 6 }]}>
                        {isCompleted ? (
                            <CheckCircle2 color={order.statusColor} size={12} style={styles.extractedStyle45} />
                        ) : (
                            <Clock color={order.statusColor} size={12} style={styles.extractedStyle46} />
                        )}
                        <Typography size={11} style={{ color: order.statusColor, fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                    <Typography size={10} style={styles.extractedStyle48}>{order.reference}</Typography>
                </View>
            </View>

            {/* Spend/Receive Blocks */}
            <View style={styles.extractedStyle49}>
                <View style={styles.extractedStyle50}>
                    <Typography size={10} style={styles.extractedStyle51}>Spend</Typography>
                    <View style={styles.extractedStyle52}>
                        <Typography size={16} style={styles.extractedStyle53}>{order.spendAmount}</Typography>
                        <Typography size={12} style={styles.extractedStyle54}>{order.spendCurrency}</Typography>
                    </View>
                </View>

                <View style={styles.extractedStyle55}>
                    <ArrowRight color={colors.cyan} size={16} />
                </View>

                <View style={styles.extractedStyle56}>
                    <Typography size={10} style={styles.extractedStyle57}>Receive</Typography>
                    <View style={styles.extractedStyle58}>
                        <Typography size={16} style={styles.extractedStyle59}>{order.receiveAmount}</Typography>
                        <Typography size={12} style={styles.extractedStyle60}>{order.receiveCurrency}</Typography>
                    </View>
                </View>
            </View>

            {/* Conversion Rate */}
            <View style={styles.extractedStyle61}>
                <View style={styles.extractedStyle62}>
                    <TrendingUp color={colors.grey} size={14} style={styles.extractedStyle63} />
                    <Typography size={12} style={styles.extractedStyle64}>Conversion Rate</Typography>
                </View>
                <Typography size={12} style={styles.extractedStyle65}>{order.conversionRate}</Typography>
            </View>
        </View>
    );
});

const DepositList = memo(() => {
    return (
        <FlashList
            data={assetHistoryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AssetHistoryCard order={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
});

const WithdrawList = memo(() => {
    return (
        <FlashList
            data={assetHistoryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AssetHistoryCard order={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
});

const TransferList = memo(() => {
    return (
        <FlashList
            data={transferHistoryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransferCard order={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <View style={styles.extractedStyle66}>
                    <Typography size={12} style={styles.extractedStyle67}>Showing 4 of 8 results</Typography>
                    <Typography size={12} style={styles.extractedStyle68}>Page 1</Typography>
                </View>
            )}
        />
    );
});

const ReferralList = memo(() => {
    return (
        <FlashList
            data={referralHistoryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReferralCard order={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
});

export const AssetHistory = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Deposit');

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

    const tabs = ['Deposit', 'Withdraw', 'Transfer', 'Referral'];

    return (
        <View style={[styles.container, styles.extractedStyle95]}>
            <SafeAreaView edges={['top']} style={styles.extractedStyle69}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <FastImage source={ImageAssets.backButtonImg} style={styles.extractedStyle70} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headerTitleRow} onPress={() => setIsDropdownVisible(true)}>
                        <View style={styles.extractedStyle71}>
                            <View style={styles.extractedStyle72}>
                                <Typography size={18} style={styles.extractedStyle73}>My Trades</Typography>
                                <ChevronDown color={colors.white} size={16} />
                            </View>
                            <Typography size={12} style={styles.extractedStyle74}>Asset History</Typography>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        {/* Empty view for alignment or share icon */}
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabsRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
                        {tabs.map((tab) => (
                            <TabItem
                                key={tab}
                                tab={tab}
                                isActive={activeTab === tab}
                                onPress={() => setActiveTab(tab)}
                                colors={colors}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Filters */}
                <View style={styles.filtersRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterPillsRow} contentContainerStyle={{ paddingRight: 16 }}>
                        <TouchableOpacity style={[styles.filterPill, styles.extractedStyle96]}>
                            <Typography size={11} style={styles.extractedStyle75}>All Pairs</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>

                        {activeTab === 'Transfer' && (
                            <TouchableOpacity style={[styles.filterPill, styles.extractedStyle97]}>
                                <ArrowRightLeft color={colors.white} size={16} />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={[styles.filterPill, styles.extractedStyle98]}>
                            <Typography size={11} style={styles.extractedStyle76}>All Type</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterPill, styles.extractedStyle99]}>
                            <Typography size={11} style={styles.extractedStyle77}>01 May 2024 - 31 May 2024</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.filterIconContainer}>
                        <TouchableOpacity style={styles.filterIconBtn}>
                            <ListFilter color={colors.white} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List */}
                <View style={styles.extractedStyle78}>
                    {activeTab === 'Deposit' && <DepositList />}
                    {activeTab === 'Withdraw' && <WithdrawList />}
                    {activeTab === 'Transfer' && <TransferList />}
                    {activeTab === 'Referral' && <ReferralList />}
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'asset'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    extractedStyle1: {
        color: colors.white, fontFamily: fonts.semiBold
    },
    extractedStyle2: {
        color: colors.white, fontFamily: fonts.semiBold, marginRight: 8
    },
    extractedStyle3: {
        color: colors.cyan, fontFamily: fonts.medium
    },
    extractedStyle4: {
        color: colors.grey, fontFamily: fonts.regular, marginTop: 4
    },
    extractedStyle5: {
        alignItems: 'flex-end', justifyContent: 'center'
    },
    extractedStyle6: {
        marginRight: 4
    },
    extractedStyle7: {
        marginRight: 4
    },
    extractedStyle9: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 4
    },
    extractedStyle10: {
        color: colors.cyan, fontFamily: fonts.semiBold
    },
    extractedStyle11: {
        color: colors.grey, fontFamily: fonts.regular, marginTop: 4
    },
    extractedStyle12: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 6
    },
    extractedStyle13: {
        alignItems: 'flex-start'
    },
    extractedStyle14: {
        color: colors.cyan, fontFamily: fonts.medium
    },
    extractedStyle15: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 0
    },
    extractedStyle16: {
        color: colors.white, fontFamily: fonts.regular
    },
    extractedStyle17: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 0
    },
    extractedStyle18: {
        color: colors.white, fontFamily: fonts.regular
    },
    extractedStyle20: {
        width: 20, height: 20, tintColor: colors.white
    },
    extractedStyle21: {
        color: colors.white, fontFamily: fonts.semiBold, marginRight: 8
    },
    extractedStyle22: {
        color: colors.grey, fontFamily: fonts.medium
    },
    extractedStyle23: {
        color: colors.grey, fontFamily: fonts.regular, marginTop: 4
    },
    extractedStyle24: {
        alignItems: 'flex-end', justifyContent: 'center'
    },
    extractedStyle25: {
        marginRight: 4
    },
    extractedStyle26: {
        marginRight: 4
    },
    extractedStyle28: {
        borderWidth: 1,
                    borderColor: 'rgba(0,194,255,0.2)',
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 16,
                    flexDirection: 'row'
    },
    extractedStyle29: {
        color: colors.white, fontFamily: fonts.bold, marginRight: 8
    },
    extractedStyle30: {
        color: colors.cyan, fontFamily: fonts.semiBold, marginTop: 8
    },
    extractedStyle31: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    extractedStyle32: {
        flex: 1, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 12
    },
    extractedStyle33: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 4
    },
    extractedStyle34: {
        color: colors.white, fontFamily: fonts.semiBold, marginBottom: 2
    },
    extractedStyle35: {
        color: colors.grey, fontFamily: fonts.regular
    },
    extractedStyle36: {
        width: 32, height: 32, borderRadius: 16, backgroundColor: colors.cyan, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8
    },
    extractedStyle37: {
        flex: 1, borderWidth: 1, borderColor: 'rgba(0,194,255,0.3)', backgroundColor: 'rgba(0,194,255,0.05)', borderRadius: 10, padding: 12
    },
    extractedStyle38: {
        color: colors.cyan, fontFamily: fonts.regular, marginBottom: 4
    },
    extractedStyle39: {
        color: colors.cyan, fontFamily: fonts.semiBold, marginBottom: 2
    },
    extractedStyle40: {
        color: colors.cyan, fontFamily: fonts.regular
    },
    extractedStyle41: {
        color: colors.white, fontFamily: fonts.semiBold
    },
    extractedStyle42: {
        color: colors.white, fontFamily: fonts.semiBold
    },
    extractedStyle43: {
        color: colors.grey, fontFamily: fonts.regular, marginTop: 4
    },
    extractedStyle44: {
        alignItems: 'flex-end', justifyContent: 'center'
    },
    extractedStyle45: {
        marginRight: 4
    },
    extractedStyle46: {
        marginRight: 4
    },
    extractedStyle48: {
        color: colors.grey, fontFamily: fonts.regular
    },
    extractedStyle49: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10
    },
    extractedStyle50: {
        flex: 1, borderWidth: 1, borderColor: 'rgba(255,50,50,0.2)', backgroundColor: 'rgba(255,50,50,0.05)', borderRadius: 10, padding: 10
    },
    extractedStyle51: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 6
    },
    extractedStyle52: {
        flexDirection: 'row', alignItems: 'center'
    },
    extractedStyle53: {
        color: colors.red, fontFamily: fonts.semiBold, marginRight: 4
    },
    extractedStyle54: {
        color: colors.red, fontFamily: fonts.semiBold
    },
    extractedStyle55: {
        width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,194,255,0.1)', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8
    },
    extractedStyle56: {
        flex: 1, borderWidth: 1, borderColor: 'rgba(0,255,100,0.2)', backgroundColor: 'rgba(0,255,100,0.05)', borderRadius: 10, padding: 10
    },
    extractedStyle57: {
        color: colors.grey, fontFamily: fonts.regular, marginBottom: 6
    },
    extractedStyle58: {
        flexDirection: 'row', alignItems: 'center'
    },
    extractedStyle59: {
        color: colors.green, fontFamily: fonts.semiBold, marginRight: 4
    },
    extractedStyle60: {
        color: colors.green, fontFamily: fonts.semiBold
    },
    extractedStyle61: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8
    },
    extractedStyle62: {
        flexDirection: 'row', alignItems: 'center'
    },
    extractedStyle63: {
        marginRight: 6
    },
    extractedStyle64: {
        color: colors.grey, fontFamily: fonts.regular
    },
    extractedStyle65: {
        color: colors.cyan, fontFamily: fonts.semiBold
    },
    extractedStyle66: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12
    },
    extractedStyle67: {
        color: '#A0AEC0', fontFamily: fonts.regular
    },
    extractedStyle68: {
        color: '#A0AEC0', fontFamily: fonts.regular
    },
    extractedStyle69: {
        flex: 1
    },
    extractedStyle70: {
        width: 35, height: 35
    },
    extractedStyle71: {
        alignItems: 'center'
    },
    extractedStyle72: {
        flexDirection: 'row', alignItems: 'center'
    },
    extractedStyle73: {
        color: colors.white, fontFamily: fonts.semiBold, marginRight: 4
    },
    extractedStyle74: {
        color: colors.grey, fontFamily: fonts.regular, marginTop: 2
    },
    extractedStyle75: {
        color: colors.white, fontFamily: fonts.medium, marginRight: 4
    },
    extractedStyle76: {
        color: colors.white, fontFamily: fonts.medium, marginRight: 4
    },
    extractedStyle77: {
        color: colors.white, fontFamily: fonts.medium, marginRight: 4
    },
    extractedStyle78: {
        flex: 1
    },
    extractedStyle79: {
        borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)'
    },
    extractedStyle81: {
        backgroundColor: 'rgba(0,194,255,0.15)', borderColor: 'rgba(0,194,255,0.3)'
    },
    extractedStyle82: {
        backgroundColor: 'rgba(0,194,255,0.05)', borderColor: 'rgba(0,194,255,0.15)', flex: 1.2
    },
    extractedStyle83: {
        backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', flex: 1
    },
    extractedStyle84: {
        borderColor: colors.cyan
    },
    extractedStyle85: {
        backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', marginBottom: 6
    },
    extractedStyle86: {
        backgroundColor: 'rgba(0,194,255,0.1)'
    },
    extractedStyle87: {
        backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)'
    },
    extractedStyle88: {
        backgroundColor: 'rgba(0,194,255,0.1)'
    },
    extractedStyle90: {
        borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', padding: 12, marginBottom: 12, overflow: 'hidden'
    },
    extractedStyle92: {
        borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', padding: 10, marginBottom: 10, overflow: 'hidden'
    },
    extractedStyle93: {
        marginBottom: 10
    },
    extractedStyle95: {
        backgroundColor: colors.black
    },
    extractedStyle96: {
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    extractedStyle97: {
        backgroundColor: 'transparent', paddingHorizontal: 4, marginRight: 8
    },
    extractedStyle98: {
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    extractedStyle99: {
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
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
    tabsRow: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    tabsContent: {
        paddingHorizontal: 16,
    },
    tabBtn: {
        marginRight: 24,
        paddingBottom: 12,
        alignItems: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        width: 24,
        height: 3,
        borderRadius: 10
        // borderTopLeftRadius: 3,
        // borderTopRightRadius: 3,
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
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
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
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusTag: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
        marginBottom: 10,
    },
    gridBox: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        marginHorizontal: 4,
    },
    destinationBadge: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    copyBtn: {
        padding: 4,
    },
    confirmationsTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
});
