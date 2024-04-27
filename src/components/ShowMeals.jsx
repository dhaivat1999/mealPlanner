import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ShowMeals = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const calories = queryParams.get("calories");
  const selectedDiet = queryParams.get("diet");
  const [meals, setMeals] = useState([]);
  const [nutrients, setNutrients] = useState({});

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=dce8d3adc45d4f2c8cfdc3dd18325b55&timeFrame=1&targetCalories=${calories}&diet=${selectedDiet}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMeals(data.meals);
        setNutrients(data.nutrients);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMealDetails();
  }, [calories, selectedDiet]);

  const handleRegenerateMeals = async () => {
    try {
      const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=dce8d3adc45d4f2c8cfdc3dd18325b55&timeFrame=1&targetCalories=${calories}&diet=${selectedDiet}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMeals(data.meals);
      setNutrients(data.nutrients);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  return (
    <div className="p-12 md:p-24 h-screen bg-custom-900">
      <h2 className="text-xl md:text-2xl text-custom-200 font-semibold mb-4">
        Generated Meals
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-custom-800 border border-custom-700 rounded-lg">
          <thead>
            <tr>
              <th className="py-1 px-2 md:py-2 md:px-4 bg-custom-700 text-custom-200">
                Image
              </th>
              <th className="py-1 px-2 md:py-2 md:px-4 bg-custom-700 text-custom-200">
                Name
              </th>
              <th className="py-1 px-2 md:py-2 md:px-4 bg-custom-700 text-custom-200">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr key={index} className="border-b border-custom-700">
                <td className="py-1 px-2 md:py-2 md:px-4">
                  <img
                    src={`https://spoonacular.com/recipeImages/${meal.id}-636x393.${meal.imageType}`}
                    alt={meal.title}
                    className="w-24 h-auto md:w-32 md:h-auto"
                  />
                </td>
                <td className="py-1 px-2 md:py-2 md:px-4">{meal.title}</td>
                <td className="py-1 px-2 md:py-2 md:px-4">
                  <p className="text-sm md:text-base">
                    Ready in: {meal.readyInMinutes} minutes
                  </p>
                  <p className="text-sm md:text-base">
                    Servings: {meal.servings}
                  </p>
                  <a
                    href={meal.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 block text-sm md:text-base"
                  >
                    View Recipe
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h3 className="text-lg md:text-xl text-custom-200 font-semibold mb-2">
          Nutrient Values
        </h3>
        <div className="text-sm md:text-base text-custom-200">
          <p>Calories: {nutrients.calories} KCal</p>
          <p>Protein: {nutrients.protein} gms</p>
          <p>Fat: {nutrients.fat} gms</p>
          <p>Carbohydrates: {nutrients.carbohydrates}</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleRegenerateMeals}
          className="w-48 bg-custom-500 text-custom-100 py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-custom-700 focus:ring-opacity-50"
        >
          Regenrate Meals
        </button>
        {/* <button
              onClick={handleCalculateIdealCalories}
              className="mt-2 w-full bg-custom-500 text-white py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Calculate Ideal Calories
            </button> */}
      </div>
    </div>
  );
};

export default ShowMeals;
