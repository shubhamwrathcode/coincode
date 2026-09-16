export interface AuthUser {
  id?: string;
  _id?: string;
  email?: string;
  phone?: string;
  name?: string;
  username?: string;
  avatar?: string;
  kycStatus?: string | number;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  [key: string]: unknown;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string | null;
}

export interface LoginPayload {
  email_or_phone: string;
  password: string;
  /** Optional captcha / device token if backend requires it */
  token?: string;
}

export interface SendOtpPayload {
  email_or_phone: string;
  type?: number | string;
  resend?: boolean;
  sendTo?: 'email' | 'mobile';
}

export interface VerifyOtpPayload {
  email_or_phone: string;
  otp: string | number;
  type: number;
  password?: string;
  resend?: boolean;
  challenge_id?: string;
  tempToken?: string;
}

/** Login 2FA / new-device method types (AGCE parity) */
export const AUTH_METHOD = {
  EMAIL: 1,
  AUTHENTICATOR: 2,
  PHONE: 3,
  PASSKEY: 4,
} as const;

export type AuthMethodType =
  (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];

export interface AuthMethodOption {
  type: AuthMethodType | number;
  name?: string;
  label?: string;
  description?: string;
  maskedValue?: string;
  value?: string;
  [key: string]: unknown;
}

export interface Pending2FA {
  loginSignId: string;
  availableMethods: AuthMethodOption[];
  defaultMethod: number;
  challengeId?: string;
  tempToken?: string;
  verificationMode?: string;
  completedMethods?: number[];
  remainingMethods?: number[];
  verifySubStep?: 'methods' | 'code';
  activeMethod?: number;
  reason?: string;
  data?: Record<string, unknown>;
}

export interface LoginResultData {
  token?: string;
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
  tempToken?: string;
  challenge_id?: string;
  challengeId?: string;
  requiresVerification?: boolean;
  availableMethods?: AuthMethodOption[];
  defaultMethod?: number;
  verification_mode?: string;
  reason?: string;
  user?: AuthUser;
  userName?: string;
  '2fa'?: number | string;
  [key: string]: unknown;
}

export interface CheckIdentifierPayload {
  identifier: string;
  kind: 'email' | 'phone' | 'username';
  purpose?: 'signup' | 'login';
  countryCode?: string;
  referralCode?: string;
}

export interface RegisterEmailPayload {
  email: string;
  password: string;
  referral_code?: string;
  token?: string;
}

export interface RegisterPhonePayload {
  country_code: string;
  phone: string | number;
  password: string;
  referral_code?: string;
  token?: string;
}

export interface RegistrationOtpPayload {
  signId: string;
  registeredBy: 'email' | 'phone';
}

export interface VerifyRegistrationOtpPayload {
  signId: string;
  verification_code: number;
  registeredBy: 'email' | 'phone';
  token?: string;
}

export type SignupType = 'email' | 'phone';

export interface SignupRouteParams {
  signupType: SignupType;
  signUpId: string;
  countryCode: string;
  referCode?: string;
}

export interface AuthOtpRouteParams {
  signId: string;
  registeredBy: SignupType;
}
