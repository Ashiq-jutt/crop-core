import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Microphone2, SearchNormal1 } from 'iconsax-react-native';

import { fonts } from '@/theme';

import { mk } from './tokens';

type SearchRowProps = { placeholder: string };

/** Outlined search field with the square microphone button beside it. */
export function SearchRow({ placeholder }: SearchRowProps) {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <SearchNormal1 size={24} color={mk.ink} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={mk.subtle}
          accessibilityLabel={placeholder}
          style={styles.input}
        />
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Voice search" style={styles.mic}>
        <Microphone2 size={32} color={mk.ink} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, paddingHorizontal: 16 },
  field: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    gap: 12,
  },
  input: { flex: 1, height: 46, fontFamily: fonts.regular, fontSize: 14, color: mk.text },
  mic: { width: 48, height: 48, borderRadius: 12, backgroundColor: mk.surface, alignItems: 'center', justifyContent: 'center' },
});
