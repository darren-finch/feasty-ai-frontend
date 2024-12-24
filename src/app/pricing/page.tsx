"use client";
// pages/pricing.tsx
import React from "react";

export const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Pricing Plans</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Plan */}
          <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Basic</h2>
            <p className="text-4xl font-bold text-gray-800 mb-4">$4.99</p>
            <p className="text-gray-600 mb-6">per month</p>
            <ul className="text-gray-600 space-y-2">
              <li>Generate personalized daily meal plans</li>
              <li>Easy-to-follow prep instructions</li>
              <li>Fast and nutritious recipes</li>
              <li>Customize your generated meal plan</li>
              <li>Continued software updates + support</li>
            </ul>
            <div className="grow"></div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition w-full mt-6"
              >
              Signup
            </button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col flexbg-white shadow-lg rounded-lg p-6 border border-gray-200 items-stretch">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Pro</h2>
            <p className="text-4xl font-bold text-gray-800 mb-4">$9.99</p>
            <p className="text-gray-600 mb-6">per month</p>
            <ul className="text-gray-600 space-y-2">
              <li>Everything in the basic plan</li>
              <li>Generate weekly grocery list</li>
              <li>Expedited customer support</li>
            </ul>
            <div className="grow"></div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition w-full mt-6"
            >
              Signup
            </button>
          </div>
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

export default Pricing;