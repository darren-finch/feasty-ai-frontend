"use client";
// pages/pricing.tsx
import React from "react";

export const Signup = () => {
    return (
      <div className="flex flex-col justify-between min-h-screen bg-gray-50">
        <div className="flex items-center justify-center flex-grow w-full">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h1>
            <p className="text-gray-600 mb-6">
              Please sign in with your preferred method to continue.
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => alert("OAuth Sign-In Placeholder")}
            >
              Sign In with Google
            </button>
          </div>
        </div>
        {/* Footer */}
        <footer className="w-full border-t border-gray-200 py-4 text-center bg-white">
          <p className="text-sm text-gray-500">
            Copyright @2024 Feasty AI - Powered by ChatGPT
          </p>
        </footer>
      </div>
    );
  };
  
  export default Signup;
  