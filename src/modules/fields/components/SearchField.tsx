import { StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';

import { palette } from '@/theme';

import { font, ink } from './text';

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  /** "outlined" = white with hairline (Fields list); "filled" = grey (crop picker). */
  variant?: 'outlined' | 'filled';
  style?: StyleProp<ViewStyle>;
};

export function SearchField({ value, onChangeText, placeholder, variant = 'outlined', style }: SearchFieldProps) {
  const filled = variant === 'filled';
  return (
    <View style={[styles.box, filled ? styles.filled : styles.outlined, style]}>
      <SearchNormal1 size={24} color={ink.title} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={filled ? ink.muted : '#A8B0B7'}
        accessibilityLabel={placeholder}
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { height: 48, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16 },
  outlined: { borderWidth: 1, borderColor: '#E7E8EB', backgroundColor: palette.neutral100 },
  filled: { backgroundColor: palette.neutral95 },
  input: { flex: 1, ...font('regular', 14.5, 22, ink.title), paddingVertical: 0 },
});
