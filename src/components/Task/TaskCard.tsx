import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@theme/colors"
import { Task, Priority } from "@type/task"
import { PriorityBadge } from "./PriorityBadge"
import { Card } from "@components/Base/Card"
import { Checkbox } from "@components/Base/Checkbox"
import { Button } from "@components/Base/Button"
import { formatDate } from "@utils/date"

interface TaskCardProps {
	task: Task
	onToggleComplete: (id: string) => void
	onMenuPress?: (id: string) => void
}

const getBorderColor = (priority: Priority): string => {
	switch (priority) {
		case "high":
			return colors.priorityHigh
		case "medium":
			return colors.priorityMedium
		case "low":
			return "rgba(101, 103, 241, 0.3)"
		default:
			return colors.gray300
	}
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onMenuPress }) => {
	const { completed, priority } = task

	if (completed) {
		return (
			<Card backgroundColor={colors.borderLight} showShadow={false} style={styles.completedCard} borderLeftColor={getBorderColor(priority)} borderLeftWidth={4}>
				<View style={styles.content}>
					<Checkbox checked={true} onPress={() => onToggleComplete(task.id)} size={20} />
					<View style={styles.textContainer}>
						<Text style={[styles.title, styles.titleCompleted]}>{task.title}</Text>
						<View style={styles.metaRow}>
							<View style={styles.metaItem}>
								<MaterialIcons name="check-circle" size={14} color={colors.success} />
								<Text style={styles.completedText}>Completed</Text>
							</View>
						</View>
					</View>
				</View>
			</Card>
		)
	}

	return (
		<Card borderLeftColor={getBorderColor(priority)} borderLeftWidth={4} style={styles.card}>
			<View style={styles.content}>
				<Checkbox checked={false} onPress={() => onToggleComplete(task.id)} size={20} />
				<View style={styles.textContainer}>
					<Text style={styles.title} numberOfLines={1}>
						{task.title}
					</Text>
					<View style={styles.metaRow}>
						<PriorityBadge priority={priority} />
						<View style={styles.metaItem}>
							<MaterialIcons name="event" size={14} color={colors.textMuted} />
							<Text style={styles.metaText}>{formatDate(task.dueDate)}</Text>
						</View>
					</View>
				</View>
				{onMenuPress && <Button icon="more-vert" onPress={() => onMenuPress(task.id)} size={28} iconSize={20} iconColor={colors.gray300} />}
			</View>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		opacity: 1,
		borderWidth: 0,
	},
	completedCard: {
		marginBottom: 16,
		borderWidth: 1,
		borderColor: colors.gray200,
		opacity: 0.7,
	},
	content: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.textMain,
		marginBottom: 6,
	},
	titleCompleted: {
		color: colors.textMuted,
		textDecorationLine: "line-through",
		fontWeight: "500",
	},
	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 12,
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	metaText: {
		fontSize: 12,
		color: colors.textMuted,
	},
	completedText: {
		fontSize: 12,
		color: colors.success,
	},
})
