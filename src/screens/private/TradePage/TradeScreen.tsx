import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { TradeHeader } from './components/TradeHeader';
import { TradePairInfo } from './components/TradePairInfo';
import { OrderForm } from './components/OrderForm';
import { OrderBook } from './components/OrderBook';
import { TradeBottomTabs } from './components/TradeBottomTabs';
import { TradeActionButtons } from './components/TradeActionButtons';
import { ChartDetailView } from './components/ChartDetailView';
import { MarginOrderForm } from './components/MarginOrderForm';
import { FuturesTradeView } from './components/Futures/FuturesTradeView';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { colors } from '../../../theme/colors';
import { useMarketStore } from '../../../store/marketStore';

export const TradeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [viewMode, setViewMode] = useState<'line' | 'candles'>('line');
  const [activeTab, setActiveTab] = useState('Spot');

  const selectedCoin = useMarketStore((state) => state.selectedCoin);
  const midPrice = selectedCoin ? selectedCoin.currentPrice : 71726.6;
  const decimals = selectedCoin ? selectedCoin.decimals : 2;
  const pairSymbol = selectedCoin ? selectedCoin.pair : 'BTC';

  const formatPrice = (val: number) => {
    if (decimals > 4) return val.toFixed(decimals);
    return val.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const buyPrice = formatPrice(midPrice * 1.0002);
  const sellPrice = formatPrice(midPrice * 0.9998);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.black, paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TradeHeader
        onBack={() => navigation.goBack()}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TradePairInfo activeMode={viewMode} onModeChange={setViewMode} />

        {viewMode === 'line' ? (
          activeTab === 'Futures' ? (
            <FuturesTradeView />
          ) : (
            <>
              <View style={styles.mainLayout}>
                {activeTab === 'Margin' ? <MarginOrderForm /> : <OrderForm />}
                <OrderBook isMargin={activeTab === 'Margin'} />
              </View>
              <TradeBottomTabs />
              <TradeActionButtons />
            </>
          )
        ) : (
          <>
            <ChartDetailView />
            <View style={styles.floatingActionRow}>
              <View style={styles.floatingBtnContainer}>
                <TouchableOpacity
                  style={styles.floatingBtnLeft}
                  activeOpacity={0.8}
                  onPress={() => setViewMode('line')}
                >
                  <Typography size={18} style={{ fontFamily: fonts.bold, color: colors.white }}>Buy</Typography>
                  <Typography size={13} style={{ fontFamily: fonts.medium, color: colors.white }}>{buyPrice}</Typography>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.floatingBtnRight}
                  activeOpacity={0.8}
                  onPress={() => setViewMode('line')}
                >
                  <Typography size={18} style={{ fontFamily: fonts.bold, color: colors.white }}>Sell</Typography>
                  <Typography size={13} style={{ fontFamily: fonts.medium, color: colors.white }}>{sellPrice}</Typography>
                </TouchableOpacity>
              </View>

              <View style={styles.floatingCenter}>
                <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Quantity</Typography>
                <Typography size={12} style={{ color: colors.grey, marginTop: 2 }}>{pairSymbol}</Typography>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mainLayout: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  floatingActionRow: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  floatingBtnLeft: {
    flex: 1,
    backgroundColor: '#00C853',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBtnRight: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCenter: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#000000',
    zIndex: 10,
  }
});
