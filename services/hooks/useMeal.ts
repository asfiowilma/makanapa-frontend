import { MealContext, MealContextValue } from "@context/MealContext";
import React from "react";

const useMeal = (): MealContextValue => {
  const context = React.useContext(MealContext);
  if (context === undefined) {
    throw new Error("useMeal must be used within a MealProvider");
  }
  return context;
};

export default useMeal;
