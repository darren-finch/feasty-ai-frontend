import React from "react"
import { MealPlan } from "./MealPlan"

interface MealPlanProps {
	mealPlan: MealPlan
}

const MealPlanComponent: React.FC<MealPlanProps> = ({ mealPlan }) => {
	return (
		<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
			<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meal Plan Overview</h1>
			<div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
				<p className="text-lg text-gray-800 font-semibold">Total Cost: ${mealPlan.totalCost}</p>
				<p className="text-lg text-gray-800 font-semibold">Total Prep Time: {mealPlan.totalPrepTime} minutes</p>
				<p className="text-lg text-gray-800 font-semibold">Total Calories: {mealPlan.totalCalories}</p>
				<p className="text-lg text-gray-800 font-semibold">Total Carbs: {mealPlan.totalCarbs}g</p>
				<p className="text-lg text-gray-800 font-semibold">Total Fats: {mealPlan.totalFats}g</p>
				<p className="text-lg text-gray-800 font-semibold">Total Protein: {mealPlan.totalProtein}g</p>
			</div>

			{mealPlan.meals.map((meal, index) => (
				<div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
					<h2 className="text-xl font-bold text-gray-700">{meal.name}</h2>
					<p className="text-sm text-gray-600 mb-2">
						Cost: ${meal.cost} | Prep Time: {meal.prepTime} minutes
					</p>
					<ul className="list-disc pl-5 space-y-2">
						{meal.foods.map((food, foodIndex) => (
							<li key={foodIndex} className="text-gray-700">
								<span className="font-semibold">{food.name}</span>: {food.calories} calories,{" "}
								{food.carbs}g carbs, {food.fats}g fats, {food.protein}g protein
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default MealPlanComponent
