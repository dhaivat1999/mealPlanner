import React, { useState } from "react";
import Vegan from "../assets/Vegan.png";
import Vegeterian from "../assets/Vegeterian.jpg";
import Paleo from "../assets/Paleo.png";
import Keto from "../assets/Keto.jpg";
import Anything from "../assets/Anything.jpg";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [selectedDiet, setSelectedDiet] = useState("");
  const [calories, setCalories] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [meals, setMeals] = useState([]);
  const [nutrients, setNutrients] = useState("");
  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleMealsPerDayChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 5) {
      setMealsPerDay(value);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleGenerateMeals = () => {
    const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=dce8d3adc45d4f2c8cfdc3dd18325b55&timeFrame=1&targetCalories=${calories}&diet=${selectedDiet}`;

    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMeals(data.meals);
        setNutrients(data.nutrients); // Assuming your API response has a 'meals' array
        setShowPopup(true);
        console.log("Generated meals:", data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });

    // console.log("Generate meals with the following inputs:");
    // console.log("Selected Diet:", selectedDiet);
    // console.log("Total Calories:", calories);
    // console.log("Meals Per Day:", mealsPerDay);
  };
  const MealPopup = ({ meals, onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-custom-900 bg-opacity-50">
        <div className="bg-custom-800 p-8 rounded-lg shadow-lg overflow-auto max-w-2xl">
          <h2 className="text-lg font-bold text-custom-200 mb-4">Generated Meals</h2>
          <div className="table-container">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-custom-200">
                  <th className=" pb-2 border-r border-gray-700 pr-5 text-center ">
                    Image
                  </th>
                  <th className="pb-2 border-r border-gray-700 pr-5 text-center ">
                    Name
                  </th>
                  <th className=" pb-2 text-center">Details</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, index) => (
                  <tr key={index} className="border-b border-gray-700 text-custom-200">
                    <td className="py-4 border-r border-gray-700 p-5">
                      <img
                        src={`https://spoonacular.com/recipeImages/${meal.id}-636x393.${meal.imageType}`}
                        alt={meal.title}
                        className="w-48 h-auto"
                      />
                    </td>
                    <td className="py-4 text-center border-r border-gray-700">
                      {meal.title}
                    </td>
                    <td className="py-4  text-center">
                      <p className="mb-2 ">
                        Ready in: {meal.readyInMinutes} minutes
                      </p>
                      <p className="mb-2  ">Servings: {meal.servings}</p>
                      <a
                        href={meal.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 block "
                      >
                        View Recipe
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-custom-200 mb-2">
              Nutrient Values
            </h3>
            <div className="text-custom-200">
              <p>Calories: {nutrients.calories} KCal</p>
              <p>Protein: {nutrients.protein} gms</p>
              <p>Fat: {nutrients.fat} gms</p>
              <p>Carbohydrates: {nutrients.carbohydrates}</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 mt-4">
            *Disclaimer: These values are approximate and may vary. Consult a
            nutritionist or healthcare professional for personalized advice.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-custom-500 hover:bg-custom-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleCalculateIdealCalories = () => {
    navigate("/calculate");
  };

  return (
    <>
      <div className="bg-custom-900 py-24 sm:py-32 h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-custom-400 sm:text-4xl">
              Select the type of diet you wish to follow
            </h2>
            <p className="mt-2 text-lg leading-8 text-custom-600">
              Ready to give it a shot? Let us know your diet.
            </p>
            <div className="mt-6">
              <label className="block text-lg font-medium text-custom-400">
                Diet Preferences:
              </label>
              <div className="flex mt-2 space-x-4">
                <label
                  className={`flex items-center ${
                    selectedDiet === "anything"
                      ? "bg-custom-600 text-white"
                      : "bg-white text-black"
                  } rounded-lg p-2 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="diet"
                    value="anything"
                    checked={selectedDiet === "anything"}
                    onChange={handleDietChange}
                    className="hidden"
                  />
                  <svg
                    width="100"
                    height="120" // Increased height to accommodate text below the image
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href={Anything} height="100" width="100" />
                    <text x="10" y="110" fill="black" fontSize="16">
                      Anything
                    </text>{" "}
                    {/* Adjusted y position */}
                  </svg>
                </label>

                <label
                  className={`flex items-center ${
                    selectedDiet === "vegetarian"
                      ? "bg-custom-600 text-white"
                      : "bg-white text-black"
                  } rounded-lg p-2 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="diet"
                    value="vegetarian"
                    checked={selectedDiet === "vegetarian"}
                    onChange={handleDietChange}
                    className="hidden"
                  />
                  <svg
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href={Vegeterian} height="100" width="100" />
                  </svg>
                </label>

                <label
                  className={`flex items-center ${
                    selectedDiet === "vegan"
                      ? "bg-custom-600 text-white"
                      : "bg-white text-black"
                  } rounded-lg p-2 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="diet"
                    value="vegan"
                    checked={selectedDiet === "vegan"}
                    onChange={handleDietChange}
                    className="hidden"
                  />
                  <svg
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href={Vegan} height="100" width="100" />
                  </svg>
                </label>
                <label
                  className={`flex items-center ${
                    selectedDiet === "keto"
                      ? "bg-custom-600 text-white"
                      : "bg-white text-black"
                  } rounded-lg p-2 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="diet"
                    value="keto"
                    checked={selectedDiet === "keto"}
                    onChange={handleDietChange}
                    className="hidden"
                  />
                  <svg
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href={Keto} height="100" width="100" />
                  </svg>
                </label>
                <label
                  className={`flex items-center ${
                    selectedDiet === "paleo"
                      ? "bg-custom-600 text-white"
                      : "bg-white text-black"
                  } rounded-lg p-2 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="diet"
                    value="paleo"
                    checked={selectedDiet === "paleo"}
                    onChange={handleDietChange}
                    className="hidden"
                  />
                  <svg
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href={Paleo} height="100" width="100" />
                  </svg>
                </label>
              </div>
            </div>
            <form className="mt-6">
              <label className="block text-lg font-medium text-custom-400">
                Total Calories:
              </label>
              <input
                type="number"
                name="calories"
                value={calories}
                onChange={handleCaloriesChange}
                className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
              />
              {/* <label className="block mt-4 text-lg font-medium text-custom-400">
                Meals Per Day (Max 5):
              </label>
              <input
                type="number"
                name="mealsPerDay"
                max="5"
                min="1"
                value={mealsPerDay}
                onChange={handleMealsPerDayChange}
                className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
              /> */}
            </form>
            <div className="mt-6">
              <div className="pr-6 pb-5">
                <button
                  onClick={handleGenerateMeals}
                  className="bg-custom-500 text-custom-100 py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-custom-700 focus:ring-opacity-50"
                >
                  Generate Meals
                </button>
              </div>
              <button
                onClick={handleCalculateIdealCalories}
                className="bg-custom-500 text-white py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Don't Know Where to Start? Calculate Ideal Calories
              </button>
            </div>
            {showPopup && (
              <MealPopup
                meals={meals}
                nutrients={nutrients}
                onClose={handleClosePopup}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
