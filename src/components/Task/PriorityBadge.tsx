import React from "react"
import { ViewStyle } from "react-native"
import { colors } from "@theme/colors"
import { Badge } from "@components/Base/Badge"

type Priority = "high" | "medium" | "low"

interface PriorityBadgeProps {
	priority: Priority
	style?: ViewStyle
}

const priorityConfig: Record<Priority, { color: string; backgroundColor: string; label: string }> = {
	high: {
		color: "#dc2626",
		backgroundColor: colors.priorityHighBg,
		label: "High",
	},
	medium: {
		color: "#ea580c",
		backgroundColor: colors.priorityMediumBg,
		label: "Medium",
	},
	low: {
		color: colors.gray500,
		backgroundColor: colors.priorityLowBg,
		label: "Low",
	},
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, style }) => {
	const config = priorityConfig[priority]

	return <Badge label={config.label} color={config.color} backgroundColor={config.backgroundColor} showDot={true} style={style} />
}
