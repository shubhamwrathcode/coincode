import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { BarChart2, Edit2, Settings, Trophy, Flame, Layers } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CHART_TABS = ['Chart', 'Overview', 'Market Data', 'Copy Trading'];
const TIMEFRAMES = ['1h', '2h', '4h', '1D', 'More'];
const INDICATORS = ['VOL', 'SRL', 'MA', 'EMA', 'BOLL', 'SAR', 'SuperTrend', 'AVL'];
const BOTTOM_TABS = ['Order Book', 'Depth', 'Trades', 'Global Markets'];

export const ChartDetailView = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('Chart');
  const [activeTimeframe, setActiveTimeframe] = useState('1h');
  const [activeBottomTab, setActiveBottomTab] = useState('Order Book');

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {CHART_TABS.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
              <Typography size={14} style={{ color: isActive ? colors.cyan : colors.grey, fontFamily: isActive ? fonts.semiBold : fonts.regular }}>
                {tab}
              </Typography>
              {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
            </TouchableOpacity>
          );
        })}
        </ScrollView>
      </View>

      {/* Price & Stats Section */}
      <View style={styles.priceSection}>
        <View style={styles.priceLeft}>
          <Typography size={32} style={{ color: colors.red, fontFamily: fonts.semiBold }}>104,771.58</Typography>
          <View style={styles.fiatRow}>
            <Typography size={12} style={{ color: colors.grey }}>≈ $105,254.47</Typography>
            <Typography size={12} style={{ color: colors.red, marginLeft: 10, fontFamily: fonts.medium }}>-3.32%</Typography>
          </View>
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Trophy size={10} color={colors.cyan} />
              <Typography size={10} style={{ color: colors.cyan, marginLeft: 4 }}>Rank #1</Typography>
            </View>
            <View style={styles.badge}>
              <Flame size={10} color={colors.cyan} />
              <Typography size={10} style={{ color: colors.cyan, marginLeft: 4 }}>Top Volume</Typography>
            </View>
            <View style={styles.badge}>
              <Layers size={10} color={colors.cyan} />
              <Typography size={10} style={{ color: colors.cyan, marginLeft: 4 }}>Layer 1</Typography>
            </View>
          </View>
        </View>
        <View style={styles.statsRight}>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h High</Typography>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>108,799.74</Typography>
          </View>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h Low</Typography>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>104,789.66</Typography>
          </View>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h Volume (BTC)</Typography>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>22.24M USD</Typography>
          </View>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h Turnover (USDT)</Typography>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>497.54M</Typography>
          </View>
        </View>
      </View>

      {/* Chart Header */}
      <View style={styles.chartHeader}>
        <View style={styles.timeframes}>
          {TIMEFRAMES.map(tf => (
            <TouchableOpacity key={tf} onPress={() => setActiveTimeframe(tf)}>
              <Typography size={12} style={{ color: activeTimeframe === tf ? colors.white : colors.grey, fontFamily: activeTimeframe === tf ? fonts.semiBold : fonts.regular }}>
                {tf}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.chartIcons}>
          <TouchableOpacity style={styles.iconBtn}><BarChart2 size={16} color={colors.grey} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Edit2 size={16} color={colors.grey} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Settings size={16} color={colors.grey} /></TouchableOpacity>
        </View>
      </View>

      {/* Chart Indicators MA values */}
      <View style={styles.maRow}>
        <Typography size={10} style={{ color: '#F0B90B' }}>MA5: 77,845.9</Typography>
        <Typography size={10} style={{ color: colors.cyan, marginLeft: 15 }}>MA10: 78,035.6</Typography>
        <Typography size={10} style={{ color: '#B388FF', marginLeft: 15 }}>MA30: 78,208.0</Typography>
      </View>

      {/* Dummy Chart Area */}
      <View style={styles.chartArea}>
        {/* We will draw a few mock candlestick lines just to make it look decent */}
        <View style={[styles.gridLine, { top: '20%' }]} />
        <View style={[styles.gridLine, { top: '40%' }]} />
        <View style={[styles.gridLine, { top: '60%' }]} />
        <View style={[styles.gridLine, { top: '80%' }]} />

        {/* Y Axis labels */}
        <View style={styles.yAxis}>
          <Typography size={10} style={{ color: colors.grey }}>61,000.0</Typography>
          <Typography size={10} style={{ color: colors.grey }}>60,000.0</Typography>
          <Typography size={10} style={{ color: colors.grey }}>59,000.0</Typography>
          <View style={{ backgroundColor: colors.red, paddingHorizontal: 4, borderRadius: 2 }}>
            <Typography size={10} style={{ color: colors.white }}>58,443.6</Typography>
          </View>
          <Typography size={10} style={{ color: colors.grey }}>58,000.0</Typography>
        </View>

        {/* Dummy Candles */}
        <View style={styles.candlesContainer}>
          <View style={[styles.candle, { left: 10, height: 40, top: 20, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 20, height: 60, top: 10, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 30, height: 30, top: 50, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 40, height: 50, top: 60, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 50, height: 20, top: 100, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 60, height: 40, top: 110, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 70, height: 30, top: 100, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 80, height: 50, top: 120, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 90, height: 30, top: 150, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 100, height: 10, top: 170, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 110, height: 25, top: 160, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 120, height: 40, top: 140, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 130, height: 70, top: 100, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 140, height: 30, top: 120, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 150, height: 40, top: 130, backgroundColor: colors.green }]} />
          <View style={[styles.candle, { left: 160, height: 50, top: 140, backgroundColor: colors.red }]} />
          <View style={[styles.candle, { left: 170, height: 20, top: 180, backgroundColor: colors.red }]} />
        </View>

        {/* Volume chart */}
        <View style={styles.volumeArea}>
          <View style={[styles.volBar, { left: 10, height: 10, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 20, height: 15, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 30, height: 8, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 40, height: 12, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 50, height: 5, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 60, height: 20, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 70, height: 15, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 80, height: 35, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 90, height: 25, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 100, height: 20, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 110, height: 8, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 120, height: 12, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 130, height: 40, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 140, height: 15, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 150, height: 10, backgroundColor: colors.green }]} />
          <View style={[styles.volBar, { left: 160, height: 20, backgroundColor: colors.red }]} />
          <View style={[styles.volBar, { left: 170, height: 15, backgroundColor: colors.red }]} />
        </View>
      </View>

      {/* MACD row */}
      <View style={styles.macdRow}>
        <Typography size={10} style={{ color: '#F0B90B' }}>MACD (12,26,9)</Typography>
        <Typography size={10} style={{ color: '#F0B90B', marginLeft: 15 }}>MACD: -112.3</Typography>
        <Typography size={10} style={{ color: '#B388FF', marginLeft: 15 }}>DIF: -64.1</Typography>
        <Typography size={10} style={{ color: '#F0B90B', marginLeft: 15 }}>DEA: 48.1</Typography>
      </View>

      {/* Indicators List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.indicatorsScroll}>
        {INDICATORS.map(ind => (
          <TouchableOpacity key={ind} style={styles.indicatorItem}>
            <Typography size={12} style={{ color: ind === 'VOL' ? colors.white : colors.grey }}>{ind}</Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bottomTabsRow}>
          {BOTTOM_TABS.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveBottomTab(tab)} style={styles.bottomTabItem}>
            <Typography size={16} style={{ color: activeBottomTab === tab ? colors.white : colors.grey, fontFamily: activeBottomTab === tab ? fonts.semiBold : fonts.regular }}>
              {tab}
            </Typography>
            {activeBottomTab === tab && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      {/* Horizontal Order Book Mock */}
      <View style={styles.horizontalOrderBook}>
        <View style={styles.orderBookHeader}>
          <Typography size={12} style={{ color: colors.green, fontFamily: fonts.semiBold }}>B 61.35%</Typography>
          <View style={styles.progressBars}>
            <View style={[styles.progressBar, { backgroundColor: colors.green, flex: 0.6135 }]} />
            <View style={[styles.progressBar, { backgroundColor: colors.red, flex: 0.3865 }]} />
          </View>
          <Typography size={12} style={{ color: colors.red, fontFamily: fonts.semiBold }}>38.65% S</Typography>
        </View>
        <View style={styles.orderBookCols}>
          <View style={styles.obColHeader}>
            <Typography size={10} style={{ color: colors.grey }}>Amount (BTC)</Typography>
            <Typography size={10} style={{ color: colors.grey }}>0.2</Typography>
            <Typography size={10} style={{ color: colors.grey }}>Amount (BTC)</Typography>
          </View>
          {Array.from({ length: 15 }).map((_, i) => (
            <View key={i} style={styles.obRow}>
              <View style={styles.obSide}>
                <Typography size={10} style={{ color: colors.white }}>10.345469</Typography>
                <Typography size={10} style={{ color: colors.green }}>76,699.4</Typography>
                {/* Background fill mock */}
                <View style={[styles.bgFill, { backgroundColor: '#00C85320', width: `${20 + i * 5}%`, left: null, right: 0 }]} />
              </View>
              <View style={styles.obSide}>
                <Typography size={10} style={{ color: colors.red }}>76,699.4</Typography>
                <Typography size={10} style={{ color: colors.white }}>10.345469</Typography>
                {/* Background fill mock */}
                <View style={[styles.bgFill, { backgroundColor: '#FF3B3020', width: `${100 - i * 5}%`, right: null, left: 0 }]} />
              </View>
            </View>
          ))}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#161719',
    marginTop: 5,
  },
  tabItem: {
    marginRight: 20,
    paddingVertical: 10,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    width: 20,
    alignSelf: 'center',
    borderRadius: 2,
  },
  priceSection: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  priceLeft: {
    flex: 1,
  },
  fiatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  badgesRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsRight: {
    flex: 1,
    gap: 6,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#161719',
  },
  timeframes: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  chartIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  iconBtn: {
    padding: 2,
  },
  maRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  chartArea: {
    height: 300,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#161719',
  },
  yAxis: {
    position: 'absolute',
    right: 5,
    top: 10,
    bottom: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  candlesContainer: {
    position: 'absolute',
    left: 0,
    right: 60,
    top: 0,
    bottom: 50,
  },
  candle: {
    position: 'absolute',
    width: 4,
    borderRadius: 2,
  },
  volumeArea: {
    position: 'absolute',
    left: 0,
    right: 60,
    bottom: 0,
    height: 50,
  },
  volBar: {
    position: 'absolute',
    width: 4,
    bottom: 0,
    borderRadius: 1,
  },
  macdRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  indicatorsScroll: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#161719',
  },
  indicatorItem: {
    marginRight: 20,
    paddingVertical: 10,
  },
  bottomTabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#161719',
    marginTop: 10,
  },
  bottomTabItem: {
    marginRight: 20,
    paddingVertical: 12,
    position: 'relative',
  },
  horizontalOrderBook: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  orderBookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBars: {
    flex: 1,
    flexDirection: 'row',
    height: 6,
    marginHorizontal: 10,
    gap: 4,
  },
  progressBar: {
    borderRadius: 3,
  },
  orderBookCols: {
    gap: 4,
  },
  obColHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  obRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  obSide: {
    flex: 0.48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 18,
    alignItems: 'center',
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: -1,
  }
});
