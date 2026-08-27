import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../../components/common/Typography';
import { useTheme } from '../../../../../theme/ThemeProvider';
import { fonts } from '../../../../../theme/fonts';
import { useMarketStore } from '../../../../../store/marketStore';
import { CandlestickChartRenderer } from '../CandlestickChartRenderer';

const TIMEFRAMES = ['Time', '1s', '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h'];

const formatNumber = (val: number, decimals: number) => {
  if (decimals > 4) {
    return val.toFixed(decimals);
  }
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const FuturesChart = () => {
  const { colors } = useTheme();
  const [activeTimeframe, setActiveTimeframe] = useState('15m');
  const selectedCoin = useMarketStore((state) => state.selectedCoin);

  const price = selectedCoin ? selectedCoin.currentPrice : 71726.6;
  const decimals = selectedCoin ? selectedCoin.decimals : 2;
  const isPositive = (selectedCoin?.change24h ?? 0) >= 0;

  const ma7 = formatNumber(price * 1.001, decimals);
  const ma14 = formatNumber(price * 0.999, decimals);
  const ma28 = formatNumber(price * 0.996, decimals);

  return (
    <View style={styles.container}>
      {/* Timeframes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeframesScroll}>
        <View style={styles.timeframes}>
          {TIMEFRAMES.map(tf => {
            const isActive = activeTimeframe === tf;
            return (
              <TouchableOpacity key={tf} onPress={() => setActiveTimeframe(tf)}>
                <Typography 
                  size={12} 
                  style={{ 
                    color: isActive ? colors.white : colors.grey, 
                    fontFamily: isActive ? fonts.semiBold : fonts.medium 
                  }}
                >
                  {tf}
                </Typography>
                {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.white }]} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* MA Values */}
      <View style={styles.maRow}>
        <Typography size={10} style={{ color: '#F0B90B' }}>MA7: {ma7}</Typography>
        <Typography size={10} style={{ color: colors.cyan, marginLeft: 10 }}>MA14: {ma14}</Typography>
        <Typography size={10} style={{ color: '#B388FF', marginLeft: 10 }}>MA28: {ma28}</Typography>
      </View>

      {/* Authentic High-Definition Candlestick Chart */}
      <CandlestickChartRenderer
        currentPrice={price}
        decimals={decimals}
        isPositive={isPositive}
        timeframe={activeTimeframe}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#161719',
  },
  timeframesScroll: {
    paddingHorizontal: 15,
  },
  timeframes: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingBottom: 8,
  },
  activeIndicator: {
    height: 2,
    width: '100%',
    position: 'absolute',
    bottom: -10,
    borderRadius: 2,
  },
  maRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
