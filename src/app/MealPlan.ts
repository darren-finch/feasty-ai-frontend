import { Meal } from "./Meal"

export interface MealPlan {
	totalCost: number
	totalPrepTime: number
	totalCalories: number
	totalCarbs: number
	totalFats: number
	totalProtein: number
	meals: Meal[]
}
