export interface Food {
	name: string
	unitCalories: number
	unitCarbs: number
	unitFats: number
	unitProtein: number
	unitAmount: number
	desiredAmount: number
	unit: string
	// This describes what type of macro this food contains primarily
	primaryMacroClass: string
}
