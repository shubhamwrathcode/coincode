import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Search, Star, X } from 'lucide-react-native';
import { useMarketStore, MarketCoin } from '../../../../store/marketStore';

interface MarketPairsSheetProps {
    sheetRef: any;
    onSelect?: (pair: string) => void;
}

const TABS = ['Favorites', 'Spot', 'Margin', 'ETF', 'Futures'];

const formatNumber = (val: number, decimals: number) => {
  if (decimals > 4) {
    return val.toFixed(decimals);
  }
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const MarketPairsSheet = ({ sheetRef, onSelect }: MarketPairsSheetProps) => {
    const { colors: themeColors } = useTheme();
    const [activeTab, setActiveTab] = useState('Spot');
    const [search, setSearch] = useState('');
    
    const coins = useMarketStore((state) => state.coins);
    const toggleFav = useMarketStore((state) => state.toggleFav);
    const setSelectedPair = useMarketStore((state) => state.setSelectedPair);
    const setSelectedCoin = useMarketStore((state) => state.setSelectedCoin);

    const filteredCoins = coins.filter((item) => {
        const q = search.trim().toLowerCase();
        const matchesSearch = !q ||
            item.name.toLowerCase().includes(q) ||
            item.pair.toLowerCase().includes(q) ||
            item.symbol.toLowerCase().includes(q);

        if (!matchesSearch) return false;

        if (q) return true;

        if (activeTab === 'Favorites') {
            return !!item.isFav;
        }

        return true;
    });

    const handleSelectCoin = (item: MarketCoin) => {
        const pairName = item.pair.includes('/') ? item.pair : `${item.pair}/USDT`;
        setSelectedPair(pairName);
        setSelectedCoin(item);
        onSelect?.(item.pair);
        sheetRef.current?.close();
    };

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={700}
            showCloseIcon={false}
        >
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search color={themeColors.grey} size={18} />
                    <TextInput 
                        style={[styles.searchInput, { color: themeColors.white }]}
                        placeholder="Search for market"
                        placeholderTextColor={themeColors.grey}
                        value={search}
                        onChangeText={setSearch}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <X color={themeColors.grey} size={16} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer} contentContainerStyle={{ paddingBottom: 10 }}>
                    {TABS.map(tab => (
                        <TouchableOpacity 
                            key={tab}
                            style={styles.tabBtn}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Typography size={14} style={{ fontFamily: activeTab === tab ? fonts.semiBold : fonts.medium, color: activeTab === tab ? '#06B6D4' : '#9CA3AF' }}>
                                {tab}
                            </Typography>
                            {activeTab === tab && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Typography size={11} style={{ color: '#6B7280', fontFamily: fonts.medium }}>Coin / Vol</Typography>
                    <Typography size={11} style={{ color: '#6B7280', fontFamily: fonts.medium }}>Price / 24h Change</Typography>
                </View>

                {/* List */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
                    {filteredCoins.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Typography size={14} style={{ color: themeColors.grey, textAlign: 'center' }}>
                                {activeTab === 'Favorites' ? 'No favorite coins added yet' : `No coins found matching "${search}"`}
                            </Typography>
                        </View>
                    ) : (
                        filteredCoins.map((item) => {
                            const isPositive = item.change24h >= 0;
                            const changeColor = isPositive ? '#00C853' : '#FF3B30';
                            const formattedPrice = formatNumber(item.currentPrice, item.decimals);

                            return (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.listItem}
                                    activeOpacity={0.7}
                                    onPress={() => handleSelectCoin(item)}
                                >
                                    <TouchableOpacity 
                                        style={{ padding: 4, marginRight: 10 }}
                                        onPress={(e) => {
                                            e.stopPropagation?.();
                                            toggleFav(item.id);
                                        }}
                                    >
                                        <Star 
                                            color={item.isFav ? "#F59E0B" : "#4B5563"} 
                                            fill={item.isFav ? "#F59E0B" : "transparent"} 
                                            size={16} 
                                        />
                                    </TouchableOpacity>
                                    
                                    <View style={[styles.coinLogo, { backgroundColor: item.color || '#F59E0B' }]}>
                                        <Typography size={12} style={{ color: themeColors.white, fontFamily: fonts.bold }}>
                                            {item.initial || item.pair.substring(0, 2)}
                                        </Typography>
                                    </View>

                                    <View style={styles.coinInfo}>
                                        <Typography size={14} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>
                                            {item.name}
                                        </Typography>
                                        <Typography size={11} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 2 }}>
                                            {item.pair} • {item.vol}
                                        </Typography>
                                    </View>

                                    <View style={styles.priceInfo}>
                                        <Typography size={14} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>
                                            {formattedPrice}
                                        </Typography>
                                        <Typography size={11} style={{ fontFamily: fonts.medium, color: changeColor, marginTop: 2 }}>
                                            {isPositive ? '+' : ''}{item.change24h.toFixed(2)}%
                                        </Typography>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </ScrollView>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1F24',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        marginHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#2A2C33',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.medium,
        fontSize: 14,
    },
    tabsContainer: {
        maxHeight: 40,
        marginHorizontal: 5,
        marginBottom: 5,
    },
    tabBtn: {
        paddingHorizontal: 15,
        paddingBottom: 8,
        alignItems: 'center',
    },
    activeIndicator: {
        height: 2,
        backgroundColor: '#06B6D4',
        width: 24,
        position: 'absolute',
        bottom: 0,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    listContent: {
        paddingBottom: 40,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1F24',
    },
    coinLogo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    coinInfo: {
        flex: 1,
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    emptyContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
