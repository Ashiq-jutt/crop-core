import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { TickCircle } from 'iconsax-react-native';

import { AppText, DashedDivider } from '@/components/ui';
import { colors, palette } from '@/theme';

import { todayTasks, type TodayTask } from '../data/home';
import { HomeButton } from './HomeButton';
import { HomeMetaLine } from './HomeMetaLine';
import { homeStyles } from './homeStyles';

type Props = { onAddTask?: () => void; onViewAll?: () => void };

export function TodayTasksCard({ onAddTask, onViewAll }: Props) {
  const [tasks, setTasks] = useState<TodayTask[]>(todayTasks);
  const toggle = (id: string) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <View style={[homeStyles.card, styles.card]}>
      <View style={styles.list}>
        {tasks.map((t) => (
          <View key={t.id} style={styles.row}>
            <Image source={t.icon} style={styles.icon} />
            <View style={styles.flex}>
              <AppText variant="labelMediumStrong">{t.title}</AppText>
              <View style={styles.meta}>
                <HomeMetaLine parts={[t.crop, t.field]} />
              </View>
            </View>
            <AppText variant="labelMediumStrong">{t.time}</AppText>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: t.done }}
              accessibilityLabel={`Mark ${t.title} done`}
              onPress={() => toggle(t.id)}
              hitSlop={8}>
              <TickCircle size={24} variant="Bold" color={t.done ? colors.success : palette.neutral90} />
            </Pressable>
          </View>
        ))}
      </View>

      <DashedDivider color={palette.neutral90} style={styles.divider} />

      <View style={homeStyles.buttonRow}>
        <HomeButton label="Add Task" onPress={onAddTask} />
        <HomeButton label="View All" variant="secondary" onPress={onViewAll} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingTop: 10 },
  list: { gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, height: 36 },
  icon: { width: 24, height: 24 },
  flex: { flex: 1 },
  meta: { marginTop: 4 },
  divider: { marginVertical: 16 },
});
