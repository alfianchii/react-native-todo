import React from "react"
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { colors, shadows } from "@theme/colors"

interface ChipProps {
	label: string
	isActive?: boolean
	onPress?: () => void
	activeBackgroundColor?: string
	inactiveBackgroundColor?: string
	activeTextColor?: string
	inactiveTextColor?: string
	style?: ViewStyle
	textStyle?: TextStyle
}

export const Chip: React.FC<ChipProps> = ({
	label,
	isActive = false,
	onPress,
	activeBackgroundColor = colors.primary,
	inactiveBackgroundColor = colors.white,
	activeTextColor = colors.white,
	inactiveTextColor = colors.textMuted,
	style,
	textStyle,
}) => {
	return (
		<TouchableOpacity
			style={[styles.chip, isActive ? [styles.chipActive, { backgroundColor: activeBackgroundColor }] : [styles.chipInactive, { backgroundColor: inactiveBackgroundColor }], style]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text style={[styles.chipText, { color: isActive ? activeTextColor : inactiveTextColor }, textStyle]}>{label}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	chip: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 50,
	},
	chipActive: {
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	chipInactive: {
		...shadows.card,
	},
	chipText: {
		fontSize: 14,
		fontWeight: "600",
	},
})
