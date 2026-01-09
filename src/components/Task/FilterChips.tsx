import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { FilterOption } from "@type/task"
import { Chip } from "@components/Base/Chip"

interface FilterChipsProps {
	options: FilterOption[]
	selectedId: string
	onSelect: (id: string) => void
}

export const FilterChips: React.FC<FilterChipsProps> = ({ options, selectedId, onSelect }) => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
				{options.map((option) => (
					<Chip key={option.id} label={option.label} isActive={option.id === selectedId} onPress={() => onSelect(option.id)} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
	},
	scrollContent: {
		paddingHorizontal: 20,
		gap: 12,
	},
})
