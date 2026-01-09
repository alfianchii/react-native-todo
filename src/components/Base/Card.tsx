import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { colors, shadows } from "@theme/colors"

interface CardProps {
	children: React.ReactNode
	borderLeftColor?: string
	borderLeftWidth?: number
	backgroundColor?: string
	showShadow?: boolean
	style?: ViewStyle
}

export const Card: React.FC<CardProps> = ({ children, borderLeftColor, borderLeftWidth = 4, backgroundColor = colors.white, showShadow = true, style }) => {
	return (
		<View
			style={[
				styles.card,
				{ backgroundColor },
				showShadow && shadows.card,
				borderLeftColor && {
					borderLeftColor,
					borderLeftWidth,
				},
				style,
			]}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		padding: 12,
	},
})
