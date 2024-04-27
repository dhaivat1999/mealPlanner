import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CalCalculator() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [units, setUnits] = useState("us_standard");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [metHeight, setMetHeight] = useState("");
  const [usHeightFt, setUsHeightFt] = useState(0);
  const [usHeightIn, setUsHeightIn] = useState(0);
  const [metWeight, setMetWeight] = useState("");
  const [usWeight, setUSWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [bodyFat, setBodyFat] = useState("");
  const [calculatedCalories, setCalculatedCalories] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  const isFormValid = () => {
    return (
      // goal !== "" &&
      units !== "" &&
      gender !== "" &&
      age !== "" &&
      ((units === "metric" && metHeight !== "" && metWeight !== "") ||
        (units === "us_standard" &&
          usHeightFt !== "" &&
          usHeightIn !== "" &&
          usWeight !== "")) &&
      activityLevel !== "" &&
      bodyFat !== ""
    );
  };

  const handleGoalChange = (value) => {
    setGoal(value);
  };

  const handleBodyFatChange = (value) => {
    setBodyFat(value);
  };

  const handleUnitsChange = (value) => {
    setUnits(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleMetWeightChange = (e) => {
    setMetWeight(e.target.value);
  };

  const handleMetHeightChange = (e) => {
    setMetHeight(e.target.value);
  };

  const handleUSHeightChangeFt = (e) => {
    setUsHeightFt(e.target.value);
  };

  const handleUSHeightChangeIn = (e) => {
    setUsHeightIn(e.target.value);
  };

  const handleUSWeightChange = (e) => {
    setUSWeight(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivityLevel(e.target.value);
  };

  const handleCalculateCalories = (e) => {
    e.preventDefault();
    let calculatedBMR = 0;
    let dailyCalorieNeeds = 0;
    if (!isFormValid()) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    } else {
      if (units === "us_standard") {
        let weightInKg = usWeight * 0.453592;
        let heightInCm =
          (parseFloat(usHeightFt) * 12 + parseFloat(usHeightIn)) * 2.54;

        console.log(heightInCm + " height in cms");
        if (gender === "male") {
          calculatedBMR =
            88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
          console.log(calculatedBMR + " calculatedBMR ");
        } else {
          calculatedBMR =
            447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * age;
          console.log(calculatedBMR + " calculatedBMR ");
        }
      } else {
        if (gender === "male") {
          calculatedBMR =
            88.362 + 13.397 * metWeight + 4.799 * metHeight - 5.677 * age;
          console.log(calculatedBMR + " calculatedBMR ");
        } else {
          calculatedBMR =
            447.593 + 9.247 * metWeight + 3.098 * metHeight - 4.33 * age;
          console.log(calculatedBMR + " calculatedBMR ");
        }
      }
      let adjustedCalories = calculatedBMR;
      if (bodyFat === "low") {
        adjustedCalories *= 1.1; // Increase calorie needs by 10% for lower body fat percentage
      } else if (bodyFat === "high") {
        adjustedCalories *= 0.9; // Decrease calorie needs by 10% for higher body fat percentage
      }

      if (activityLevel === "sedentary") {
        dailyCalorieNeeds = adjustedCalories * 1.2;
      } else if (activityLevel === "lightly_active") {
        dailyCalorieNeeds = adjustedCalories * 1.375;
      } else if (activityLevel === "moderately_active") {
        dailyCalorieNeeds = adjustedCalories * 1.55;
      } else if (activityLevel === "very_active") {
        dailyCalorieNeeds = adjustedCalories * 1.725;
      } else if (activityLevel === "extremely_active") {
        dailyCalorieNeeds = adjustedCalories * 1.9;
      }
      setCalculatedCalories(dailyCalorieNeeds);
      setShowPopup(true);
      console.log(dailyCalorieNeeds);
      console.log(calculatedBMR);
    }
  };
  
  const handleGenRecipe = () => {
    navigate("/search");
  }

  const Popup = ({ onClose }) => {
    // Round down the calculated calories to remove decimal values
    const roundedMaintainCalories = Math.floor(calculatedCalories);
    const roundedLoseCalories = Math.floor(calculatedCalories - 500); // Assuming a deficit of 500 calories for weight loss
    const roundedGainCalories = Math.floor(calculatedCalories + 300); // Assuming a surplus of 300 calories for muscle gain

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-custom-900 bg-opacity-50">
        <div className="bg-custom-800 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white">
              Daily Calorie Needs
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              According to the Harris-Benedict method
            </p>
            <div className="text-white">
              <p>Lose Weight: {roundedLoseCalories} calories per day</p>
              <p>Maintain Weight: {roundedMaintainCalories} calories per day</p>
              <p>Gain Muscle: {roundedGainCalories} calories per day </p>
            </div>
            <p className="text-xs text-gray-300 mt-4">
              *Disclaimer: These values are approximate and may vary. Consult a
              nutritionist or healthcare professional for personalized advice.
            </p>
          </div>
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

  return (
    <>
      <div className="bg-custom-900 py-12 sm:py-12 h-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-custom-400 sm:text-4xl">
              Nutrition Calculator
            </h2>
            <form className="mt-4">
            

              <div className="mt-6">
                <label className="block text-lg font-medium text-custom-400">
                  Preferred Units*:
                </label>
                <div className="flex mt-2 space-x-4">
                  <label
                    className={`flex items-center justify-center ${
                      units === "us_standard"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer`}
                    style={{ width: "150px" }}
                  >
                    <input
                      type="radio"
                      name="units"
                      value="us_standard"
                      checked={units === "us_standard"}
                      onChange={() => handleUnitsChange("us_standard")}
                      className="hidden"
                    />
                    U.S Standard
                  </label>
                  <label
                    className={`flex items-center  justify-center ${
                      units === "metric"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer`}
                    style={{ width: "150px" }}
                  >
                    <input
                      type="radio"
                      name="units"
                      value="metric"
                      checked={units === "metric"}
                      onChange={() => handleUnitsChange("metric")}
                      className="hidden"
                    />
                    Metric
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg font-medium text-custom-400">
                  Gender*:
                </label>
                <div className="flex mt-2 space-x-4">
                  <label
                    className={`flex items-center justify-center ${
                      gender === "male"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer`}
                    style={{ width: "150px" }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => handleGenderChange("male")}
                      className="hidden"
                    />
                    Male
                  </label>
                  <label
                    className={`flex items-center justify-center ${
                      gender === "female"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer`}
                    style={{ width: "150px" }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => handleGenderChange("female")}
                      className="hidden"
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="mt-6">
                {units == "metric" ? (
                  <>
                    <label className="block text-lg font-medium text-custom-400">
                      Height:
                    </label>
                    <div className="flex mt-2 space-x-4">
                      <input
                        type="text"
                        name="height"
                        min={0}
                        value={metHeight}
                        onChange={handleMetHeightChange}
                        placeholder="cm"
                        className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                      />
                      <span className="text-custom-400">cm</span>
                    </div>

                    <label className="block text-lg font-medium text-custom-400 pt-3">
                      Weight:
                    </label>
                    <div className="flex mt-2 space-x-4">
                      <input
                        type="text"
                        name="weight"
                        min={0}
                        value={metWeight}
                        onChange={handleMetWeightChange}
                        placeholder="kgs"
                        className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                      />
                      <span className="text-custom-400">kgs</span>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="block text-lg font-medium text-custom-400">
                      Height:
                    </label>
                    <div className="flex mt-2 space-x-4">
                      <input
                        type="number"
                        name="height"
                        min={0}
                        placeholder="ft"
                        value={usHeightFt}
                        onChange={handleUSHeightChangeFt}
                        className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                      />
                      <span className="text-custom-400">ft</span>
                      <input
                        type="number"
                        name="height"
                        value={usHeightIn}
                        min={0}
                        max={11}
                        onChange={handleUSHeightChangeIn}
                        placeholder="inch"
                        className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                      />
                      <span className="text-custom-400">inch</span>
                    </div>
                    <label className="block text-lg font-medium text-custom-400 pt-3">
                      Weight:
                    </label>
                    <div className="flex mt-2 space-x-4">
                      <input
                        type="number"
                        name="weight"
                        min={0}
                        value={usWeight}
                        onChange={handleUSWeightChange}
                        placeholder="lbs"
                        className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                      />
                      <span className="text-custom-400">lbs</span>
                    </div>
                  </>
                )}
                <label className="block text-lg font-medium text-custom-400 pt-3">
                  Age:
                </label>
                <div className="flex mt-2 space-x-4">
                  <input
                    type="number"
                    name="age"
                    min={0}
                    value={age}
                    onChange={handleAgeChange}
                    className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                  />
                  <span className="text-custom-400">Years</span>
                </div>

                <label className="block text-lg font-medium text-custom-400">
                  Body Fat (Percentage)
                </label>
                <div className="flex mt-2 space-x-4">
                  <label
                    className={`flex items-center  justify-center ${
                      bodyFat === "low"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer`}
                    style={{ width: "150px" }}
                  >
                    <input
                      type="radio"
                      name="bodyFat"
                      value="low"
                      checked={bodyFat === "low"}
                      onChange={() => handleBodyFatChange("low")}
                      className="hidden"
                    />
                    Low : {"<"} 14%
                  </label>

                  <label
                    className={`flex items-center justify-center ${
                      bodyFat === "medium"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer`}
                    style={{ width: "150px" }}
                  >
                    <input
                      type="radio"
                      name="bodyFat"
                      value="medium"
                      checked={bodyFat === "medium"}
                      onChange={() => handleBodyFatChange("medium")}
                      className="hidden"
                    />
                    Medium : 14-22%
                  </label>

                  <label
                    className={`flex items-center justify-center ${
                      bodyFat === "high"
                        ? "bg-custom-500 text-white"
                        : "bg-custom-200 text-gray-800"
                    } rounded-lg p-2 cursor-pointer `}
                    style={{ width: "150px" }} // Set a fixed width for all labels
                  >
                    <input
                      type="radio"
                      name="goal"
                      value="high"
                      checked={goal === "high"}
                      onChange={() => handleBodyFatChange("high")}
                      className="hidden"
                    />
                    High : {">"} 22%
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="activityLevel"
                    className="block text-lg font-medium text-custom-400"
                  >
                    Activity Level:
                  </label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    value={activityLevel}
                    onChange={handleActivityChange}
                    className="mt-1 block w-full py-2 px-3 border border-custom-500 bg-custom-800 text-custom-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-400 focus:border-transparent"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly_active">Lightly Active</option>
                    <option value="moderately_active">Moderately Active</option>
                    <option value="very_active">Very Active</option>
                    <option value="extremely_active">Extremely Active</option>
                  </select>
                </div>

                <div className="pt-5 flex space-x-4">
                  {!isFormValid() ? (
                    <button disabled className="text-custom-200 ">
                      All Fields are mandatory
                    </button>
                  ) : (
                    <button
                      onClick={handleCalculateCalories}
                      className="bg-custom-500 text-white py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Calculate
                    </button>
                  )}
                  <button
                      onClick={handleGenRecipe}
                      className="bg-custom-500 text-white py-2 px-4 rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Generate Recipes
                    </button>
                </div>

                
              </div>
              {showPopup && <Popup onClose={() => setShowPopup(false)} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
