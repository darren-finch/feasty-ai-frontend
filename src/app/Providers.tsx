"use client"
import { SessionProvider } from "next-auth/react"
import StoreProvider from "./StoreProvider"

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<SessionProvider>
			<StoreProvider>
				{children}
			</StoreProvider>
		</SessionProvider>
	)
}