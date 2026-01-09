import { colors } from '@theme/colors'
import { MaterialIcons } from '@expo/vector-icons'

type MaterialIconName = keyof typeof MaterialIcons.glyphMap

export interface SelectOption {
	id: string
	label: string
	icon: MaterialIconName
	iconColor: string
	iconBackgroundColor: string
}

export const dateOptions: SelectOption[] = [
	{ id: 'today', label: 'Today', icon: 'today', iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: 'tomorrow', label: 'Tomorrow', icon: 'event', iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: 'this_week', label: 'This Week', icon: 'date-range', iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: 'next_week', label: 'Next Week', icon: 'calendar-month', iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
]

export const categoryOptions: SelectOption[] = [
	{ id: 'inbox', label: 'Inbox', icon: 'inbox', iconColor: colors.categoryInbox, iconBackgroundColor: colors.categoryInboxBg },
	{ id: 'work', label: 'Work', icon: 'work', iconColor: colors.categoryWork, iconBackgroundColor: colors.categoryWorkBg },
	{ id: 'personal', label: 'Personal', icon: 'person', iconColor: colors.categoryPersonal, iconBackgroundColor: colors.categoryPersonalBg },
	{ id: 'college', label: 'College', icon: 'school', iconColor: colors.categoryCollege, iconBackgroundColor: colors.categoryCollegeBg },
]

export const priorityOptions: SelectOption[] = [
	{ id: 'low', label: 'Low', icon: 'flag', iconColor: colors.priorityLow, iconBackgroundColor: colors.priorityLowBg },
	{ id: 'medium', label: 'Medium', icon: 'flag', iconColor: colors.priorityMedium, iconBackgroundColor: colors.priorityMediumBg },
	{ id: 'high', label: 'High', icon: 'flag', iconColor: colors.priorityHigh, iconBackgroundColor: colors.priorityHighBg },
]
