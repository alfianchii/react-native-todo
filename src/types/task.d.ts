export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
}
