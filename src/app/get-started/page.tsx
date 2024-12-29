"use client";
// pages/get-started.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityLevel } from "@/lib/features/user/ActivityLevel";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Footer from "../components/reusable/Footer";
import updateUserInfo from "@/lib/features/user/updateUserInfo";
import { User } from "@/lib/features/user/User";
import { FitnessPlan } from "@/lib/features/user/FitnessPlan";
import { PaymentPlan } from "@/lib/features/user/PaymentPlan";
import withAuth, { AuthenticatedPageProps } from "../components/hoc/withAuth";
import { Spinner } from "flowbite-react";

const genders = ["Male", "Female"]

const GetStarted = ({ session }: AuthenticatedPageProps) => {
  const [age, setAge] = useState("20");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("80");
  const [displayWeight, setDisplayWeight] = useState("80");
  const [gender, setGender] = useState(genders[0]);
  const [activityLevel, setActivityLevel] = useState("Sedentary");
  const [isLoading, setIsLoading] = useState(false);

  const [units, setUnits] = useState("Metric");
  const router = useRouter();

  const authUser = session.user;

  const formDataIsValid = () => {
    if (!age || !height || !weight) return false;
    if (isNaN(parseInt(age)) || isNaN(parseInt(height)) || isNaN(parseInt(weight))) return false;
    if (parseInt(age) < 0 || parseInt(height) < 0 || parseInt(weight) < 0) return false;

    // Make sure age, height, and weight are within reasonable ranges
    if (parseInt(age) < 13 || parseInt(age) > 100) return false;
    if (parseInt(height) < 100 || parseInt(height) > 250) return false;
    if (parseInt(weight) < 30 || parseInt(weight) > 600) return false;

    // Validate that gender is in list of genders
    if (!genders.includes(gender)) return false;

    // Validate that activity level is in list of activity levels
    if (!Object.values(ActivityLevel).includes(activityLevel as ActivityLevel)) return false;

    return true;
  }

  const handleUnitChange = () => {
    console.log("SOMETHING FISHY HERE")
    if (units === "US") {
      // Switch to Metric
      setDisplayWeight(weight); // Display kg
      setUnits("Metric");
    } else {
      // Switch to US
      setDisplayWeight(kgToLbs(parseFloat(weight)).toString()); // Display lbs
      setUnits("US");
    }
  };

  const handleHeightChange = (feet: number, inches: number) => {
    // Normalize inches:
    // If inches are less than 0, subtract 1 from feet and reset inches to 11
    // If inches are greater than 11, add 1 to feet and reset inches to 0
    if (inches < 0) {
      feet -= 1;
      inches = 11;
    } else if (inches > 11) {
      feet += 1;
      inches = 0;
    }

    // Convert feet and inches to cm
    const newHeight = calculateHeightInCm(feet, inches);
    if (Number.isNaN(newHeight)) return;

    setHeight(newHeight.toString());
  };

  const calculateHeightInCm = (ft: number, inches: number) => {
    return Math.round((ft * 30.48) + (inches * 2.54));
  };

  const getFeetAndInchesFromCm = (cm: number) => {
    const totalInches = Math.round(cm / 2.54); // Convert cm to inches
    const feet = Math.floor(totalInches / 12); // Extract feet
    const inches = totalInches % 12; // Remaining inches
    return { feet, inches };
  };

  const handleWeightChange = (newValue: string) => {
    const parsedValue = parseFloat(newValue || "0");

    if (units === "US") {
      // Update kg state based on lbs input
      setWeight(lbsToKg(parsedValue).toString());
      setDisplayWeight(newValue); // Update display value
    } else {
      // Update kg directly
      setWeight(newValue);
      setDisplayWeight(newValue); // Update display value
    }
  };

  const kgToLbs = (kg: number) => {
    return Math.round(kg * 2.20462 * 100) / 100; // Convert kg to lbs
  };

  const lbsToKg = (lbs: number) => {
    return Math.round(lbs / 2.20462 * 100) / 100; // Convert lbs to kg
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      // Check if form data is valid
      if (!formDataIsValid()) {
        setIsLoading(false);
        return;
      }


      // Update user profile with form data
      const user: User = {
        id: authUser!.id!,
        age: parseInt(age),
        height: parseInt(height),
        weight: parseInt(weight),
        gender: gender,
        activityLevel: activityLevel as ActivityLevel,
        fitnessPlan: FitnessPlan.MAINTAIN,
        paymentPlan: PaymentPlan.NONE
      };
      const result = await updateUserInfo(user);
      console.log("User info updated:", result);

      router.push("/fitness-plans");
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating user info:", error);
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50">
      <div className="flex items-center justify-center flex-grow w-full">
        <div className="p-8 md:bg-white md:shadow-lg md:rounded-lg md:max-w-md w-full">
          {!isLoading &&
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Get Started</h1>
              <p className="text-gray-600 mb-4">
                Feasty needs some info about you so it can generate a tailored meal plan for you.
              </p>
              <p className="text-sm text-gray-400 mb-6">Step 1 out of 3</p>

              {/* Units Toggle */}
              <div className="flex items-center justify-between mb-6">
                <label className="text-gray-800 font-medium">Units</label>
                <div className="flex items-center">
                  <span className="text-gray-800 mr-2">Metric</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={units === "Metric"}
                      onChange={handleUnitChange}
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
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {units === "US" && (
                  <div>
                    <label className="block text-gray-800 font-medium mb-1">Height</label>
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        placeholder="Ft"
                        className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={getFeetAndInchesFromCm(parseInt(height || "0")).feet}
                        onChange={(e) =>
                          handleHeightChange(
                            parseInt(e.target.value || "0"),
                            getFeetAndInchesFromCm(parseInt(height || "0")).inches
                          )
                        }
                      />
                      <span className="flex items-center text-gray-800">ft</span>
                      <input
                        type="number"
                        placeholder="In"
                        className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={getFeetAndInchesFromCm(parseInt(height || "0")).inches}
                        onChange={(e) =>
                          handleHeightChange(
                            getFeetAndInchesFromCm(parseInt(height || "0")).feet,
                            parseInt(e.target.value || "0")
                          )
                        }
                      />
                      <span className="flex items-center text-gray-800">in</span>
                    </div>
                  </div>
                )}

                {units === "Metric" && (
                  <div>
                    <label className="block text-gray-800 font-medium mb-1">Height</label>
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        placeholder="Cm"
                        className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                      <span className="flex items-center text-gray-800">cm</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-800 font-medium mb-1">Weight</label>
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      placeholder="Enter your weight"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={displayWeight}
                      onChange={(e) => handleWeightChange(e.target.value)}
                    />
                    {units === "US" && <span className="flex items-center text-gray-800">lbs</span>}
                    {units === "Metric" && <span className="flex items-center text-gray-800">kg</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-1">Gender</label>
                  <RadioGroup value={gender} onChange={setGender} className="flex space-x-4">
                    {genders.map((g) => {
                      return (
                        <Field key={g} className="flex items-center gap-2">
                          <Radio
                            value={g}
                            className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-green-500"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <Label>{g}</Label>
                        </Field>
                      );
                    })}
                  </RadioGroup>
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-1">Activity Level</label>
                  <RadioGroup value={activityLevel} onChange={setActivityLevel} className="space-y-2">
                    {Object.values(ActivityLevel).map((g) => {
                      return (
                        <Field key={g} className="flex items-center gap-2">
                          <Radio
                            value={g}
                            className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-green-500"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <Label>{g}</Label>
                        </Field>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          }
          {isLoading &&
            <div className="flex w-full h-full justify-center items-center">
              <Spinner aria-label="Loading..." />
            </div>
          }

          {/* Continue Button */}
          <button
            className={`w-full mt-6 py-2 px-4 rounded-lg shadow-md ${(formDataIsValid() && !isLoading)
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition`}
            disabled={!formDataIsValid()}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default withAuth(GetStarted);