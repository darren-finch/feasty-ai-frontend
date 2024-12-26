import { NextResponse } from "next/server"

interface MealPlanRequestBody {
	budget: number
	calories: number
	carbPercentage: number
	fatPercentage: number
	proteinPercentage: number
	meals: number
}

interface MealPlanResponse {
	mealPlan: string
}

export async function POST(req: Request) {
	const { budget, calories, carbPercentage, fatPercentage, proteinPercentage, meals } =
		(await req.json()) as MealPlanRequestBody
	console.log("Client Route", budget, calories, carbPercentage, fatPercentage, proteinPercentage, meals)

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
				carbPercentage,
				fatPercentage,
				proteinPercentage,
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
