import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';
import { PrimaryButton } from '@/modules/onboarding/components/PrimaryButton';

type SetupFooterProps = { label: string; onPress: () => void; children?: ReactNode; shadow?: boolean };

/** Sticky CTA area: white panel casting a soft shadow upwards over the scrolling content. */
export function SetupFooter({ label, onPress, children, shadow = true }: SetupFooterProps) {
  return (
    <View style={[styles.footer, shadow && styles.shadow]}>
      {children}
      <PrimaryButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 23, backgroundColor: colors.surface },
  shadow: { boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.04)' },
});
