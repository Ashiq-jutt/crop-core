import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';

import { CategoryChips } from '../components/CategoryChips';
import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { SearchRow } from '../components/SearchRow';
import { SectionTitle } from '../components/SectionTitle';
import { SelectTile } from '../components/SelectTile';
import { TabSwitch } from '../components/TabSwitch';
import { helpTypes, isHelpType, type HelpType } from '../data/collaboration';
import { collabColors } from '../theme';

const tabs: { id: HelpType; label: string }[] = [
  { id: 'field', label: helpTypes.field.tab },
  { id: 'equipment', label: helpTypes.equipment.tab },
];

/** Figma 02 (Field Help) and 09 (Equipment Help). */
export function AddRequestScreen() {
  const params = useLocalSearchParams<{ type?: string }>();
  const [type, setType] = useState<HelpType>(isHelpType(params.type) ? params.type : 'field');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Record<HelpType, string>>({
    field: helpTypes.field.defaultCategory,
    equipment: helpTypes.equipment.defaultCategory,
  });
  const [selected, setSelected] = useState<Record<HelpType, string>>({
    field: helpTypes.field.options[0].id,
    equipment: helpTypes.equipment.options[0].id,
  });

  const config = helpTypes[type];
  const options = config.options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()));

  const changeType = (next: HelpType) => {
    setType(next);
    setQuery('');
  };

  return (
    <Screen
      header={<CollabHeader title={config.title} />}
      footer={
        <CollabFooter>
          <PrimaryButton
            label="Continue"
            onPress={() => router.push(type === 'field' ? '/collaboration/task-details' : '/collaboration/set-timings')}
          />
        </CollabFooter>
      }>
      <TabSwitch tabs={tabs} value={type} onChange={changeType} />
      <SearchRow value={query} onChangeText={setQuery} placeholder={config.searchPlaceholder} />
      <CategoryChips
        chips={config.categories}
        value={category[type]}
        onChange={(id) => setCategory((c) => ({ ...c, [type]: id }))}
      />
      <View style={styles.divider} />
      <SectionTitle style={styles.title}>{config.sectionTitle}</SectionTitle>
      <View style={styles.grid}>
        {options.map((o) => (
          <SelectTile
            key={o.id}
            option={o}
            selected={selected[type] === o.id}
            onPress={() => setSelected((s) => ({ ...s, [type]: o.id }))}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: { height: 1, backgroundColor: collabColors.border, marginTop: 15 },
  title: { marginTop: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15.5, marginHorizontal: 16, marginTop: 12, paddingBottom: 24 },
});
