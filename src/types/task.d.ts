export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  date: string;
  time?: string;
  completed: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
}
