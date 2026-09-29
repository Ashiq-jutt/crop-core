import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Calendar } from 'iconsax-react-native';

import { colors, palette } from '@/theme';

import { hours, minutes, periods, repeatOptions, whenDays, whenOffsets } from '../data/tasks';
import { OptionChip } from './Chips';
import { font, ink } from './text';

export type Schedule = {
  day: string | null;
  offset: string | null;
  hour: string;
  minute: string;
  period: string;
  repeat: string | null;
  note: string;
};

type TaskScheduleProps = {
  value: Schedule;
  onChange: (next: Schedule) => void;
  notePlaceholder: string;
  /** Card surface: white on screens, the sheet's off-white inside the Add Task sheet. */
  surface?: string;
  /** The sheet variant draws "Add Instruction" as a full section title over a taller note box. */
  variant?: 'screen' | 'sheet';
};

const pillLabel = font('regular', 12.5, 18, ink.title);
const pillSelected = font('semibold', 12.5, 18, ink.title);

function WheelColumn({ values, value, onChange, label, width }: { values: string[]; value: string; onChange: (v: string) => void; label: string; width: number }) {
  const i = Math.max(0, values.indexOf(value));
  const prev = values[(i - 1 + values.length) % values.length];
  const next = values[(i + 1) % values.length];
  const isPeriod = values.length === 2;
  return (
    <View style={[styles.column, { width }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Previous ${label}`}
        onPress={() => onChange(prev)}
        style={styles.wheelSlot}>
        <Text style={styles.wheelMuted}>{isPeriod && i === 0 ? '' : prev}</Text>
      </Pressable>
      <View style={styles.wheelSlot}>
        <Text accessibilityLabel={`${label} ${value}`} style={styles.wheelActive}>
          {value}
        </Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Next ${label}`} onPress={() => onChange(next)} style={styles.wheelSlot}>
        <Text style={[styles.wheelMuted, isPeriod && styles.wheelPeriod]}>{isPeriod && i === 1 ? '' : next}</Text>
      </Pressable>
    </View>
  );
}

/** "Set Time" block shared by Add Task (screen) and the Add Task sheet. */
export function TaskSchedule({ value, onChange, notePlaceholder, surface = palette.neutral100, variant = 'screen' }: TaskScheduleProps) {
  const sheet = variant === 'sheet';
  const set = (patch: Partial<Schedule>) => onChange({ ...value, ...patch });
  return (
    <View>
      <View style={[styles.card, { backgroundColor: surface }]}>
        <Text style={styles.cardTitle}>When to do this ?</Text>
        <View style={styles.dayRow}>
          {whenDays.map((d) => (
            <OptionChip
              key={d}
              label={d}
              height={32}
              selected={value.day === d}
              onPress={() => set({ day: d, offset: null })}
              labelStyle={pillLabel}
              selectedLabelStyle={pillSelected}
              style={styles.dayPill}
            />
          ))}
          <Pressable accessibilityRole="button" accessibilityLabel="Pick a date" style={styles.calendar}>
            <Calendar size={24} color={ink.title} />
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offsetScroll} contentContainerStyle={styles.offsets}>
          {whenOffsets.map((o) => (
            <OptionChip
              key={o}
              label={o}
              height={32}
              selected={value.offset === o}
              onPress={() => set({ offset: o, day: null })}
              labelStyle={pillLabel}
              selectedLabelStyle={pillSelected}
              style={styles.offsetPill}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.wheel}>
        <View style={styles.wheelHighlight} />
        <WheelColumn label="hour" values={hours} value={value.hour} onChange={(hour) => set({ hour })} width={30} />
        <WheelColumn label="minute" values={minutes} value={value.minute} onChange={(minute) => set({ minute })} width={30} />
        <WheelColumn label="period" values={periods} value={value.period} onChange={(period) => set({ period })} width={40} />
      </View>

      <View style={[styles.repeat, { backgroundColor: surface }]}>
        <Text style={styles.repeatLabel}>Repeat This Tak</Text>
        <View style={styles.repeatOptions}>
          {repeatOptions.map((r) => (
            <OptionChip
              key={r}
              label={r}
              height={32}
              selected={value.repeat === r}
              onPress={() => set({ repeat: value.repeat === r ? null : r })}
              labelStyle={pillLabel}
              selectedLabelStyle={pillSelected}
            />
          ))}
        </View>
      </View>

      <Text style={[styles.sectionTitle, sheet && styles.sectionTitleSheet]}>Add Instruction</Text>
      <TextInput
        value={value.note}
        onChangeText={(note) => set({ note })}
        placeholder={notePlaceholder}
        placeholderTextColor={ink.muted}
        accessibilityLabel="Add Instruction"
        multiline
        style={[styles.note, sheet && styles.noteSheet, { backgroundColor: surface }, value.note ? styles.noteFilled : null]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 11,
    paddingLeft: 12,
  },
  cardTitle: font('medium', 14.5, 22, ink.title),
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10, paddingRight: 12 },
  dayPill: { flex: 1 },
  calendar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offsetScroll: { marginTop: 8, marginRight: 0 },
  offsets: { gap: 8.5, paddingRight: 12 },
  offsetPill: { minWidth: 68 },
  wheel: {
    marginTop: 13,
    height: 132,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 4,
  },
  wheelHighlight: {
    position: 'absolute',
    left: 96,
    right: 96,
    top: 48,
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.neutral100,
  },
  column: { alignItems: 'center' },
  wheelSlot: { height: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' },
  wheelMuted: font('medium', 14.5, 22, '#8B909B'),
  wheelPeriod: { color: '#A7ABB4' },
  wheelActive: font('medium', 14.5, 22, colors.primary),
  repeat: {
    marginTop: 13,
    height: 56,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  repeatLabel: font('semibold', 12.5, 18, ink.title),
  repeatOptions: { flexDirection: 'row', gap: 9 },
  sectionTitle: { ...font('medium', 14.5, 22, ink.title), marginTop: 15 },
  note: {
    marginTop: 11,
    height: 88,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    textAlignVertical: 'top',
    ...font('regular', 12.5, 18, ink.title),
  },
  sectionTitleSheet: { ...font('medium', 17, 24, ink.title), marginTop: 16 },
  noteSheet: { height: 104, marginTop: 12 },
  noteFilled: { fontFamily: font('semibold', 12.5, 18).fontFamily },
});
