import React, { useState } from "react"
import { Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "@theme/colors"
import { mockTasks, filterOptions } from "@data/mockTasks"
import { Task, Priority } from "@type/task"
import { Header } from "@components/Layout/Header"
import { SearchBar } from "@components/Task/SearchBar"
import { FilterChips } from "@components/Task/FilterChips"
import { TaskCard } from "@components/Task/TaskCard"
import { FloatingActionButton } from "@components/Task/FloatingActionButton"
import { AddTaskScreen } from "@screens/task/AddTaskScreen"
import { isToday, isFuture, getDateFromSelection } from "@utils/date"

export const HomeScreen: React.FC = () => {
	const [selectedFilter, setSelectedFilter] = useState("all")
	const [searchQuery, setSearchQuery] = useState("")
	const [tasks, setTasks] = useState<Task[]>(mockTasks)
	const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

	const handleToggleComplete = (id: string) => {
		setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
	}

	const handleMenuPress = (id: string) => {
		console.log("Menu pressed for task:", id)
	}

	const handleAddTask = () => {
		setIsAddTaskVisible(true)
	}

	const handleSaveTask = (newTask: { title: string; description: string; dueDate: string; category: string; priority: string }) => {
		const priorityMap: Record<string, Priority> = {
			"High": "high",
			"Medium": "medium",
			"Low": "low",
		}

		const task: Task = {
			id: Date.now().toString(),
			title: newTask.title,
			description: newTask.description,
			dueDate: getDateFromSelection(newTask.dueDate),
			priority: priorityMap[newTask.priority] || "low",
			completed: false,
		}
		setTasks((prevTasks) => [task, ...prevTasks])
	}

	const handleNotificationPress = () => {
		console.log("Notifications pressed")
	}

	const filteredTasks = tasks.filter((task) => {
		if (selectedFilter === "completed") return task.completed
		if (selectedFilter === "today") return !task.completed && isToday(task.dueDate)
		if (selectedFilter === "upcoming") return !task.completed && isFuture(task.dueDate) && !isToday(task.dueDate)
		return true
	})

	const sortedTasks = filteredTasks.sort((a, b) => Number(a.completed) - Number(b.completed))

	return (
		<SafeAreaView style={styles.container}>
			<Header userName="Alfian Taka" greeting="Good Morning" hasNotifications={true} onNotificationPress={handleNotificationPress} />

			<SearchBar value={searchQuery} onChangeText={setSearchQuery} />

			<FilterChips options={filterOptions} selectedId={selectedFilter} onSelect={setSelectedFilter} />

			<ScrollView style={styles.taskList} contentContainerStyle={styles.taskListContent} showsVerticalScrollIndicator={false}>
				<Text style={styles.sectionTitle}>Today's Tasks</Text>
				{sortedTasks.map((task) => (
					<TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} onMenuPress={handleMenuPress} />
				))}
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
})
