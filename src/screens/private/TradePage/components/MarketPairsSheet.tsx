import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Search, Star } from 'lucide-react-native';

interface MarketPairsSheetProps {
    sheetRef: any;
    onSelect?: (pair: string) => void;
}

const TABS = ['Favorites', 'Spot', 'Margin', 'ETF', 'Futures'];

const PAIRS = [
    { name: 'Bitcoin', symbol: 'BTC', price: '853,134,900', change: '~ +$0.057526', isFav: false, logoColor: '#F59E0B' },
    { name: 'Ethereum', symbol: 'ETH', price: '60,130,762', change: '~ +$0.057526', isFav: false, logoColor: '#3B82F6' },
    { name: 'Binance Coin', symbol: 'BNB', price: '8,265,910', change: '~ +$0.057526', isFav: false, logoColor: '#FBBF24' },
    { name: 'Dogecoin', symbol: 'DOGE', price: '3,421', change: '~ +$0.057526', isFav: true, logoColor: '#FCD34D' },
    { name: 'Polygon', symbol: 'MATIC', price: '22,967', change: '~ +$0.057526', isFav: false, logoColor: '#8B5CF6' },
    { name: 'Ethereum', symbol: 'ETH', price: '60,130,762', change: '~ +$0.057526', isFav: false, logoColor: '#3B82F6' },
    { name: 'Dogecoin', symbol: 'DOGE', price: '3,421', change: '~ +$0.057526', isFav: true, logoColor: '#FCD34D' },
    { name: 'Polygon', symbol: 'MATIC', price: '22,967', change: '~ +$0.057526', isFav: false, logoColor: '#8B5CF6' },
];

export const MarketPairsSheet = ({ sheetRef, onSelect }: MarketPairsSheetProps) => {
    const { colors: themeColors } = useTheme();
    const [activeTab, setActiveTab] = useState('Spot');

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
                    />
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
                    <Typography size={11} style={{ color: '#6B7280', fontFamily: fonts.medium }}>Price / Change% ^</Typography>
                </View>

                {/* List */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
                    {PAIRS.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.listItem}
                            onPress={() => {
                                onSelect?.(item.symbol);
                                sheetRef.current?.close();
                            }}
                        >
                            <Star color={item.isFav ? "#F59E0B" : "#4B5563"} fill={item.isFav ? "#F59E0B" : "transparent"} size={16} style={{ marginRight: 15 }} />
                            
                            <View style={[styles.coinLogo, { backgroundColor: item.logoColor }]}>
                                <Typography size={14} style={{ color: themeColors.white, fontFamily: fonts.bold }}>{item.symbol[0]}</Typography>
                            </View>

                            <View style={styles.coinInfo}>
                                <Typography size={14} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>{item.name}</Typography>
                                <Typography size={11} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 2 }}>{item.symbol}</Typography>
                            </View>

                            <View style={styles.priceInfo}>
                                <Typography size={14} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>{item.price}</Typography>
                                <Typography size={11} style={{ fontFamily: fonts.medium, color: themeColors.green, marginTop: 2 }}>{item.change}</Typography>
                            </View>
                        </TouchableOpacity>
                    ))}
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
    }
});
