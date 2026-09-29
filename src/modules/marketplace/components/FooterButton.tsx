import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Txt } from './Txt';
import { mk } from './tokens';

type PrimaryButtonProps = {
  label: string;
  size?: number;
  weight?: 'medium' | 'semibold';
  onPress: () => void;
  outline?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/** Orange (or orange-outlined) pill button used by every marketplace CTA. */
export function PrimaryButton({ label, onPress, outline, height = 50, size = 16, weight = 'medium', style }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.button, { height }, outline ? styles.outline : styles.filled, style]}>
      <Txt size={size} weight={weight} color={outline ? mk.orange : '#FFFFFF'} lineHeight={24}>
        {label}
      </Txt>
    </Pressable>
  );
}

type FooterBarProps = { children: ReactNode };

/** Sticky footer separated from the scroll area by a 2pt hairline. */
export function FooterBar({ children }: FooterBarProps) {
  return <View style={styles.bar}>{children}</View>;
}

export function FooterButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <FooterBar>
      <PrimaryButton label={label} onPress={onPress} />
    </FooterBar>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  filled: { backgroundColor: mk.orangeButton },
  outline: { borderWidth: 1.5, borderColor: mk.orange, backgroundColor: '#FFFFFF' },
  bar: {
    borderTopWidth: 2,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
});
