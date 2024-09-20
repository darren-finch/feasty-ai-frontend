"use client"
import { useState } from "react"

const MealPlanGenerator = () => {
	// State to hold the form values
	const [budget, setBudget] = useState("")
	const [calories, setCalories] = useState("")
	const [carbs, setCarbs] = useState("")
	const [fats, setFats] = useState("")
	const [protein, setProtein] = useState("")
	const [meals, setMeals] = useState("")
	const [mealPlan, setMealPlan] = useState(
		`{"budget":"35","calories":"2500","carbs":"187.5","fats":"83.33","protein":"250","meals":"5"}`
	) // For storing the generated meal plan
	const [loading, setLoading] = useState(false) // For loading state

	// Function to handle form submission and fetch meal plan
	const generateMealPlan = async (e: any) => {
		e.preventDefault() // Prevent page reload
		setLoading(true) // Start loading

		console.log("Client UI", budget, calories, carbs, fats, protein, meals)

		try {
			const bodyParm = JSON.stringify({
				budget,
				calories,
				carbs,
				fats,
				protein,
				meals,
			})
			console.log("bodyParm", bodyParm)
			// Call the Firebase Cloud Function or API that generates the meal plan
			const response = await fetch("/api/generateMealPlan", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: bodyParm,
			})

			const data = await response.json()

			if (data.mealPlan) {
				setMealPlan(data.mealPlan) // Set the generated meal plan
			} else {
				setMealPlan("Error generating meal plan.")
			}
		} catch (error) {
			console.error("Error generating meal plan:", error)
			setMealPlan("Error generating meal plan.")
		}

		setLoading(false) // Stop loading
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
			<div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
				<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generate Your Meal Plan</h1>
				<form onSubmit={generateMealPlan} className="space-y-4">
					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1">Weekly Budget (in dollars)</label>
						<input
							type="number"
							value={budget}
							onChange={(e) => setBudget(e.target.value)}
							className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1">Total Daily Calories</label>
						<input
							type="number"
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
							className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1">
							Total Daily Carbohydrates (grams)
						</label>
						<input
							type="number"
							value={carbs}
							onChange={(e) => setCarbs(e.target.value)}
							className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1">Total Daily Fats (grams)</label>
						<input
							type="number"
							value={fats}
							onChange={(e) => setFats(e.target.value)}
							className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 text-gray-700 mb-1">
							Total Daily Protein (grams)
						</label>
						<input
							type="number"
							value={protein}
							onChange={(e) => setProtein(e.target.value)}
							className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold text-gray-700 mb-1">Number of Meals per Day</label>
						<input
							type="number"
							value={meals}
							onChange={(e) => setMeals(e.target.value)}
							className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<button
						type="submit"
						className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
							loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
						} focus:outline-none focus:ring-2 focus:ring-blue-500`}
						disabled={loading}>
						{loading ? "Generating..." : "Generate Meal Plan"}
					</button>
				</form>

				{mealPlan && (
					<div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Meal Plan:</h2>
						<p className="w-100 text-sm text-gray-700 break-all">{JSON.stringify(mealPlan)}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default MealPlanGenerator
