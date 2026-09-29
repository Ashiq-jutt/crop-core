import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';

import { AllocationCard } from '../components/AllocationCard';
import { AllocationSummary } from '../components/AllocationSummary';
import { FieldSummaryCard } from '../components/FieldSummaryCard';
import { FooterBar } from '../components/FooterBar';
import { PageHeader } from '../components/PageHeader';
import { cropOption, cropOptions, type CropKey } from '../data/crops';
import {
  draftField,
  existingFieldAllocations,
  newFieldAllocations,
  TOTAL_ACRES,
  type Allocation,
} from '../data/fields';

type AreaDistributeScreenProps = {
  /** "new" = last step of Add Field; "existing" = adding crops to a field from Field Details. */
  mode: 'new' | 'existing';
};

function allocationsFor(param: string | undefined, fallback: Allocation[]): Allocation[] {
  const keys = (param ?? '').split(',').filter((k): k is CropKey => cropOptions.some((c) => c.key === k));
  if (keys.length === 0) return fallback;
  return keys.map(
    (key) =>
      existingFieldAllocations.find((a) => a.crop === key) ?? {
        ...newFieldAllocations[0],
        crop: key,
        name: cropOption(key).label,
        acres: 0,
      },
  );
}

export function AreaDistributeScreen({ mode }: AreaDistributeScreenProps) {
  const { id, crops } = useLocalSearchParams<{ id?: string; crops?: string }>();
  const initial = allocationsFor(crops, mode === 'new' ? newFieldAllocations : existingFieldAllocations);
  const [allocations, setAllocations] = useState(initial);

  const allocated = Math.min(TOTAL_ACRES, allocations.reduce((sum, a) => sum + a.acres, 0));
  const update = (index: number, next: Allocation) => {
    setAllocations((list) => {
      const others = list.reduce((sum, a, i) => (i === index ? sum : sum + a.acres), 0);
      const acres = Math.min(next.acres, Math.max(0, TOTAL_ACRES - others));
      return list.map((a, i) => (i === index ? { ...next, acres } : a));
    });
  };

  const finish = () =>
    mode === 'new' ? router.dismissTo('/fields') : router.dismissTo(`/field/${id ?? 'north'}`);

  return (
    <Screen
      header={<PageHeader title={mode === 'new' ? 'Area Distribute' : 'Area Distribution'} />}
      footer={<FooterBar label={mode === 'new' ? 'Add Field' : 'Add Crop'} onPress={finish} />}
      contentStyle={styles.content}>
      <FieldSummaryCard title={draftField.summaryTitle} subtitle={draftField.summaryLocation} onEdit={() => router.back()} />
      <View style={styles.summary}>
        <AllocationSummary allocated={allocated} total={TOTAL_ACRES} onReset={() => setAllocations(initial)} />
      </View>
      <View style={styles.cards}>
        {allocations.map((a, i) => (
          <AllocationCard
            key={a.crop}
            allocation={a}
            max={TOTAL_ACRES}
            onChange={(next) => update(i, next)}
            sections={['stage', 'irrigation', 'dates']}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  summary: { marginTop: 24 },
  cards: { marginTop: 16, gap: 16 },
});
