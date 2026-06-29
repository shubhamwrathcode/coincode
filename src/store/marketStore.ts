import { create } from 'zustand';

export interface TickerData {
  symbol: string;
  price: string;
  change24h: string;
  volume24h: string;
}

interface MarketState {
  prices: Record<string, TickerData>;
  candles: any[]; // define candle type properly later
  orderbook: any; // define orderbook type properly later
  updatePrice: (symbol: string, data: TickerData) => void;
  updateCandles: (candles: any[]) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  prices: {},
  candles: [],
  orderbook: {},
  // Selective update of a specific price without overriding the entire prices object reference entirely unnecessarily
  updatePrice: (symbol, data) => set((state) => ({
    prices: {
      ...state.prices,
      [symbol]: { ...state.prices[symbol], ...data }
    }
  })),
  updateCandles: (candles) => set({ candles }),
}));
