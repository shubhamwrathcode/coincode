import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { Star, ChevronDown, ArrowUpDown } from 'lucide-react-native';
import { useMarketStore, MarketCoin } from '../../../../store/marketStore';

const SPOT_SUB_TABS = ['All', 'New', 'Stocks', 'Metals', 'Pre-IPOs'];

const formatNumber = (val: number, decimals: number) => {
  if (decimals > 4) {
    return val.toFixed(decimals);
  }
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const renderIcon = (pair: string, color?: string) => {
  const initials = pair.substring(0, 2);
  const bgColor = color || '#F7931A';

  return (
    <View style={[styles.coinIcon, { backgroundColor: bgColor }]}>
      <Typography size={11} style={{ color: '#FFF', fontFamily: fonts.bold }}>
        {initials}
      </Typography>
    </View>
  );
};

export const SpotTab = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [activeSubTab, setActiveSubTab] = useState(SPOT_SUB_TABS[0]);
  const coins = useMarketStore((state) => state.coins);
  const toggleFav = useMarketStore((state) => state.toggleFav);
  const searchQuery = useMarketStore((state) => state.searchQuery);
  const setSelectedPair = useMarketStore((state) => state.setSelectedPair);
  const setSelectedCoin = useMarketStore((state) => state.setSelectedCoin);

  const handleCoinPress = (item: MarketCoin) => {
    const pairName = item.pair.includes('/') ? item.pair : `${item.pair}/USDT`;
    setSelectedPair(pairName);
    setSelectedCoin(item);
    navigation.navigate('Trade');
  };

  const filteredData = coins.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.pair.toLowerCase().includes(q) ||
      item.symbol.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (q) return true;

    return activeSubTab === 'All'
      ? item.category.includes('All')
      : item.category.includes(activeSubTab);
  });

  const renderItem = ({ item }: { item: MarketCoin }) => {
    const isPositive = item.change24h >= 0;
    const changeColor = isPositive ? '#00C853' : '#FF3B30';
    const formattedPrice = formatNumber(item.currentPrice, item.decimals);
    const formattedUsdPrice = `$${formattedPrice}`;

    return (
      <TouchableOpacity
        style={[styles.listItem, { borderBottomColor: colors.inputBorderColor }]}
        activeOpacity={0.7}
        onPress={() => handleCoinPress(item)}
      >
        <View style={styles.col1}>
          {renderIcon(item.pair, item.color)}
          <View style={{ marginLeft: 10 }}>
            <Typography size={14} style={{ fontFamily: fonts.semiBold, color: colors.white }}>{item.name}</Typography>
            <Typography size={11} style={{ color: colors.grey, marginTop: 2 }}>
              {item.pair} • {item.vol}
            </Typography>
          </View>
        </View>

        <View style={styles.col2}>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, textAlign: 'right', color: colors.white }}>
            {formattedPrice}
          </Typography>
          <Typography size={11} style={{ color: colors.grey, marginTop: 2, textAlign: 'right' }}>
            {formattedUsdPrice}
          </Typography>
        </View>

        <View style={styles.col3}>
          <View style={[styles.changeBadge, { backgroundColor: changeColor + '20' }]}>
            <Typography size={11} style={{ color: changeColor, fontFamily: fonts.semiBold }}>
              {isPositive ? '+' : ''}{item.change24h.toFixed(2)}%
            </Typography>
          </View>
          <TouchableOpacity
            style={{ marginLeft: 10, padding: 4 }}
            onPress={(e) => {
              e.stopPropagation?.();
              toggleFav(item.id);
            }}
          >
            <Star
              color={item.isFav ? '#FFD700' : colors.grey}
              fill={item.isFav ? '#FFD700' : 'transparent'}
              size={18}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subTabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subTabsScroll}>
          {SPOT_SUB_TABS.map((tab) => {
            const isActive = activeSubTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.subTab,
                  { backgroundColor: isActive ? colors.cyan : 'transparent' }
                ]}
                onPress={() => setActiveSubTab(tab)}
              >
                <Typography
                  size={13}
                  style={{
                    fontFamily: fonts.medium,
                    color: isActive ? colors.white : colors.grey
                  }}
                >
                  {tab}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={[styles.listHeader, { borderBottomColor: colors.inputBorderColor, borderBottomWidth: 1 }]}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography size={12} numberOfLines={1} style={{ color: colors.grey, marginRight: 4 }}>Name / Vol</Typography>
            <ChevronDown color={colors.grey} size={14} />
          </View>
        </View>
        <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography size={12} numberOfLines={1} style={{ color: colors.grey, textAlign: 'right', marginRight: 4 }}>Last Price</Typography>
            <ArrowUpDown color={colors.grey} size={12} />
          </View>
        </View>
        <View style={{
          flex: 1.8, justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography size={12} numberOfLines={1} style={{ color: colors.grey, textAlign: 'right', marginRight: 4 }}>24h Change</Typography>
            <ArrowUpDown color={colors.grey} size={12} />
          </View>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={coins}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography size={14} style={{ color: colors.grey, textAlign: 'center', fontFamily: fonts.regular }}>
              No coins found matching "{searchQuery}"
            </Typography>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTabsContainer: {
    height: 45,
    justifyContent: 'center',
    marginVertical: 5,
  },
  subTabsScroll: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  subTab: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  listHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 80,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  col1: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  col2: {
    flex: 1.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  col3: {
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  coinIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    minWidth: 55,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
