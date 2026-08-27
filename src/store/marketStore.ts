import { create } from 'zustand';

export interface MarketCoin {
  id: string;
  symbol: string;
  pair: string;
  name: string;
  baseVol: number;
  currentVol: number;
  vol: string;
  basePrice: number;
  currentPrice: number;
  decimals: number;
  change24h: number;
  color: string;
  initial: string;
  isFav?: boolean;
  category: string[];
  priceDirection?: 'up' | 'down' | null;
}

export const formatVolume = (val: number): string => {
  if (val >= 1_000_000_000) {
    return `$${(val / 1_000_000_000).toFixed(2)}B`;
  }
  if (val >= 1_000_000) {
    return `$${(val / 1_000_000).toFixed(2)}M`;
  }
  if (val >= 1_000) {
    return `$${(val / 1_000).toFixed(2)}K`;
  }
  return `$${val.toFixed(2)}`;
};

export const INITIAL_COINS: MarketCoin[] = [
  { id: '1', symbol: 'BTCUSDT', pair: 'BTC', name: 'Bitcoin', baseVol: 32450000000, currentVol: 32450000000, vol: '$32.45B', basePrice: 71726.60, currentPrice: 71726.60, decimals: 2, change24h: 2.68, color: '#F7931A', initial: '₿', category: ['All', 'AI'], isFav: false },
  { id: '2', symbol: 'ETHUSDT', pair: 'ETH', name: 'Ethereum', baseVol: 18920000000, currentVol: 18920000000, vol: '$18.92B', basePrice: 2192.38, currentPrice: 2192.38, decimals: 2, change24h: -1.45, color: '#627EEA', initial: 'Ξ', category: ['All'], isFav: false },
  { id: '3', symbol: 'SOLUSDT', pair: 'SOL', name: 'Solana', baseVol: 8450000000, currentVol: 8450000000, vol: '$8.45B', basePrice: 83.37, currentPrice: 83.37, decimals: 2, change24h: 4.82, color: '#14F195', initial: 'S', category: ['All'], isFav: false },
  { id: '4', symbol: 'XAUUSDT', pair: 'XAU', name: 'Gold', baseVol: 5400000000, currentVol: 5400000000, vol: '$5.40B', basePrice: 4752.50, currentPrice: 4752.50, decimals: 2, change24h: 0.95, color: '#FFD700', initial: 'Au', category: ['All', 'Metals'], isFav: false },
  { id: '5', symbol: 'DOGEUSDT', pair: 'DOGE', name: 'DogeCoin', baseVol: 1120000000, currentVol: 1120000000, vol: '$1.12B', basePrice: 0.09239, currentPrice: 0.09239, decimals: 5, change24h: -3.12, color: '#C2A633', initial: 'Ð', category: ['All', 'Meme'], isFav: false },
  { id: '6', symbol: 'BNBUSDT', pair: 'BNB', name: 'BNB', baseVol: 2350000000, currentVol: 2350000000, vol: '$2.35B', basePrice: 586.40, currentPrice: 586.40, decimals: 2, change24h: 1.15, color: '#F3BA2F', initial: 'B', category: ['All'], isFav: false },
  { id: '7', symbol: 'PEPEUSDT', pair: 'PEPE', name: 'Pepe', baseVol: 780200000, currentVol: 780200000, vol: '$780.20M', basePrice: 0.00000942, currentPrice: 0.00000942, decimals: 8, change24h: 8.64, color: '#4BA24E', initial: 'P', category: ['All', 'Meme'], isFav: false },
  { id: '8', symbol: 'NEARUSDT', pair: 'NEAR', name: 'NEAR Protocol', baseVol: 410500000, currentVol: 410500000, vol: '$410.50M', basePrice: 5.48, currentPrice: 5.48, decimals: 2, change24h: -0.84, color: '#000000', initial: 'N', category: ['All', 'AI'], isFav: false },
  { id: '9', symbol: 'SUIUSDT', pair: 'SUI', name: 'Sui', baseVol: 950400000, currentVol: 950400000, vol: '$950.40M', basePrice: 1.84, currentPrice: 1.84, decimals: 2, change24h: 6.21, color: '#4B88FF', initial: 'S', category: ['New'], isFav: false },
  { id: '10', symbol: 'APTUSDT', pair: 'APT', name: 'Aptos', baseVol: 420100000, currentVol: 420100000, vol: '$420.10M', basePrice: 8.75, currentPrice: 8.75, decimals: 2, change24h: -2.30, color: '#2ED8A7', initial: 'A', category: ['New'], isFav: false },
  { id: '11', symbol: 'NVDAUSDT', pair: 'NVDA', name: 'Nvidia Corp', baseVol: 12400000000, currentVol: 12400000000, vol: '$12.40B', basePrice: 128.40, currentPrice: 128.40, decimals: 2, change24h: 3.42, color: '#76B900', initial: 'N', category: ['Stocks', 'AI'], isFav: false },
  { id: '12', symbol: 'TSLAUSDT', pair: 'TSLA', name: 'Tesla Inc', baseVol: 9800000000, currentVol: 9800000000, vol: '$9.80B', basePrice: 215.60, currentPrice: 215.60, decimals: 2, change24h: -1.88, color: '#E82127', initial: 'T', category: ['Stocks'], isFav: false },
  { id: '13', symbol: 'XAGUSDT', pair: 'XAG', name: 'Silver', baseVol: 1800000000, currentVol: 1800000000, vol: '$1.80B', basePrice: 32.18, currentPrice: 32.18, decimals: 2, change24h: 1.05, color: '#C0C0C0', initial: 'Ag', category: ['Metals'], isFav: false },
  { id: '14', symbol: 'SPACEX', pair: 'SPACEX', name: 'SpaceX Pre-IPO', baseVol: 890000000, currentVol: 890000000, vol: '$890.00M', basePrice: 112.50, currentPrice: 112.50, decimals: 2, change24h: 5.75, color: '#005288', initial: 'X', category: ['Pre-IPOs'], isFav: false },
  { id: '15', symbol: 'STRIPE', pair: 'STRIPE', name: 'Stripe Pre-IPO', baseVol: 450000000, currentVol: 450000000, vol: '$450.00M', basePrice: 38.20, currentPrice: 38.20, decimals: 2, change24h: 2.10, color: '#635BFF', initial: 'S', category: ['Pre-IPOs'], isFav: false },
  { id: '16', symbol: 'RENDERUSDT', pair: 'RENDER', name: 'Render', baseVol: 320000000, currentVol: 320000000, vol: '$320.00M', basePrice: 6.24, currentPrice: 6.24, decimals: 2, change24h: 4.35, color: '#E53935', initial: 'R', category: ['AI'], isFav: false },
  { id: '17', symbol: 'SHIBUSDT', pair: 'SHIB', name: 'Shiba Inu', baseVol: 650000000, currentVol: 650000000, vol: '$650.00M', basePrice: 0.0000178, currentPrice: 0.0000178, decimals: 7, change24h: -1.72, color: '#FFA409', initial: 'S', category: ['Meme'], isFav: false },
  { id: '18', symbol: 'WIFUSDT', pair: 'WIF', name: 'dogwifhat', baseVol: 290000000, currentVol: 290000000, vol: '$290.00M', basePrice: 2.45, currentPrice: 2.45, decimals: 2, change24h: 7.89, color: '#A0522D', initial: 'W', category: ['Meme'], isFav: false },
];

