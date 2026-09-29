import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { ActionButton } from '@/modules/fields/components/ActionButton';
import { FieldSheet } from '@/modules/fields/components/FieldSheet';
import { GlyphCircle } from '@/modules/fields/components/GlyphCircle';
import { TaskSchedule, type Schedule } from '@/modules/fields/components/TaskSchedule';
import { font, ink } from '@/modules/fields/components/text';
import { defaultSchedule } from '@/modules/fields/data/tasks';
import { palette } from '@/theme';

import { diagnosis, taskDraft } from '../data/diagnosis';

const SHEET_BG = '#FBFBFB';

type AddTaskSheetProps = { visible: boolean; onClose: () => void };

/** "Add Task" sheet opened from a suggested action (pre-filled field + task type). */
export function AddTaskSheet({ visible, onClose }: AddTaskSheetProps) {
  const [schedule, setSchedule] = useState<Schedule>({ ...defaultSchedule, note: '' });

  return (
    <FieldSheet visible={visible} onClose={onClose} title="Add Task" variant="task" background={SHEET_BG}>
      <Text style={[styles.section, styles.first]}>Selected Field</Text>
      <View style={styles.card}>
        <Image source={diagnosis.badge} style={styles.icon} />
        <View>
          <Text style={styles.name}>{taskDraft.field.name}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{taskDraft.field.area}</Text>
            <View style={styles.metaDivider} />
            <Text style={styles.metaText}>{taskDraft.field.location}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.section}>Selected Task Type</Text>
      <View style={styles.card}>
        <GlyphCircle source={taskDraft.taskType.icon} size={40} background="#E0EFFF" />
        <Text style={styles.name}>{taskDraft.taskType.label}</Text>
      </View>

      <Text style={styles.section}>Set Time</Text>
      <View style={styles.schedule}>
        <TaskSchedule value={schedule} onChange={setSchedule} notePlaceholder="Add Any Notes" surface={SHEET_BG} variant="sheet" />
      </View>

      <ActionButton label="Add Task" height={50} onPress={onClose} labelStyle={styles.submitLabel} style={styles.submit} />
    </FieldSheet>
  );
}

const styles = StyleSheet.create({
  section: { ...font('medium', 17, 24, ink.title), marginTop: 15 },
  first: { marginTop: 15 },
  card: {
    marginTop: 13,
    height: 64,
    borderWidth: 1,
    borderColor: '#E6E8EA',
    borderRadius: 12,
    backgroundColor: palette.neutral100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },
  icon: { width: 40, height: 40 },
  name: font('medium', 14.5, 20, ink.title),
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  metaText: font('regular', 13, 18, ink.body),
  metaDivider: { width: 1, height: 14, backgroundColor: ink.cardBorder, marginHorizontal: 8 },
  schedule: { marginTop: 12 },
  submit: { marginTop: 16 },
  submitLabel: font('medium', 17, 24),
});
