import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText, Screen } from '@/components/ui';

import { StatusChips } from '../components/StatusChips';
import { TaskBannerDivider } from '../components/TaskBannerDivider';
import { TaskHeader } from '../components/TaskHeader';
import { TaskList } from '../components/TaskList';
import { TasksEmptyState } from '../components/TasksEmptyState';
import { TodayBanner } from '../components/TaskBanners';
import { useTasks } from '../components/TasksProvider';
import { statusTabs, type TaskStatus } from '../data/tasks';

export function MyTaskScreen() {
  const { tasks } = useTasks();
  const [status, setStatus] = useState<TaskStatus>('due');
  const visible = tasks.filter((t) => t.status === status);
  const heading = statusTabs.find((s) => s.id === status)?.heading ?? '';

  return (
    <Screen
      header={<TaskHeader title="My Task" onCalendar={() => router.push('/tasks/weekly')} />}
      contentStyle={styles.content}>
      <TodayBanner />
      <View style={styles.chips}>
        <StatusChips value={status} onChange={setStatus} />
      </View>
      <TaskBannerDivider />
      {visible.length > 0 ? (
        <>
          <AppText variant="labelLargeStrong" style={styles.heading}>
            {heading}
          </AppText>
          <TaskList tasks={visible} />
        </>
      ) : (
        <View style={styles.empty}>
          <TasksEmptyState onAddTask={() => router.push('/tasks/add')} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  chips: { marginTop: 15 },
  heading: { marginTop: 14.5, marginBottom: 17.5, marginHorizontal: 16 },
  empty: { marginTop: 40 },
});
