import { Task, FilterOption } from '@type/task';

// Helper to get dates
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Review',
    priority: 'high',
    dueDate: today,
    completed: false,
  },
  {
    id: '2',
    title: 'Update Client Presentation',
    priority: 'medium',
    dueDate: today,
    completed: false,
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    priority: 'low',
    dueDate: tomorrow,
    completed: false,
  },
  {
    id: '4',
    title: 'Morning Standup',
    priority: 'low',
    dueDate: yesterday,
    completed: true,
  },
  {
    id: '5',
    title: 'Team Meeting',
    priority: 'medium',
    dueDate: tomorrow,
    completed: false,
  },
  {
    id: '6',
    title: 'Code Review',
    priority: 'high',
    dueDate: nextWeek,
    completed: false,
  },
];

export const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];
