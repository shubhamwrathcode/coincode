import { ENDPOINTS } from '../endpoints';
import { http } from '../client';

/** Futures / margin / convert / launchpad — ready for screens to consume */
export const TradeService = {
  futures: {
    getRoot: () => http.get(ENDPOINTS.FUTURES.ROOT),
    getOrders: (params?: Record<string, unknown>) =>
      http.get(ENDPOINTS.FUTURES.ORDERS, { params }),
    placeOrder: (body: Record<string, unknown>) =>
      http.post(ENDPOINTS.FUTURES.ORDER, body),
    getPairs: () => http.get(ENDPOINTS.FUTURES.PAIRS),
    getTickers: () => http.get(ENDPOINTS.FUTURES.TICKERS),
    getBalance: () => http.get(ENDPOINTS.FUTURES.BALANCE),
    getPositions: () => http.get(ENDPOINTS.FUTURES.POSITIONS),
    setLeverage: (body: Record<string, unknown>) =>
      http.post(ENDPOINTS.FUTURES.LEVERAGE, body),
  },

  margin: {
    placeOrder: (body: Record<string, unknown>) =>
      http.post(ENDPOINTS.MARGIN.ORDER, body),
    getPositions: () => http.get(ENDPOINTS.MARGIN.POSITIONS),
  },

  convert: {
    getPairs: () => http.get(ENDPOINTS.CONVERT.PAIRS),
    quote: (body: Record<string, unknown>) => http.post(ENDPOINTS.CONVERT.QUOTE, body),
    preview: (body: Record<string, unknown>) => http.post(ENDPOINTS.CONVERT.PREVIEW, body),
    execute: (body: Record<string, unknown>) => http.post(ENDPOINTS.CONVERT.EXECUTE, body),
    history: (params?: Record<string, unknown>) =>
      http.get(ENDPOINTS.CONVERT.HISTORY, { params }),
  },

  launchpad: {
    getById: (id: string) => http.get(ENDPOINTS.LAUNCHPAD.BY_ID(id)),
  },
};
