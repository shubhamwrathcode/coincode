import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../../components/common/Typography';
import { useTheme } from '../../../../../theme/ThemeProvider';
import { fonts } from '../../../../../theme/fonts';

const TIMEFRAMES = ['Time', '1s', '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h'];

export const FuturesChart = () => {
  const { colors } = useTheme();
  const [activeTimeframe, setActiveTimeframe] = useState('15m');

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
        <Typography size={10} style={{ color: '#F0B90B' }}>MA7: 60,597.7</Typography>
        <Typography size={10} style={{ color: colors.cyan, marginLeft: 10 }}>MA14: 60,713.3</Typography>
        <Typography size={10} style={{ color: '#B388FF', marginLeft: 10 }}>MA28: 60,396.7</Typography>
      </View>

      {/* Chart Area */}
      <View style={styles.chartArea}>
        {/* Grid lines */}
        <View style={[styles.gridLine, { top: '20%' }]} />
        <View style={[styles.gridLine, { top: '40%' }]} />
        <View style={[styles.gridLine, { top: '60%' }]} />
        <View style={[styles.gridLine, { top: '80%' }]} />

        {/* Y Axis labels */}
        <View style={styles.yAxis}>
          <Typography size={10} style={{ color: colors.grey }}>61,343.6</Typography>
          <Typography size={10} style={{ color: colors.grey }}>60,905.3</Typography>
          <View style={styles.currentPriceBadge}>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>60,569.1</Typography>
            <Typography size={10} style={{ color: colors.white, marginTop: 2 }}>03:07</Typography>
          </View>
          <Typography size={10} style={{ color: colors.grey }}>60,028.9</Typography>
          <Typography size={10} style={{ color: colors.grey }}>59,590.7</Typography>
        </View>

        {/* X Axis labels */}
        <View style={styles.xAxis}>
          <Typography size={10} style={{ color: colors.grey }}>02:00</Typography>
          <Typography size={10} style={{ color: colors.grey }}>04:30</Typography>
          <Typography size={10} style={{ color: colors.grey }}>07:00</Typography>
          <Typography size={10} style={{ color: colors.grey }}>09:30</Typography>
          <Typography size={10} style={{ color: colors.grey }}>12:00</Typography>
        </View>

        {/* Dummy Candles */}
        <View style={styles.candlesContainer}>
          <View style={[styles.candle, { left: '5%', height: 40, top: '40%', backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: '15%', height: 30, top: '45%', backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: '25%', height: 60, top: '35%', backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: '35%', height: 40, top: '25%', backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: '45%', height: 80, top: '20%', backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: '55%', height: 40, top: '50%', backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: '65%', height: 50, top: '55%', backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: '75%', height: 70, top: '40%', backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: '85%', height: 30, top: '30%', backgroundColor: colors.red }]} />
        </View>

        {/* Dummy MA lines (curved approximations using borders) */}
        <View style={styles.maLineYellow} />
        <View style={styles.maLineCyan} />
        <View style={styles.maLinePurple} />
      </View>
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
  chartArea: {
    height: 220,
    position: 'relative',
    marginTop: 5,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#1E1F24',
    opacity: 0.5,
  },
  yAxis: {
    position: 'absolute',
    right: 5,
    top: 10,
    bottom: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  xAxis: {
    position: 'absolute',
    left: 15,
    right: 60,
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentPriceBadge: {
    backgroundColor: '#1E1F24',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#35373F',
  },
  candlesContainer: {
    position: 'absolute',
    left: 15,
    right: 60,
    top: 10,
    bottom: 30,
  },
  candle: {
    position: 'absolute',
    width: 6,
    borderRadius: 2,
  },
  maLineYellow: {
    position: 'absolute',
    left: 15,
    right: 60,
    top: '35%',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#F0B90B',
    borderRadius: 100,
  },
  maLineCyan: {
    position: 'absolute',
    left: 15,
    right: 60,
    top: '40%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#00BCD4',
    borderRadius: 100,
  },
  maLinePurple: {
    position: 'absolute',
    left: 15,
    right: 60,
    top: '45%',
    height: 30,
    borderTopWidth: 1,
    borderTopColor: '#B388FF',
    borderRadius: 100,
  },
});
