import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { CompensationCard } from '../components/CompensationCard';
import { DateTimeField } from '../components/DateTimeField';
import { formStyles } from '../components/formStyles';
import { NoteInput } from '../components/NoteInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import {
  compensationOptions,
  endDate,
  equipmentNote,
  notePlaceholder,
  startDate,
  suggestedAmount,
} from '../data/collaboration';

const paidHelp = compensationOptions[1];

/** Figma 17 — helper suggests different timings for an incoming request. */
export function SuggestTimingsScreen() {
  const [note, setNote] = useState(equipmentNote);
  const [amount, setAmount] = useState(suggestedAmount);

  return (
    <Screen
      header={<CollabHeader title="Suggest Timings" />}
      contentStyle={formStyles.content}
      footer={
        <CollabFooter>
          <PrimaryButton
            label="Send Suggestion"
            onPress={() => router.dismissTo({ pathname: '/collaboration', params: { tab: 'incoming' } })}
          />
        </CollabFooter>
      }>
      <SectionTitle style={formStyles.firstTitle}>Select Date</SectionTitle>
      <View style={formStyles.afterTitle}>
        <DateTimeField {...startDate} />
      </View>
      <View style={formStyles.wheelGap}>
        <DateTimeField {...endDate} />
      </View>

      <SectionTitle style={formStyles.sectionTitle}>Short Note</SectionTitle>
      <View style={formStyles.afterTitle}>
        <NoteInput value={note} onChangeText={setNote} placeholder={notePlaceholder} />
      </View>

      <SectionTitle style={formStyles.sectionTitle}>Compensation</SectionTitle>
      <View style={formStyles.afterTitle}>
        <CompensationCard
          title={paidHelp.title}
          description={paidHelp.description}
          amount={{ value: amount, onChangeText: setAmount }}
        />
      </View>
    </Screen>
  );
}
