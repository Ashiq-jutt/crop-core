import { Stack } from 'expo-router';

import { colors } from '@/theme';

import { TasksProvider } from './TasksProvider';

/** Stack for the /tasks/* routes, sharing one task list between the list, week and form screens. */
export function TasksLayout() {
  return (
    <TasksProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
    </TasksProvider>
  );
}
