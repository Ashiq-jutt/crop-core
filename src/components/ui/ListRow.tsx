import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowRight2 } from 'iconsax-react-native';

import { colors, palette, spacing } from '@/theme';

import { AppText } from './AppText';

type ListRowProps = {
  title: string;
  subtitle?: string;
  /** Leading element — usually an icon inside a 40pt neutral circle. */
  leading?: ReactNode;
  /** Trailing element; defaults to a chevron when `onPress` is set. */
  trailing?: ReactNode;
  onPress?: () => void;
  destructive?: boolean;
};

export function ListRow({ title, subtitle, leading, trailing, onPress, destructive }: ListRowProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.text}>
        <AppText variant="labelLargeStrong" color={destructive ? colors.danger : colors.textPrimary}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="bodySmall" color={palette.neutral30}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing ?? (onPress ? <ArrowRight2 size={20} color={colors.textPrimary} /> : null)}
    </Pressable>
  );
}

/** 40pt round neutral container for a leading icon. */
export function IconCircle({ children, background = colors.surfaceMuted, size = 40 }: {
  children: ReactNode;
  background?: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  leading: {},
  text: { flex: 1, gap: 2 },
});
