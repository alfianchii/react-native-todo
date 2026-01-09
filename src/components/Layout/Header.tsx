import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, StatusBar } from "react-native"
import { colors } from "@theme/colors"
import { Avatar } from "@components/Base/Avatar"

interface HeaderProps {
	userName: string
	greeting: string
	avatarUrl?: string | ImageSourcePropType
	onAvatarPress?: () => void
}

export const Header: React.FC<HeaderProps> = ({ userName, greeting, avatarUrl, onAvatarPress }) => {
	const defaultAvatarUrl = require("@images/gw-ganteng.jpg")

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={colors.background} />

			<TouchableOpacity style={styles.userSection} onPress={onAvatarPress} activeOpacity={0.8}>
				<Avatar source={avatarUrl || defaultAvatarUrl} size={40} showOnlineIndicator={true} />
				<View style={styles.textContainer}>
					<Text style={styles.greeting}>{greeting}</Text>
					<Text style={styles.userName}>{userName}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingBottom: 16,
		marginTop: 20,
	},
	userSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	textContainer: {
		gap: 2,
	},
	greeting: {
		fontSize: 12,
		fontWeight: "500",
		color: colors.textMuted,
	},
	userName: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.textMain,
	},
	notificationContainer: {
		position: "relative",
	},
	notificationBadge: {
		position: "absolute",
		top: 8,
		right: 8,
	},
})
