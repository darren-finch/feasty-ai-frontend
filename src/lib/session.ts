import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { getSession } from "next-auth/react"

export async function getCurrentUserServer() {
    const session = await getServerSession(authOptions)

    return session?.user
}