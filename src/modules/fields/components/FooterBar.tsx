import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '@/theme';

import { ActionButton } from './ActionButton';
import { font } from './text';

type FooterBarProps = {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
};

/** Sticky white footer with the soft upward shadow and a 50pt primary CTA. */
export function FooterBar({ label, onPress, icon }: FooterBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(23, insets.bottom) }]}>
      <LinearGradient pointerEvents="none" colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.035)']} style={styles.shadow} />
      <ActionButton label={label} onPress={onPress} icon={icon} height={50} labelStyle={styles.label} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { paddingTop: 23, paddingHorizontal: 16, backgroundColor: palette.neutral100 },
  label: font('medium', 16.5, 24),
  shadow: { position: 'absolute', left: 0, right: 0, top: -10, height: 10 },
});
