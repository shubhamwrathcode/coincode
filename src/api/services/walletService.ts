import { ENDPOINTS } from '../endpoints';
import { http } from '../client';

/** Wallet / deposit / withdraw scaffold */
export const WalletService = {
  getOverview: () => http.get(ENDPOINTS.WALLET.OVERVIEW),
  getBalances: () => http.get(ENDPOINTS.WALLET.BALANCES),
  getDepositAddress: (params?: Record<string, unknown>) =>
    http.get(ENDPOINTS.WALLET.DEPOSIT_ADDRESS, { params }),
  getDepositHistory: (params?: Record<string, unknown>) =>
    http.get(ENDPOINTS.WALLET.DEPOSIT_HISTORY, { params }),
  withdraw: (body: Record<string, unknown>) => http.post(ENDPOINTS.WALLET.WITHDRAW, body),
  getWithdrawHistory: (params?: Record<string, unknown>) =>
    http.get(ENDPOINTS.WALLET.WITHDRAW_HISTORY, { params }),
};
