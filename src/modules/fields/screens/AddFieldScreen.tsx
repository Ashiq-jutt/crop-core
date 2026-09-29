import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { FieldForm, type FieldFormValue } from '../components/FieldForm';
import { FooterBar } from '../components/FooterBar';
import { PageHeader } from '../components/PageHeader';
import { draftField } from '../data/fields';

export function AddFieldScreen() {
  const [value, setValue] = useState<FieldFormValue>({
    name: draftField.name,
    size: draftField.size,
    unit: draftField.unit,
    soil: null,
  });

  return (
    <Screen
      header={<PageHeader title="Add Field" />}
      footer={<FooterBar label="Continue" onPress={() => router.push('/field/add/crops')} />}
      contentStyle={styles.content}>
      <FieldForm
        layout="add"
        value={value}
        onChange={setValue}
        measuredArea={draftField.measuredArea}
        location={draftField.location}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 26, paddingBottom: 24 },
});
