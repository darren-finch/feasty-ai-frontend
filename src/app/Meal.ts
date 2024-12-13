import { Food } from "./Food"

export interface Meal {
	name: string
	totalCalories: number
	totalCarbs: number
	totalFats: number
	totalProtein: number

	foods: Food[]
}
