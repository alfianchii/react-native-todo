import React from "react"
import { Image, View, StyleSheet, ImageSourcePropType } from "react-native"
import { colors } from "@theme/colors"

interface AvatarProps {
	source: ImageSourcePropType | string
	size?: number
	showOnlineIndicator?: boolean
	borderWidth?: number
	borderColor?: string
}

export const Avatar: React.FC<AvatarProps> = ({ source, size = 40, showOnlineIndicator = false, borderWidth = 2, borderColor = colors.white }) => {
	const imageSource = typeof source === "string" ? { uri: source } : source

	return (
		<View style={styles.container}>
			<Image
				source={imageSource}
				style={[
					styles.avatar,
					{
						width: size,
						height: size,
						borderRadius: size / 2,
						borderWidth,
						borderColor,
					},
				]}
			/>
			{showOnlineIndicator && (
				<View
					style={[
						styles.onlineIndicator,
						{
							width: size * 0.3,
							height: size * 0.3,
							borderRadius: size * 0.15,
						},
					]}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	avatar: {
		backgroundColor: colors.gray200,
	},
	onlineIndicator: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: colors.success,
		borderWidth: 2,
		borderColor: colors.white,
	},
})
