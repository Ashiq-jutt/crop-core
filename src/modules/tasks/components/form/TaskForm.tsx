import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar2, Microphone2 } from 'iconsax-react-native';

import { AppText, Screen } from '@/components/ui';
import { colors, fonts, palette, typography } from '@/theme';

import {
  activeCrops,
  dayOptions,
  durationOptions,
  hourOptions,
  minuteOptions,
  periodOptions,
  repeatOptions,
  type TaskDraft,
  type TaskKind,
} from '../../data/tasks';
import { TaskHeader } from '../TaskHeader';
import { CropOption } from './CropOption';
import { OptionChip } from './OptionChip';
import { TaskTypeGrid } from './TaskTypeGrid';
import { TimeWheel } from './TimeWheel';

type Recommendation = { title: string; icon: number; manual: boolean; onToggleManual: (value: boolean) => void };

type Props = {
  title: string;
  initial: TaskDraft;
  onSubmit: (draft: TaskDraft) => void;
  /** Add Instruction heading: 16pt on Add Task, 14pt on Edit / System. */
  compactInstructionTitle?: boolean;
  notesHeight: number;
  typeLabels?: Partial<Record<TaskKind, string>>;
  recommendation?: Recommendation;
};

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      onPress={() => onChange(!value)}
      style={[styles.track, value && styles.trackOn]}>
      <View style={[styles.knob, value && styles.knobOn]} />
    </Pressable>
  );
}

