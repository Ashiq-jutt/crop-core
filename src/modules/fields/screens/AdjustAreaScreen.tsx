import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Add } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { ActionButton } from '../components/ActionButton';
import { AllocationCard } from '../components/AllocationCard';
import { AllocationSummary } from '../components/AllocationSummary';
import { ConfirmSheet } from '../components/ConfirmSheet';
import { CropAdjustmentSheet } from '../components/CropAdjustmentSheet';
import { FieldSummaryCard } from '../components/FieldSummaryCard';
import { FooterBar } from '../components/FooterBar';
import { PageHeader } from '../components/PageHeader';
import { font, ink } from '../components/text';
import { ADJUSTED_TOTAL_ACRES, adjustAllocations, draftField, getFieldDetails, type Allocation } from '../data/fields';

const unassignedIcon = require('@assets/images/fields/unassigned.png');

type Sheet = 'unassigned' | 'adjustment' | null;

export function AdjustAreaScreen() {
  const { id, sheet } = useLocalSearchParams<{ id: string; sheet?: string }>();
  const field = getFieldDetails(id);
  const [allocations, setAllocations] = useState(adjustAllocations);
  const [open, setOpen] = useState<Sheet>(sheet === 'unassigned' || sheet === 'adjustment' ? sheet : null);

  const total = ADJUSTED_TOTAL_ACRES;
  const allocated = allocations.reduce((sum, a) => sum + a.acres, 0);
  const remaining = Math.max(0, Math.round((total - allocated) * 10) / 10);

  const update = (index: number, next: Allocation) =>
    setAllocations((list) => {
      const others = list.reduce((sum, a, i) => (i === index ? sum : sum + a.acres), 0);
      return list.map((a, i) => (i === index ? { ...next, acres: Math.min(next.acres, Math.max(0, total - others)) } : a));
    });

  const distributeEqually = () => {
    const share = remaining / allocations.length;
    setAllocations((list) => list.map((a) => ({ ...a, acres: Math.round((a.acres + share) * 10) / 10 })));
    setOpen('adjustment');
  };

  const done = () => {
    setOpen(null);
    router.dismissTo(`/field/${field.id}`);
  };

  return (
    <Screen
      header={<PageHeader title="Adjust Area" />}
      footer={<FooterBar label="Update Fields" onPress={() => setOpen(remaining > 0 ? 'unassigned' : 'adjustment')} />}
      contentStyle={styles.content}>
      <FieldSummaryCard title={`${total.toFixed(1)}  Acers - North West`} subtitle={draftField.summaryLocation} />
      <View style={styles.summary}>
        <AllocationSummary allocated={allocated} total={total} onReset={() => setAllocations(adjustAllocations)} />
      </View>
      <View style={styles.cards}>
        {allocations.map((a, i) => (
          <AllocationCard
            key={a.crop}
            allocation={a}
            max={total}
            iconSize={i === 0 ? 32 : 40}
            onChange={(next) => update(i, next)}
            sections={i === 0 ? [] : ['irrigation']}
          />
        ))}
      </View>
      {remaining > 0 ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Remaining Area Are Available Please Add Other Crop</Text>
        </View>
      ) : null}
      <ActionButton
        label="Add Crop"
        variant="muted"
        height={40}
        radius={8}
        onPress={() => router.push(`/field/${field.id}/add-crop`)}
        leftIcon={<Add size={20} color={ink.title} />}
        labelStyle={styles.addCropLabel}
        style={styles.addCrop}
      />

      <ConfirmSheet
        visible={open === 'unassigned'}
        onClose={() => setOpen(null)}
        title="Unassigned Area"
        icon={unassignedIcon}
        iconSize={64}
        heading={`You Have Unassigned ${remaining.toFixed(1)} Acers`}
        body="Please Add other Crop or Distribute Equal"
        primary={{ label: 'Equal Distribute', onPress: distributeEqually }}
        secondary={{ label: 'Skip', onPress: () => setOpen('adjustment') }}
      />
      <CropAdjustmentSheet visible={open === 'adjustment'} onClose={() => setOpen(null)} onSubmit={done} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  summary: { marginTop: 24 },
  cards: { marginTop: 16, gap: 16 },
  notice: { marginTop: 16, borderRadius: 8, backgroundColor: ink.warningSurface, paddingHorizontal: 12, paddingVertical: 8 },
  noticeText: font('regular', 14.5, 20, ink.warning),
  addCrop: { marginTop: 16, borderColor: '#E7E8EB' },
  addCropLabel: font('regular', 14.5, 22, ink.title),
});
