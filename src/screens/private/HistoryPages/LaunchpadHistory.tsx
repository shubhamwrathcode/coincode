import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ListFilter, Calendar, ArrowRight, Share2 } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { HistoryTypeSelectorModal } from '../../../components/common/HistoryTypeSelectorModal';

const { width } = Dimensions.get('window');

const launchpadOrdersData = [
    {
        id: '1',
        logoText: 'DF',
        logoColor: '#0052FF',
        name: 'DeFi Protocol X',
        status: 'Upcoming',
        badge: 'DeFi',
        badgeId: 'DFX · LP-001',
        price: '$0.05',
        desc: 'Next-gen decentralized lending protocol with cross-chain collateral.',
        supply: '1.0B',
        participants: '—',
        raised: '$0',
        goal: '$2.82M',
        progress: 0,
        dateRange: '2026-04-01 ➔ 2026-04-07',
    },
    {
        id: '2',
        logoText: 'ME',
        logoColor: '#8B5CF6',
        name: 'MetaFi Chain Network',
        status: 'Live',
        badge: 'METs',
        badgeId: 'METs · LP-002',
        price: '$0.08',
        desc: 'Multi-chain metaverse infrastructure with native token staking.',
        supply: '800M',
        participants: '12,480',
        raised: '$1.55M',
        goal: '$1.60M',
        progress: 97,
        dateRange: '2026-04-01 ➔ 2026-04-07',
    }
];

const LaunchpadOrderCard = memo(({ order }: { order: any }) => {
    const { colors } = useTheme();

    const isUpcoming = order.status === 'Upcoming';
    const statusColor = isUpcoming ? colors.cyan : '#00FF64';

    return (
        <View style={[styles.cardContainer, { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>

            {/* Header Row */}
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.logoCircle, { borderColor: order.logoColor }]}>
                        <Typography size={18} style={{ color: order.logoColor, fontFamily: fonts.semiBold }}>{order.logoText}</Typography>
                    </View>
                    <View>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            {order.name}
                        </Typography>
                        <View style={styles.badgeRow}>
                            <View style={[styles.badge, { backgroundColor: isUpcoming ? 'rgba(0,194,255,0.15)' : 'rgba(139,92,246,0.15)' }]}>
                                <Typography size={10} style={{ color: isUpcoming ? colors.cyan : '#C4B5FD', fontFamily: fonts.semiBold }}>{order.badge}</Typography>
                            </View>
                            <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 8 }}>
                                {order.badgeId}
                            </Typography>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={[styles.statusTag, { borderColor: isUpcoming ? 'rgba(0,194,255,0.3)' : 'rgba(0,255,100,0.3)', backgroundColor: isUpcoming ? 'transparent' : 'rgba(0,255,100,0.1)' }]}>
                        {!isUpcoming && <View style={[styles.statusDot, { backgroundColor: '#00FF64' }]} />}
                        <Typography size={11} style={{ color: statusColor, fontFamily: fonts.medium }}>{order.status}</Typography>
                    </View>
                    <Typography size={16} style={{ color: colors.cyan, fontFamily: fonts.semiBold, marginTop: 6 }}>
                        {order.price}
                    </Typography>
                </View>
            </View>

            {/* Description */}
            <Typography size={13} style={{ color: '#A0AEC0', fontFamily: fonts.regular, marginVertical: 12, lineHeight: 20 }}>
                {order.desc}
            </Typography>

            {/* Stats Grid */}
            <View style={styles.statsRow}>
                <View style={[styles.statBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 6 }}>Price</Typography>
                    <Typography size={16} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>{order.price}</Typography>
                </View>
                <View style={[styles.statBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 6 }}>Supply</Typography>
                    <Typography size={16} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.supply}</Typography>
                </View>
                <View style={[styles.statBox, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }]}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 6 }}>Participants</Typography>
                    <Typography size={16} numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.white, fontFamily: fonts.semiBold }}>{order.participants}</Typography>
                </View>
            </View>

            {/* Progress Bar Section */}
            <View style={styles.progressSection}>
                <View style={styles.progressTextRow}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>{order.raised} raised</Typography>
                    <Typography size={11} style={{ color: isUpcoming ? colors.grey : '#00FF64', fontFamily: fonts.semiBold }}>{order.progress}%</Typography>
                </View>
                <View style={[styles.progressBarTrack, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View style={[styles.progressBarFill, { width: `${order.progress}%`, backgroundColor: '#00FF64' }]} />
                </View>
                <View style={styles.progressTextRow}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>Goal</Typography>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>{order.goal}</Typography>
                </View>
            </View>

            {/* Footer Row */}
            <View style={styles.footerRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Calendar color={colors.grey} size={14} style={{ marginRight: 6 }} />
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>{order.dateRange}</Typography>
                </View>
                <TouchableOpacity style={[
                    styles.actionBtn,
                    {
                        backgroundColor: isUpcoming ? 'transparent' : colors.cyan,
                        borderColor: colors.cyan,
                        borderWidth: isUpcoming ? 1 : 0
                    }
                ]}>
                    <Typography size={13} style={{ color: isUpcoming ? colors.cyan : colors.black, fontFamily: fonts.semiBold }}>
                        {isUpcoming ? 'Notify Me' : 'Join Now'}
                    </Typography>
                </TouchableOpacity>
            </View>

        </View>
    );
});

export const LaunchpadHistory = () => {
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
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Launchpad</Typography>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        <Share2 color={colors.white} size={20} />
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
                            <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>All Type</Typography>
                            <ChevronDown color={colors.grey} size={12} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.filterIconBtn}>
                        <ListFilter color={colors.white} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Results Count Row */}
                <View style={styles.resultsRow}>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Showing {launchpadOrdersData.length} of {launchpadOrdersData.length} projects</Typography>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Page 1</Typography>
                </View>

                {/* List */}
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={launchpadOrdersData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <LaunchpadOrderCard order={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </SafeAreaView>

            <HistoryTypeSelectorModal
                visible={isDropdownVisible}
                onClose={() => setIsDropdownVisible(false)}
                onSelect={handleSelectType}
                currentType={'launchpad'}
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
        paddingBottom: 10,
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
    logoCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
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
        paddingVertical: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    statBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 4,
    },
    progressSection: {
        marginBottom: 14,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    progressBarTrack: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
});
