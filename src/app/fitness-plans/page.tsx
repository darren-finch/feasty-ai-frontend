"use client";
// pages/fitness-plans.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Plan {
  title: string;
  description: string;
  calories: string;
  macros: string;
}

const FitnessPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [units, setUnits] = useState("US"); // Replace this with the actual units from Step 1
  const router = useRouter();

  const plans: Plan[] = [
    {
      title: `Gain Weight Fast (${units === "US" ? "1 lb" : "0.45 kg"} per week)`,
      description: "Calorie intake and macro distribution",
      calories: "2500 kcal",
      macros: "Protein: 30%, Fat: 25%, Carbs: 45%",
    },
    {
      title: `Gain Weight (${units === "US" ? "0.5 lb" : "0.22 kg"} per week)`,
      description: "Calorie intake and macro distribution",
      calories: "2300 kcal",
      macros: "Protein: 30%, Fat: 25%, Carbs: 45%",
    },
    {
      title: "Maintain Weight",
      description: "Calorie intake and macro distribution",
      calories: "2000 kcal",
      macros: "Protein: 30%, Fat: 25%, Carbs: 45%",
    },
    {
      title: `Lose Weight (${units === "US" ? "0.5 lb" : "0.22 kg"} per week)`,
      description: "Calorie intake and macro distribution",
      calories: "1800 kcal",
      macros: "Protein: 30%, Fat: 30%, Carbs: 40%",
    },
    {
      title: `Lose Weight Fast (${units === "US" ? "1 lb" : "0.45 kg"} per week)`,
      description: "Calorie intake and macro distribution",
      calories: "1600 kcal",
      macros: "Protein: 35%, Fat: 30%, Carbs: 35%",
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50">
      <div className="flex items-center justify-center flex-grow w-full">
        <div className="p-8 md:bg-white md:shadow-lg md:rounded-lg md:max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Fitness Plans</h1>
          <p className="text-sm text-gray-400 mb-6">Step 2 out of 3</p>

          {/* Fitness Plans */}
          <div className="space-y-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${
                  selectedPlan === plan.title ? "border-green-500" : "border-gray-300"
                } cursor-pointer hover:border-green-500 transition`}
                onClick={() => setSelectedPlan(plan.title)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{plan.title}</h2>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Calories: {plan.calories}
                    </p>
                    <p className="text-sm text-gray-600">Macros: {plan.macros}</p>
                  </div>
                  <input
                    type="radio"
                    name="fitness-plan"
                    checked={selectedPlan === plan.title}
                    onChange={() => setSelectedPlan(plan.title)}
                    className="form-radio text-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            className={`w-full mt-6 py-2 px-4 rounded-lg shadow-md ${
              selectedPlan
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition`}
            disabled={!selectedPlan}
            onClick={() => {
              if (selectedPlan) {
                // Navigate to the next step
                console.log("Selected Plan:", selectedPlan);
                router.push("/pricing");
              }
            }}
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

export default FitnessPlans;
