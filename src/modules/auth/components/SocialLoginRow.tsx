import { Pressable, StyleSheet, View } from 'react-native';

import { icons } from '@/components/icons';
import { AppText, SvgIcon } from '@/components/ui';
import { colors, palette, radius, spacing } from '@/theme';

const providers = [
  { id: 'facebook', label: 'Continue with Facebook', icon: icons.facebook, width: 24 },
  { id: 'google', label: 'Continue with Google', icon: icons.google, width: 23.04 },
  { id: 'apple', label: 'Continue with Apple', icon: icons.apple, width: 19.5 },
] as const;

type Props = { onPress?: (provider: (typeof providers)[number]['id']) => void };

export function SocialLoginRow({ onPress }: Props) {
  return (
    <View>
      <View style={styles.divider}>
        <View style={styles.dash} />
        <AppText variant="labelMedium" color={colors.textPrimary} style={styles.dividerText}>
          Or Continue With
        </AppText>
        <View style={styles.dash} />
      </View>
      <View style={styles.row}>
        {providers.map((p) => (
          <Pressable
            key={p.id}
            accessibilityRole="button"
            accessibilityLabel={p.label}
            onPress={() => onPress?.(p.id)}
            style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}>
            <View style={styles.iconBox}>
              <SvgIcon source={p.icon} width={p.width} height={24} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dash: {
    flex: 1,
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: palette.neutral60,
  },
  dividerText: { color: palette.neutral10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  button: {
    width: 88,
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  iconBox: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
});
