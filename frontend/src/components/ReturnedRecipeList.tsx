// src/components/ReturnedRecipeList.tsx

// import React from 'react';
import { type Recipe } from '../App';

// Define the Daily Recommended Values (DV) for an average adult.
// These are standard values for a 2,000-calorie diet.
const DAILY_VALUES = {
    calories: 2000,
    protein: 50,
    fat: 78,
    carbohydrates: 275,
    fiber: 28,
    sugar: 50,
    sodium: 2300,
};

const ReturnedRecipeList = ({ recipes }: { recipes: Recipe[] | null }) => {
    return (
        <div>
            {recipes && (
                <div id="responseContainer">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recipes for You</h2>
                    <div id="responseOutput" className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 leading-relaxed scroll-container max-h-96 overflow-y-auto shadow-inner space-y-8">
                        {recipes.map((recipe, index) => (
                            <div key={index} className="p-4 rounded-xl bg-white shadow-md border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                                <div className="mt-2">
                                    <h4 className="font-semibold text-gray-800">Ingredients:</h4>
                                    <ul className="list-disc list-inside mt-1 space-y-1">
                                        {recipe.ingredients.map((ingredient, i) => (
                                            <li key={i}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-gray-800">Nutrition:</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        *Percent daily values are based on a 2,000 calorie diet.
                                    </p>
                                    <ul className="list-disc list-inside mt-1 space-y-1">
                                        <li>
                                            <span className="font-medium">Calories:</span> {recipe.nutrition[0]} kcal
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[0] / DAILY_VALUES.calories) * 100).toFixed(0)}%)</span>
                                        </li>
                                        <li>
                                            <span className="font-medium">Protein:</span> {recipe.nutrition[1]} g
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[1] / DAILY_VALUES.protein) * 100).toFixed(0)}%)</span>
                                        </li>
                                        <li>
                                            <span className="font-medium">Fat:</span> {recipe.nutrition[2]} g
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[2] / DAILY_VALUES.fat) * 100).toFixed(0)}%)</span>
                                        </li>
                                        <li>
                                            <span className="font-medium">Carbohydrates:</span> {recipe.nutrition[3]} g
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[3] / DAILY_VALUES.carbohydrates) * 100).toFixed(0)}%)</span>
                                        </li>
                                        <li>
                                            <span className="font-medium">Fiber:</span> {recipe.nutrition[4]} g
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[4] / DAILY_VALUES.fiber) * 100).toFixed(0)}%)</span>
                                        </li>
                                        <li>
                                            <span className="font-medium">Sugar:</span> {recipe.nutrition[5]} g
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[5] / DAILY_VALUES.sugar) * 100).toFixed(0)}%)</span>
                                        </li>
                                        <li>
                                            <span className="font-medium">Sodium:</span> {recipe.nutrition[6]} mg
                                            <span className="text-sm text-gray-500 ml-2">({((recipe.nutrition[6] / DAILY_VALUES.sodium) * 100).toFixed(0)}%)</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-gray-800">Instructions:</h4>
                                    <p className="mt-1">{recipe.instructions}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReturnedRecipeList;