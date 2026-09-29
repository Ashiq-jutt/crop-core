/**
 * Colour tokens. Names mirror the Figma variable collections ("Primary/40", "Nutrals/95" …)
 * so a value can be traced back to the design file. Semantic colours (success, danger …)
 * are sampled from the flattened screens, which carry no variables.
 */
export const palette = {
  primary40: '#EB5C0A',
  primary50: '#F67428',
  primary60: '#F4925A',
  primary80: '#FAD6C1',
  primary95: '#FEECE2',
  primary100: '#FFFFFF',

  neutral0: '#131416',
  neutral10: '#26282C',
  neutral20: '#383C42',
  neutral30: '#545963',
  neutral50: '#717784',
  neutral60: '#A7ABB4',
  neutral90: '#E3E5E8',
  neutral95: '#F3F4F6',
  neutral100: '#FFFFFF',

  // "Nutrals Color/*" — a second, slightly cooler neutral ramp used by headings
  neutralColor10: '#212427',
  neutralColor30: '#464D53',
  neutralColor95: '#F2F4F8',

  success: '#3CBF61',
  successStrong: '#01A901',
  successSurface: '#E8F8EC',
  warning: '#EE6707',
  warningSurface: '#FEEDE1',
  danger: '#E21717',
  dangerSurface: '#FDE8E8',
  accentYellow: '#DA8E07',
} as const;

export const colors = {
  background: palette.neutral100,
  surface: palette.neutral100,
  surfaceMuted: palette.neutral95,
  border: palette.neutral90,
  divider: palette.neutral90,
  dividerStrong: palette.neutral60,

  textPrimary: palette.neutral0,
  textHeading: palette.neutralColor10,
  textSecondary: palette.neutral20,
  textTertiary: palette.neutral30,
  textMuted: palette.neutral50,
  textPlaceholder: palette.neutral30,
  textOnPrimary: palette.neutral100,

  primary: palette.primary40,
  primaryBorder: palette.primary50,
  primarySurface: palette.primary95,

  success: palette.success,
  successStrong: palette.successStrong,
  successSurface: palette.successSurface,
  warning: palette.warning,
  warningSurface: palette.warningSurface,
  danger: palette.danger,
  dangerSurface: palette.dangerSurface,
} as const;

export type ColorToken = keyof typeof colors;
