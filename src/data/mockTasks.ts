import { Task, FilterOption } from '@type/task'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const nextWeek = new Date(today)
nextWeek.setDate(nextWeek.getDate() + 7)

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Review',
    priority: 'high',
    category: 'work',
    dueDate: nextWeek,
    completed: false,
  },
  {
    id: '2',
    title: 'Update Client Presentation',
    priority: 'medium',
    category: 'work',
    dueDate: today,
    completed: false,
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    priority: 'low',
    category: 'personal',
    dueDate: tomorrow,
    completed: false,
  },
  {
    id: '4',
    title: 'Morning Standup',
    priority: 'low',
    category: 'work',
    dueDate: nextWeek,
    completed: true,
  },
]

export const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
]
