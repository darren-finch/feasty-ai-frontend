"use client"

import StoreProvider from "./StoreProvider"

// import { useAuthSync } from '@/lib/hooks'

export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
    // useAuthSync()

    return (
        <>
            {children}
        </>
    )
}