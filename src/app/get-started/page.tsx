"use client";
// pages/get-started.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GetStarted = () => {
  const [units, setUnits] = useState("US");
  const router = useRouter();
  
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50">
      <div className="flex items-center justify-center flex-grow w-full">
        <div className="p-8 md:bg-white md:shadow-lg md:rounded-lg md:max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Get Started</h1>
          <p className="text-gray-600 mb-4">
            Feasty needs some info about you so it can generate a tailored meal plan for you.
          </p>
          <p className="text-sm text-gray-400 mb-6">Step 1 out of 3</p>

          {/* Units Toggle */}
          <div className="flex items-center justify-between mb-6">
            <label className="text-gray-800 font-medium">Units</label>
            <div className="flex items-center">
              <span className="text-gray-800 mr-2">US</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={units === "Metric"}
                  onChange={() => setUnits(units === "US" ? "Metric" : "US")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer dark:bg-gray-300 peer-checked:bg-green-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-800 font-medium mb-1">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Height</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Ft"
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <input
                  type="number"
                  placeholder="In"
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Weight</label>
              <input
                type="number"
                placeholder="Enter your weight"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Gender</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Activity Level</label>
              <div className="space-y-2">
                {[
                  "Sedentary",
                  "Lightly active",
                  "Moderately active",
                  "Very active",
                  "Super active",
                ].map((level, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="activity-level"
                      value={level}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            className="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => router.push("/fitness-plans")}
          >
            Continue
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

export default GetStarted;