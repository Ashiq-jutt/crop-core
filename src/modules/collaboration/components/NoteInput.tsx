import { StyleSheet, TextInput } from 'react-native';

import { colors, fonts, palette } from '@/theme';

import { collabColors } from '../theme';

type NoteInputProps = { value: string; onChangeText: (value: string) => void; placeholder?: string };

export function NoteInput({ value, onChangeText, placeholder }: NoteInputProps) {
  return (
    <TextInput
      multiline
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={palette.neutral20}
      accessibilityLabel="Short note"
      textAlignVertical="top"
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 16,
    height: 72,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: fonts.regular,
    fontSize: 12.8,
    lineHeight: 18,
    color: colors.textPrimary,
  },
});
