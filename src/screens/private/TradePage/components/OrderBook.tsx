import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ChevronDown, ListFilter } from 'lucide-react-native';
import { ImageAssets } from '../../../../components/common/ImageAssets';

const ASKS = [
  { price: '58,697.5', qty: '0.0561', fill: '20%' },
  { price: '58,696.0', qty: '0.0358', fill: '35%' },
  { price: '58,696.6', qty: '0.0010', fill: '10%' },
  { price: '58,695.5', qty: '0.0368', fill: '40%' },
  { price: '58,695.0', qty: '0.3772', fill: '80%' },
  { price: '58,696.6', qty: '0.0010', fill: '5%' },
  { price: '58,695.5', qty: '0.0368', fill: '20%' },
  { price: '58,695.5', qty: '0.0368', fill: '15%' },
];

const BIDS = [
  { price: '58,693.4', qty: '2.0270', fill: '90%' },
  { price: '58,693.1', qty: '0.4446', fill: '60%' },
  { price: '58,692.9', qty: '0.0670', fill: '25%' },
  { price: '58,692.2', qty: '0.0004', fill: '2%' },
  { price: '58,691.8', qty: '0.0357', fill: '10%' },
  { price: '58,691.4', qty: '0.0119', fill: '5%' },
  { price: '58,692.2', qty: '0.0004', fill: '2%' },
  { price: '58,691.8', qty: '0.0357', fill: '15%' },
  { price: '58,691.4', qty: '0.0119', fill: '5%' },
];

export const OrderBook = () => {
  const { colors } = useTheme();

  const renderRow = (item: any, type: 'ask' | 'bid') => {
    const textColor = type === 'ask' ? colors.red : colors.green;
    const bgFill = type === 'ask' ? '#FF3B3020' : '#00C85320';

    return (
      <View style={styles.row} key={Math.random().toString()}>
        <View style={[styles.bgFill, { backgroundColor: bgFill, width: item.fill, alignSelf: 'flex-end' }]} />
        <Typography size={12} style={{ color: textColor, fontFamily: fonts.medium }}>{item.price}</Typography>
        <Typography size={12} style={{ color: colors.white }}>{item.qty}</Typography>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium }}>Price(USDT)</Typography>
        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium }}>Qty(BTC)</Typography>
      </View>

      {/* Asks */}
      <View style={styles.list}>
        {ASKS.map(item => renderRow(item, 'ask'))}
      </View>

      {/* Center Price */}
      <View style={styles.centerPrice}>
        <Typography size={18} style={{ color: colors.green, fontFamily: fonts.bold }}>58,694.0</Typography>
        <Typography size={11} style={{ color: colors.grey }}>≈ $58,694.00</Typography>
      </View>

      {/* Bids */}
      <View style={styles.list}>
        {BIDS.map(item => renderRow(item, 'bid'))}
      </View>

      {/* Spread / Options */}
      <View style={styles.spreadInfo}>
        <View style={styles.ratioBar}>
          <ImageBackground source={ImageAssets.RectangleGreen} style={styles.ratioLeft} resizeMode="stretch">
            <Typography size={9} style={{ color: colors.green }}>48%</Typography>
          </ImageBackground>
          <ImageBackground source={ImageAssets.RectangleRed} style={styles.ratioRight} resizeMode="stretch">
            <Typography size={9} style={{ color: colors.red }}>52%</Typography>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.bottomOptions}>
        <TouchableOpacity style={styles.dropdown}>
          <Typography size={11}>0.01</Typography>
          <ChevronDown color={colors.grey} size={14} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ListFilter color={colors.grey} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  list: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 18,
    alignItems: 'center',
  },
  bgFill: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  centerPrice: {
    marginVertical: 10,
  },
  spreadInfo: {
    marginTop: 10,
    marginBottom: 10,
  },
  ratioBar: {
    flexDirection: 'row',
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    gap: 2,
  },
  ratioLeft: {
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratioRight: {
    flex: 0.52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#161719',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  }
});
