"use client"
import { Spinner } from "flowbite-react"

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner aria-label="Loading..." size="xl" />
        </div>
    )
}

export default Loading