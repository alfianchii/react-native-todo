import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "@theme/colors"
import { Button } from "@components/Base/Button"

interface FloatingActionButtonProps {
	onPress: () => void
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
	return <Button icon="add" onPress={onPress} size={56} iconSize={32} iconColor={colors.white} backgroundColor={colors.primary} style={styles.fab} />
}

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		bottom: 24,
		right: 24,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 8,
	},
})
