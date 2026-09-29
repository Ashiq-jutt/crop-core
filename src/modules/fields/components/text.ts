import type { TextStyle } from 'react-native';

import { fonts } from '@/theme';

type Weight = keyof typeof fonts;

/**
 * Measured text style: flattened Figma screens don't map onto the theme variants, so sizes
 * are fitted to the rendered glyphs (they land between the usual steps, e.g. 14.5 / 13).
 */
export function font(weight: Weight, fontSize: number, lineHeight: number, color?: string): TextStyle {
  return { fontFamily: fonts[weight], fontSize, lineHeight, color };
}

/** Colours sampled from the Field Managment / Photo Digonsis screens that have no palette token. */
export const ink = {
  title: '#131416',
  body: '#383C42',
  muted: '#545963',
  cardBorder: '#E3E5E8',
  chipBorder: '#E3E5E8',
  success: '#3CBF61',
  successSurface: '#E8F8EC',
  warning: '#EB5C0A',
  warningSurface: '#FEEDE1',
  insight: '#FFF0E0',
};
