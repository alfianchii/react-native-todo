import React, { useState, useEffect } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "@theme/colors"
import { Task, Priority, Category } from "@type/task"
import { formatDate, getDateFromSelection } from "@utils/date"
import { SelectSheet } from "@components/Base/SelectSheet"

interface TaskDetailScreenProps {
	task: Task
	onBack: () => void
	onDelete: (id: string) => void
	onUpdate: (task: Task) => void
	onToggleComplete: (id: string) => void
}

const dateOptions = [
	{ id: "today", label: "Today", icon: "today" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "tomorrow", label: "Tomorrow", icon: "event" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "this_week", label: "This Week", icon: "date-range" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "next_week", label: "Next Week", icon: "calendar-month" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
]

const categoryOptions = [
	{ id: "inbox", label: "Inbox", icon: "inbox" as const, iconColor: colors.categoryInbox, iconBackgroundColor: colors.categoryInboxBg },
	{ id: "work", label: "Work", icon: "work" as const, iconColor: colors.categoryWork, iconBackgroundColor: colors.categoryWorkBg },
	{ id: "personal", label: "Personal", icon: "person" as const, iconColor: colors.categoryPersonal, iconBackgroundColor: colors.categoryPersonalBg },
	{ id: "college", label: "College", icon: "school" as const, iconColor: colors.categoryCollege, iconBackgroundColor: colors.categoryCollegeBg },
]

const priorityOptions = [
	{ id: "low", label: "Low", icon: "flag" as const, iconColor: colors.priorityLow, iconBackgroundColor: colors.priorityLowBg },
	{ id: "medium", label: "Medium", icon: "flag" as const, iconColor: colors.priorityMedium, iconBackgroundColor: colors.priorityMediumBg },
	{ id: "high", label: "High", icon: "flag" as const, iconColor: colors.priorityHigh, iconBackgroundColor: colors.priorityHighBg },
]

const getCategoryStyle = (category: Category) => {
	const option = categoryOptions.find((c) => c.id === category)!

	return {
		bg: option.iconBackgroundColor,
		color: option.iconColor,
		label: option.label,
	}
}

const getPriorityStyle = (priority: Priority) => {
	const option = priorityOptions.find((p) => p.id === priority)!

	return {
		bg: option.iconBackgroundColor,
		color: option.iconColor,
		label: option.label,
	}
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
	task,
	onBack,
	onDelete,
	onUpdate,
	onToggleComplete,
}) => {
	const [title, setTitle] = useState(task.title)
	const [description, setDescription] = useState(task.description || "")

	const [isDateSheetVisible, setIsDateSheetVisible] = useState(false)
	const [isCategorySheetVisible, setIsCategorySheetVisible] = useState(false)
	const [isPrioritySheetVisible, setIsPrioritySheetVisible] = useState(false)

	useEffect(() => {
		setTitle(task.title)
		setDescription(task.description || "")
	}, [task])

	const categoryStyle = getCategoryStyle(task.category)
	const priorityStyle = getPriorityStyle(task.priority)

	const handleTitleBlur = () => {
		if (title.trim() !== task.title) onUpdate({ ...task, title: title.trim() })
        if (!title) onUpdate({ ...task, title: task.title })
	}

	const handleDescriptionBlur = () => {
		if (description !== task.description) onUpdate({ ...task, description })
	}

	const handleDateSelect = (option: { id: string; label: string }) => {
		const newDate = getDateFromSelection(option.label)
		onUpdate({ ...task, dueDate: newDate })
	}

	const handleCategorySelect = (option: { id: string; label: string }) => {
		onUpdate({ ...task, category: option.id as Category })
	}

	const handlePrioritySelect = (option: { id: string; label: string }) => {
		onUpdate({ ...task, priority: option.id as Priority })
	}

	const handleToggleComplete = () => {
		onToggleComplete(task.id)
		onBack()
	}

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.headerButton} onPress={onBack}>
						<MaterialIcons name="arrow-back" size={24} color={colors.textMain} />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Detail</Text>
					<TouchableOpacity
						style={styles.deleteButton}
						onPress={() => onDelete(task.id)}
					>
						<MaterialIcons name="delete" size={24} color={colors.error} />
					</TouchableOpacity>
				</View>

				<ScrollView
					style={styles.content}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.titleSection}>
						<Text style={styles.label}>Title</Text>
						<TextInput
							style={styles.titleInput}
							value={title}
							onChangeText={setTitle}
							onBlur={handleTitleBlur}
							multiline
							placeholder="Enter task title..."
							placeholderTextColor={colors.gray400}
						/>
					</View>

					<View style={styles.metadataSection}>
						<TouchableOpacity
							style={styles.metadataCard}
							activeOpacity={0.7}
							onPress={() => setIsDateSheetVisible(true)}
						>
							<View style={styles.metadataLeft}>
								<View style={[styles.metadataIcon, { backgroundColor: colors.datePinkBg }]}>
									<MaterialIcons name="event" size={24} color={colors.datePink} />
								</View>
								<View style={styles.metadataText}>
									<Text style={styles.metadataLabel}>DUE DATE</Text>
									<Text style={styles.metadataValue}>{formatDate(task.dueDate)}</Text>
								</View>
							</View>
							<MaterialIcons name="edit-calendar" size={20} color={colors.gray400} />
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.metadataCard}
							activeOpacity={0.7}
							onPress={() => setIsCategorySheetVisible(true)}
						>
							<View style={styles.metadataLeft}>
								<View style={[styles.metadataIcon, { backgroundColor: categoryStyle.bg }]}>
									<MaterialIcons name="label" size={24} color={categoryStyle.color} />
								</View>
								<View style={styles.metadataText}>
									<Text style={styles.metadataLabel}>CATEGORY</Text>
									<Text style={styles.metadataValue}>{categoryStyle.label}</Text>
								</View>
							</View>
							<MaterialIcons name="expand-more" size={20} color={colors.gray400} />
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.metadataCard}
							activeOpacity={0.7}
							onPress={() => setIsPrioritySheetVisible(true)}
						>
							<View style={styles.metadataLeft}>
								<View style={[styles.metadataIcon, { backgroundColor: priorityStyle.bg }]}>
									<MaterialIcons name="flag" size={24} color={priorityStyle.color} />
								</View>
								<View style={styles.metadataText}>
									<Text style={styles.metadataLabel}>PRIORITY</Text>
									<Text style={[styles.metadataValue, { color: priorityStyle.color }]}>
										{priorityStyle.label}
									</Text>
								</View>
							</View>
							<MaterialIcons name="expand-more" size={20} color={colors.gray400} />
						</TouchableOpacity>
					</View>

					<View style={styles.descriptionSection}>
						<Text style={styles.descriptionLabel}>Description</Text>
						<TextInput
							style={styles.descriptionInput}
							value={description}
							onChangeText={setDescription}
							onBlur={handleDescriptionBlur}
							multiline
							placeholder="Add details about this task..."
							placeholderTextColor={colors.gray400}
							textAlignVertical="top"
						/>
					</View>
				</ScrollView>

				<LinearGradient
					colors={["transparent", colors.background, colors.background]}
					style={styles.footerGradient}
				>
					<TouchableOpacity
						style={[
							styles.completeButton,
							task.completed && styles.completedButton,
						]}
						onPress={handleToggleComplete}
						activeOpacity={0.9}
					>
						<MaterialIcons
							name={task.completed ? "check-circle" : "check-circle-outline"}
							size={24}
							color={colors.white}
						/>
						<Text style={styles.completeButtonText}>
							{task.completed ? "Completed" : "Mark as Complete"}
						</Text>
					</TouchableOpacity>
				</LinearGradient>
			</SafeAreaView>

			<SelectSheet
				visible={isDateSheetVisible}
				onClose={() => setIsDateSheetVisible(false)}
				title="Select Due Date"
				options={dateOptions}
				selectedId={formatDate(task.dueDate).toLowerCase().replace(" ", "_")}
				onSelect={handleDateSelect}
			/>

			<SelectSheet
				visible={isCategorySheetVisible}
				onClose={() => setIsCategorySheetVisible(false)}
				title="Select Category"
				options={categoryOptions}
				selectedId={task.category}
				onSelect={handleCategorySelect}
			/>

			<SelectSheet
				visible={isPrioritySheetVisible}
				onClose={() => setIsPrioritySheetVisible(false)}
				title="Select Priority"
				options={priorityOptions}
				selectedId={task.priority}
				onSelect={handlePrioritySelect}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	headerButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.textMain,
	},
	deleteButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: 20,
		paddingBottom: 120,
	},
	titleSection: {
		marginTop: 16,
		marginBottom: 32,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: colors.textMuted,
		marginBottom: 8,
	},
	titleInput: {
		fontSize: 28,
		fontWeight: "700",
		color: colors.textMain,
		padding: 0,
		lineHeight: 36,
	},
	metadataSection: {
		gap: 16,
		marginBottom: 32,
	},
	metadataCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.white,
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.gray100,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.03,
		shadowRadius: 4,
		elevation: 1,
	},
	metadataLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	metadataIcon: {
		width: 48,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	metadataText: {
		gap: 2,
	},
	metadataLabel: {
		fontSize: 11,
		fontWeight: "600",
		color: colors.textMuted,
		letterSpacing: 0.5,
	},
	metadataValue: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.textMain,
	},
	descriptionSection: {
		marginBottom: 24,
	},
	descriptionLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.textMain,
		marginBottom: 12,
	},
	descriptionInput: {
		backgroundColor: colors.white,
		borderRadius: 16,
		padding: 20,
		fontSize: 16,
		lineHeight: 24,
		color: colors.textMuted,
		borderWidth: 1,
		borderColor: colors.gray100,
		minHeight: 160,
	},
	footerGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 32,
	},
	completeButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		backgroundColor: colors.primary,
		height: 56,
		borderRadius: 12,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 16,
		elevation: 8,
	},
	completedButton: {
		backgroundColor: colors.success,
	},
	completeButtonText: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.white,
	},
})
