import React, { useState } from "react"
import { Text, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "@theme/colors"
import { mockTasks, filterOptions } from "@data/mockTasks"
import { Task, Priority, Category } from "@type/task"
import { Header } from "@components/Layout/Header"
import { SearchBar } from "@components/Task/SearchBar"
import { FilterChips } from "@components/Task/FilterChips"
import { TaskCard } from "@components/Task/TaskCard"
import { FloatingActionButton } from "@components/Task/FloatingActionButton"
import { AddTaskScreen } from "@screens/task/AddTaskScreen"
import { TaskDetailScreen } from "@screens/task/TaskDetailScreen"
import { isToday, isFuture, getDateFromSelection } from "@utils/date"

export const HomeScreen: React.FC = () => {
	const [selectedFilter, setSelectedFilter] = useState("all")
	const [searchQuery, setSearchQuery] = useState("")
	const [tasks, setTasks] = useState<Task[]>(mockTasks)
	const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)

	const handleToggleComplete = (id: string) => setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))

	const handleTaskPress = (id: string) => {
		const task = tasks.find((t) => t.id === id)
		if (task) setSelectedTask(task)
	}

	const handleAddTask = () => setIsAddTaskVisible(true)

	const handleSaveTask = (newTask: { title: string; description: string; dueDate: string; category: string; priority: string }) => {
		const priorityMap: Record<string, Priority> = {
			"High": "high",
			"Medium": "medium",
			"Low": "low",
		}

		const categoryMap: Record<string, Category> = {
			"Inbox": "inbox",
			"Work": "work",
			"Personal": "personal",
			"College": "college",
		}

		const task: Task = {
			id: Date.now().toString(),
			title: newTask.title,
			description: newTask.description,
			dueDate: getDateFromSelection(newTask.dueDate),
			priority: priorityMap[newTask.priority],
			category: categoryMap[newTask.category],
			completed: false,
		}
		setTasks((prevTasks) => [task, ...prevTasks])
	}

	const handleUpdateTask = (updatedTask: Task) => {
		setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
		setSelectedTask(updatedTask)
	}

	const handleDeleteTask = (id: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
		setSelectedTask(null)
	}

	const filteredTasks = tasks.filter((task) => {
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase()
			if (!task.title.toLowerCase().includes(query)) return false
		}

		if (selectedFilter === "completed") return task.completed
		if (selectedFilter === "today") return !task.completed && isToday(task.dueDate)
		if (selectedFilter === "upcoming") return !task.completed && isFuture(task.dueDate) && !isToday(task.dueDate)
		return true
	})

	const sortedTasks = filteredTasks.sort((a, b) => Number(a.completed) - Number(b.completed))

	if (selectedTask) {
		return (
			<TaskDetailScreen
				task={selectedTask}
				onBack={() => setSelectedTask(null)}
				onDelete={handleDeleteTask}
				onUpdate={handleUpdateTask}
				onToggleComplete={handleToggleComplete}
			/>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<Header userName="Alfian Taka" greeting="Good Morning" />

			<SearchBar value={searchQuery} onChangeText={setSearchQuery} />

			<FilterChips options={filterOptions} selectedId={selectedFilter} onSelect={setSelectedFilter} />

			<ScrollView style={styles.taskList} contentContainerStyle={styles.taskListContent} showsVerticalScrollIndicator={false}>
				<Text style={styles.sectionTitle}>Today's Tasks</Text>
				{sortedTasks.length === 0 ? (
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>No tasks found...</Text>
					</View>
				) : (
					sortedTasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							onToggleComplete={handleToggleComplete}
							onPress={handleTaskPress}
						/>
					))
				)}
			</ScrollView>

			<LinearGradient colors={["transparent", colors.background]} style={styles.bottomGradient} pointerEvents="none" />

			<FloatingActionButton onPress={handleAddTask} />

			<AddTaskScreen
				visible={isAddTaskVisible}
				onClose={() => setIsAddTaskVisible(false)}
				onSave={handleSaveTask}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	taskList: {
		flex: 1,
	},
	taskListContent: {
		paddingHorizontal: 20,
		paddingBottom: 100,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.textMain,
		marginBottom: 16,
		marginTop: 8,
	},
	bottomGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 40,
	},
	emptyState: {
		paddingVertical: 40,
		alignItems: "center",
	},
	emptyText: {
		fontSize: 16,
		color: colors.textMuted,
	},
})
