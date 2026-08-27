import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ChevronDown, ListFilter } from 'lucide-react-native';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { OrderBookDepthSheet } from './OrderBookDepthSheet';
import { BorrowingRateSheet } from './BorrowingRateSheet';
import { useMarketStore } from '../../../../store/marketStore';

const formatBookPrice = (val: number, decimals: number) => {
  if (decimals > 4) {
    return val.toFixed(decimals);
  }
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const generateOrderBook = (midPrice: number, decimals: number, depthStr: string = '0.1') => {
  const depthVal = parseFloat(depthStr) || 0.1;
  const depthDecimals = depthStr.includes('.') ? depthStr.split('.')[1].length : 0;

  const step = decimals > 3 ? Math.max(0.00001, depthVal * Math.pow(10, -Math.max(0, decimals - 2))) : depthVal;
  const effDecimals = decimals > 3 ? decimals : depthDecimals;
  const qtyMultiplier = Math.max(1, depthVal * 1.5);

  const baseAsk = Math.ceil(midPrice / step) * step;
  const baseBid = Math.floor(midPrice / step) * step;

  const asks = Array.from({ length: 8 }, (_, i) => {
    const p = baseAsk + (7 - i) * step;
    const qty = (Math.random() * 2.5 * qtyMultiplier + 0.05 * qtyMultiplier).toFixed(decimals > 4 ? 2 : (depthVal >= 10 ? 1 : 3));
    const fill = `${Math.floor(Math.random() * 70) + 15}%`;
    return { price: formatBookPrice(Math.max(0.00000001, p), effDecimals), qty, fill };
  });

  const bids = Array.from({ length: 8 }, (_, i) => {
    const p = baseBid - i * step;
    const qty = (Math.random() * 2.5 * qtyMultiplier + 0.05 * qtyMultiplier).toFixed(decimals > 4 ? 2 : (depthVal >= 10 ? 1 : 3));
    const fill = `${Math.floor(Math.random() * 70) + 15}%`;
    return { price: formatBookPrice(Math.max(0.00000001, p), effDecimals), qty, fill };
  });

  return { asks, bids };
};

interface OrderBookProps {
  isMargin?: boolean;
}

export const OrderBook = ({ isMargin }: OrderBookProps) => {
  const { colors } = useTheme();
  const [depth, setDepth] = useState('0.1');
  const selectedCoin = useMarketStore((state) => state.selectedCoin);
  const sheetRef = useRef<any>(null);
  const borrowingSheetRef = useRef<any>(null);

  const midPrice = selectedCoin ? selectedCoin.currentPrice : 71726.6;
  const decimals = selectedCoin ? selectedCoin.decimals : 2;
  const pairSymbol = selectedCoin ? selectedCoin.pair : 'BTC';

  const [bookData, setBookData] = useState(() => generateOrderBook(midPrice, decimals, depth));
  const [ratio, setRatio] = useState({ buy: 48, sell: 52 });

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isMounted) return;
      setBookData(generateOrderBook(midPrice, decimals, depth));

      const buyR = Math.floor(Math.random() * 18) + 41; // 41% to 59%
      setRatio({ buy: buyR, sell: 100 - buyR });

      const nextInterval = Math.floor(Math.random() * 350) + 450;
      timer = setTimeout(tick, nextInterval);
    };

    setBookData(generateOrderBook(midPrice, decimals, depth));
    timer = setTimeout(tick, 450);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [midPrice, decimals, depth]);

  const renderRow = (item: any, type: 'ask' | 'bid', index: number) => {
    const textColor = type === 'ask' ? colors.red : colors.green;
    const bgFill = type === 'ask' ? '#FF3B3020' : '#00C85320';

    return (
      <View style={styles.row} key={`${type}-${index}`}>
        <View style={[styles.bgFill, { backgroundColor: bgFill, width: item.fill }]} />
        <Typography size={12} style={{ color: textColor, fontFamily: fonts.medium }}>{item.price}</Typography>
        <Typography size={12} style={{ color: colors.white }}>{item.qty}</Typography>
      </View>
    );
  };

  const isPositive = (selectedCoin?.change24h ?? 0) >= 0;
  const centerPriceColor = isPositive ? colors.green : colors.red;

  return (
    <View style={styles.container}>
      {/* Header */}
      {isMargin && (
        <View style={styles.marginHeader}>
          <TouchableOpacity style={styles.brBadge} onPress={() => borrowingSheetRef.current?.open()}>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>B/R</Typography>
          </TouchableOpacity>
          <View style={{ alignItems: 'flex-end' }}>
            <Typography size={9} style={{ color: colors.grey, fontFamily: fonts.medium }}>Hourly Rate (USD)...</Typography>
            <Typography size={9} style={{ color: colors.white, fontFamily: fonts.medium, textDecorationLine: 'underline', marginTop: 2 }}>0.0000231%</Typography>
          </View>
        </View>
      )}

      <View style={styles.header}>
        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium }}>Price(USDT)</Typography>
        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.medium }}>Qty({pairSymbol})</Typography>
      </View>

      {/* Asks */}
      <View style={styles.list}>
        {bookData.asks.map((item, index) => renderRow(item, 'ask', index))}
      </View>

      {/* Center Price */}
      <View style={styles.centerPrice}>
        <Typography size={18} style={{ color: centerPriceColor, fontFamily: fonts.bold }}>
          {formatBookPrice(midPrice, decimals)}
        </Typography>
        <Typography size={11} style={{ color: colors.grey, marginTop: 2 }}>
          ≈ ${formatBookPrice(midPrice, decimals)}
        </Typography>
      </View>

      {/* Bids */}
      <View style={styles.list}>
        {bookData.bids.map((item, index) => renderRow(item, 'bid', index))}
      </View>

      {/* Spread / Options */}
      <View style={styles.spreadInfo}>
        <View style={styles.ratioBar}>
          <ImageBackground source={ImageAssets.RectangleGreen} style={[styles.ratioLeft, { flex: ratio.buy / 100 }]} resizeMode="stretch">
            <Typography size={9} style={{ color: colors.green }}>{ratio.buy}%</Typography>
          </ImageBackground>
          <ImageBackground source={ImageAssets.RectangleRed} style={[styles.ratioRight, { flex: ratio.sell / 100 }]} resizeMode="stretch">
            <Typography size={9} style={{ color: colors.red }}>{ratio.sell}%</Typography>
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
      <BorrowingRateSheet sheetRef={borrowingSheetRef} />
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
    marginBottom: 8,
  },
  marginHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  brBadge: {
    backgroundColor: '#1E1F24',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  list: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 19,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  bgFill: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  centerPrice: {
    marginVertical: 8,
  },
  spreadInfo: {
    marginTop: 8,
    marginBottom: 8,
  },
  ratioBar: {
    flexDirection: 'row',
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    gap: 2,
  },
  ratioLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratioRight: {
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

