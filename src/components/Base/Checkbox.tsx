import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@theme/colors"

interface CheckboxProps {
	checked?: boolean
	onPress?: () => void
	size?: number
	checkedColor?: string
	uncheckedBorderColor?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onPress, size = 20, checkedColor = colors.primary, uncheckedBorderColor = colors.gray300 }) => {
	return (
		<TouchableOpacity
			style={[
				styles.checkbox,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					borderColor: checked ? checkedColor : uncheckedBorderColor,
					backgroundColor: checked ? checkedColor : "transparent",
				},
			]}
			onPress={onPress}
			activeOpacity={0.7}
		>
			{checked && <MaterialIcons name="check" size={size * 0.7} color={colors.white} />}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	checkbox: {
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
	},
})
