import { Fragment } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar2 } from 'iconsax-react-native';

import { AppText, DashedDivider } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import type { Task } from '../data/tasks';
import { TrashIcon } from './TrashIcon';

type Props = { task: Task; onMarkDone: () => void; onEdit: () => void; onDelete: () => void };

function TimeSlot({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.slot}>
      <View style={styles.circle}>
        <Calendar2 size={24} color={colors.textPrimary} />
      </View>
      <View>
        <AppText variant="bodySmall" color={palette.neutral30}>
          {label}
        </AppText>
        <AppText variant="labelLargeStrong" style={styles.slotValue}>
          {value}
        </AppText>
      </View>
    </View>
  );
}

export function TaskCard({ task, onMarkDone, onEdit, onDelete }: Props) {
  const done = task.status === 'completed';
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={task.icon} style={styles.icon} />
        <View style={styles.flex}>
          <AppText variant="labelMediumStrong">{task.title}</AppText>
          <View style={styles.meta}>
            {[task.crop, task.field].map((part, i) => (
              <Fragment key={part}>
                {i > 0 ? <View style={styles.dot} /> : null}
                <AppText variant="bodySmall" color={palette.neutral30}>
                  {part}
                </AppText>
              </Fragment>
            ))}
          </View>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`Delete ${task.title}`} onPress={onDelete} style={styles.circle}>
          <TrashIcon color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.times}>
        <View style={[styles.flex, styles.startSlot]}>
          <TimeSlot label="Work Start" value={task.start} />
        </View>
        <View style={styles.separator} />
        <View style={[styles.flex, styles.endSlot]}>
          <TimeSlot label="Work End" value={task.end} />
        </View>
      </View>

      <AppText style={styles.note}>{task.note}</AppText>

      <DashedDivider color={palette.neutral90} style={styles.divider} />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={done ? `${task.title} completed` : `Mark ${task.title} done`}
          accessibilityState={{ disabled: done }}
          disabled={done}
          onPress={onMarkDone}
          style={[styles.button, styles.primary, done && styles.disabled]}>
          <AppText style={styles.primaryLabel} color={colors.textOnPrimary}>
            Mark Done
          </AppText>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${task.title}`} onPress={onEdit} style={[styles.button, styles.secondary]}>
          <AppText variant="bodyLarge" style={styles.secondaryLabel}>
            Edit Task
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 10.5,
    paddingBottom: 9,
    paddingHorizontal: 10.5,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 40, height: 40, marginRight: 8 },
  flex: { flex: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D5D5D5' },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  times: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  slot: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  slotValue: { marginTop: 4, letterSpacing: 0.15 },
  separator: { width: 2, height: 26, backgroundColor: '#7F7F7F' },
  startSlot: { paddingRight: 24 },
  endSlot: { paddingLeft: 24 },
  note: {
    marginTop: 15,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.1,
    color: colors.textPrimary,
  },
  divider: { marginTop: 13.5 },
  actions: { flexDirection: 'row', gap: 9, marginTop: 15 },
  button: { flex: 1, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  primary: { backgroundColor: colors.primary },
  disabled: { opacity: 0.5 },
  secondary: { backgroundColor: colors.surfaceMuted },
  primaryLabel: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, letterSpacing: 0.25 },
  secondaryLabel: { letterSpacing: 0.1 },
});
