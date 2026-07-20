import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { Star, Plus, ChevronRight } from 'lucide-react-native';
import { MiniChart } from './MiniChart';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const MOCK_FAVORITES = [
  { id: '1', pair: 'BTC/USDT', name: 'Bitcoin', price: '64,512.35', change: '+0.23%', isPositive: true, data: [1, 2, 4, 3, 5, 6, 5, 8, 7, 9] },
  { id: '2', pair: 'BNB/USDT', name: 'BNB', price: '582.47', change: '-0.53%', isPositive: false, data: [9, 8, 7, 5, 6, 4, 3, 4, 2, 1] },
  { id: '3', pair: 'ETH/USDT', name: 'Ethereum', price: '3,502.18', change: '+0.23%', isPositive: true, data: [2, 3, 4, 4, 6, 5, 7, 8, 8, 9] },
  { id: '4', pair: 'SOL/USDT', name: 'Solana', price: '148.32', change: '-0.53%', isPositive: false, data: [8, 9, 7, 6, 5, 4, 5, 3, 2, 1] },
  { id: '5', pair: 'MEGA/USDT', name: 'Mega', price: '1.245', change: '-0.53%', isPositive: false, data: [7, 6, 7, 5, 4, 5, 3, 2, 3, 1] },
  { id: '6', pair: 'ZAMA/USDT', name: 'Zama', price: '0.0478', change: '+0.23%', isPositive: true, data: [1, 2, 2, 3, 4, 3, 5, 6, 7, 8] },
];

const renderIcon = (pair: string) => {
  const initials = pair.split('/')[0].substring(0, 1);
  let bgColor = '#F7931A';
  if (pair.includes('ETH')) bgColor = '#627EEA';
  if (pair.includes('BNB')) bgColor = '#F3BA2F';
  if (pair.includes('SOL')) bgColor = '#14F195';
  if (pair.includes('MEGA')) bgColor = '#E84142';
  if (pair.includes('ZAMA')) bgColor = '#FFD700';

  return (
    <View style={[styles.coinIcon, { backgroundColor: bgColor }]}>
      <Typography size={10} style={{ color: '#FFF', fontFamily: fonts.bold }}>
        {initials}
      </Typography>
    </View>
  );
};

export const FavoritesTab = () => {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: typeof MOCK_FAVORITES[0] }) => {
    const changeColor = item.isPositive ? '#00C853' : '#FF3B30';

    return (
      <View style={[styles.card, {
        backgroundColor: '#0F1012',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
      }]}>
        <View style={styles.cardHeader}>
          <View style={styles.coinInfo}>
            {renderIcon(item.pair)}
            <View style={{ marginLeft: 8 }}>
              <Typography size={12} style={{ fontFamily: fonts.bold }}>{item.pair}</Typography>
              <Typography size={9} style={{ color: colors.grey, marginTop: 2 }}>{item.name}</Typography>
            </View>
          </View>
          <Star color="#FFD700" fill="#FFD700" size={16} />
        </View>

        <View style={styles.chartContainer}>
          <MiniChart data={item.data} isPositive={item.isPositive} width={CARD_WIDTH - 20} height={25} />
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.changeBadge, { backgroundColor: changeColor + '20' }]}>
            <Typography size={9} style={{ color: changeColor, fontFamily: fonts.medium }}>
              {item.change}
            </Typography>
          </View>
          <Typography size={12} style={{ fontFamily: fonts.bold }}>{item.price}</Typography>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.addButtonContainer}>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.cyan }]}>
              <View style={styles.addIconContainer}>
                <Plus color={colors.black} size={16} strokeWidth={3} />
              </View>
              <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginLeft: 10 }}>
                Add Favourites
              </Typography>
              <View style={{ flex: 1 }} />
              <ChevronRight color={colors.white} size={24} />
            </TouchableOpacity>
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
  listContent: {
    padding: 15,
    paddingBottom: 90, // Space for bottom nav
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  addButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  addIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
