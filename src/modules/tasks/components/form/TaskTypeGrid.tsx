import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui';
import { colors, palette } from '@/theme';

import { taskTypes, type TaskKind } from '../../data/tasks';
import { Radio } from './Radio';

type Props = {
  value: TaskKind;
  onChange: (kind: TaskKind) => void;
  /** Per-screen label overrides (the system flow calls Pest Spray "Spray"). */
  labels?: Partial<Record<TaskKind, string>>;
};

/** 3×2 grid of 96pt task-type tiles with a corner radio. */
export function TaskTypeGrid({ value, onChange, labels }: Props) {
  return (
    <View style={styles.grid}>
      {[taskTypes.slice(0, 3), taskTypes.slice(3)].map((row) => (
        <View key={row[0].id} style={styles.row}>
          {row.map((t) => {
            const selected = t.id === value;
            const label = labels?.[t.id] ?? t.label;
            return (
              <Pressable
                key={t.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={label}
                onPress={() => onChange(t.id)}
                style={[styles.tile, selected && styles.tileSelected]}>
                <View style={styles.radio}>
                  <Radio selected={selected} size={16} />
                </View>
                <View style={[styles.bubble, selected && styles.bubbleSelected]}>
                  <Image source={t.icon} style={styles.icon} />
                </View>
                <AppText
                  variant={selected ? 'labelMediumStrong' : 'labelMedium'}
                  color={selected ? colors.primary : colors.textPrimary}
                  style={styles.label}>
                  {label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 16 },
  row: { flexDirection: 'row', gap: 16 },
  tile: {
    flex: 1,
    height: 96,
    alignItems: 'center',
    paddingTop: 21.5,
    borderWidth: 2,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  tileSelected: { borderColor: '#ED6F26' },
  radio: { position: 'absolute', top: 6, right: 6 },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.neutral95,
  },
  bubbleSelected: { backgroundColor: colors.primarySurface },
  icon: { width: 32, height: 32 },
  label: { marginTop: 7.5 },
});
