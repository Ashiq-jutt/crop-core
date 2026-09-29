import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

import { PrimaryButton } from './PrimaryButton';

type FooterButtonProps = { label: string; onPress: () => void; divider?: boolean; medium?: boolean };

/** Sticky bottom CTA: 24pt above and below a full-width 50pt button. */
export function FooterButton({ label, onPress, divider = false, medium = false }: FooterButtonProps) {
  return (
    <View style={[styles.footer, divider && styles.divider]}>
      <PrimaryButton label={label} onPress={onPress} medium={medium} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  divider: { backgroundColor: colors.surface, boxShadow: '0px -3px 8px rgba(19, 20, 22, 0.04)' },
});
