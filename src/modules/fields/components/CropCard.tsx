import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, TickCircle } from 'iconsax-react-native';

import { DashedDivider } from '@/components/ui';
import { palette } from '@/theme';

import { cropBadges, cropOption } from '../data/crops';
import type { ManagedCrop } from '../data/fields';
import { ActionButton } from './ActionButton';
import { PillButton, StatusChip } from './Chips';
import { GlyphCircle } from './GlyphCircle';
import { font, ink } from './text';

const irrigationGlyph = require('@assets/images/diagnosis/irrigation.png');

type CardAction = { label: string; onPress: () => void };

type CropCardProps = {
  crop: ManagedCrop;
  primary: CardAction;
  secondary: CardAction;
  onAddTask: () => void;
  taskDone?: boolean;
  onToggleTask?: () => void;
};

export function CropBadge({ crop, size }: { crop: ManagedCrop['crop']; size: number }) {
  const badge = cropBadges[crop];
  return badge ? (
    <Image source={badge} style={{ width: size, height: size }} />
  ) : (
    <GlyphCircle source={cropOption(crop).glyph} size={size} />
  );
}

function DateBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.dateBlock}>
      <View style={styles.dateIcon}>
        <Calendar size={16} color={ink.title} />
      </View>
      <View>
        <Text style={styles.dateLabel}>{label}</Text>
        <Text style={styles.dateValue}>{value}</Text>
      </View>
    </View>
  );
}

/** Crop summary card used on Field Details, Crop Details and Update Crop Status. */
export function CropCard({ crop, primary, secondary, onAddTask, taskDone = false, onToggleTask }: CropCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <CropBadge crop={crop.crop} size={48} />
        <View style={styles.flex}>
          <Text style={styles.name}>{crop.name}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{crop.area}</Text>
            <View style={styles.metaDivider} />
            <Text style={styles.metaText}>{crop.stage}</Text>
          </View>
        </View>
        <StatusChip status={crop.status} />
      </View>

      <View style={styles.dates}>
        <DateBlock label="Planted" value={crop.planted} />
        <View style={styles.dateDivider} />
        <DateBlock label="Harvesting" value={crop.harvesting} />
      </View>

      <Text style={styles.lastUpdate}>{crop.lastUpdate}</Text>
      <DashedDivider style={styles.divider} />

      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>Today Task</Text>
        <PillButton label="Add Task" onPress={onAddTask} />
      </View>
      <View style={styles.taskRow}>
        <Image source={irrigationGlyph} style={styles.taskIcon} />
        <View style={styles.flex}>
          <Text style={styles.taskName}>{crop.task.name}</Text>
          <Text style={styles.taskDuration}>{crop.task.duration}</Text>
        </View>
        <Text style={styles.taskTime}>{crop.task.time}</Text>
        <TaskCheck done={taskDone} onPress={onToggleTask} label={`${crop.task.name} done`} />
      </View>
      <DashedDivider style={styles.dividerAfterTask} />

      <View style={styles.actions}>
        <ActionButton label={primary.label} onPress={primary.onPress} height={40} style={styles.flex} labelStyle={styles.actionLabel} />
        <ActionButton
          label={secondary.label}
          onPress={secondary.onPress}
          variant="muted"
          height={40}
          style={styles.flex}
          labelStyle={styles.actionLabelMuted}
        />
      </View>
    </View>
  );
}

function TaskCheck({ done, onPress, label }: { done: boolean; onPress?: () => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      accessibilityLabel={label}
      hitSlop={8}
      onPress={onPress}
      style={styles.check}>
      <TickCircle size={22} color={done ? palette.success : ink.cardBorder} variant="Bold" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    padding: 11,
    backgroundColor: palette.neutral100,
  },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  name: font('medium', 15, 20, ink.title),
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  metaText: font('regular', 12.5, 18, ink.body),
  metaDivider: { width: 1, height: 14, backgroundColor: ink.cardBorder, marginHorizontal: 6 },
  dates: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  dateBlock: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabel: font('regular', 13, 17, ink.muted),
  dateValue: font('semibold', 14.5, 19, ink.title),
  dateDivider: { width: 2, height: 24, backgroundColor: ink.title, marginRight: 22, marginLeft: -2 },
  lastUpdate: { ...font('regular', 14.5, 20, ink.body), marginTop: 12 },
  divider: { marginTop: 11 },
  dividerAfterTask: { marginTop: 10 },
  taskHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  taskTitle: font('medium', 15, 20, ink.title),
  taskRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  taskIcon: { width: 41, height: 41, marginLeft: -1, marginRight: 7 },
  taskName: font('medium', 13, 18, ink.title),
  taskDuration: font('regular', 12.5, 18, ink.muted),
  taskTime: { ...font('medium', 13, 18, ink.title), marginRight: 18 },
  check: { marginRight: 9 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 12 },
  actionLabel: font('medium', 14.5, 20),
  actionLabelMuted: font('regular', 14.5, 20),
});