export interface TickerData {
  symbol: string;
  price: string;
  change24h: string;
  volume24h: string;
}

interface MarketState {
  coins: MarketCoin[];
  selectedPair: string;
  selectedCoin: MarketCoin | null;
  searchQuery: string;
  prices: Record<string, TickerData>;
  candles: any[];
  orderbook: any;
  setSelectedPair: (pair: string) => void;
  setSelectedCoin: (coin: MarketCoin | null) => void;
  setSearchQuery: (query: string) => void;
  updatePrice: (symbol: string, data: TickerData) => void;
  updateCandles: (candles: any[]) => void;
  toggleFav: (id: string) => void;
  tickPrices: () => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  coins: INITIAL_COINS,
  selectedPair: 'BTC/USDT',
  selectedCoin: INITIAL_COINS[0],
  searchQuery: '',
  prices: {},
  candles: [],
  orderbook: {},
  setSelectedPair: (pair: string) => set({ selectedPair: pair }),
  setSelectedCoin: (coin: MarketCoin | null) => set({ selectedCoin: coin }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  updatePrice: (symbol, data) => set((state) => ({
    prices: {
      ...state.prices,
      [symbol]: { ...state.prices[symbol], ...data }
    }
  })),
  updateCandles: (candles) => set({ candles }),
  toggleFav: (id) => set((state) => ({
    coins: state.coins.map(c => c.id === id ? { ...c, isFav: !c.isFav } : c)
  })),
  tickPrices: () => set((state) => {
    const countToUpdate = Math.floor(Math.random() * 4) + 3;
    const indicesToUpdate = new Set<number>();
    while (indicesToUpdate.size < countToUpdate) {
      const randIdx = Math.floor(Math.random() * state.coins.length);
      indicesToUpdate.add(randIdx);
    }

    let updatedSelectedCoin = state.selectedCoin;

    const newCoins = state.coins.map((item, index) => {
      if (!indicesToUpdate.has(index)) {
        return item;
      }

      const isUp = Math.random() > 0.48;
      const deltaPercent = (Math.random() * 0.006 + 0.001) * (isUp ? 1 : -1);
      const priceChange = item.currentPrice * deltaPercent;
      const newPrice = Math.max(0.00000001, item.currentPrice + priceChange);

      const changeStep = (Math.random() * 0.22 + 0.06) * (isUp ? 1 : -1);
      const newChange24h = parseFloat((item.change24h + changeStep).toFixed(2));

      // Dynamic volume growth per trade tick
      const volDelta = Math.floor(Math.random() * (item.currentVol * 0.0004)) + 15000;
      const newVol = item.currentVol + volDelta;
      const formattedVol = formatVolume(newVol);

      const updated = {
        ...item,
        currentPrice: newPrice,
        change24h: newChange24h,
        currentVol: newVol,
        vol: formattedVol,
        priceDirection: isUp ? ('up' as const) : ('down' as const),
      };

      if (state.selectedCoin && state.selectedCoin.id === item.id) {
        updatedSelectedCoin = updated;
      }

      return updated;
    });

    return { coins: newCoins, selectedCoin: updatedSelectedCoin };
  }),
}));

// Global background ticker runner so prices stay synced across all pages at all times
let globalTickerTimer: NodeJS.Timeout | null = null;
const startGlobalTicker = () => {
  if (globalTickerTimer) return;

  const loop = () => {
    useMarketStore.getState().tickPrices();
    const nextInterval = Math.floor(Math.random() * 500) + 600;
    globalTickerTimer = setTimeout(loop, nextInterval);
  };

  globalTickerTimer = setTimeout(loop, 600);
};

startGlobalTicker();
