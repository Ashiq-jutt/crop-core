import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Add } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, palette } from '@/theme';

import { FieldListCard } from '../components/FieldListCard';
import { PageHeader } from '../components/PageHeader';
import { SearchField } from '../components/SearchField';
import { font, ink } from '../components/text';
import { fieldGroups, fields, fieldStats, type FieldGroup } from '../data/fields';

type Filter = 'all' | FieldGroup;

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'healthy', label: 'Healthy (3)' },
  { key: 'attention', label: 'Need Attention (2)' },
  { key: 'empty', label: 'Empty Fields (1)' },
];

export function FieldsListScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const q = query.trim().toLowerCase();
  const visible = fields.filter(
    (f) =>
      (filter === 'all' || f.group === filter) &&
      (!q || f.name.toLowerCase().includes(q) || f.crops.some((c) => c.name.toLowerCase().includes(q))),
  );

  return (
    <Screen edges={['top']} header={<PageHeader title="Field Management" showBack={false} />} contentStyle={styles.content}>
      <View style={styles.searchRow}>
        <SearchField value={query} onChangeText={setQuery} placeholder="Search Fields" style={styles.search} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add field"
          onPress={() => router.push('/field/add')}
          style={styles.addButton}>
          <Add size={28} color={ink.title} />
        </Pressable>
      </View>

      <View style={styles.stats}>
        {fieldStats.map((s) => (
          <View key={s.label} style={[styles.stat, { backgroundColor: s.bg }]}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} style={styles.filterScroll}>
        {filters.map((f) => {
          const active = f.key === filter;
          return (
            <Pressable
              key={f.key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={f.label}
              onPress={() => setFilter(f.key)}
              style={[styles.filter, active && styles.filterActive]}>
              <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {fieldGroups.map((g) => {
        const items = visible.filter((f) => f.group === g.key);
        if (items.length === 0) return null;
        return (
          <View key={g.key} style={styles.section}>
            <Text style={styles.sectionTitle}>{g.title}</Text>
            <View style={styles.cards}>
              {items.map((f) => (
                <FieldListCard
                  key={f.id}
                  field={f}
                  onOpen={() => router.push(`/field/${f.id}`)}
                  onMore={() => router.push(`/field/${f.id}/edit`)}
                  onAddCrop={() => router.push(`/field/${f.id}/add-crop`)}
                />
              ))}
            </View>
          </View>
        );
      })}
      {visible.length === 0 ? <Text style={styles.noResults}>No fields match your search</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 120 },
  searchRow: { flexDirection: 'row', gap: 13 },
  search: { flex: 1 },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: { flexDirection: 'row', gap: 12, marginTop: 24 },
  stat: { flex: 1, height: 68, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 2 },
  statValue: font('medium', 16.5, 24, ink.title),
  statLabel: font('regular', 12.5, 20, ink.body),
  filterScroll: { marginTop: 24, marginBottom: 15, marginHorizontal: -16, flexGrow: 0 },
  filters: { gap: 12, paddingHorizontal: 16 },
  filter: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: palette.neutral95,
    borderWidth: 1.5,
    borderColor: palette.neutral95,
  },
  filterActive: { backgroundColor: palette.primary95, borderColor: colors.primary, paddingHorizontal: 10 },
  filterLabel: { ...font('regular', 12.5, 20, ink.title), letterSpacing: 0.2 },
  filterLabelActive: { fontFamily: font('medium', 13, 20).fontFamily, letterSpacing: 0 },
  section: { marginTop: 16 },
  sectionTitle: font('medium', 17, 24, ink.title),
  cards: { gap: 16, marginTop: 10 },
  noResults: { ...font('regular', 13, 20, ink.muted), textAlign: 'center', marginTop: 32 },
});
