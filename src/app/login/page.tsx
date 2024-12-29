"use client";
import React from "react";
import Footer from "../components/reusable/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export const Login = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get("callbackUrl")

    const handleLogin = async () => {
        // Redirect to Auth0 login using NextAuth's signIn function
        await signIn('auth0', {
            callbackUrl: callbackUrl || '/', // Redirect after login
        });
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-50">
            <div className="flex items-center justify-center flex-grow w-full">
                <div className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Login</h1>
                    {/* <p className="text-gray-600 mb-6">
            Please sign in with your preferred method to continue.
          </p> */}
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
                        onClick={handleLogin}
                    >
                        Sign In with Auth0
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
