import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

/** Sticky bottom bar with the soft upward shadow seen on every frame. */
export function CollabFooter({ children }: { children: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: colors.surface,
    boxShadow: '0px -6px 12px rgba(0, 0, 0, 0.03)',
  },
});
