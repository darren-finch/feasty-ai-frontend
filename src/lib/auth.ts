import { NextAuthOptions, User } from "next-auth"
import Auth0 from "next-auth/providers/auth0"
import createUser from "./features/user/createUser";
import getUser from "./features/user/getUserData";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        Auth0({
            clientId: process.env.AUTH0_CLIENT_ID!,
            clientSecret: process.env.AUTH0_CLIENT_SECRET!,
            issuer: process.env.AUTH0_ISSUER_BASE_URL
        })
    ],
    secret: process.env.AUTH0_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login', // Custom login page
        signOut: '/logout', // Optional: Custom logout page
        error: '/error', // Optional: Custom error page
    },
    callbacks: {
        async session({ token, session }) {
            if (token && session.user) {
                session.user.id = token.id as string
                console.log("Setting user id: ", session.user.id)
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }

            return session
        },
        async jwt({ token, user, trigger }) {
            // Create user if trigger is initial sign up or if trigger is sign in and user is not found
            if (trigger === "signUp") {
                token.id = user.id

                try {
                    const newUser = await createUser(user.id)
                    console.log("Created user: ", newUser)
                } catch (error) {
                    console.error("Error creating user: ", error)
                }
            } else if (trigger === "signIn") {
                console.log(`Signing in but user ${user.id} did not exist in database. Creating user.`)
                try {
                    const existingUser = await getUser(user.id)
                    if (!existingUser) {
                        const newUser = await createUser(user.id)
                        console.log("Created user: ", newUser)
                    }
                } catch (error) {
                    console.error("Error creating user: ", error)
                }
            }
            return token
        },
    }
}