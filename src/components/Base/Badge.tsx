import React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { colors } from "@theme/colors"

interface BadgeProps {
	label?: string
	labelStyle?: TextStyle
	color?: string
	backgroundColor?: string
	showDot?: boolean
	size?: number
	borderColor?: string
	borderWidth?: number
	style?: ViewStyle
}

export const Badge: React.FC<BadgeProps> = ({ label, labelStyle, color = colors.notification, backgroundColor, showDot = true, size = 6, borderColor = colors.white, borderWidth = 1, style }) => {
	if (!label) {
		return (
			<View
				style={[
					styles.dotIndicator,
					{
						backgroundColor: color,
						width: size,
						height: size,
						borderRadius: size / 2,
						borderColor,
						borderWidth,
					},
					style,
				]}
			/>
		)
	}

	return (
		<View style={[styles.labeledBadge, { backgroundColor: backgroundColor || colors.gray100 }, style]}>
			{showDot && (
				<View
					style={[
						styles.dot,
						{
							backgroundColor: color,
							width: size,
							height: size,
							borderRadius: size / 2,
						},
					]}
				/>
			)}
			<Text style={[styles.text, { color }, labelStyle]}>{label}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	dotIndicator: {},
	labeledBadge: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 6,
		gap: 4,
	},
	dot: {},
	text: {
		fontSize: 12,
		fontWeight: "500",
	},
})
