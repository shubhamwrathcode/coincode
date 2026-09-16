export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

export const validatePasswordStrict = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/.test(password);

export const getSignupUsernamePart = (signupType: 'email' | 'phone', signUpId: string) => {
  if (signupType === 'email') {
    const id = String(signUpId || '');
    return id.includes('@') ? id.split('@')[0] : id;
  }
  return String(signUpId || '').replace(/\D/g, '');
};

export const isPasswordReadyForSignup = (
  password: string,
  signupType: 'email' | 'phone',
  signUpId: string,
) => {
  const username = getSignupUsernamePart(signupType, signUpId);
  const p = String(password || '');

  if (!p.trim()) return false;
  if (/^\d+$/.test(p)) return false;
  if (/^[a-zA-Z]+$/.test(p)) return false;
  if (p.length < 8) return false;
  if (username.length >= 2 && p.toLowerCase().includes(username.toLowerCase())) return false;
  if (!validatePasswordStrict(p)) return false;

  return true;
};
