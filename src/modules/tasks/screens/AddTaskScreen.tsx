import { router } from 'expo-router';

import { TaskForm } from '../components/form/TaskForm';
import { defaultDraft } from '../data/tasks';

export function AddTaskScreen() {
  return <TaskForm title="Add Task" initial={defaultDraft} notesHeight={104} onSubmit={() => router.back()} />;
}
