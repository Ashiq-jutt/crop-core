import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { seedTasks, type Task, type TaskDraft } from '../data/tasks';

type TasksState = {
  tasks: Task[];
  getTask: (id: string) => Task | undefined;
  markDone: (id: string) => void;
  deleteTask: (id: string) => void;
  saveDraft: (id: string, draft: TaskDraft) => void;
};

const TasksContext = createContext<TasksState | null>(null);

/** In-memory task list shared by every /tasks/* screen. */
export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);

  const value = useMemo<TasksState>(
    () => ({
      tasks,
      getTask: (id) => tasks.find((t) => t.id === id),
      markDone: (id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: 'completed' } : t))),
      deleteTask: (id) => setTasks((ts) => ts.filter((t) => t.id !== id)),
      saveDraft: (id, draft) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, draft, note: draft.notes || t.note } : t))),
    }),
    [tasks],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks(): TasksState {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used inside <TasksProvider>');
  return ctx;
}
