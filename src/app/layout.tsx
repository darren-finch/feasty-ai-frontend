import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Providers from "./Providers"
import App from "./App"

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Feasty AI",
	description: "AI-powered meal planning",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}><Providers><App>{children}</App></Providers></body>
		</html>
	)
}
