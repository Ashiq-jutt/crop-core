import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import type { Task } from '../data/tasks';
import { TaskCard } from './TaskCard';
import { useTasks } from './TasksProvider';

/** Stack of task cards wired to the shared task store. */
export function TaskList({ tasks }: { tasks: Task[] }) {
  const { markDone, deleteTask } = useTasks();
  return (
    <View style={styles.list}>
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onMarkDone={() => markDone(t.id)}
          onDelete={() => deleteTask(t.id)}
          onEdit={() => router.push({ pathname: '/tasks/[id]/edit', params: { id: t.id } })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 16, paddingHorizontal: 16 },
});
