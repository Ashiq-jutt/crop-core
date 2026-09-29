import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Microphone2, SearchNormal1 } from 'iconsax-react-native';

import { AppText, Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { ChoiceChip } from '../components/ChoiceChip';
import { CropTile } from '../components/CropTile';
import { FieldSummaryCard } from '../components/FieldSummaryCard';
import { SetupFooter } from '../components/SetupFooter';
import { SetupHeader } from '../components/SetupHeader';
import { SetupSteps } from '../components/SetupSteps';
import { cropCategories, cropOptions, initialSelectedCrops, setupColors } from '../data/setup';

const COLUMNS = 3;

export function AddCropScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('popular');
  const [selected, setSelected] = useState<string[]>(initialSelectedCrops);

  const q = query.trim().toLowerCase();
  const visible = cropOptions.filter((c) => c.categories.includes(category) && c.name.toLowerCase().includes(q));
  const rows = Array.from({ length: Math.ceil(visible.length / COLUMNS) }, (_, i) =>
    visible.slice(i * COLUMNS, i * COLUMNS + COLUMNS),
  );

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((c) => c !== id) : [...s, id]));

  return (
    <Screen
      header={<SetupHeader title="Add Crop" />}
      footer={<SetupFooter label="Continue" onPress={() => router.push('/setup/area')} />}>
      <SetupSteps step={3} />

      <View style={styles.top}>
        <FieldSummaryCard />
        <View style={styles.searchRow}>
          <View style={styles.search}>
            <SearchNormal1 size={24} color="#000000" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search Crop"
              placeholderTextColor={setupColors.mutedLabel}
              accessibilityLabel="Search Crop"
              style={styles.searchInput}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search by voice"
            style={({ pressed }) => [styles.mic, pressed && styles.pressed]}>
            <Microphone2 size={24} color="#000000" />
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {cropCategories.map((c) => (
          <ChoiceChip
            key={c.id}
            label={c.label}
            compact
            selected={category === c.id}
            onPress={() => setCategory(c.id)}
            leading={c.icon ? <Image source={c.icon} style={styles.chipIcon} /> : undefined}
          />
        ))}
      </ScrollView>

      <View style={styles.grid}>
        <AppText style={styles.gridTitle} color={colors.textPrimary}>
          Select the Crop You Grow Here
        </AppText>
        {rows.map((row) => (
          <View key={row[0].id} style={styles.row}>
            {row.map((crop) => (
              <CropTile key={crop.id} crop={crop} selected={selected.includes(crop.id)} onPress={() => toggle(crop.id)} />
            ))}
            {Array.from({ length: COLUMNS - row.length }, (_, i) => (
              <View key={`pad-${i}`} style={styles.flex} />
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: {
    gap: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchRow: { flexDirection: 'row', gap: 12 },
  search: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  mic: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  pressed: { opacity: 0.8 },
  chips: { gap: 8, paddingHorizontal: 16, paddingTop: 24 },
  chipIcon: { width: 24, height: 24 },
  grid: { gap: 16, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  gridTitle: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, marginBottom: -4 },
  row: { flexDirection: 'row', gap: 16 },
});
