"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import Welcome from "./welcome/page"
import MealPlan from "./meal-plan/page"

const Page = () => {
	const { user } = useUser()
	if (!user) {
		return <Welcome />
	} else {
		return <MealPlan />
	}
}

export default Page
