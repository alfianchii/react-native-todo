type MaterialIconName = keyof typeof MaterialIcons.glyphMap

export interface SelectOption {
    id: string
    label: string
    icon?: MaterialIconName | GLYPHS
    iconColor?: string
    iconBackgroundColor?: string
}