export function TaskForm({ title, initial, onSubmit, compactInstructionTitle, notesHeight, typeLabels, recommendation }: Props) {
  const [draft, setDraft] = useState<TaskDraft>(initial);
  const set = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const footer = (
    <View style={styles.footer}>
      <LinearGradient pointerEvents="none" colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.03)']} style={styles.footerShade} />
      <Pressable accessibilityRole="button" accessibilityLabel="Add Task" onPress={() => onSubmit(draft)} style={styles.submit}>
        <AppText variant="titleMedium" color={colors.textOnPrimary}>
          Add Task
        </AppText>
      </Pressable>
    </View>
  );

  return (
    <Screen header={<TaskHeader title={title} />} footer={footer} contentStyle={styles.content}>
      {recommendation ? (
        <>
          <View style={styles.recommendation}>
            <Image source={recommendation.icon} style={styles.recommendationIcon} />
            <AppText variant="labelLargeStrong">{recommendation.title}</AppText>
          </View>
          <View style={styles.manualRow}>
            <AppText variant="labelLargeStrong">Add Task Details Manually</AppText>
            <Toggle
              value={recommendation.manual}
              onChange={recommendation.onToggleManual}
              label="Add Task Details Manually"
            />
          </View>
          <View style={styles.hairline} />
        </>
      ) : null}

      <View style={styles.body}>
        <AppText variant="titleMedium" style={styles.firstTitle}>
          Select Active Crop
        </AppText>
        <View style={styles.crops}>
          {activeCrops.map((c) => (
            <CropOption key={c.id} crop={c} selected={draft.cropId === c.id} onPress={() => set('cropId', c.id)} />
          ))}
        </View>

        <AppText variant="titleMedium" style={styles.sectionTitle}>
          Select Task Type
        </AppText>
        <TaskTypeGrid value={draft.kind} onChange={(k) => set('kind', k)} labels={typeLabels} />

        <View style={styles.custom}>
          <TextInput
            value={draft.customTask}
            onChangeText={(v) => set('customTask', v)}
            placeholder="Custom Task"
            placeholderTextColor={palette.neutral30}
            accessibilityLabel="Custom Task"
            style={styles.customInput}
          />
          <Pressable accessibilityRole="button" accessibilityLabel="Dictate custom task" hitSlop={8}>
            <Microphone2 size={24} color={colors.textPrimary} />
          </Pressable>
        </View>

        <AppText variant="titleMedium" style={styles.setTime}>
          Set Time
        </AppText>
        <View style={styles.timeCard}>
          <AppText variant="labelLargeStrong">When to do this ?</AppText>
          <View style={styles.dayRow}>
            {dayOptions.map((d) => (
              <OptionChip key={d} label={d} flex selected={draft.day === d} onPress={() => set('day', d)} />
            ))}
            <Pressable accessibilityRole="button" accessibilityLabel="Pick a date" style={styles.calendar}>
              <Calendar2 size={24} color={colors.textPrimary} />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.durations}
            contentContainerStyle={styles.durationContent}>
            {durationOptions.map((d) => (
              <OptionChip key={d} label={d} selected={draft.duration === d} onPress={() => set('duration', d)} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.wheel}>
          <TimeWheel
            hour={{ options: hourOptions, index: draft.hour, cyclic: true, label: 'Hour', onChange: (i) => set('hour', i) }}
            minute={{
              options: minuteOptions,
              index: draft.minute,
              cyclic: true,
              label: 'Minute',
              onChange: (i) => set('minute', i),
            }}
            period={{
              options: periodOptions,
              index: draft.period,
              cyclic: false,
              label: 'Period',
              onChange: (i) => set('period', i),
            }}
          />
        </View>

        <View style={styles.repeatCard}>
          <AppText variant="labelMediumStrong" style={styles.flex}>
            Repeat This Tak
          </AppText>
          <View style={styles.repeatChips}>
            {repeatOptions.map((r) => (
              <OptionChip
                key={r}
                label={r}
                selected={draft.repeat === r}
                onPress={() => set('repeat', draft.repeat === r ? null : r)}
              />
            ))}
          </View>
        </View>

        <AppText
          variant={compactInstructionTitle ? 'labelLargeStrong' : 'titleMedium'}
          style={compactInstructionTitle ? styles.instructionTitleCompact : styles.instructionTitle}>
          Add Instruction
        </AppText>
        <TextInput
          value={draft.notes}
          onChangeText={(v) => set('notes', v)}
          placeholder="Add Any Notes"
          placeholderTextColor={palette.neutral30}
          accessibilityLabel="Add Instruction"
          multiline
          textAlignVertical="top"
          style={[styles.notes, { height: notesHeight }, draft.notes ? styles.notesFilled : null]}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  body: { paddingHorizontal: 16 },
  flex: { flex: 1 },
  recommendation: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 14,
    backgroundColor: colors.successSurface,
  },
  recommendationIcon: { width: 28, height: 28 },
  manualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  hairline: { height: 1, marginTop: 15, backgroundColor: colors.border },
  track: { width: 44, height: 24, padding: 2, borderRadius: 12, backgroundColor: palette.neutral90 },
  trackOn: { backgroundColor: colors.primary },
  knob: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.surface },
  knobOn: { alignSelf: 'flex-end' },
  firstTitle: { marginTop: 24, marginBottom: 12 },
  crops: { gap: 8 },
  sectionTitle: { marginTop: 14, marginBottom: 10 },
  custom: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 16,
    paddingRight: 14,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
  },
  customInput: { flex: 1, height: 48, ...typography.labelLarge, color: colors.textPrimary },
  setTime: { marginTop: 16, marginBottom: 12 },
  timeCard: {
    paddingTop: 10.5,
    paddingBottom: 10,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 12.5 },
  calendar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.neutral95,
  },
  durations: { marginTop: 8, marginRight: -10 },
  durationContent: { gap: 8 },
  wheel: { marginTop: 12 },
  repeatCard: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  repeatChips: { flexDirection: 'row', gap: 9 },
  instructionTitle: { marginTop: 17, marginBottom: 11 },
  instructionTitleCompact: { marginTop: 16, marginBottom: 12 },
  notes: {
    paddingTop: 11,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
  notesFilled: { fontFamily: fonts.semibold, letterSpacing: 0.5 },
  footer: { paddingTop: 23, paddingBottom: 24, paddingHorizontal: 16, backgroundColor: colors.surface },
  footerShade: { position: 'absolute', left: 0, right: 0, top: -10, height: 10 },
  submit: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
});
