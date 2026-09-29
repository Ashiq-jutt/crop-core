import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText, Screen } from '@/components/ui';

import { DateStrip } from '../components/DateStrip';
import { StatusChips } from '../components/StatusChips';
import { WeatherAlertCard } from '../components/TaskBanners';
import { TaskBannerDivider } from '../components/TaskBannerDivider';
import { TaskHeader } from '../components/TaskHeader';
import { TaskList } from '../components/TaskList';
import { TasksEmptyState } from '../components/TasksEmptyState';
import { useTasks } from '../components/TasksProvider';
import { statusTabs, type TaskStatus } from '../data/tasks';

/** Week view; `empty` renders the "no task" state of the design regardless of the day's tasks. */
export function WeeklyTaskScreen({ empty = false }: { empty?: boolean }) {
  const { tasks } = useTasks();
  const [day, setDay] = useState(0);
  const [status, setStatus] = useState<TaskStatus>('due');
  const dayTasks = empty ? [] : tasks.filter((t) => t.day === day);
  const visible = dayTasks.filter((t) => t.status === status);
  const heading = statusTabs.find((s) => s.id === status)?.heading ?? '';

  return (
    <Screen header={<TaskHeader title="My Task" onCalendar={() => router.push('/tasks')} />} contentStyle={styles.content}>
      <View style={styles.strip}>
        <DateStrip value={day} onChange={setDay} />
      </View>
      {dayTasks.length === 0 ? (
        <View style={styles.empty}>
          <TasksEmptyState onAddTask={() => router.push('/tasks/add')} />
        </View>
      ) : (
        <>
          <View style={styles.chips}>
            <StatusChips value={status} onChange={setStatus} />
          </View>
          <TaskBannerDivider />
          <View style={styles.alert}>
            <WeatherAlertCard />
          </View>
          <AppText variant="titleMedium" style={styles.heading}>
            {heading}
          </AppText>
          <TaskList tasks={visible} />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  strip: { marginTop: 24 },
  chips: { marginTop: 23 },
  alert: { marginTop: 16 },
  heading: { marginTop: 13, marginBottom: 16, marginHorizontal: 16 },
  empty: { marginTop: 86 },
});
