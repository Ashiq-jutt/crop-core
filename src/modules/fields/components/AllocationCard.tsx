import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, Microphone2 } from 'iconsax-react-native';

import { DashedDivider } from '@/components/ui';
import { palette } from '@/theme';

import { cropOption, cropStages, irrigationTypes } from '../data/crops';
import type { Allocation } from '../data/fields';
import { AreaSlider } from './AreaSlider';
import { OptionChip } from './Chips';
import { GlyphCircle } from './GlyphCircle';
import { font, ink } from './text';

export type AllocationSection = 'stage' | 'irrigation' | 'dates';

type AllocationCardProps = {
  allocation: Allocation;
  max: number;
  onChange: (next: Allocation) => void;
  sections: AllocationSection[];
  iconSize?: number;
};

export function formatAcres(value: number) {
  return `${value.toFixed(1)} Acers`;
}

function ChipGroup({
  options,
  value,
  onSelect,
  spaced = false,
}: {
  options: readonly string[];
  value: string;
  onSelect: (v: string) => void;
  spaced?: boolean;
}) {
  return (
    <View style={[styles.chips, spaced && styles.chipsSpaced]}>
      {options.map((o) => (
        <OptionChip key={o} label={o} selected={o === value} onPress={() => onSelect(o)} />
      ))}
    </View>
  );
}

function DateBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.flex}>
      <Text style={styles.dateLabel}>{label}</Text>
      <View style={styles.dateBox}>
        <Text style={styles.dateValue}>{value}</Text>
        <Calendar size={24} color={ink.title} />
      </View>
    </View>
  );
}

/** Per-crop acreage card on Area Distribute / Area Distribution / Adjust Area. */
export function AllocationCard({ allocation, max, onChange, sections, iconSize = 40 }: AllocationCardProps) {
  const set = (patch: Partial<Allocation>) => onChange({ ...allocation, ...patch });
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <GlyphCircle source={cropOption(allocation.crop).glyph} size={iconSize} />
        <Text style={styles.name}>{allocation.name}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`Set ${allocation.name} area by voice`} style={styles.mic}>
          <Microphone2 size={24} color={ink.title} />
        </Pressable>
      </View>
      <View style={styles.sliderRow}>
        <AreaSlider
          value={allocation.acres}
          max={max}
          onChange={(acres) => set({ acres })}
          accessibilityLabel={`${allocation.name} area`}
        />
        <Text style={styles.acres}>{formatAcres(allocation.acres)}</Text>
      </View>

      {sections.includes('stage') ? (
        <>
          <DashedDivider style={styles.divider} />
          <Text style={styles.sectionTitle}>Current Stage</Text>
          <ChipGroup options={cropStages} value={allocation.stage} onSelect={(stage) => set({ stage })} />
        </>
      ) : null}

      {sections.includes('irrigation') ? (
        <>
          <Text style={[styles.sectionTitle, styles.irrigationTitle]}>Irrigation Type</Text>
          <ChipGroup spaced options={irrigationTypes} value={allocation.irrigation} onSelect={(irrigation) => set({ irrigation })} />
        </>
      ) : null}

      {sections.includes('dates') ? (
        <View style={styles.dates}>
          <DateBox label="Planted Date" value={allocation.planted} />
          <DateBox label="Expected Harvesting" value={allocation.harvest} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: palette.neutral100,
  },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center' },
  name: { ...font('regular', 16.5, 24, ink.title), flex: 1, marginLeft: 8 },
  mic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  acres: { ...font('regular', 14.5, 20, ink.title), marginLeft: 11 },
  divider: { marginTop: 14 },
  sectionTitle: { ...font('medium', 14.5, 22, ink.title), marginTop: 15 },
  irrigationTitle: { marginTop: 15 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 12, rowGap: 12, marginTop: 7 },
  chipsSpaced: { marginTop: 11 },
  dates: { flexDirection: 'row', gap: 12, marginTop: 20 },
  dateLabel: { ...font('regular', 12.5, 18, '#595E68'), marginLeft: 4, marginBottom: 6 },
  dateBox: {
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  dateValue: font('medium', 14.5, 22, ink.title),
});
