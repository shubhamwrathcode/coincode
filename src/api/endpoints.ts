import { ENV } from '../config/env';

/**
 * Central API route map — Binance-style domain grouping.
 * Confirmed against AGCE at http://52.66.158.37
 * Paths marked "scaffold" are reserved for upcoming backend modules.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/v1/user/login',
    SEND_OTP: '/v1/user/send-otp',
    VERIFY_OTP: '/v1/user/verify-otp',
    CHECK_SIGNUP: '/v1/user/check-signup-email',
    REGISTER_EMAIL: '/v1/user/register-email',
    REGISTER_PHONE: '/v1/user/register-phone',
    REGISTRATION_OTP: '/v1/user/registration-otp',
    VERIFY_REGISTRATION_OTP: '/v1/user/verify-registration-otp',
  },

  USER: {
    PROFILE: '/v1/user/profile',
  },

  /** Futures gateway (service may be down; route exists) */
  FUTURES: {
    ROOT: '/v1/futures',
    ORDERS: '/v1/futures/orders',
    ORDER: '/v1/futures/order',
    PAIRS: '/v1/futures/pairs',
    TICKER: '/v1/futures/ticker',
    TICKERS: '/v1/futures/tickers',
    BALANCE: '/v1/futures/balance',
    POSITIONS: '/v1/futures/positions',
    LEVERAGE: '/v1/futures/leverage',
  },

  MARGIN: {
    ORDER: '/v1/margin/order',
    POSITIONS: '/v1/margin/positions',
  },

  CONVERT: {
    ROOT: '/v1/convert',
    QUOTE: '/v1/convert/quote',
    PREVIEW: '/v1/convert/preview',
    EXECUTE: '/v1/convert/execute',
    HISTORY: '/v1/convert/history',
    PAIRS: '/v1/convert/pairs',
  },

  LAUNCHPAD: {
    BY_ID: (id: string) => `/v1/launchpad/${id}`,
  },

  /** Scaffold — wire when backend exposes these */
  SPOT: {
    ORDERS: '/v1/spot/orders',
    ORDER: '/v1/spot/order',
    PAIRS: '/v1/spot/pairs',
    TICKERS: '/v1/spot/tickers',
    DEPTH: '/v1/spot/depth',
    KLINES: '/v1/spot/klines',
  },

  WALLET: {
    OVERVIEW: '/v1/wallet/overview',
    BALANCES: '/v1/wallet/balances',
    DEPOSIT_ADDRESS: '/v1/deposit/address',
    DEPOSIT_HISTORY: '/v1/deposit/history',
    WITHDRAW: '/v1/withdraw',
    WITHDRAW_HISTORY: '/v1/withdraw/history',
  },
} as const;

export const OTP_TYPE = ENV.OTP_TYPE;
