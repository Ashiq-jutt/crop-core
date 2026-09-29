import type { TextStyle } from 'react-native';

/** Font family names registered in the root layout via expo-font. */
export const fonts = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
  outfit: 'Outfit_400Regular',
} as const;

/**
 * Text styles matching the Figma "Typography/*" styles (Material 3 naming).
 * The "Extra" suffix in Figma marks the bolder variant of a slot; it maps to `*Strong` here.
 */
export const typography = {
  headlineSmall: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 32 },
  titleLarge: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 24 },
  titleMedium: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
  titleMediumRegular: { fontFamily: fonts.outfit, fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
  bodyLarge: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, letterSpacing: 0.15 },
  labelLarge: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  labelLargeStrong: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  labelLargeMedium: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  labelMedium: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  labelMediumStrong: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  bodySmall: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  caption: { fontFamily: fonts.regular, fontSize: 10, lineHeight: 14, letterSpacing: 0.4 },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
