import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Screen } from '@/components/ui';
import { ActionButton } from '@/modules/fields/components/ActionButton';
import { font, ink } from '@/modules/fields/components/text';
import { palette } from '@/theme';

import { AddTaskSheet } from '../components/AddTaskSheet';
import { DetectionCard } from '../components/DetectionCard';
import { IssueList } from '../components/IssueList';
import { diagnosis } from '../data/diagnosis';

const photo = require('@assets/images/diagnosis/result-photo.jpg');
const bulb = require('@assets/images/diagnosis/bulb.png');

/** Photo with detection markers, and the result sheet sliding over it. */
export function DiagnosisResultScreen() {
  const { sheet } = useLocalSearchParams<{ sheet?: string }>();
  const [addTask, setAddTask] = useState(sheet === 'add-task');
  const insets = useSafeAreaInsets();

  return (
    <Screen edges={['top']} scroll={false} background="#E2D2C3">
      <View style={styles.root}>
        <Image source={photo} style={styles.photo} contentFit="cover" />
        <View style={[styles.sheet, { paddingBottom: Math.max(15, insets.bottom) }]}>
          <View style={styles.handle} />
          <DetectionCard detected={diagnosis.detectedJustNow} />
          <View style={styles.issues}>
            <IssueList issues={diagnosis.issues} gap={[19, 16]} />
          </View>
          <View style={styles.action}>
            <Image source={bulb} style={styles.bulb} contentFit="contain" />
            <View style={styles.flex}>
              <Text style={styles.actionLabel}>{diagnosis.quickAction.label}</Text>
              <Text style={styles.actionTitle}>{diagnosis.quickAction.title}</Text>
            </View>
            <ActionButton label="Add Task" height={36} radius={12} onPress={() => setAddTask(true)} labelStyle={styles.addLabel} style={styles.add} />
          </View>
          <ActionButton
            label="View Summery"
            height={50}
            radius={12}
            onPress={() => router.push('/diagnosis/summary')}
            labelStyle={styles.summaryLabel}
            style={styles.summary}
          />
        </View>
      </View>
      <AddTaskSheet visible={addTask} onClose={() => setAddTask(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  photo: { position: 'absolute', top: 0, left: 0, width: '100%', aspectRatio: 375 / 350 },
  flex: { flex: 1 },
  sheet: {
    backgroundColor: palette.neutral100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  handle: { alignSelf: 'center', width: 40, height: 8, borderRadius: 4, backgroundColor: ink.cardBorder, marginBottom: 24 },
  issues: { marginTop: 27, paddingHorizontal: 12 },
  action: {
    marginTop: 32,
    height: 56,
    borderRadius: 8,
    backgroundColor: palette.primary95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 8,
  },
  bulb: { width: 26, height: 26, marginRight: 9 },
  actionLabel: font('regular', 13, 18, ink.title),
  actionTitle: { ...font('semibold', 14.5, 20, ink.title), marginTop: 1 },
  add: { width: 88, paddingHorizontal: 0 },
  addLabel: font('medium', 15, 20),
  summary: { marginTop: 31 },
  summaryLabel: font('medium', 16, 22),
});
