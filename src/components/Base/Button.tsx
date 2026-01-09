import React from "react"
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@theme/colors"

type MaterialIconName = keyof typeof MaterialIcons.glyphMap

interface ButtonProps {
	onPress?: () => void
	icon?: MaterialIconName
	iconSize?: number
	iconColor?: string
	label?: string
	labelStyle?: TextStyle
	size?: number
	width?: number
	height?: number
	backgroundColor?: string
	borderRadius?: number
	style?: ViewStyle
	activeOpacity?: number
}

export const Button: React.FC<ButtonProps> = ({
	onPress,
	icon,
	iconSize = 24,
	iconColor = colors.textMain,
	label,
	labelStyle,
	size,
	width,
	height,
	backgroundColor = "transparent",
	borderRadius,
	style,
	activeOpacity = 0.7,
}) => {
	const buttonWidth = size ?? width
	const buttonHeight = size ?? height
	const buttonBorderRadius = borderRadius ?? (size ? size / 2 : undefined)

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					width: buttonWidth,
					height: buttonHeight,
					borderRadius: buttonBorderRadius,
					backgroundColor,
				},
				style,
			]}
			onPress={onPress}
			activeOpacity={activeOpacity}
		>
			{icon && <MaterialIcons name={icon} size={iconSize} color={iconColor} />}
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 8,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.textMain,
	},
})
