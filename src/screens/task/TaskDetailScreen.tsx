import React, { useState } from "react"
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
import { Task, Priority } from "@type/task"
import { formatDate } from "@utils/date"

interface TaskDetailScreenProps {
	task: Task
	onBack: () => void
	onDelete: (id: string) => void
	onUpdate: (task: Task) => void
	onToggleComplete: (id: string) => void
}

const getPriorityColor = (priority: Priority) => {
	switch (priority) {
		case "high":
			return { bg: colors.priorityHighBg, text: colors.priorityHigh, icon: colors.priorityHigh }
		case "medium":
			return { bg: colors.priorityMediumBg, text: colors.priorityMedium, icon: colors.priorityMedium }
		case "low":
			return { bg: colors.priorityLowBg, text: colors.priorityLow, icon: colors.priorityLow }
	}
}

const getPriorityLabel = (priority: Priority) => {
	return priority.charAt(0).toUpperCase() + priority.slice(1)
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

	const priorityColors = getPriorityColor(task.priority)

	const handleTitleBlur = () => {
		if (title.trim() !== task.title) {
			onUpdate({ ...task, title: title.trim() })
		}
	}

	const handleDescriptionBlur = () => {
		if (description !== task.description) {
			onUpdate({ ...task, description })
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.headerButton} onPress={onBack}>
					<MaterialIcons name="arrow-back" size={24} color={colors.textMain} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Task Detail</Text>
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
					<Text style={styles.label}>Task Title</Text>
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
					<TouchableOpacity style={styles.metadataCard} activeOpacity={0.7}>
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

					<TouchableOpacity style={styles.metadataCard} activeOpacity={0.7}>
						<View style={styles.metadataLeft}>
							<View style={[styles.metadataIcon, { backgroundColor: colors.categoryWorkBg }]}>
								<MaterialIcons name="label" size={24} color={colors.categoryWork} />
							</View>
							<View style={styles.metadataText}>
								<Text style={styles.metadataLabel}>CATEGORY</Text>
								<Text style={styles.metadataValue}>Work</Text>
							</View>
						</View>
						<MaterialIcons name="expand-more" size={20} color={colors.gray400} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.metadataCard} activeOpacity={0.7}>
						<View style={styles.metadataLeft}>
							<View style={[styles.metadataIcon, { backgroundColor: priorityColors.bg }]}>
								<MaterialIcons name="flag" size={24} color={priorityColors.icon} />
							</View>
							<View style={styles.metadataText}>
								<Text style={styles.metadataLabel}>PRIORITY</Text>
								<Text style={[styles.metadataValue, { color: priorityColors.text }]}>
									{getPriorityLabel(task.priority)}
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
					onPress={() => onToggleComplete(task.id)}
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
		shadowColor: "#000",
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
