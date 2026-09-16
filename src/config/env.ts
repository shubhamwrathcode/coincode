import { Platform } from 'react-native';

/**
 * CoinCode backend
 * Server: http://52.66.158.37
 *
 * iOS Simulator cannot reliably call HTTP on a raw IP.
 * In dev, iOS auto-uses local proxy: 127.0.0.1:8787 → 52.66.158.37
 * Run: npm run api:proxy
 */
const SERVER_URL = 'http://52.66.158.37';
const DEV_PROXY_URL = 'http://127.0.0.1:8787';

/** iOS dev → proxy | Android / release → direct server */
const useDevProxy = __DEV__ && Platform.OS === 'ios';

export const ENV = {
  APP_NAME: 'CoinCode',
  SERVER_URL,
  DEV_PROXY_URL,
  /** REST API base (no trailing slash) */
  API_BASE_URL: useDevProxy ? DEV_PROXY_URL : SERVER_URL,
  WS_BASE_URL: 'ws://52.66.158.37',
  API_TIMEOUT_MS: 20000,
  USE_DEV_PROXY: useDevProxy,
  OTP_TYPE: {
    SIGNUP: 1,
    LOGIN: 2,
    RESET_PASSWORD: 3,
  } as const,
} as const;

export type OtpType = (typeof ENV.OTP_TYPE)[keyof typeof ENV.OTP_TYPE];
