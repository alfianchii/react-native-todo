import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@theme/colors"

type MaterialIconName = keyof typeof MaterialIcons.glyphMap

interface OptionRowProps {
	icon: MaterialIconName
	iconBackgroundColor: string
	iconColor: string
	label: string
	value: string
	onPress?: () => void
}

export const OptionRow: React.FC<OptionRowProps> = ({
	icon,
	iconBackgroundColor,
	iconColor,
	label,
	value,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
				<MaterialIcons name={icon} size={20} color={iconColor} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.value}>{value}</Text>
			</View>
			<MaterialIcons name="chevron-right" size={24} color={colors.gray400} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		backgroundColor: colors.white,
		padding: 12,
		borderRadius: 12,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		flex: 1,
		gap: 2,
	},
	label: {
		fontSize: 11,
		fontWeight: "500",
		color: colors.textMuted,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	value: {
		fontSize: 16,
		fontWeight: "500",
		color: colors.textMain,
	},
})
