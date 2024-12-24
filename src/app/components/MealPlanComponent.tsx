import React from "react"
import { MealPlan } from "../models/MealPlan"

interface MealPlanProps {
	mealPlan: MealPlan
}

const MealPlanComponent: React.FC<MealPlanProps> = ({ mealPlan }) => {
	return (
		<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
			<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meal Plan Overview</h1>
			<div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
				<p className="text-lg text-gray-800 font-semibold">Total Calories: {mealPlan.totalActualCalories}</p>
				<p className="text-lg text-gray-800 font-semibold">Total Carbs: {mealPlan.totalActualCarbs}g</p>
				<p className="text-lg text-gray-800 font-semibold">Total Fats: {mealPlan.totalActualFats}g</p>
				<p className="text-lg text-gray-800 font-semibold">Total Protein: {mealPlan.totalActualProtein}g</p>
			</div>

			{mealPlan.meals.map((meal, index) => (
				<div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
					<h2 className="text-xl font-bold text-gray-700">{meal.name}</h2>
					<p className="text-sm text-gray-600 mb-2">
						Total Calories: {meal.totalCalories} | Carbs: {meal.totalCarbs}g | Fats: {meal.totalFats}g |
						Protein: {meal.totalProtein}g
					</p>
					<ul className="list-disc pl-5 space-y-2">
						{meal.foods.map((food, foodIndex) => (
							<li key={foodIndex} className="text-gray-700">
								<span className="font-semibold">{food.name} {food.descriptor} | {food.desiredAmount.toFixed(2)} {food.unit}</span>:{" "}
								{Math.trunc(food.unitCalories * (food.desiredAmount / food.unitAmount))} calories,{" "}
								{Math.trunc(food.unitCarbs * (food.desiredAmount / food.unitAmount))}g carbs,{" "}
								{Math.trunc(food.unitFats * (food.desiredAmount / food.unitAmount))}g fats,{" "}
								{Math.trunc(food.unitProtein * (food.desiredAmount / food.unitAmount))}g protein
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default MealPlanComponent
