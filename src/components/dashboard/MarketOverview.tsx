import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { ChevronRight, ChevronsUpDown } from 'lucide-react-native';
import { useMarketStore, MarketCoin } from '../../store/marketStore';

const TABS = ['All', 'New', 'Stocks', 'Metals', 'Pre-IPOs', 'AI', 'Meme'];

const formatNumber = (val: number, decimals: number) => {
    if (decimals > 4) {
        return val.toFixed(decimals);
    }
    return val.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

const TabItem = ({ tab, isActive, onPress, colors }: any) => {
    const animatedBgStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(isActive ? colors.cyan : 'transparent', { duration: 250 }),
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(isActive ? colors.white : colors.darkShadeColorText, { duration: 250 }),
        };
    });

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Animated.View style={[styles.tabItem, animatedBgStyle]}>
                <Animated.Text style={[
                    animatedTextStyle,
                    { fontSize: 11.95, fontFamily: fonts.medium }
                ]}>
                    {tab}
                </Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export const MarketOverview = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState('All');
    const coins = useMarketStore((state) => state.coins);
    const setSelectedPair = useMarketStore((state) => state.setSelectedPair);
    const setSelectedCoin = useMarketStore((state) => state.setSelectedCoin);

    const handleCoinPress = (item: MarketCoin) => {
        const pairName = item.pair.includes('/') ? item.pair : `${item.pair}/USDT`;
        setSelectedPair(pairName);
        setSelectedCoin(item);
        navigation.navigate('Trade');
    };

    const filteredData = activeTab === 'All'
        ? coins.filter(item => item.category.includes('All'))
        : coins.filter(item => item.category.includes(activeTab));

    const renderItem = ({ item }: { item: MarketCoin }) => {
        const isPositive = item.change24h >= 0;
        const changeColor = isPositive ? '#00C076' : '#FF4B4B';
        const formattedPrice = formatNumber(item.currentPrice, item.decimals);
        const formattedUsdPrice = `$${formattedPrice}`;

        return (
            <TouchableOpacity
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => handleCoinPress(item)}
            >
                <View style={styles.colLeft}>
                    <View style={[styles.coinIcon, { backgroundColor: item.color }]}>
                        <Typography color={colors.white} size={13} style={{ fontFamily: fonts.bold }}>
                            {item.initial}
                        </Typography>
                    </View>
                    <View>
                        <Typography color={colors.white} size={12} style={{ fontFamily: fonts.bold }}>
                            {item.symbol}
                        </Typography>
                        <Typography color={colors.darkShadeColorText} size={11} style={{ marginTop: 2 }}>
                            {item.name}
                        </Typography>
                    </View>
                </View>

                <View style={styles.colCenter}>
                    <Typography color={colors.white} size={12} style={{ fontFamily: fonts.semiBold }}>
                        {formattedPrice}
                    </Typography>
                    <Typography color={colors.darkShadeColorText} size={11} style={{ marginTop: 2 }}>
                        {formattedUsdPrice}
                    </Typography>
                </View>

                <View style={styles.colRight}>
                    <View style={[styles.changeBadge, { backgroundColor: changeColor }]}>
                        <Typography color={colors.white} size={12} style={{ fontFamily: fonts.medium }}>
                            {isPositive ? '+' : ''}{item.change24h.toFixed(2)}%
                        </Typography>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const ITEM_HEIGHT = 55;
    const dynamicListHeight = Math.max(filteredData.length * ITEM_HEIGHT, ITEM_HEIGHT * 3);

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                    {TABS.map((tab) => (
                        <TabItem
                            key={tab}
                            tab={tab}
                            isActive={activeTab === tab}
                            onPress={() => setActiveTab(tab)}
                            colors={colors}
                        />
                    ))}
                </ScrollView>
                <View style={styles.tabArrow}>
                    <ChevronRight color={colors.darkShadeColorText} size={16} />
                </View>
            </View>

            {/* Header */}
            <View style={styles.headerRow}>
                <Typography color={colors.darkShadeColorText} size={10} style={[styles.colLeftHeader, { fontFamily: fonts.regular }]}>
                    Symbol
                </Typography>
                <Typography color={colors.darkShadeColorText} size={10} style={[styles.colCenterHeader, { fontFamily: fonts.regular }]}>
                    Last Price
                </Typography>
                <View style={styles.colRightHeaderWrapper}>
                    <Typography color={colors.darkShadeColorText} size={10} style={{ fontFamily: fonts.regular, marginRight: 4 }}>
                        24H Change
                    </Typography>
                    <ChevronsUpDown color={colors.darkShadeColorText} size={12} />
                </View>
            </View>

            {/* FlashList */}
            <View style={[styles.listContainer, { height: dynamicListHeight }]}>
                <FlashList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={coins}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>

            {/* Footer */}
            <TouchableOpacity
                style={styles.footer}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Market', { initialTab: 'Spot' })}
            >
                <Typography color={colors.cyan} size={13} style={styles.viewmorestyle}>
                    View More {'>'}
                </Typography>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F1012',
        borderRadius: 20,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        paddingTop: 16,
        paddingBottom: 16,
    },
    tabsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        marginBottom: 10,
    },
    tabsScroll: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    tabItem: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    tabArrow: {
        paddingLeft: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    colLeftHeader: {
        width: '40%',
    },
    colCenterHeader: {
        width: '30%',
        textAlign: 'left',
    },
    colRightHeaderWrapper: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    listContainer: {
        // Dynamic height calculated per category item count
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },
    colLeft: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinIcon: {
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    colCenter: {
        width: '30%',
        alignItems: 'flex-start',
    },
    colRight: {
        width: '30%',
        alignItems: 'flex-end',
    },
    changeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        minWidth: 70,
        alignItems: 'center',
    },
    footer: {
        alignItems: 'center',
        marginTop: 6,
    },
    viewmorestyle: {
        fontFamily: fonts.regular,
        textDecorationLine: 'underline'
    }
});
