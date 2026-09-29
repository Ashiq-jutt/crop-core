import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { icons } from '@/components/icons';
import { colors, palette, spacing } from '@/theme';

import { AppText } from './AppText';
import { IconButton } from './IconButton';
import { SvgIcon } from './SvgIcon';

type AppBarProps = {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: ReactNode;
};

/** "TOp App Bar" component: 56pt tall, circular back button on neutralColor95. */
export function AppBar({ title, onBack, showBack = true, right }: AppBarProps) {
  const handleBack = onBack ?? (() => router.canGoBack() && router.back());
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {showBack ? (
          <IconButton
            accessibilityLabel="Go back"
            onPress={handleBack}
            background={palette.neutralColor95}
            icon={<SvgIcon source={icons.arrowLeft} width={24} />}
          />
        ) : null}
      </View>
      {title ? (
        <AppText variant="titleMedium" color={colors.textPrimary} numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
      ) : null}
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: { minWidth: 40 },
  right: { alignItems: 'flex-end', marginLeft: 'auto' },
  title: { flex: 1, textAlign: 'center' },
});
