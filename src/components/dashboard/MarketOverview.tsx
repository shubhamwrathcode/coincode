import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { ChevronRight, ChevronsUpDown } from 'lucide-react-native';

const MOCK_DATA = [
    { id: '1', symbol: 'BTCUSDT', name: 'Bitcoin', price: '71,726.6', priceInUsd: '$71,726.6', change24h: 0.68, color: '#F7931A', initial: '₿' },
    { id: '2', symbol: 'ETHUSDT', name: 'Ethereum', price: '2,192.38', priceInUsd: '$2,192.38', change24h: -0.68, color: '#627EEA', initial: 'Ξ' },
    { id: '3', symbol: 'SOLUSDT', name: 'Solana', price: '83.37', priceInUsd: '$83.37', change24h: 0.68, color: '#14F195', initial: 'S' },
    { id: '4', symbol: 'XAUUSDT', name: 'Gold', price: '4,752.50', priceInUsd: '$4,752.50', change24h: 0.68, color: '#FFD700', initial: 'Au' },
    { id: '5', symbol: 'DOGEUSDT', name: 'DogeCoin', price: '0.09239', priceInUsd: '$0.09239', change24h: -0.68, color: '#C2A633', initial: 'Ð' },
    { id: '6', symbol: 'BTCUSDT', name: 'Bitcoin', price: '71,726.6', priceInUsd: '$71,726.6', change24h: 0.68, color: '#F7931A', initial: '₿' },
    { id: '7', symbol: 'ETHUSDT', name: 'Ethereum', price: '2,192.38', priceInUsd: '$2,192.38', change24h: -0.68, color: '#627EEA', initial: 'Ξ' },
    { id: '8', symbol: 'DOGEUSDT', name: 'DogeCoin', price: '0.09239', priceInUsd: '$0.09239', change24h: -0.68, color: '#C2A633', initial: 'Ð' },
];

const TABS = ['All', 'New', 'Stocks', 'Metals', 'Pre-IPOs', 'AI', 'Meme'];

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
    const [activeTab, setActiveTab] = useState('All');

    const renderItem = ({ item }: any) => {
        const isPositive = item.change24h >= 0;
        const changeColor = isPositive ? '#00C076' : '#FF4B4B';

        return (
            <TouchableOpacity style={styles.row}>
                <View style={styles.colLeft}>
                    <View style={[styles.coinIcon, { backgroundColor: item.color }]}>
                        <Typography color={colors.white} size={15} style={{ fontFamily: fonts.bold }}>
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
                    <Typography color={colors.white} size={12} style={{ fontFamily: fonts.medium }}>
                        {item.price}
                    </Typography>
                    <Typography color={colors.darkShadeColorText} size={11} style={{ marginTop: 2 }}>
                        {item.priceInUsd}
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
    const ITEM_HEIGHT = 55
    const dynamicListHeight = MOCK_DATA.length * ITEM_HEIGHT;

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
                    data={MOCK_DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>

            {/* Footer */}
            <TouchableOpacity style={styles.footer}>
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
        // Height is now applied dynamically via inline styles
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
        width: 22,
        height: 22,
        borderRadius: 17,
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
    },
    viewmorestyle: {
        fontFamily: fonts.regular,
        textDecorationLine: 'underline'
    }
});
