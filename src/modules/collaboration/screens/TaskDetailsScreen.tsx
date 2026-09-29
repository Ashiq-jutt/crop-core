import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { CompensationPicker } from '../components/CompensationPicker';
import { CropOption } from '../components/CropOption';
import { DateTimeField } from '../components/DateTimeField';
import { formStyles } from '../components/formStyles';
import { NoteInput } from '../components/NoteInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import { SummarySheet } from '../components/SummarySheet';
import { ToggleRow } from '../components/ToggleRow';
import { activeCrops, endDate, fieldSummary, notePlaceholder, startDate } from '../data/collaboration';

/** Figma 03 (Task Details form) with the 04 "Request Summary" sheet. */
export function TaskDetailsScreen() {
  const [crop, setCrop] = useState(activeCrops[0].id);
  const [teamHelp, setTeamHelp] = useState(false);
  const [note, setNote] = useState('');
  const [summaryOpen, setSummaryOpen] = useState(false);

  const confirm = () => {
    setSummaryOpen(false);
    router.push({ pathname: '/collaboration/request-sent', params: { type: 'field' } });
  };

  return (
    <Screen
      header={<CollabHeader title="Task Details" />}
      contentStyle={formStyles.content}
      footer={
        <CollabFooter>
          <PrimaryButton label="Request Help" onPress={() => setSummaryOpen(true)} />
        </CollabFooter>
      }>
      <SectionTitle style={formStyles.firstTitle}>Select Active Crop</SectionTitle>
      <View style={[formStyles.stack, formStyles.afterTitle]}>
        {activeCrops.map((c) => (
          <CropOption
            key={c.id}
            name={c.name}
            meta={[c.area, c.field]}
            icon={c.icon}
            iconBg={c.iconBg}
            selected={crop === c.id}
            onPress={() => setCrop(c.id)}
          />
        ))}
      </View>

      <SectionTitle style={formStyles.sectionTitle}>Select Date</SectionTitle>
      <View style={formStyles.afterTitle}>
        <DateTimeField {...startDate} />
      </View>
      <View style={formStyles.wheelGap}>
        <DateTimeField {...endDate} />
      </View>

      <View style={formStyles.toggle}>
        <ToggleRow label="Team Help Required ?" value={teamHelp} onChange={setTeamHelp} />
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
        rows={fieldSummary.rows}
        note={fieldSummary.note}
      />
    </Screen>
  );
}
