import { ViewStyle, TextStyle, ImageStyle } from "react-native"

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export interface Shadows {
  soft: NamedStyles
  card: NamedStyles
}