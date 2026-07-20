import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { TradeHeader } from './components/TradeHeader';
import { TradePairInfo } from './components/TradePairInfo';
import { OrderForm } from './components/OrderForm';
import { OrderBook } from './components/OrderBook';
import { TradeBottomTabs } from './components/TradeBottomTabs';
import { TradeActionButtons } from './components/TradeActionButtons';

export const TradeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.black, paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TradeHeader onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TradePairInfo />

        <View style={styles.mainLayout}>
          <OrderForm />
          <OrderBook />
        </View>
        <TradeBottomTabs />
        <TradeActionButtons />
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
});
