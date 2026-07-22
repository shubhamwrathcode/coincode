import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Typography } from '../../../../../components/common/Typography';
import { useTheme } from '../../../../../theme/ThemeProvider';
import { fonts } from '../../../../../theme/fonts';
import { ChevronDown, SlidersHorizontal, ListFilter } from 'lucide-react-native';
import { ImageAssets } from '../../../../../components/common/ImageAssets';
import { OrderBookDepthSheet } from '../OrderBookDepthSheet';

export const FuturesOrderBook = () => {
  const { colors } = useTheme();
  const [depth, setDepth] = useState('0.1');
  const sheetRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      {/* Funding & Countdown */}
      <View style={styles.fundingTop}>
        <Typography size={10} style={{ color: colors.grey, textDecorationLine: 'underline' }}>Funding / Countdown</Typography>
        <Typography size={10} style={{ color: colors.white, textDecorationLine: 'underline', marginTop: 2 }}>0.0100% / 03:23:21</Typography>
      </View>

      <View style={styles.headerRow}>
        <Typography size={10} style={{ color: colors.grey }}>Price(USDT)</Typography>
        <Typography size={10} style={{ color: colors.grey }}>Qty(BTC)</Typography>
      </View>

      {/* Asks (Red) */}
      <View style={styles.asksContainer}>
        {[
          { price: '58,697.5', qty: '0.0561', depth: '15%' },
          { price: '58,696.0', qty: '0.0358', depth: '25%' },
          { price: '58,696.6', qty: '0.0010', depth: '45%' },
          { price: '58,695.5', qty: '0.0368', depth: '30%' },
          { price: '58,695.0', qty: '0.3772', depth: '85%' },
          { price: '58,696.6', qty: '0.0010', depth: '5%' },
          { price: '58,695.5', qty: '0.0368', depth: '30%' },
          { price: '58,695.5', qty: '0.0368', depth: '30%' },
        ].map((item, index) => (
          <View key={index} style={styles.bookRow}>
            <View style={[styles.depthBgRed, { width: item.depth as any }]} />
            <Typography size={12} style={{ color: colors.red, fontFamily: fonts.medium }}>{item.price}</Typography>
            <Typography size={12} style={{ color: colors.white }}>{item.qty}</Typography>
          </View>
        ))}
      </View>

      {/* Mid Market */}
      <View style={styles.centerPrice}>
        <Typography size={18} style={{ color: colors.green, fontFamily: fonts.bold }}>58,694.0</Typography>
        <Typography size={11} style={{ color: colors.grey }}>≈ $58,694.00</Typography>
      </View>

      {/* Bids (Green) */}
      <View style={styles.bidsContainer}>
        {[
          { price: '58,693.4', qty: '2.0270', depth: '20%' },
          { price: '58,693.1', qty: '0.4446', depth: '60%' },
          { price: '58,692.9', qty: '0.0670', depth: '10%' },
          { price: '58,692.2', qty: '0.0004', depth: '5%' },
          { price: '58,691.8', qty: '0.0357', depth: '15%' },
          { price: '58,691.4', qty: '0.0119', depth: '35%' },
          { price: '58,692.2', qty: '0.0004', depth: '48%' },
          { price: '58,691.8', qty: '0.0357', depth: '15%' },
          { price: '58,691.4', qty: '0.0119', depth: '35%' },
        ].map((item, index) => (
          <View key={index} style={styles.bookRow}>
            <View style={[styles.depthBgGreen, { width: item.depth as any }]} />
            <Typography size={12} style={{ color: colors.green, fontFamily: fonts.medium }}>{item.price}</Typography>
            <Typography size={12} style={{ color: colors.white }}>{item.qty}</Typography>
          </View>
        ))}
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
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => sheetRef.current?.open()}
        >
          <Typography size={11}>{depth}</Typography>
          <ChevronDown color={colors.grey} size={14} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ListFilter color={colors.grey} size={18} />
        </TouchableOpacity>
      </View>

      <OrderBookDepthSheet 
        sheetRef={sheetRef} 
        selectedDepth={depth}
        onSelect={(newDepth) => {
          setDepth(newDepth);
          sheetRef.current?.close();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
  },
  fundingTop: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  asksContainer: {
    gap: 4,
  },
  bidsContainer: {
    gap: 4,
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 18,
    alignItems: 'center',
  },
  depthBgRed: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FF3B3015',
    zIndex: -1,
  },
  depthBgGreen: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00C85315',
    zIndex: -1,
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
