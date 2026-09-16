export const queryKeys = {
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
  market: {
    all: ['market'] as const,
    tickers: () => [...queryKeys.market.all, 'tickers'] as const,
    pairs: () => [...queryKeys.market.all, 'pairs'] as const,
  },
  wallet: {
    all: ['wallet'] as const,
    balances: () => [...queryKeys.wallet.all, 'balances'] as const,
    overview: () => [...queryKeys.wallet.all, 'overview'] as const,
  },
  trade: {
    all: ['trade'] as const,
    futuresPositions: () => [...queryKeys.trade.all, 'futures', 'positions'] as const,
    marginPositions: () => [...queryKeys.trade.all, 'margin', 'positions'] as const,
    openOrders: (market: string) => [...queryKeys.trade.all, 'orders', market] as const,
  },
  convert: {
    all: ['convert'] as const,
    pairs: () => [...queryKeys.convert.all, 'pairs'] as const,
    history: () => [...queryKeys.convert.all, 'history'] as const,
  },
  launchpad: {
    all: ['launchpad'] as const,
    detail: (id: string) => [...queryKeys.launchpad.all, id] as const,
  },
};
