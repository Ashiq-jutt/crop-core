export const countries = [{ code: 'IN', dialCode: '+91', flag: require('@assets/images/auth/flag-india.png') }];

export const demoPhoneNumber = '9988776655';

export const OTP_LENGTH = 6;
export const OTP_RESEND_SECONDS = 30;

/** "+91 XXXXXXXX55" — keep the last two digits visible. */
export const maskPhone = (dialCode: string, phone: string) =>
  `${dialCode} ${'X'.repeat(Math.max(phone.length - 2, 0))}${phone.slice(-2)}`;
