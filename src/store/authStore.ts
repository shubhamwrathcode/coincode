import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser, Pending2FA } from '../types/auth';
import { resetToGuest } from '../navigation/navigationRef';

interface SessionPayload {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: AuthUser | null;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  /** Login 2FA / new-device challenge — not persisted */
  pending2FA: Pending2FA | null;
  setSession: (payload: SessionPayload) => void;
  setUser: (user: AuthUser | null) => void;
  setPendingVerification: (accessToken: string) => void;
  setPending2FA: (pending: Pending2FA | null) => void;
  updatePending2FA: (patch: Partial<Pending2FA>) => void;
  clearPending2FA: () => void;
  login: (payload?: SessionPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      pending2FA: null,

      setSession: ({ accessToken = null, refreshToken = null, user = null }) =>
        set({
          accessToken,
          refreshToken: refreshToken ?? null,
          user: user ?? null,
          isAuthenticated: Boolean(accessToken),
          pending2FA: null,
        }),

      setUser: (user) => set({ user }),

      setPendingVerification: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: false,
        }),

      setPending2FA: (pending) => set({ pending2FA: pending }),

      updatePending2FA: (patch) => {
        const current = get().pending2FA;
        if (!current) return;
        set({ pending2FA: { ...current, ...patch } });
      },

      clearPending2FA: () => set({ pending2FA: null }),

      login: (payload) => {
        if (!payload) {
          set({ isAuthenticated: true });
          return;
        }

        const accessToken = payload.accessToken ?? null;
        set({
          accessToken,
          refreshToken: payload.refreshToken ?? null,
          user: payload.user ?? null,
          isAuthenticated: Boolean(accessToken),
          pending2FA: null,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
          pending2FA: null,
        });

        AsyncStorage.removeItem('auth-storage').finally(() => {
          resetToGuest();
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        // pending2FA intentionally excluded — challenge is short-lived
      }),
    },
  ),
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
