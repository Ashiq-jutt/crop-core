import type { ReactNode } from 'react';
import { StyleSheet, TextInput, View, type KeyboardTypeOptions, type TextStyle } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

type SetupInputProps = {
  label?: string;
  /** Label style differs per screen: 14pt dark ("Your name") or 12pt muted ("Feaild Size"). */
  labelStyle?: TextStyle;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  right?: ReactNode;
};

/** Grey 48pt input with an optional label above and trailing icon. */
export function SetupInput({ label, labelStyle, value, onChangeText, editable = true, keyboardType, right }: SetupInputProps) {
  return (
    <View style={styles.root}>
      {label ? (
        <AppText style={[styles.label, labelStyle]} color={colors.textPrimary}>
          {label}
        </AppText>
      ) : null}
      <View style={styles.box}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          keyboardType={keyboardType}
          accessibilityLabel={label}
          style={styles.input}
        />
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 4 },
  label: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, paddingHorizontal: 4 },
  box: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});
