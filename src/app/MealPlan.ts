import { Meal } from "./Meal"

export interface MealPlan {
	totalActualCalories: number
	totalActualCarbs: number
	totalActualFats: number
	totalActualProtein: number

	meals: Meal[]
}
