export type Priority = 'high' | 'medium' | 'low';
export type Category = 'inbox' | 'work' | 'personal' | 'college';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
  dueDate: Date;
  completed: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
}
