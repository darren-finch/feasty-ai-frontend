import { Food } from "./Food"

export interface Meal {
	name: string
	cost: number
	prepTime: number
	foods: Food[]
}
