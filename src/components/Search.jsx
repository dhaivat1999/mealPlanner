import React, { useState, useEffect } from "react";
import Vegan from "../assets/Vegan.png";
import Vegeterian from "../assets/Vegeterian.jpg";
import Paleo from "../assets/Paleo.png";
import Keto from "../assets/Keto.jpg";
import Anything from "../assets/Anything.jpg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const [selectedDiet, setSelectedDiet] = useState("anything");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(queryParams.get("calories")){
      setCalories(queryParams.get("calories"));
    } 
  });
  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleGenerateMeals = () => {
    console.log(calories);
    if (calories === null) {
      setError("* Please Enter the Calories that you want to consume in a day");
      return;
    }
    // setError("");
    navigate(`/showMeals?calories=${calories}&diet=${selectedDiet}`);
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
              Total Calories(*):
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
          {error && <p className="text-red-500 pt-5">{error}</p>}
        </div>
      </div>
    </>
  );
}
