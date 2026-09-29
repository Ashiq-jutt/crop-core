import { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, palette, radius, spacing } from '@/theme';

type Props = {
  length: number;
  value: string;
  onChange: (value: string) => void;
};

/**
 * Six OTP boxes backed by one hidden TextInput (so paste / SMS autofill work).
 * Box states from Figma: filled (white + border), active (primary95 + primary50 border), empty (neutral95).
 */
export function OtpInput({ length, value, onChange }: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()} accessibilityLabel="One-time password">
      <View style={styles.row}>
        {Array.from({ length }, (_, i) => {
          const digit = value[i];
          const active = i === value.length;
          return (
            <View
              key={i}
              style={[styles.box, digit ? styles.filled : active ? styles.active : styles.empty]}>
              <AppText variant={active ? 'labelMedium' : 'labelLargeStrong'} color={palette.neutralColor10}>
                {digit ?? (active ? '|' : '')}
              </AppText>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        style={styles.hidden}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  box: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  filled: { backgroundColor: colors.surface, borderColor: colors.border },
  active: { backgroundColor: colors.primarySurface, borderColor: colors.primaryBorder },
  empty: { backgroundColor: colors.surfaceMuted, borderColor: colors.surfaceMuted },
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0 },
});
