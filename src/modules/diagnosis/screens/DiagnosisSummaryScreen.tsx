import { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { DashedDivider, Screen } from '@/components/ui';
import { ActionButton } from '@/modules/fields/components/ActionButton';
import { GlyphCircle } from '@/modules/fields/components/GlyphCircle';
import { font, ink } from '@/modules/fields/components/text';

import { AddTaskSheet } from '../components/AddTaskSheet';
import { DetectionCard } from '../components/DetectionCard';
import { DiagnosisHeader } from '../components/DiagnosisHeader';
import { IssueList } from '../components/IssueList';
import { ProductCard } from '../components/ProductCard';
import { diagnosis, suggestedActions, suggestedProducts } from '../data/diagnosis';

export function DiagnosisSummaryScreen() {
  const { sheet } = useLocalSearchParams<{ sheet?: string }>();
  const [addTask, setAddTask] = useState(sheet === 'add-task');

  return (
    <Screen header={<DiagnosisHeader title="Summary" />} contentStyle={styles.content}>
      <View style={styles.gutter}>
        <DetectionCard detected={diagnosis.detectedEarlier} showCaret />

        <Text style={styles.section}>Detected Issues</Text>
        <View style={styles.issues}>
          <IssueList issues={diagnosis.issues} gap={[14, 12]} />
        </View>

        <Text style={styles.section}>Suggested Action</Text>
        <View style={styles.actions}>
          {suggestedActions.map((a, i) => (
            <Fragment key={a.id}>
              {i > 0 ? <DashedDivider style={styles.actionDivider} /> : null}
              <View style={styles.actionRow}>
                <GlyphCircle source={a.icon} size={40} background={a.iconBackground} />
                <View style={styles.flex}>
                  <Text style={styles.actionLabel}>{a.label}</Text>
                  <Text style={styles.actionTitle}>{a.title}</Text>
                </View>
                <ActionButton
                  label="Add"
                  height={38}
                  radius={10}
                  onPress={() => setAddTask(true)}
                  labelStyle={styles.addLabel}
                  style={styles.add}
                />
              </View>
            </Fragment>
          ))}
        </View>

        <Text style={[styles.section, styles.productsTitle]}>Suggested Product</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.products} style={styles.productScroll}>
        {suggestedProducts.map((p) => (
          <ProductCard key={p.id} product={p} onPress={() => router.push('/market')} />
        ))}
      </ScrollView>
      <AddTaskSheet visible={addTask} onClose={() => setAddTask(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 24, paddingBottom: 52 },
  gutter: { paddingHorizontal: 16 },
  flex: { flex: 1 },
  section: { ...font('semibold', 15.5, 22, ink.title), letterSpacing: 0.3, marginTop: 15 },
  issues: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    paddingHorizontal: 10.5,
    paddingTop: 10.5,
    paddingBottom: 13.5,
  },
  actions: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    paddingHorizontal: 10.5,
    paddingTop: 18.5,
    paddingBottom: 17.5,
  },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionDivider: { marginTop: 15, marginBottom: 16 },
  actionLabel: font('regular', 12.5, 18, ink.title),
  actionTitle: { ...font('semibold', 14.5, 20, ink.title), marginTop: 2 },
  add: { width: 54, paddingHorizontal: 0 },
  addLabel: font('medium', 14.5, 20),
  productsTitle: { marginTop: 18 },
  productScroll: { marginTop: 12 },
  products: { paddingHorizontal: 16, gap: 12 },
});
