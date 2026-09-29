import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { statusCounts, statusTabs, type TaskStatus } from '../data/tasks';

type Props = { value: TaskStatus; onChange: (status: TaskStatus) => void };

/** Three equal-width status pills: Due / Completed / Overdue. */
export function StatusChips({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {statusTabs.map((tab) => {
        const selected = tab.id === value;
        const label = `${tab.label} (${statusCounts[tab.id]})`;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={label}
            onPress={() => onChange(tab.id)}
            style={[styles.chip, selected && styles.chipSelected]}>
            <View style={tab.labelWidth ? [styles.clip, { width: tab.labelWidth }] : null}>
              <AppText
                variant="labelMedium"
                align={tab.labelWidth ? 'left' : 'center'}
                color={colors.textPrimary}
                style={[selected && styles.labelSelected, tab.labelWidth ? styles.unwrapped : null]}>
                {label}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 16, paddingHorizontal: 16 },
  chip: {
    flex: 1,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.neutral95,
    borderRadius: 10,
    backgroundColor: palette.neutral95,
  },
  chipSelected: { borderColor: '#ED6F26', backgroundColor: colors.primarySurface },
  labelSelected: { fontFamily: fonts.semibold, letterSpacing: 0.4 },
  clip: { overflow: 'hidden' },
  unwrapped: { width: 120 },
});
