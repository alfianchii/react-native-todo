import React, { useState } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@theme/colors"
import { BottomSheet } from "@components/Base/BottomSheet"
import { OptionRow } from "@components/Base/OptionRow"
import { SelectSheet } from "@components/Base/SelectSheet"

const dateOptions = [
	{ id: "today", label: "Today", icon: "today" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "tomorrow", label: "Tomorrow", icon: "event" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "this_week", label: "This Week", icon: "date-range" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "next_week", label: "Next Week", icon: "calendar-month" as const, iconColor: colors.datePink, iconBackgroundColor: colors.datePinkBg },
	{ id: "no_date", label: "No Due Date", icon: "event-busy" as const, iconColor: colors.gray500, iconBackgroundColor: colors.gray100 },
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

interface AddTaskScreenProps {
	visible: boolean
	onClose: () => void
	onSave?: (task: { title: string; description: string; dueDate: string; category: string; priority: string }) => void
}

export const AddTaskScreen: React.FC<AddTaskScreenProps> = ({
	visible,
	onClose,
	onSave,
}) => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	
	// Selection states
	const [selectedDate, setSelectedDate] = useState(dateOptions[0])
	const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0])
	const [selectedPriority, setSelectedPriority] = useState(priorityOptions[0])
	
	// Sheet visibility states
	const [isDateSheetVisible, setIsDateSheetVisible] = useState(false)
	const [isCategorySheetVisible, setIsCategorySheetVisible] = useState(false)
	const [isPrioritySheetVisible, setIsPrioritySheetVisible] = useState(false)

	const handleSave = () => {
		if (title.trim()) {
			onSave?.({
				title: title.trim(),
				description: description.trim(),
				dueDate: selectedDate.label,
				category: selectedCategory.label,
				priority: selectedPriority.label,
			})
			handleClose()
		}
	}

	const resetForm = () => {
		setTitle("")
		setDescription("")
		setSelectedDate(dateOptions[0])
		setSelectedCategory(categoryOptions[0])
		setSelectedPriority(priorityOptions[0])
	}

	const handleClose = () => {
		resetForm()
		onClose()
	}

	return (
		<>
			<BottomSheet visible={visible} onClose={handleClose}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
					bounces={false}
				>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>Add New Task</Text>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={handleClose}
							activeOpacity={0.7}
						>
							<MaterialIcons name="close" size={20} color={colors.textMuted} />
						</TouchableOpacity>
					</View>

					<View style={styles.content}>
						<View style={styles.inputSection}>
							<TextInput
								style={styles.titleInput}
								placeholder="What needs to be done?"
								placeholderTextColor={colors.gray400}
								value={title}
								onChangeText={setTitle}
							/>
							<TextInput
								style={styles.descriptionInput}
								placeholder="Add details..."
								placeholderTextColor={colors.gray400}
								value={description}
								onChangeText={setDescription}
								multiline
								numberOfLines={3}
							/>
						</View>

						<View style={styles.optionsSection}>
							<OptionRow
								icon="event"
								iconBackgroundColor={selectedDate.iconBackgroundColor}
								iconColor={selectedDate.iconColor}
								label="DUE DATE"
								value={selectedDate.label}
								onPress={() => setIsDateSheetVisible(true)}
							/>
							<OptionRow
								icon="label"
								iconBackgroundColor={selectedCategory.iconBackgroundColor}
								iconColor={selectedCategory.iconColor}
								label="CATEGORY"
								value={selectedCategory.label}
								onPress={() => setIsCategorySheetVisible(true)}
							/>
							<OptionRow
								icon="flag"
								iconBackgroundColor={selectedPriority.iconBackgroundColor}
								iconColor={selectedPriority.iconColor}
								label="PRIORITY"
								value={selectedPriority.label}
								onPress={() => setIsPrioritySheetVisible(true)}
							/>
						</View>
					</View>

					<View style={styles.footer}>
						<TouchableOpacity
							style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]}
							onPress={handleSave}
							activeOpacity={0.8}
							disabled={!title.trim()}
						>
							<MaterialIcons name="check" size={20} color={colors.white} />
							<Text style={styles.saveButtonText}>Save Task</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.safeArea} />
				</ScrollView>
			</BottomSheet>

			<SelectSheet
				visible={isDateSheetVisible}
				onClose={() => setIsDateSheetVisible(false)}
				title="Select Due Date"
				options={dateOptions}
				selectedId={selectedDate.id}
				onSelect={(option) => setSelectedDate(option as typeof selectedDate)}
			/>

			<SelectSheet
				visible={isCategorySheetVisible}
				onClose={() => setIsCategorySheetVisible(false)}
				title="Select Category"
				options={categoryOptions}
				selectedId={selectedCategory.id}
				onSelect={(option) => setSelectedCategory(option as typeof selectedCategory)}
			/>

			<SelectSheet
				visible={isPrioritySheetVisible}
				onClose={() => setIsPrioritySheetVisible(false)}
				title="Select Priority"
				options={priorityOptions}
				selectedId={selectedPriority.id}
				onSelect={(option) => setSelectedPriority(option as typeof selectedPriority)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingVertical: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.textMain,
		letterSpacing: -0.3,
	},
	closeButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(107, 114, 128, 0.1)",
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		paddingHorizontal: 24,
		paddingTop: 8,
		paddingBottom: 24,
		gap: 24,
	},
	inputSection: {
		gap: 8,
	},
	titleInput: {
		fontSize: 24,
		fontWeight: "700",
		color: colors.textMain,
		padding: 0,
	},
	descriptionInput: {
		fontSize: 16,
		color: colors.textMuted,
		padding: 0,
		minHeight: 60,
		textAlignVertical: "top",
	},
	optionsSection: {
		gap: 12,
	},
	footer: {
		paddingHorizontal: 24,
		paddingTop: 8,
		paddingBottom: 24,
		borderTopWidth: 1,
		borderTopColor: "transparent",
	},
	saveButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: colors.primary,
		height: 48,
		borderRadius: 12,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	saveButtonDisabled: {
		opacity: 0.5,
	},
	saveButtonText: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.white,
	},
	safeArea: {
		height: 20,
		backgroundColor: colors.background,
	},
})
