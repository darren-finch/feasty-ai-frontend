"use client";
// pages/meal-plan.tsx
import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import Food from "../models/Food";
import type MealPlan from "../models/MealPlan";

const blankMealPlan: MealPlan = {
    totalActualCalories: 0,
    totalActualCarbs: 0,
    totalActualFats: 0,
    totalActualProtein: 0,
    meals: [
        {
            name: "Breakfast",
            totalCalories: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalProtein: 0,
            foods: [
                {
                    name: "Eggs",
                    descriptor: "Scrambled",
                    unit: "g",
                    desiredAmount: 200,
                    unitAmount: 100,
                    unitCalories: 155,
                    unitCarbs: 1.1,
                    unitFats: 11.2,
                    unitProtein: 12.6,
                    primaryMacroClass: "Protein"
                },
                {
                    name: "Bacon",
                    descriptor: "Crispy",
                    unit: "g",
                    desiredAmount: 100,
                    unitAmount: 100,
                    unitCalories: 541,
                    unitCarbs: 0.1,
                    unitFats: 42.5,
                    unitProtein: 37.1,
                    primaryMacroClass: "Protein"
                }
            ]
        },
        {
            name: "Lunch",
            totalCalories: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalProtein: 0,
            foods: [
                {
                    name: "Chicken",
                    descriptor: "Grilled",
                    unit: "g",
                    desiredAmount: 200,
                    unitAmount: 100,
                    unitCalories: 165,
                    unitCarbs: 0,
                    unitFats: 3.6,
                    unitProtein: 31,
                    primaryMacroClass: "Protein"
                },
                {
                    name: "Rice",
                    descriptor: "Brown",
                    unit: "g",
                    desiredAmount: 200,
                    unitAmount: 100,
                    unitCalories: 130,
                    unitCarbs: 28.2,
                    unitFats: 0.3,
                    unitProtein: 2.7,
                    primaryMacroClass: "Carbs"
                }
            ]
        }
    ]
};

const calculateMacros = (foods: Food[]) => {
    return foods.reduce(
        (totals, food) => {
            const factor = food.desiredAmount / food.unitAmount;
            totals.calories += food.unitCalories * factor;
            totals.carbs += food.unitCarbs * factor;
            totals.fats += food.unitFats * factor;
            totals.protein += food.unitProtein * factor;
            return totals;
        },
        { calories: 0, carbs: 0, fats: 0, protein: 0 }
    );
};

const MealPlan = () => {
    const [mealPlanData, setMealPlanData] = useState<MealPlan>(blankMealPlan);
    const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

    const toggleMeal = (meal: string) => {
        setExpandedMeal(expandedMeal === meal ? null : meal);
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-lg py-4 px-8 flex items-center justify-between border-b border-gray-200">
                <div className="text-xl font-bold">Logo</div>
                <div className="flex space-x-4">
                    <button className="text-gray-700 hover:text-green-500">Profile</button>
                    <button className="text-gray-700 hover:text-green-500">Settings</button>
                    <Menu as="div" className="relative">
                        <MenuButton className="text-gray-700 hover:text-green-500">☰</MenuButton>
                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 ring-1 ring-black ring-opacity-5">
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                                        >
                                            Option 1
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                                        >
                                            Option 2
                                        </a>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </nav>

            {/* Content */}
            <div className="flex flex-col items-center justify-start flex-grow w-full px-8 mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Meal Plan</h1>

                {/* Macros */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-1">Calories</label>
                        <input
                            type="text"
                            value={mealPlanData.totalActualCalories.toFixed(2)}
                            readOnly
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-1">Carbs</label>
                        <input
                            type="text"
                            value={mealPlanData.totalActualCarbs.toFixed(2)}
                            readOnly
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-1">Fats</label>
                        <input
                            type="text"
                            value={mealPlanData.totalActualFats.toFixed(2)}
                            readOnly
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 mb-1">Proteins</label>
                        <input
                            type="text"
                            value={mealPlanData.totalActualProtein.toFixed(2)}
                            readOnly
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                        />
                    </div>
                </div>

                {/* Meals Header */}
                <div className="flex items-center justify-between mb-6 w-full max-w-2xl">
                    <label className="text-gray-600 font-bold">Meals</label>
                    <div className="flex items-center space-x-2">
                        <button className="bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition">
                            See Grocery List
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition">
                            🔄
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition">
                            +
                        </button>
                    </div>
                </div>


                {/* Meals */}
                <div className="w-full max-w-2xl mb-6">
                    {mealPlanData.meals.length === 0 ? (
                        <p className="text-gray-600 text-center">Click the generate button to generate your first meal plan</p>
                    ) : (
                        mealPlanData.meals.map((meal, index) => {
                            const macros = calculateMacros(meal.foods);

                            return (
                                <div
                                    key={index}
                                    className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-gray-800">{meal.name}</h2>
                                        <button
                                            className="text-gray-700 hover:text-green-500"
                                            onClick={() => toggleMeal(meal.name)}
                                        >
                                            {expandedMeal === meal.name ? "▲" : "▼"}
                                        </button>
                                    </div>
                                    {expandedMeal === meal.name && (
                                        <>
                                            <div className="flex flex-col mb-4">
                                                <p className="text-gray-600">Total Calories: {macros.calories.toFixed(2)}</p>
                                                <p className="text-gray-600">Carbs: {macros.carbs.toFixed(2)}</p>
                                                <p className="text-gray-600">Fats: {macros.fats.toFixed(2)}</p>
                                                <p className="text-gray-600">Proteins: {macros.protein.toFixed(2)}</p>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                {meal.foods.map((food, foodIndex) => {
                                                    const factor = food.desiredAmount / food.unitAmount;
                                                    return (
                                                        <div
                                                            key={foodIndex}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <p className="text-gray-600">
                                                                {food.name} - {food.descriptor || ""} ({food.desiredAmount}
                                                                {food.unit})
                                                            </p>
                                                            <p className="text-gray-600">
                                                                {(
                                                                    food.unitCalories * factor
                                                                ).toFixed(2)}Cal | {(
                                                                    food.unitCarbs * factor
                                                                ).toFixed(2)}C | {(
                                                                    food.unitFats * factor
                                                                ).toFixed(2)}F | {(
                                                                    food.unitProtein * factor
                                                                ).toFixed(2)}P
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Submit Feedback */}
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition">
                    Submit Feedback
                </button>
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

export default MealPlan;
