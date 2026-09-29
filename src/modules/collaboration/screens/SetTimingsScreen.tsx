import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { CompensationPicker } from '../components/CompensationPicker';
import { DateTimeField } from '../components/DateTimeField';
import { formStyles } from '../components/formStyles';
import { NoteInput } from '../components/NoteInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { RadioRow } from '../components/RadioRow';
import { SectionTitle } from '../components/SectionTitle';
import { SummarySheet } from '../components/SummarySheet';
import {
  endDate,
  equipmentNote,
  equipmentSummary,
  notePlaceholder,
  pickupOptions,
  startDate,
} from '../data/collaboration';

/** Figma 10 (equipment "Set Timings" form) with the 12 "Request Summary" sheet. */
export function SetTimingsScreen() {
  const [pickup, setPickup] = useState(pickupOptions[0].id);
  const [note, setNote] = useState(equipmentNote);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const confirm = () => {
    setSummaryOpen(false);
    router.push({ pathname: '/collaboration/request-sent', params: { type: 'equipment' } });
  };

  return (
    <Screen
      header={<CollabHeader title="Set Timings" />}
      contentStyle={formStyles.content}
      footer={
        <CollabFooter>
          <PrimaryButton label="Request Help" onPress={() => setSummaryOpen(true)} />
        </CollabFooter>
      }>
      <SectionTitle style={formStyles.firstTitle}>Select Date</SectionTitle>
      <View style={formStyles.afterTitle}>
        <DateTimeField {...startDate} />
      </View>
      <View style={formStyles.wheelGap}>
        <DateTimeField {...endDate} />
      </View>

      <SectionTitle style={formStyles.sectionTitle}>Pickup Option</SectionTitle>
      <View style={[formStyles.stack, formStyles.afterTitle]}>
        {pickupOptions.map((o) => (
          <RadioRow key={o.id} label={o.label} selected={pickup === o.id} onPress={() => setPickup(o.id)} />
        ))}
      </View>

      <SectionTitle style={formStyles.sectionTitle}>Short Note</SectionTitle>
      <View style={formStyles.afterTitle}>
        <NoteInput value={note} onChangeText={setNote} placeholder={notePlaceholder} />
      </View>

      <SectionTitle style={formStyles.sectionTitle}>Compensation</SectionTitle>
      <View style={formStyles.afterTitle}>
        <CompensationPicker />
      </View>

      <SummarySheet
        visible={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        onConfirm={confirm}
        rows={equipmentSummary.rows}
        note={equipmentSummary.note}
      />
    </Screen>
  );
}
