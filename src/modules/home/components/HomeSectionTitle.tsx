import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

type Props = { title: string; actionLabel?: string; onAction?: () => void };

/** Home section heading: 16/24 semibold title with an optional orange 12pt "View All" link. */
export function HomeSectionTitle({ title, actionLabel, onAction }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="titleMedium">{title}</AppText>
      {actionLabel ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`${title} ${actionLabel}`} onPress={onAction} hitSlop={8}>
          <AppText variant="labelMediumStrong" color={colors.primary} style={styles.action}>
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 13,
  },
  action: { letterSpacing: 0.4 },
});
