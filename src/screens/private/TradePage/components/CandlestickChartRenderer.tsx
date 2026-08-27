import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Line, Rect, G } from 'react-native-svg';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ZoomIn, ZoomOut } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CandleData {
  open: number;
  close: number;
  high: number;
  low: number;
  vol: number;
  isBullish: boolean;
  timeLabel?: string;
}

interface Props {
  currentPrice: number;
  decimals: number;
  isPositive: boolean;
  timeframe?: string;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Generate an authentic, multi-variety historical candlestick dataset based on active timeframe
export const generateExtendedCandleSeries = (currentPrice: number, timeframe: string = '1h'): CandleData[] => {
  const count = 90;
  const candles: CandleData[] = [];

  // Generate distinct realistic wave multipliers based on timeframe
  const getMultiplierSeed = (tf: string, i: number, len: number) => {
    let phase = 0;
    if (tf === '1s' || tf === '1m') phase = 0.5;
    else if (tf === '15m') phase = 1.2;
    else if (tf === '1h') phase = 2.4;
    else if (tf === '2h') phase = 3.6;
    else if (tf === '4h') phase = 4.8;
    else if (tf === '1D') phase = 6.0;

    const progress = i / len;
    const wave1 = Math.sin(progress * Math.PI * 3 + phase) * 0.12;
    const wave2 = Math.cos(progress * Math.PI * 5 + phase * 0.7) * 0.06;
    const trend = (progress - 0.5) * 0.08;
    return 1.0 + wave1 + wave2 + trend;
  };

  let prevClose = currentPrice * getMultiplierSeed(timeframe, 0, count);

  // Timeframe interval in milliseconds
  let stepMs = 60 * 60 * 1000; // default 1h
  if (timeframe === '1s') stepMs = 1000;
  else if (timeframe === '1m') stepMs = 60 * 1000;
  else if (timeframe === '3m') stepMs = 3 * 60 * 1000;
  else if (timeframe === '5m') stepMs = 5 * 60 * 1000;
  else if (timeframe === '15m') stepMs = 15 * 60 * 1000;
  else if (timeframe === '30m') stepMs = 30 * 60 * 1000;
  else if (timeframe === '1h') stepMs = 60 * 60 * 1000;
  else if (timeframe === '2h') stepMs = 2 * 60 * 60 * 1000;
  else if (timeframe === '4h') stepMs = 4 * 60 * 60 * 1000;
  else if (timeframe === '1D') stepMs = 24 * 60 * 60 * 1000;
  else if (timeframe === 'More') stepMs = 3 * 24 * 60 * 60 * 1000;

  const now = new Date();
  const startTime = new Date(now.getTime() - count * stepMs);

  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1;
    const targetClose = isLast ? currentPrice : currentPrice * getMultiplierSeed(timeframe, i, count);

    // Volatility variation (choti aur badi candles)
    const candleType = Math.random();
    let bodySpreadFactor: number;
    if (candleType > 0.8) {
      // Large breakout candle (badi candle)
      bodySpreadFactor = Math.random() * 0.022 + 0.014;
    } else if (candleType > 0.4) {
      // Normal candle
      bodySpreadFactor = Math.random() * 0.01 + 0.004;
    } else {
      // Small doji (choti candle)
      bodySpreadFactor = Math.random() * 0.003 + 0.0008;
    }

    const isUp = isLast ? true : Math.random() > 0.48;
    const noise = (Math.random() - 0.5) * (currentPrice * 0.006);
    const close = isLast ? currentPrice : (isUp ? targetClose + bodySpreadFactor * currentPrice : targetClose - bodySpreadFactor * currentPrice) + noise;
    const open = prevClose;
    const isBullish = close >= open;

    const wickHigh = (Math.random() * 0.012 + 0.001) * currentPrice;
    const wickLow = (Math.random() * 0.012 + 0.001) * currentPrice;

    const high = Math.max(open, close) + wickHigh;
    const low = Math.max(0.000001, Math.min(open, close) - wickLow);
    const vol = Math.random() * 45 + 10;

    // Time Label formatting
    const candleTime = new Date(startTime.getTime() + i * stepMs);
    let timeString = '';

    if (timeframe === '1D' || timeframe === 'More') {
      const month = MONTH_NAMES[candleTime.getMonth()];
      const day = candleTime.getDate();
      timeString = `${month} ${day}`;
    } else {
      const hours = candleTime.getHours();
      const minutes = candleTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    const timeLabel = i % 10 === 0 ? timeString : undefined;

    candles.push({
      open,
      close,
      high,
      low,
      vol,
      isBullish,
      timeLabel,
    });

    prevClose = close;
  }

  return candles;
};

export const CandlestickChartRenderer = ({ currentPrice, decimals, isPositive, timeframe = '1h' }: Props) => {
  const chartHeight = 250;
  const volHeight = 45;
  const yAxisWidth = 65;

  const [zoomScale, setZoomScale] = useState(0.7);
  const scrollViewRef = useRef<ScrollView>(null);

  const baseCandleSpacing = 11.5;
  const baseBodyWidth = 7;

  const candleSpacing = baseCandleSpacing * zoomScale;
  const candleBodyWidth = Math.max(3, baseBodyWidth * zoomScale);
  const wickWidth = Math.max(1, 1.2 * zoomScale);

  // Regenerate authentic candles whenever timeframe or currency changes
  const candles = useMemo(() => {
    return generateExtendedCandleSeries(currentPrice, timeframe);
  }, [timeframe, decimals]);

  // Update latest candle in real-time
  const activeCandles = useMemo(() => {
    if (!candles.length) return [];
    const list = [...candles];
    const last = list[list.length - 1];
    const updatedLast: CandleData = {
      ...last,
      close: currentPrice,
      high: Math.max(last.high, currentPrice),
      low: Math.min(last.low, currentPrice),
      isBullish: currentPrice >= last.open,
    };
    list[list.length - 1] = updatedLast;
    return list;
  }, [candles, currentPrice]);

  const totalSvgWidth = Math.max(SCREEN_WIDTH - yAxisWidth, activeCandles.length * candleSpacing + 40);

  // Auto-scroll to latest candles on right whenever timeframe or zoom changes
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 60);
    return () => clearTimeout(timer);
  }, [timeframe, zoomScale]);

  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    activeCandles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    });
    const padding = (max - min) * 0.08 || currentPrice * 0.05;
    return {
      minPrice: min - padding,
      maxPrice: max + padding,
      priceRange: max - min + padding * 2,
    };
  }, [activeCandles, currentPrice]);

  const getY = (val: number) => {
    return (chartHeight - 25) - ((val - minPrice) / (priceRange || 1)) * (chartHeight - 50);
  };

  const currentY = getY(currentPrice);
  const supportY = getY(currentPrice * 0.94);
  const resistanceY = getY(currentPrice * 1.12);

  const formatPrice = (val: number) => {
    if (decimals > 4) return val.toFixed(decimals);
    return val.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const activeColor = isPositive ? '#00C853' : '#FF3B30';

  const yValues = [
    maxPrice - priceRange * 0.15,
    maxPrice - priceRange * 0.38,
    maxPrice - priceRange * 0.62,
    maxPrice - priceRange * 0.85,
  ];

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(2.0, parseFloat((prev + 0.2).toFixed(1))));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.5, parseFloat((prev - 0.2).toFixed(1))));
  };

  return (
    <View style={styles.container}>
      {/* Zoom Controls Overlay */}
      <View style={styles.zoomControlRow}>
        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn} activeOpacity={0.7}>
          <ZoomIn color="#9CA3AF" size={15} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut} activeOpacity={0.7}>
          <ZoomOut color="#9CA3AF" size={15} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartRow}>
        {/* Scrollable Candles Area */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollCanvas}
          contentContainerStyle={{ width: totalSvgWidth }}
        >
          <View>
            <Svg width={totalSvgWidth} height={chartHeight}>
              {/* Horizontal Grid Lines */}
              {yValues.map((val, idx) => {
                const y = getY(val);
                return (
                  <Line
                    key={`h-grid-${idx}`}
                    x1={0}
                    y1={y}
                    x2={totalSvgWidth}
                    y2={y}
                    stroke="#1E2026"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                );
              })}

              {/* Support & Resistance Reference Lines */}
              <Line
                x1={0}
                y1={supportY}
                x2={totalSvgWidth}
                y2={supportY}
                stroke="#475569"
                strokeWidth={1}
                strokeDasharray="5,4"
                opacity={0.5}
              />
              <Line
                x1={0}
                y1={resistanceY}
                x2={totalSvgWidth}
                y2={resistanceY}
                stroke="#475569"
                strokeWidth={1}
                strokeDasharray="5,4"
                opacity={0.5}
              />

              {/* Active Pulsating Price Level Line */}
              <Line
                x1={0}
                y1={currentY}
                x2={totalSvgWidth}
                y2={currentY}
                stroke={activeColor}
                strokeWidth={1.2}
                strokeDasharray="3,3"
                opacity={0.9}
              />

              {/* Authentic Choti-Badi Candlesticks & Volume Bars */}
              <G>
                {activeCandles.map((c, i) => {
                  const x = i * candleSpacing + candleSpacing / 2 + 10;
                  const highY = getY(c.high);
                  const lowY = getY(c.low);
                  const openY = getY(c.open);
                  const closeY = getY(c.close);

                  const bodyTop = Math.min(openY, closeY);
                  const bodyHeight = Math.max(2.5, Math.abs(openY - closeY));
                  const candleColor = c.isBullish ? '#00C853' : '#FF3B30';

                  const vHeight = Math.min(volHeight, c.vol);
                  const volY = chartHeight - vHeight;

                  return (
                    <G key={`candle-${i}`}>
                      {/* Volume bar */}
                      <Rect
                        x={x - candleBodyWidth / 2}
                        y={volY}
                        width={candleBodyWidth}
                        height={vHeight}
                        fill={candleColor}
                        opacity={0.35}
                      />

                      {/* Upper & Lower Wick Line */}
                      <Line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={candleColor}
                        strokeWidth={wickWidth}
                      />

                      {/* Solid Clean Candle Body */}
                      <Rect
                        x={x - candleBodyWidth / 2}
                        y={bodyTop}
                        width={candleBodyWidth}
                        height={bodyHeight}
                        fill={candleColor}
                        rx={1}
                      />
                    </G>
                  );
                })}
              </G>
            </Svg>

            {/* X-Axis Timestamps (e.g. 08:00 PM, 09:30 PM / Oct 24) */}
            <View style={[styles.xAxisScrollable, { width: totalSvgWidth }]}>
              {activeCandles.map((c, i) => {
                if (!c.timeLabel) return null;
                const x = i * candleSpacing - 15;
                return (
                  <View key={`lbl-${i}`} style={[styles.dateLabelWrapper, { left: x }]}>
                    <Typography size={10} style={{ color: '#6B7280', fontFamily: fonts.medium }}>
                      {c.timeLabel}
                    </Typography>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Fixed Stationary Y-Axis Rate Column */}
        <View style={[styles.fixedYAxis, { width: yAxisWidth, height: chartHeight }]}>
          {yValues.map((val, idx) => (
            <Typography key={idx} size={10} style={{ color: '#6B7280' }}>
              {formatPrice(val)}
            </Typography>
          ))}
          {/* Live Glowing Price Tag */}
          <View style={[styles.activePriceTag, { backgroundColor: activeColor, top: Math.max(8, Math.min(chartHeight - 24, currentY - 10)) }]}>
            <Typography size={10} style={{ color: '#FFF', fontFamily: fonts.semiBold }}>
              {formatPrice(currentPrice)}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    position: 'relative',
  },
  zoomControlRow: {
    position: 'absolute',
    right: 70,
    top: -5,
    flexDirection: 'row',
    zIndex: 30,
    gap: 8,
  },
  zoomBtn: {
    backgroundColor: '#161719',
    padding: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#26282E',
  },
  chartRow: {
    flexDirection: 'row',
    position: 'relative',
    height: 275,
  },
  scrollCanvas: {
    flex: 1,
    height: 275,
  },
  fixedYAxis: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderLeftColor: '#161719',
    backgroundColor: '#000000',
    zIndex: 10,
  },
  activePriceTag: {
    position: 'absolute',
    left: 4,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    borderRadius: 3,
    zIndex: 20,
  },
  xAxisScrollable: {
    height: 22,
    position: 'relative',
    marginTop: 4,
  },
  dateLabelWrapper: {
    position: 'absolute',
    top: 2,
  },
});
