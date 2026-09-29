import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';

import { ConfirmSheet } from '../components/ConfirmSheet';
import { FieldForm, type FieldFormValue } from '../components/FieldForm';
import { FooterBar } from '../components/FooterBar';
import { PageHeader } from '../components/PageHeader';
import { editFieldDraft, getFieldDetails } from '../data/fields';

const conflictIcon = require('@assets/images/fields/area-conflict.png');

export function EditFieldScreen() {
  const { id, sheet } = useLocalSearchParams<{ id: string; sheet?: string }>();
  const field = getFieldDetails(id);
  const [value, setValue] = useState<FieldFormValue>({
    name: editFieldDraft.name,
    size: editFieldDraft.size,
    unit: editFieldDraft.unit,
    soil: null,
  });
  const [conflict, setConflict] = useState(sheet === 'conflict');

  return (
    <Screen
      header={<PageHeader title={editFieldDraft.title} />}
      footer={<FooterBar label="Update Feilds" onPress={() => setConflict(true)} />}
      contentStyle={styles.content}>
      <FieldForm
        layout="edit"
        value={value}
        onChange={setValue}
        measuredArea={editFieldDraft.measuredArea}
        location={editFieldDraft.location}
      />
      <ConfirmSheet
        visible={conflict}
        onClose={() => setConflict(false)}
        title="Area Conflict"
        icon={conflictIcon}
        iconSize={80}
        heading="Area Conflict Detected"
        body="Your new field size (2.0 acres) is smaller than your allocated crop area (2.3 acres).."
        primary={{
          label: 'Adjust Area',
          onPress: () => {
            setConflict(false);
            router.push(`/field/${field.id}/adjust`);
          },
        }}
        secondary={{ label: 'Cencel', onPress: () => setConflict(false) }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 27, paddingBottom: 24 },
});
