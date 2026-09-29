import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

export type ChipTone = 'success' | 'warning' | 'danger' | 'primary' | 'neutral';

const tones: Record<ChipTone, { bg: string; fg: string }> = {
  success: { bg: colors.successSurface, fg: colors.success },
  warning: { bg: colors.warningSurface, fg: colors.warning },
  danger: { bg: colors.dangerSurface, fg: colors.danger },
  primary: { bg: colors.primarySurface, fg: colors.primary },
  neutral: { bg: colors.surfaceMuted, fg: colors.textPrimary },
};

type ChipProps = {
  label: string;
  tone?: ChipTone;
  /** Trailing emoji / glyph, e.g. 💧 or ✅ as used in the design. */
  trailing?: string;
};

/** Status pill: 32pt tall, fully rounded. */
export function Chip({ label, tone = 'neutral', trailing }: ChipProps) {
  const t = tones[tone];
  return (
    <View style={[styles.chip, { backgroundColor: t.bg }]}>
      <AppText variant="labelLarge" color={t.fg}>
        {trailing ? `${label} ${trailing}` : label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
  },
});
