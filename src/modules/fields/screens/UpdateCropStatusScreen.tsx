import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { DashedDivider, Screen } from '@/components/ui';
import { palette } from '@/theme';

import { formatAcres } from '../components/AllocationCard';
import { AreaSlider } from '../components/AreaSlider';
import { OptionChip } from '../components/Chips';
import { CropCard } from '../components/CropCard';
import { FooterBar } from '../components/FooterBar';
import { SelectBox, SwitchToggle } from '../components/FormControls';
import { GlyphCircle } from '../components/GlyphCircle';
import { PageHeader } from '../components/PageHeader';
import { font, ink } from '../components/text';
import { cropConditions, cropOption, statusStages } from '../data/crops';
import { getManagedCrop, TOTAL_ACRES } from '../data/fields';

const irrigationDates = ['10-8-2025', '11-8-2025', '12-8-2025'];
const fertilizers = ['DAP', 'Urea', 'NPK'];
const applyDates = ['10-8-2025', '11-8-2025', '12-8-2025'];
const sprayTypes = ['Fungiside', 'Insecticide', 'Herbicide'];
const sprayDates = ['02-8-2025', '03-8-2025', '04-8-2025'];

export function UpdateCropStatusScreen() {
  const { id, cropId } = useLocalSearchParams<{ id: string; cropId: string }>();
  const { field, crop } = getManagedCrop(id, cropId);
  const [taskDone, setTaskDone] = useState(false);
  const [acres, setAcres] = useState(1.5);
  const [stage, setStage] = useState('Mid Season');
  const [condition, setCondition] = useState('Poor');
  const [irrigated, setIrrigated] = useState(irrigationDates[0]);
  const [fertilizer, setFertilizer] = useState(true);
  const [fertilizerType, setFertilizerType] = useState(fertilizers[0]);
  const [quantity, setQuantity] = useState('25 Kg');
  const [fertilizerDate, setFertilizerDate] = useState(applyDates[0]);
  const [spray, setSpray] = useState(true);
  const [sprayType, setSprayType] = useState(sprayTypes[0]);
  const [sprayDate, setSprayDate] = useState(sprayDates[0]);

  return (
    <Screen
      header={<PageHeader title="Update Crop Status" />}
      footer={<FooterBar label="Update Crop Status" onPress={() => router.back()} />}
      contentStyle={styles.content}>
      <CropCard
        crop={crop}
        taskDone={taskDone}
        onToggleTask={() => setTaskDone((d) => !d)}
        onAddTask={() => router.push(`/field/${field.id}/task?crop=${crop.id}`)}
        primary={{ label: 'View Details', onPress: () => router.push(`/field/${field.id}/crop/${crop.id}`) }}
        secondary={{ label: 'Remove Crop', onPress: () => router.dismissTo(`/field/${field.id}`) }}
      />

      <View style={styles.card}>
        <View style={styles.header}>
          <GlyphCircle source={cropOption('cotton').glyph} size={40} />
          <Text style={styles.cropName}>Cotton</Text>
        </View>
        <View style={styles.sliderRow}>
          <AreaSlider value={acres} max={TOTAL_ACRES} onChange={setAcres} accessibilityLabel="Cotton area" />
          <Text style={styles.acres}>{formatAcres(acres)}</Text>
        </View>
        <DashedDivider style={styles.divider} />

        <Text style={[styles.title, styles.firstTitle]}>Current Stage</Text>
        <View style={styles.chips}>
          {statusStages.map((s) => (
            <OptionChip key={s} label={s} selected={s === stage} onPress={() => setStage(s)} />
          ))}
        </View>

        <Text style={styles.title}>Crop Condition</Text>
        <View style={styles.chips}>
          {cropConditions.map((c) => (
            <OptionChip key={c} label={c} selected={c === condition} onPress={() => setCondition(c)} />
          ))}
        </View>

        <Text style={styles.title}>Last Irrigation Date</Text>
        <SelectBox value={irrigated} options={irrigationDates} onChange={setIrrigated} style={styles.control} />

        <View style={styles.toggleRow}>
          <Text style={styles.toggleTitle}>Fertilizer Apply</Text>
          <SwitchToggle value={fertilizer} onChange={setFertilizer} label="Fertilizer Apply" />
        </View>
        {fertilizer ? (
          <View style={styles.nested}>
            <SelectBox label="Feaild Size" value={fertilizerType} options={fertilizers} onChange={setFertilizerType} />
            <View style={styles.pair}>
              <View style={styles.flex}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput value={quantity} onChangeText={setQuantity} accessibilityLabel="Quantity" style={styles.input} />
              </View>
              <SelectBox label="Date" value={fertilizerDate} options={applyDates} onChange={setFertilizerDate} style={styles.flex} />
            </View>
          </View>
        ) : null}

        <View style={styles.toggleRow}>
          <Text style={styles.toggleTitle}>Pesticide / Spray Apply</Text>
          <SwitchToggle value={spray} onChange={setSpray} label="Pesticide / Spray Apply" />
        </View>
        {spray ? (
          <View style={[styles.nested, styles.pair, styles.pairFirst]}>
            <SelectBox label="Type" value={sprayType} options={sprayTypes} onChange={setSprayType} style={styles.flex} />
            <SelectBox label="Date" value={sprayDate} options={sprayDates} onChange={setSprayDate} style={styles.flex} />
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  flex: { flex: 1 },
  card: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    padding: 12,
    backgroundColor: palette.neutral100,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cropName: font('regular', 17, 24, ink.title),
  sliderRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  acres: { ...font('regular', 14.5, 22, ink.title), marginLeft: 11 },
  divider: { marginTop: 13 },
  title: { ...font('medium', 14.5, 22, ink.title), marginTop: 15 },
  firstTitle: { marginTop: 15 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 13, rowGap: 12, marginTop: 7 },
  control: { marginTop: 7 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 13 },
  toggleTitle: font('medium', 14.5, 22, ink.title),
  nested: { marginHorizontal: 8, marginTop: 12 },
  pair: { flexDirection: 'row', gap: 12, marginTop: 11 },
  pairFirst: { marginTop: 13 },
  label: { ...font('regular', 12.5, 18, '#5C616B'), marginLeft: 4, marginBottom: 3 },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    paddingHorizontal: 16,
    ...font('medium', 14.5, 22, ink.title),
  },
});
