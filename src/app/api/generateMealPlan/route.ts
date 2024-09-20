import { NextResponse } from "next/server"

interface MealPlanRequestBody {
	budget: number
	calories: number
	carbs: number
	fats: number
	protein: number
	meals: number
}

interface MealPlanResponse {
	mealPlan: string
}

export async function POST(req: Request) {
	const { budget, calories, carbs, fats, protein, meals } = (await req.json()) as MealPlanRequestBody
	console.log("Client Route", budget, calories, carbs, fats, protein, meals)

	try {
		const functionUrl = process.env.FIREBASE_FUNCTIONS_BASE_URL + "/generateMealPlan"
		console.log("functionUrl", functionUrl)
		// Call your Firebase Cloud Function to generate the meal plan
		const response = await fetch(functionUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				budget,
				calories,
				carbs,
				fats,
				protein,
				meals,
			}),
		})

		const data: MealPlanResponse = await response.json()
		console.log("Data from Firebase function on client side", data)

		// Send the meal plan back to the client
		return NextResponse.json({ mealPlan: data.mealPlan })
	} catch (error) {
		return NextResponse.json({ message: "Error generating meal plan" })
	}
}
