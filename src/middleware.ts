// Create middleware that does the following using Next Auth, a getUser Firebase function, and a createUser Firebase function:
// 1. Check if the user is authenticated by verifying the JWT token (if present). If the token is valid, the user is authenticated. We will skip checking this for certain routes.
// 2. After verifying authentication, we want to check the sub claim in the JWT token to get the user ID.
// 3. We will then use the user ID to fetch the user's data from the database.
// 4. If the user is authenticated but does not exist in the database, we will create a new user in the database with the user ID using the createUser Firebase function.
// 5. If the user is authenticated and exists in the database, but has not completed the onboarding process, we will redirect them to the appropriate onboarding page.
// 6. If the user is not authenticated, we will redirect them to the login page.
// 
// Notes:
// - The Firebase Functions base url is process.env.FIREBASE_FUNCTIONS_BASE_URL
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { User } from "./lib/features/user/User";
import { PaymentPlan } from "./lib/features/user/PaymentPlan";
import getUserData from "./lib/features/user/getUserData";
import createUser from "./lib/features/user/createUser";

export default withAuth(
    async function middleware(req: NextRequest) {
        const token = await getToken({ req })
        const isAuth = !!token
        const path = req.nextUrl.pathname;
        const isAuthPage =
            req.nextUrl.pathname.startsWith("/login") ||
            req.nextUrl.pathname.startsWith("/signup")
        console.log("isAuth:", isAuth)

        console.log("Middleware Path:", path)
        if (isAuth) {
            if (isAuthPage) {
                return NextResponse.redirect(new URL("/", req.url))
            }

            const userId = token.sub
            console.log("Middleware User ID:", userId)
            if (!userId) {
                return NextResponse.next({ status: 500, statusText: "User is authenticated but ID not found" })
            }
            // Check payment plan status of user. If they have a payment plan, they've completed onboarding. If not, send them back to the get-started page.
            const userData = await getUserData(userId)
            if (!userData) {
                console.log(`User has authentication token with id = ${userId} but user id did not exist in database. Creating user.`)
                try {
                    await createUser(userId)
                    return NextResponse.redirect(new URL("/get-started", req.url))
                } catch (error) {
                    console.error("Error creating user: ", error)
                    return NextResponse.next({ status: 500, statusText: "Error creating user" })
                }
            }

            if (userData.paymentPlan === PaymentPlan.NONE) {
                return NextResponse.redirect(new URL("/get-started", req.url))
            }

            const isHomePage = req.nextUrl.pathname === "/"
            if (isHomePage) {
                return NextResponse.redirect(new URL("/meal-plan", req.url))
            }

            return NextResponse.next()
        } else if (!isAuthPage) {
            let from = req.nextUrl.origin + path;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }

            return NextResponse.redirect(
                new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
            );
        }
    },
    {
        callbacks: {
            async authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true
            },
        },
    }
)

export const config = {
    matcher: ["/"],
}