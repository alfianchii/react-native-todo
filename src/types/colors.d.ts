import { ViewStyle, TextStyle, ImageStyle } from "react-native"

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export interface Shadows {
  soft: NamedStyles
  card: NamedStyles
}

export interface Colors {
	// Brand
	primary: string
	primaryLight: string

	// Backgrounds
	background: string
	backgroundDark: string
	white: string
	black: string

	// Text
	textMain: string
	textMuted: string

	// Priority colors
	priorityHigh: string
	priorityHighBg: string
	priorityMedium: string
	priorityMediumBg: string
	priorityLow: string
	priorityLowBg: string

	// Category colors
	categoryWork: string
	categoryWorkBg: string
	categoryPersonal: string
	categoryPersonalBg: string
	categoryInbox: string
	categoryInboxBg: string
	categoryCollege: string
	categoryCollegeBg: string

	// Date picker colors
	datePink: string
	datePinkBg: string

	// Status colors
	success: string
	successLight: string
	error: string
	warning: string
	notification: string

	// Card & UI
	cardBg: string
	border: string
	borderLight: string
	shadow: string
	overlay: string
	overlayLight: string

	// Gray scale
	gray100: string
	gray200: string
	gray300: string
	gray400: string
	gray500: string
	gray600: string
	gray700: string
	gray800: string
	gray900: string
}
