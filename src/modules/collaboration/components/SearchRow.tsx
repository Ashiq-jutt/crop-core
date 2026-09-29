import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Microphone2, SearchNormal1 } from 'iconsax-react-native';

import { colors, fonts, palette } from '@/theme';

import { collabColors } from '../theme';

type SearchRowProps = { value: string; onChangeText: (value: string) => void; placeholder: string };

export function SearchRow({ value, onChangeText, placeholder }: SearchRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <SearchNormal1 size={24} color={colors.textPrimary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={palette.neutral30}
          accessibilityLabel={placeholder}
          style={styles.input}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voice search"
        onPress={() => onChangeText('')}
        style={styles.mic}>
        <Microphone2 size={24} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, marginHorizontal: 16, marginTop: 16 },
  field: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: collabColors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  mic: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: collabColors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
