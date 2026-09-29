import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ArrowDown2, Map } from 'iconsax-react-native';

import { palette } from '@/theme';

import { soilTypes } from '../data/crops';
import { OptionChip } from './Chips';
import { MapCard } from './MapCard';
import { font, ink } from './text';

const units = ['Acer', 'Hectare', 'Bigha'];

export type FieldFormValue = {
  name: string;
  size: string;
  unit: string;
  soil: string | null;
};

type FieldFormProps = {
  value: FieldFormValue;
  onChange: (next: FieldFormValue) => void;
  measuredArea: string;
  location: string;
  /** Edit Field shows a "Fields Area" heading above the map and the area summary below it. */
  layout: 'add' | 'edit';
};

export function FieldForm({ value, onChange, measuredArea, location, layout }: FieldFormProps) {
  const set = (patch: Partial<FieldFormValue>) => onChange({ ...value, ...patch });
  const nextUnit = () => set({ unit: units[(units.indexOf(value.unit) + 1) % units.length] });

  const summary = (
    <View style={[styles.summary, layout === 'edit' && styles.summaryEdit]}>
      <View style={styles.flex}>
        <Text style={styles.area}>{measuredArea}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Full Map View" style={styles.mapButton}>
        <Text style={styles.mapButtonLabel}>Full Map View</Text>
        <Map size={24} color={ink.title} />
      </Pressable>
    </View>
  );

  return (
    <View>
      <Text style={styles.label}>Field Name</Text>
      <TextInput
        value={value.name}
        onChangeText={(name) => set({ name })}
        accessibilityLabel="Field Name"
        style={[styles.input, styles.inputText]}
      />

      <Text style={[styles.smallLabel, styles.sizeLabel]}>Feaild Size</Text>
      <View style={styles.sizeRow}>
        <TextInput
          value={value.size}
          onChangeText={(size) => set({ size: size.replace(/[^0-9.]/g, '') })}
          keyboardType="decimal-pad"
          accessibilityLabel="Field size"
          style={[styles.input, styles.inputText, styles.half]}
        />
        <Pressable accessibilityRole="button" accessibilityLabel={`Unit ${value.unit}`} onPress={nextUnit} style={[styles.input, styles.select, styles.half]}>
          <Text style={styles.inputText}>{value.unit}</Text>
          <ArrowDown2 size={24} color={ink.title} />
        </Pressable>
      </View>

      {layout === 'add' ? (
        summary
      ) : (
        <View style={styles.areaHeading}>
          <Text style={styles.sectionTitle}>Fields Area</Text>
          <Text style={styles.hint}>Tap Each Corner Of Your Farm to Mack Boundaries</Text>
        </View>
      )}

      <MapCard />

      {layout === 'edit' ? summary : null}

      <Text style={[styles.sectionTitle, styles.soilTitle]}>Soil Type</Text>
      <View style={styles.soils}>
        {soilTypes.map((s) => (
          <OptionChip
            key={s}
            label={s}
            selected={value.soil === s}
            onPress={() => set({ soil: s })}
            labelStyle={styles.soilLabel}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  label: { ...font('regular', 14.5, 22, '#2C3137'), marginLeft: 4, marginBottom: 3 },
  smallLabel: { ...font('regular', 13, 18, '#5C616B'), marginLeft: 4, marginBottom: 3 },
  sizeLabel: { marginTop: 19 },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    paddingHorizontal: 16,
  },
  inputText: font('medium', 14.5, 22, ink.title),
  sizeRow: { flexDirection: 'row', gap: 12 },
  half: { flex: 1, flexBasis: 0, minWidth: 0 },
  select: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summary: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  summaryEdit: { marginTop: 11, marginBottom: 0 },
  area: font('medium', 14.5, 20, ink.title),
  location: { ...font('regular', 13, 18, ink.title), marginTop: 4 },
  mapButton: {
    height: 40,
    width: 160,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  mapButtonLabel: font('medium', 14.5, 22, ink.title),
  areaHeading: { marginTop: 16, marginBottom: 6 },
  sectionTitle: font('medium', 14.5, 22, ink.title),
  hint: { ...font('regular', 11.5, 18, ink.title), marginTop: 1 },
  soilTitle: { marginTop: 14 },
  soilLabel: font('regular', 12.5, 18, ink.title),
  soils: { flexDirection: 'row', gap: 13, marginTop: 7 },
});
