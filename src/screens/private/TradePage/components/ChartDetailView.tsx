import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { BarChart2, Edit2, Settings, Trophy, Flame, Layers } from 'lucide-react-native';
import { useMarketStore } from '../../../../store/marketStore';
import { CandlestickChartRenderer } from './CandlestickChartRenderer';

const { width } = Dimensions.get('window');

const CHART_TABS = ['Chart', 'Overview', 'Market Data', 'Copy Trading'];
const TIMEFRAMES = ['1h', '2h', '4h', '1D', 'More'];
const INDICATORS = ['VOL', 'SRL', 'MA', 'EMA', 'BOLL', 'SAR', 'SuperTrend', 'AVL'];
const BOTTOM_TABS = ['Order Book', 'Depth', 'Trades', 'Global Markets'];

const formatNumber = (val: number, decimals: number) => {
  if (decimals > 4) {
    return val.toFixed(decimals);
  }
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const generateHorizontalBook = (midPrice: number, decimals: number) => {
  const step = Math.max(0.0000001, midPrice * 0.00016);
  return Array.from({ length: 12 }, (_, i) => {
    const bidPrice = Math.max(0.00000001, midPrice - (i + 1) * step + (Math.random() - 0.5) * (step * 0.25));
    const askPrice = Math.max(0.00000001, midPrice + (i + 1) * step + (Math.random() - 0.5) * (step * 0.25));

    const bidQty = (Math.random() * 3.5 + 0.05).toFixed(decimals > 4 ? 2 : 4);
    const askQty = (Math.random() * 3.5 + 0.05).toFixed(decimals > 4 ? 2 : 4);

    const bidFill = `${Math.min(95, Math.floor(Math.random() * 60) + 20)}%`;
    const askFill = `${Math.min(95, Math.floor(Math.random() * 60) + 20)}%`;

    return {
      bidPrice: formatNumber(bidPrice, decimals),
      bidQty,
      bidFill,
      askPrice: formatNumber(askPrice, decimals),
      askQty,
      askFill,
    };
  });
};

export const ChartDetailView = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('Chart');
  const [activeTimeframe, setActiveTimeframe] = useState('1h');
  const [activeBottomTab, setActiveBottomTab] = useState('Order Book');

  const selectedCoin = useMarketStore((state) => state.selectedCoin);

  const price = selectedCoin ? selectedCoin.currentPrice : 71726.6;
  const decimals = selectedCoin ? selectedCoin.decimals : 2;
  const pairSymbol = selectedCoin ? selectedCoin.pair : 'BTC';
  const isPositive = (selectedCoin?.change24h ?? 0) >= 0;
  const changeColor = isPositive ? colors.green : colors.red;
  const formattedPrice = formatNumber(price, decimals);

  // Dynamic 24h High / Low & MA based on live price
  const high24h = formatNumber(price * (1 + Math.max(0.012, Math.abs((selectedCoin?.change24h ?? 1) * 0.005) + 0.015)), decimals);
  const low24h = formatNumber(price * (1 - Math.max(0.012, Math.abs((selectedCoin?.change24h ?? 1) * 0.005) + 0.012)), decimals);
  const ma5 = formatNumber(price * 1.002, decimals);
  const ma10 = formatNumber(price * 0.998, decimals);
  const ma30 = formatNumber(price * 0.994, decimals);

  const yPrice1 = formatNumber(price * 1.03, decimals);
  const yPrice2 = formatNumber(price * 1.015, decimals);
  const yPrice3 = formatNumber(price * 0.985, decimals);
  const yPrice4 = formatNumber(price * 0.97, decimals);

  const [horizBook, setHorizBook] = useState(() => generateHorizontalBook(price, decimals));
  const [obRatio, setObRatio] = useState({ buy: 61.35, sell: 38.65 });

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isMounted) return;
      setHorizBook(generateHorizontalBook(price, decimals));
      const b = parseFloat((Math.random() * 24 + 38).toFixed(2)); // 38% to 62%
      setObRatio({ buy: b, sell: parseFloat((100 - b).toFixed(2)) });

      const nextInterval = Math.floor(Math.random() * 350) + 450;
      timer = setTimeout(tick, nextInterval);
    };

    timer = setTimeout(tick, 450);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [price, decimals]);

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
          <Typography size={30} style={{ color: changeColor, fontFamily: fonts.semiBold }}>{formattedPrice}</Typography>
          <View style={styles.fiatRow}>
            <Typography size={12} style={{ color: colors.grey }}>≈ ${formattedPrice}</Typography>
            <Typography size={12} style={{ color: changeColor, marginLeft: 10, fontFamily: fonts.medium }}>
              {isPositive ? '+' : ''}{(selectedCoin?.change24h ?? 0).toFixed(2)}%
            </Typography>
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
            <Typography size={10} style={{ color: colors.green, fontFamily: fonts.medium }}>{high24h}</Typography>
          </View>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h Low</Typography>
            <Typography size={10} style={{ color: colors.red, fontFamily: fonts.medium }}>{low24h}</Typography>
          </View>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h Volume ({pairSymbol})</Typography>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>{selectedCoin?.vol || '$32.45B'}</Typography>
          </View>
          <View style={styles.statRow}>
            <Typography size={10} style={{ color: colors.grey }}>24h Turnover (USDT)</Typography>
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>{selectedCoin?.vol || '497.54M'}</Typography>
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
        {/* <View style={styles.chartIcons}>
          <TouchableOpacity style={styles.iconBtn}><BarChart2 size={16} color={colors.grey} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Edit2 size={16} color={colors.grey} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Settings size={16} color={colors.grey} /></TouchableOpacity>
        </View> */}
      </View>

      {/* Chart Indicators MA values */}
      <View style={styles.maRow}>
        <Typography size={10} style={{ color: '#F0B90B' }}>MA5: {ma5}</Typography>
        <Typography size={10} style={{ color: colors.cyan, marginLeft: 15 }}>MA10: {ma10}</Typography>
        <Typography size={10} style={{ color: '#B388FF', marginLeft: 15 }}>MA30: {ma30}</Typography>
      </View>

      {/* Authentic High-Definition Candlestick Chart */}
      <CandlestickChartRenderer
        currentPrice={price}
        decimals={decimals}
        isPositive={isPositive}
        timeframe={activeTimeframe}
      />

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

      {/* Horizontal Order Book */}
      <View style={styles.horizontalOrderBook}>
        <View style={styles.orderBookHeader}>
          <Typography size={12} style={{ color: colors.green, fontFamily: fonts.semiBold }}>B {obRatio.buy}%</Typography>
          <View style={styles.progressBars}>
            <View style={[styles.progressBar, { backgroundColor: colors.green, flex: obRatio.buy / 100 }]} />
            <View style={[styles.progressBar, { backgroundColor: colors.red, flex: obRatio.sell / 100 }]} />
          </View>
          <Typography size={12} style={{ color: colors.red, fontFamily: fonts.semiBold }}>{obRatio.sell}% S</Typography>
        </View>
        <View style={styles.orderBookCols}>
          <View style={styles.obColHeader}>
            <Typography size={10} style={{ color: colors.grey }}>Amount ({pairSymbol})</Typography>
            <Typography size={10} style={{ color: colors.grey }}>Depth</Typography>
            <Typography size={10} style={{ color: colors.grey }}>Amount ({pairSymbol})</Typography>
          </View>
          {horizBook.map((row, i) => (
            <View key={i} style={styles.obRow}>
              <View style={styles.obSide}>
                <Typography size={10} style={{ color: colors.white }}>{row.bidQty}</Typography>
                <Typography size={10} style={{ color: colors.green, fontFamily: fonts.medium }}>{row.bidPrice}</Typography>
                <View style={[styles.bgFill, { backgroundColor: '#00C85320', width: row.bidFill as any, left: null, right: 0 }]} />
              </View>
              <View style={styles.obSide}>
                <Typography size={10} style={{ color: colors.red, fontFamily: fonts.medium }}>{row.askPrice}</Typography>
                <Typography size={10} style={{ color: colors.white }}>{row.askQty}</Typography>
                <View style={[styles.bgFill, { backgroundColor: '#FF3B3020', width: row.askFill as any, right: null, left: 0 }]} />
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
  currentPriceBadge: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
  },
  livePriceLine: {
    position: 'absolute',
    left: 0,
    right: 65,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    zIndex: 1,
    opacity: 0.7,
  },
  candlesContainer: {
    position: 'absolute',
    left: 10,
    right: 70,
    top: 10,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  candleColumn: {
    flex: 1,
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  candleWick: {
    position: 'absolute',
    width: 1.5,
    borderRadius: 1,
  },
  candleBody: {
    position: 'absolute',
    width: 8,
    borderRadius: 1.5,
  },
  volHistogramBar: {
    width: 6,
    borderRadius: 1,
    marginBottom: 5,
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
    gap: 0,
  },
  obColHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  obRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 19,
    alignItems: 'center',
  },
  obSide: {
    flex: 0.48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 19,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: -1,
  }
});
