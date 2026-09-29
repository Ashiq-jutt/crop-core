import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Microphone2 } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, palette } from '@/theme';

import { CropBadge } from '../components/CropCard';
import { CropTile, RadioMark } from '../components/CropTile';
import { FooterBar } from '../components/FooterBar';
import { PageHeader } from '../components/PageHeader';
import { TaskSchedule, type Schedule } from '../components/TaskSchedule';
import { font, ink } from '../components/text';
import { getManagedCrop } from '../data/fields';
import { defaultSchedule, taskTypes, type TaskTypeKey } from '../data/tasks';

export function AddTaskScreen() {
  const { id, crop: cropId } = useLocalSearchParams<{ id: string; crop?: string }>();
  const { field, crop } = getManagedCrop(id, cropId);
  const [cropSelected, setCropSelected] = useState(true);
  const [type, setType] = useState<TaskTypeKey | null>('spray');
  const [custom, setCustom] = useState('');
  const [schedule, setSchedule] = useState<Schedule>({ ...defaultSchedule, note: 'Apply after Spray for better absorption' });

  const rows = [taskTypes.slice(0, 3), taskTypes.slice(3)];

  return (
    <Screen
      header={<PageHeader title="Add Task" />}
      footer={<FooterBar label="Add Task" onPress={() => router.back()} />}
      contentStyle={styles.content}>
      <Text style={styles.sectionTitle}>Selected Active Crop</Text>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected: cropSelected }}
        accessibilityLabel={crop.name}
        onPress={() => setCropSelected((s) => !s)}
        style={styles.cropCard}>
        <CropBadge crop={crop.crop} size={40} />
        <View style={styles.flex}>
          <Text style={[styles.cropName, cropSelected && styles.cropNameOn]}>{crop.name}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{crop.area}</Text>
            <View style={styles.metaDivider} />
            <Text style={styles.metaText}>{field.id === 'north' ? 'North-fields' : field.name}</Text>
          </View>
        </View>
        <View style={styles.bigRadio}>
          <RadioMark selected={cropSelected} />
        </View>
      </Pressable>

      <Text style={[styles.sectionTitle, styles.spaced]}>Select Task Type</Text>
      <View style={styles.grid}>
        {rows.map((row) => (
          <View key={row[0].key} style={styles.row}>
            {row.map((t) => (
              <CropTile
                key={t.key}
                label={t.label}
                glyph={t.glyph}
                height={96}
                selected={type === t.key}
                onPress={() => setType(t.key)}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.custom}>
        <TextInput
          value={custom}
          onChangeText={(text) => {
            setCustom(text);
            if (text) setType(null);
          }}
          placeholder="Custom Task"
          placeholderTextColor={ink.muted}
          accessibilityLabel="Custom Task"
          style={styles.customInput}
        />
        <Microphone2 size={24} color={ink.title} />
      </View>

      <Text style={[styles.sectionTitle, styles.setTime]}>Set Time</Text>
      <View style={styles.schedule}>
        <TaskSchedule value={schedule} onChange={setSchedule} notePlaceholder="Add Any Notes" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  flex: { flex: 1 },
  sectionTitle: font('medium', 17, 24, ink.title),
  spaced: { marginTop: 14 },
  setTime: { marginTop: 16 },
  cropCard: {
    marginTop: 12,
    height: 64,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },
  cropName: font('medium', 14.5, 22, ink.title),
  cropNameOn: { color: colors.primary },
  meta: { flexDirection: 'row', alignItems: 'center' },
  metaText: font('regular', 13, 20, ink.body),
  metaDivider: { width: 1, height: 14, backgroundColor: ink.cardBorder, marginHorizontal: 6 },
  bigRadio: { transform: [{ scale: 1.45 }], marginRight: 4 },
  grid: { marginTop: 11, gap: 17 },
  row: { flexDirection: 'row', gap: 17 },
  custom: {
    marginTop: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  customInput: { flex: 1, ...font('regular', 14.5, 22, ink.title), paddingVertical: 0 },
  schedule: { marginTop: 13 },
});
