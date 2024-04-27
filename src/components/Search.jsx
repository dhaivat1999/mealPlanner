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
  // const [mealsPerDay, setMealsPerDay] = useState("");
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
    navigate(`/showMeals?calories=${calories}&diet=${selectedDiet}`);
  };
  const MealPopup = ({ meals, onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-custom-900 bg-opacity-50">
        <div className="bg-custom-800 p-8 rounded-lg shadow-lg overflow-auto max-w-2xl">
          <h2 className="text-lg font-bold text-custom-200 mb-4">
            Generated Meals
          </h2>
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
                  <tr
                    key={index}
                    className="border-b border-gray-700 text-custom-200"
                  >
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

  function DietOption({ label, value, image, selected, onChange }) {
    return (
      <label
        className={`flex items-center ${
          selected ? "bg-custom-600 text-white" : "bg-white text-black"
        } rounded-lg p-2 cursor-pointer`}
      >
        <input
          type="radio"
          name="diet"
          value={value}
          checked={selected}
          onChange={onChange}
          className="hidden"
        />
        <img src={image} alt={label} className="w-16 h-16 object-cover" />
       
      </label>
    );
  }
  return (
    <>
      <div className="bg-custom-900 py-12 sm:py-24 h-screen">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-custom-400">
            Select your diet preference
          </h2>
          <p className="mt-2 text-sm sm:text-lg text-center text-custom-600">
            Ready to give it a shot? Let us know your diet.
          </p>
          <div className="mt-6">
            <label className="block text-sm sm:text-lg font-medium text-center text-custom-400">
              Diet Preferences:
            </label>
            <div className="mt-6 overflow-x-auto flex justify-center">
              <div className="flex space-x-4">
                <DietOption
                  label="Anything"
                  value="anything"
                  image={Anything}
                  selected={selectedDiet === "anything"}
                  onChange={handleDietChange}
                />
                <DietOption
                  label="Vegetarian"
                  value="vegetarian"
                  image={Vegeterian}
                  selected={selectedDiet === "vegetarian"}
                  onChange={handleDietChange}
                />
                <DietOption
                  label="Vegan"
                  value="vegan"
                  image={Vegan}
                  selected={selectedDiet === "vegan"}
                  onChange={handleDietChange}
                />
                <DietOption
                  label="Keto"
                  value="keto"
                  image={Keto}
                  selected={selectedDiet === "keto"}
                  onChange={handleDietChange}
                />
                <DietOption
                  label="Paleo"
                  value="paleo"
                  image={Paleo}
                  selected={selectedDiet === "paleo"}
                  onChange={handleDietChange}
                />
              </div>
            </div>
          </div>
          <form className="mt-6">
            <label className="block text-sm sm:text-lg font-medium text-custom-400">
              Total Calories:
            </label>
            <input
              type="number"
              name="calories"
              value={calories}
              onChange={handleCaloriesChange}
              className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
            />
          </form>
          <div className="mt-6">
            <button
              onClick={handleGenerateMeals}
              className="w-full bg-custom-500 text-custom-100 py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-custom-700 focus:ring-opacity-50"
            >
              Generate Meals
            </button>
            <button
              onClick={handleCalculateIdealCalories}
              className="mt-2 w-full bg-custom-500 text-white py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Calculate Ideal Calories
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
    </>
  );
}
