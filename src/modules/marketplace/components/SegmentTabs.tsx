import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Txt } from './Txt';
import { mk } from './tokens';

type SegmentTabsProps<T extends string> = {
  fontSize?: number;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/** Two-up toggle: active = peach fill with orange outline, inactive = grey fill. */
export function SegmentTabs<T extends string>({ options, value, onChange, height = 40, fontSize = 13, style }: SegmentTabsProps<T>) {
  return (
    <View style={[styles.row, style]}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={o.label}
            onPress={() => onChange(o.id)}
            style={[styles.tab, { height }, active ? styles.active : styles.inactive]}>
            <Txt size={fontSize} weight={active ? 'semibold' : 'regular'} color={mk.ink} lineHeight={18}>
              {o.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 17, paddingHorizontal: 16 },
  tab: { flex: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  active: { backgroundColor: mk.orangeSurface, borderColor: '#EC6619' },
  inactive: { backgroundColor: mk.surface, borderColor: mk.surface },
});
