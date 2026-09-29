import { router } from 'expo-router';

import { TaskForm } from '../components/form/TaskForm';
import { systemRecommendation } from '../data/tasks';

/** System-suggested task, pre-filled from the recommendation; the toggle switches to manual entry. */
export function SystemTaskScreen() {
  return (
    <TaskForm
      title="Add Task"
      initial={systemRecommendation.draft}
      compactInstructionTitle
      notesHeight={88}
      typeLabels={{ pestSpray: 'Spray' }}
      recommendation={{
        title: systemRecommendation.title,
        icon: systemRecommendation.icon,
        manual: false,
        onToggleManual: (manual) => manual && router.replace('/tasks/add'),
      }}
      onSubmit={() => router.back()}
    />
  );
}
