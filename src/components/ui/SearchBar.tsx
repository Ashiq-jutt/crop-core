import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { Microphone2, SearchNormal1 } from 'iconsax-react-native';

import { colors, radius, spacing, typography } from '@/theme';

type SearchBarProps = TextInputProps & { showMic?: boolean };

export function SearchBar({ showMic = true, style, ...props }: SearchBarProps) {
  return (
    <View style={styles.bar}>
      <SearchNormal1 size={20} color={colors.textTertiary} />
      <TextInput
        placeholderTextColor={colors.textTertiary}
        returnKeyType="search"
        {...props}
        style={[styles.input, style]}
      />
      {showMic ? <Microphone2 size={20} color={colors.textPrimary} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  input: { flex: 1, ...typography.labelLarge, color: colors.textPrimary, paddingVertical: 0 },
});
