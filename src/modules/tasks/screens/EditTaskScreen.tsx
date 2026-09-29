import { router, useLocalSearchParams } from 'expo-router';

import { TaskForm } from '../components/form/TaskForm';
import { useTasks } from '../components/TasksProvider';
import { defaultDraft } from '../data/tasks';

export function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, saveDraft } = useTasks();
  const task = getTask(id);
  return (
    <TaskForm
      title="Edit Task"
      initial={task?.draft ?? { ...defaultDraft, notes: 'Apply after Spray for better absorption' }}
      compactInstructionTitle
      notesHeight={88}
      onSubmit={(draft) => {
        if (task) saveDraft(task.id, draft);
        router.back();
      }}
    />
  );
}
