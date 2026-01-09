import { Task, FilterOption } from '@type/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Review',
    priority: 'high',
    date: 'Jan 10',
    time: '10:00 AM',
    completed: false,
  },
  {
    id: '2',
    title: 'Update Client Presentation',
    priority: 'medium',
    date: 'Jan 10',
    completed: false,
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    priority: 'low',
    date: 'Jan 11',
    completed: false,
  },
  {
    id: '4',
    title: 'Morning Standup',
    priority: 'low',
    date: 'Jan 10',
    completed: true,
  },
  {
    id: '5',
    title: 'Grocery Shopping',
    priority: 'low',
    date: 'Jan 11',
    completed: false,
  },
  {
    id: '6',
    title: 'Grocery Shopping',
    priority: 'low',
    date: 'Jan 11',
    completed: false,
  },
  {
    id: '7',
    title: 'Grocery Shopping',
    priority: 'low',
    date: 'Jan 11',
    completed: true,
  },
  {
    id: '8',
    title: 'Grocery Shopping',
    priority: 'high',
    date: 'Jan 11',
    completed: true,
  },
];

export const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];
