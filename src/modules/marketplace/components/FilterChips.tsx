import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Txt } from './Txt';
import { mk } from './tokens';

type FilterChipsProps = {
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
};

/** Grey pill filters under the search field; tapping the active one clears it. */
export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rail} contentContainerStyle={styles.content}>
      {options.map((o) => {
        const active = o === selected;
        return (
          <Pressable
            key={o}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={o}
            onPress={() => onSelect(active ? null : o)}
            style={[styles.chip, active && styles.active]}>
            <Txt size={13} color={active ? mk.orange : '#1C1D1E'} lineHeight={18}>
              {o}
            </Txt>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rail: { marginHorizontal: 16, flexGrow: 0 },
  content: { gap: 16 },
  chip: {
    height: 32,
    paddingHorizontal: 11,
    borderRadius: 10,
    backgroundColor: mk.surface,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: mk.surface,
  },
  active: { backgroundColor: mk.orangeSurface, borderColor: mk.orange },
});
