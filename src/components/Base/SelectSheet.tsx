import React from "react"
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@theme/colors"
import { BottomSheet } from "./BottomSheet"

type MaterialIconName = keyof typeof MaterialIcons.glyphMap

interface SelectOption {
	id: string
	label: string
	icon?: MaterialIconName
	iconColor?: string
	iconBackgroundColor?: string
}

interface SelectSheetProps {
	visible: boolean
	onClose: () => void
	title: string
	options: SelectOption[]
	selectedId?: string
	onSelect: (option: SelectOption) => void
}

export const SelectSheet: React.FC<SelectSheetProps> = ({
	visible,
	onClose,
	title,
	options,
	selectedId,
	onSelect,
}) => {
	const handleSelect = (option: SelectOption) => {
		onSelect(option)
		onClose()
	}

	return (
		<BottomSheet visible={visible} onClose={onClose}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>{title}</Text>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={onClose}
					activeOpacity={0.7}
				>
					<MaterialIcons name="close" size={20} color={colors.textMuted} />
				</TouchableOpacity>
			</View>

			<View style={styles.optionsContainer}>
				{options.map((option) => (
					<TouchableOpacity
						key={option.id}
						style={[
							styles.optionRow,
							selectedId === option.id && styles.optionRowSelected,
						]}
						onPress={() => handleSelect(option)}
						activeOpacity={0.7}
					>
						{option.icon && (
							<View
								style={[
									styles.iconContainer,
									{
										backgroundColor: option.iconBackgroundColor || colors.gray100,
									},
								]}
							>
								<MaterialIcons
									name={option.icon}
									size={20}
									color={option.iconColor || colors.textMain}
								/>
							</View>
						)}
						<Text
							style={[
								styles.optionLabel,
								selectedId === option.id && styles.optionLabelSelected,
							]}
						>
							{option.label}
						</Text>
						{selectedId === option.id && (
							<MaterialIcons name="check" size={20} color={colors.primary} />
						)}
					</TouchableOpacity>
				))}
			</View>

			<View style={styles.safeArea} />
		</BottomSheet>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingVertical: 16,
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
	optionsContainer: {
		paddingHorizontal: 24,
		paddingBottom: 16,
		gap: 8,
	},
	optionRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: colors.white,
	},
	optionRowSelected: {
		backgroundColor: `${colors.primary}10`,
		borderWidth: 1,
		borderColor: colors.primary,
	},
	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	optionLabel: {
		flex: 1,
		fontSize: 16,
		fontWeight: "500",
		color: colors.textMain,
	},
	optionLabelSelected: {
		color: colors.primary,
		fontWeight: "600",
	},
	safeArea: {
		height: 20,
		backgroundColor: colors.background,
	},
})
