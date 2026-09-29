import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { fonts, palette } from '@/theme';

type FormFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  right?: ReactNode;
  /** Bold value text (Edit Profile) vs. regular placeholder-style text (Report Issues). */
  strong?: boolean;
};

export function FormField({ label, right, strong = false, ...input }: FormFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={palette.neutral30}
          {...input}
          style={[styles.input, strong && styles.inputStrong]}
        />
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#363B41',
    marginLeft: 4,
    marginBottom: 4,
  },
  box: {
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: palette.neutral0,
  },
  inputStrong: { fontFamily: fonts.semibold },
});
