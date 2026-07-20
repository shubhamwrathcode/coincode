import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { Star, ChevronDown, ArrowUpDown } from 'lucide-react-native';

const SPOT_SUB_TABS = ['All', 'New', 'Stocks', 'Metals', 'Pre-IPOs'];

const MOCK_SPOT_LIST = [
  { id: '1', pair: 'BTC', name: 'Bitcoin', vol: '$32.45B', price: '853,134.900', usdPrice: '$0.057508', change: '+10.2%', isPositive: true, isFav: false },
  { id: '2', pair: 'ETH', name: 'Ethereum', vol: '$18.92B', price: '60,130.762', usdPrice: '$0.057508', change: '-9.23%', isPositive: false, isFav: false },
  { id: '3', pair: 'BNB', name: 'Binance Coin', vol: '$2.35B', price: '8,265.910', usdPrice: '$0.057508', change: '-8.89%', isPositive: false, isFav: false },
  { id: '4', pair: 'DOGE', name: 'Dogecoin', vol: '$1.12B', price: '3.421', usdPrice: '$0.057508', change: '+8.51%', isPositive: true, isFav: false },
  { id: '5', pair: 'MATIC', name: 'Polygon', vol: '$645.21M', price: '22.967', usdPrice: '$0.057508', change: '-7.17%', isPositive: false, isFav: false },
  { id: '6', pair: 'ETH2', name: 'Ethereum', vol: '$18.92B', price: '853,134.900', usdPrice: '$0.057508', change: '+9.23%', isPositive: true, isFav: false },
  { id: '7', pair: 'BTC2', name: 'Bitcoin', vol: '$32.45B', price: '853,134.900', usdPrice: '$0.057508', change: '+10.2%', isPositive: true, isFav: false },
];

const renderIcon = (pair: string) => {
  const initials = pair.substring(0, 1);
  let bgColor = '#F7931A';
  if (pair.includes('ETH')) bgColor = '#627EEA';
  if (pair.includes('BNB')) bgColor = '#F3BA2F';
  if (pair.includes('DOGE')) bgColor = '#C2A633';
  if (pair.includes('MATIC')) bgColor = '#8247E5';

  return (
    <View style={[styles.coinIcon, { backgroundColor: bgColor }]}>
      <Typography size={12} style={{ color: '#FFF', fontFamily: fonts.bold }}>
        {initials}
      </Typography>
    </View>
  );
};

export const SpotTab = () => {
  const { colors } = useTheme();
  const [activeSubTab, setActiveSubTab] = useState(SPOT_SUB_TABS[0]);

  const renderItem = ({ item }: { item: typeof MOCK_SPOT_LIST[0] }) => {
    const changeColor = item.isPositive ? '#00C853' : '#FF3B30';

    return (
      <View style={[styles.listItem, { borderBottomColor: colors.inputBorderColor }]}>
        <View style={styles.col1}>
          {renderIcon(item.pair)}
          <View style={{ marginLeft: 10 }}>
            <Typography size={14} style={{ fontFamily: fonts.semiBold }}>{item.name}</Typography>
            <Typography size={11} style={{ color: colors.grey, marginTop: 2 }}>
              {item.pair} • {item.vol}
            </Typography>
          </View>
        </View>

        <View style={styles.col2}>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, textAlign: 'right' }}>
            {item.price}
          </Typography>
          <Typography size={11} style={{ color: colors.grey, marginTop: 2, textAlign: 'right' }}>
            {item.usdPrice}
          </Typography>
        </View>

        <View style={styles.col3}>
          <View style={[styles.changeBadge, { backgroundColor: changeColor + '20' }]}>
            <Typography size={11} style={{ color: changeColor, fontFamily: fonts.medium }}>
              {item.change}
            </Typography>
          </View>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Star color={colors.grey} size={18} />
          </TouchableOpacity>
        </View>
      </View>
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
        data={MOCK_SPOT_LIST}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
});
