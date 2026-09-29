import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';

type TabSwitchProps<T extends string> = {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
};

/** Two equal pill tabs above a hairline divider ("My Request / Incoming Request"). */
export function TabSwitch<T extends string>({ tabs, value, onChange }: TabSwitchProps<T>) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {tabs.map((t) => {
          const active = t.id === value;
          return (
            <Pressable
              key={t.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(t.id)}
              style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.label, active && styles.labelActive]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: collabColors.border,
  },
  row: { flexDirection: 'row', gap: 16 },
  tab: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: collabColors.grey,
    backgroundColor: collabColors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: { backgroundColor: colors.primarySurface, borderColor: colors.primary },
  label: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: colors.textPrimary },
  labelActive: { fontFamily: fonts.medium },
});
