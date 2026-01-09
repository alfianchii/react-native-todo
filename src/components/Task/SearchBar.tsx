import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors, shadows } from "@theme/colors"

interface SearchBarProps {
	value?: string
	onChangeText?: (text: string) => void
	placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = "Search tasks..." }) => {
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<MaterialIcons name="search" size={20} color={colors.primary} style={styles.icon} />
				<TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textMuted} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		borderRadius: 12,
		paddingHorizontal: 12,
		...shadows.soft,
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		height: 48,
		fontSize: 15,
		color: colors.textMain,
	},
})
