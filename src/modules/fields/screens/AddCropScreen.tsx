import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Microphone2 } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, palette } from '@/theme';

import { CropTile } from '../components/CropTile';
import { FieldSummaryCard } from '../components/FieldSummaryCard';
import { FooterBar } from '../components/FooterBar';
import { MoreDots } from '../components/Chips';
import { PageHeader } from '../components/PageHeader';
import { SearchField } from '../components/SearchField';
import { font, ink } from '../components/text';
import { cropCategories, cropOptions, type CropCategory, type CropKey } from '../data/crops';
import { draftField } from '../data/fields';

type AddCropScreenProps = {
  /** "new" = step 2 of Add Field (shows the field banner); "existing" = Add Crop from Field Details. */
  mode: 'new' | 'existing';
};

export function AddCropScreen({ mode }: AddCropScreenProps) {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CropCategory>('popular');
  const [selected, setSelected] = useState<CropKey[]>(['groundnut', 'cotton']);

  const q = query.trim().toLowerCase();
  const options = cropOptions.filter((c) => c.categories.includes(category) && (!q || c.label.toLowerCase().includes(q)));
  const rows: (typeof options)[] = [];
  for (let i = 0; i < options.length; i += 3) rows.push(options.slice(i, i + 3));

  const toggle = (key: CropKey) =>
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  const next = () => {
    const crops = selected.join(',');
    router.push(mode === 'new' ? `/field/add/distribute?crops=${crops}` : `/field/${id ?? 'north'}/distribute?crops=${crops}`);
  };

  return (
    <Screen
      header={
        <PageHeader
          title="Add Crop"
          right={
            mode === 'new' ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Edit field details" hitSlop={10} onPress={() => router.back()}>
                <MoreDots horizontal />
              </Pressable>
            ) : undefined
          }
        />
      }
      footer={<FooterBar label="Continue" onPress={next} />}
      contentStyle={styles.content}>
      <View style={styles.top}>
        {mode === 'new' ? (
          <FieldSummaryCard
            title={draftField.summaryTitle}
            subtitle={draftField.summaryLocation}
            onEdit={() => router.back()}
          />
        ) : null}
        <View style={[styles.searchRow, mode === 'new' && styles.searchRowSpaced]}>
          <SearchField value={query} onChangeText={setQuery} placeholder="Search Crop" variant="filled" style={styles.flex} />
          <Pressable accessibilityRole="button" accessibilityLabel="Search by voice" style={styles.mic}>
            <Microphone2 size={24} color={ink.title} />
          </Pressable>
        </View>
      </View>
      <View style={[styles.rule, mode === 'existing' && styles.ruleTight]} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categories}>
        {cropCategories.map((c) => {
          const active = c.key === category;
          return (
            <Pressable
              key={c.key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={c.label}
              onPress={() => setCategory(c.key)}
              style={[styles.category, active && styles.categoryOn, c.icon ? styles.categoryWithIcon : null]}>
              {c.icon ? <Image source={c.icon} style={styles.categoryIcon} /> : null}
              <Text style={[styles.categoryLabel, active && styles.categoryLabelOn]}>{c.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.body}>
        <Text style={styles.title}>Select the Crop You Grow Here</Text>
        <View style={styles.grid}>
          {rows.map((row) => (
            <View key={row.map((r) => r.key).join()} style={styles.row}>
              {row.map((c) => (
                <CropTile key={c.key} label={c.label} glyph={c.glyph} selected={selected.includes(c.key)} onPress={() => toggle(c.key)} />
              ))}
              {Array.from({ length: 3 - row.length }, (_, i) => (
                <View key={i} style={styles.flex} />
              ))}
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 24, paddingBottom: 24 },
  top: { paddingHorizontal: 16 },
  flex: { flex: 1 },
  searchRow: { flexDirection: 'row', gap: 12 },
  searchRowSpaced: { marginTop: 24 },
  mic: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rule: { height: 1, backgroundColor: '#E9EFF1', marginTop: 15 },
  ruleTight: { marginTop: 8 },
  categoryScroll: { marginTop: 23, flexGrow: 0 },
  categories: { paddingHorizontal: 15, gap: 8 },
  category: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7E9',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryWithIcon: { paddingLeft: 14 },
  categoryOn: { borderColor: colors.primary, backgroundColor: palette.primary95 },
  categoryIcon: { width: 24, height: 24 },
  categoryLabel: font('regular', 13, 20, ink.title),
  categoryLabelOn: { fontFamily: font('semibold', 13, 20).fontFamily },
  body: { paddingHorizontal: 16 },
  title: { ...font('medium', 17, 24, ink.title), marginTop: 23 },
  grid: { marginTop: 12, gap: 11 },
  row: { flexDirection: 'row', gap: 17 },
});
