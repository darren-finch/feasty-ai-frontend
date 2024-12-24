// pages/welcome.tsx
import Link from 'next/link';
import React from 'react';

const Welcome = () => {
    return (
        <div className="relative min-h-screen bg-gray-50">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm text-center border border-gray-200">
                    <img src="/feasty-icon-small.png" alt="Welcome Icon" className="mx-auto mb-4 h-16" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h1>
                    <p className="text-gray-600 mb-2 italic">Get ready to supercharge your nutrition!</p>
                    <Link
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 w-full rounded-lg shadow-md hover:opacity-90 transition flex items-center justify-center space-x-2"
                    href="/get-started">
                    <span>Continue</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    </Link>
                    <div className="mt-8 text-sm text-gray-400">
                    <p>Powered by GPT 4o</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full border-t border-gray-200 py-4 text-center bg-white absolute bottom-0">
                <p className="text-sm text-gray-500">
                Copyright @2024 Feasty AI - Powered by ChatGPT
                </p>
            </footer>
        </div>
    );
};

export default Welcome;