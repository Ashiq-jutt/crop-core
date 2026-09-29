import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Danger, TickCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, palette } from '@/theme';

import { CropCard } from '../components/CropCard';
import { FooterBar } from '../components/FooterBar';
import { GlyphCircle } from '../components/GlyphCircle';
import { PageHeader } from '../components/PageHeader';
import { font, ink } from '../components/text';
import { cropActivity, getManagedCrop, healthInsight } from '../data/fields';

const irrigationGlyph = require('@assets/images/diagnosis/irrigation.png');

export function CropDetailsScreen() {
  const { id, cropId } = useLocalSearchParams<{ id: string; cropId: string }>();
  const { field, crop } = getManagedCrop(id, cropId);
  const [taskDone, setTaskDone] = useState(false);

  return (
    <Screen
      header={<PageHeader title="Crop Details" />}
      footer={
        <FooterBar
          label="Mark as Harvested"
          onPress={() => router.dismissTo(`/field/${field.id}`)}
          icon={<TickCircle size={24} color={palette.neutral100} variant="Bold" />}
        />
      }
      contentStyle={styles.content}>
      <CropCard
        crop={crop}
        taskDone={taskDone}
        onToggleTask={() => setTaskDone((d) => !d)}
        onAddTask={() => router.push(`/field/${field.id}/task?crop=${crop.id}`)}
        primary={{ label: 'Update Status', onPress: () => router.push(`/field/${field.id}/crop/${crop.id}/status`) }}
        secondary={{ label: 'Remove Crop', onPress: () => router.dismissTo(`/field/${field.id}`) }}
      />

      <Text style={styles.sectionTitle}>Activity History</Text>
      <View style={styles.history}>
        {cropActivity.map((a) => (
          <View key={a.title} style={styles.activity}>
            <GlyphCircle source={irrigationGlyph} size={32} background="#E2F2FE" />
            <View>
              <Text style={styles.activityTitle}>{a.title}</Text>
              <Text style={styles.activityTime}>{a.time}</Text>
            </View>
          </View>
        ))}
        <View style={styles.timeline}>
          <View style={styles.timelineDot} />
          <View style={styles.timelineLine} />
        </View>
        <View style={styles.insight}>
          <Danger size={24} color={colors.primary} />
          <View style={styles.flex}>
            <Text style={styles.insightTitle}>{healthInsight.title}</Text>
            <Text style={styles.insightBody}>{healthInsight.body}</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 0 },
  flex: { flex: 1 },
  sectionTitle: { ...font('medium', 17, 24, ink.title), marginTop: 14 },
  history: {
    marginTop: 10,
    height: 420,
    borderWidth: 1.5,
    borderColor: '#E5E7E9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 84,
  },
  activity: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  activityTitle: font('semibold', 14.5, 20, ink.title),
  activityTime: font('regular', 12.5, 18, '#545A64'),
  timeline: { marginTop: 79, marginLeft: 11, alignItems: 'center', width: 8 },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E1E3E6' },
  timelineLine: { width: 2, height: 20, backgroundColor: '#E1E3E6' },
  insight: {
    position: 'absolute',
    top: 294.5,
    left: -1.5,
    right: -1.5,
    height: 80,
    borderRadius: 12,
    backgroundColor: ink.warningSurface,
    flexDirection: 'row',
    paddingLeft: 13,
    paddingRight: 12,
    paddingTop: 12,
    gap: 11,
  },
  insightTitle: font('medium', 14.5, 22, ink.title),
  insightBody: { ...font('regular', 12.5, 17, ink.title), marginTop: 2 },
});
