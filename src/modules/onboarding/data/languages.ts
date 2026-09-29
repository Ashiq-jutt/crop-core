export type Language = {
  code: string;
  /** Name in the language's own script. */
  nativeName: string;
  /** Name in the device language (English). */
  name: string;
};

export const languages: Language[] = [
  { code: 'en', nativeName: 'English', name: 'English' },
  { code: 'hi', nativeName: 'हिंदी', name: 'Hindi' },
  { code: 'gu', nativeName: 'ગુજરાતી', name: 'Guajarati' },
  { code: 'mr', nativeName: 'मराठी', name: 'Marathi' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', name: 'kannada' },
  { code: 'ta', nativeName: 'தமிழ்', name: 'Tamil' },
  { code: 'bn', nativeName: 'বাংলা', name: 'Bangla' },
  { code: 'ml', nativeName: 'മലയാളം', name: 'Malayalam' },
];
