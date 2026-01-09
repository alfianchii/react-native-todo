import React from "react"
import {
	View,
	Modal,
	StyleSheet,
	TouchableWithoutFeedback,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
} from "react-native"
import { colors } from "@theme/colors"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface BottomSheetProps {
	visible: boolean
	onClose: () => void
	children: React.ReactNode
	maxHeight?: number
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
	visible,
	onClose,
	children,
	maxHeight = SCREEN_HEIGHT * 0.85,
}) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<TouchableWithoutFeedback onPress={onClose}>
					<View style={styles.backdrop} />
				</TouchableWithoutFeedback>

				<View style={[styles.sheet, { maxHeight }]}>
					<View style={styles.handleContainer}>
						<View style={styles.handle} />
					</View>
					{children}
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(17, 24, 39, 0.5)",
	},
	sheet: {
		backgroundColor: colors.background,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -10 },
		shadowOpacity: 0.2,
		shadowRadius: 20,
		elevation: 20,
		overflow: "hidden",
	},
	handleContainer: {
		width: "100%",
		paddingTop: 12,
		paddingBottom: 8,
		alignItems: "center",
	},
	handle: {
		width: 40,
		height: 5,
		borderRadius: 3,
		backgroundColor: colors.gray300,
	},
})
