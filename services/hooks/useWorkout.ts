import { WorkoutContext, WorkoutContextValue } from "@context/WorkoutContext";
import React from "react";

const useWorkout = (): WorkoutContextValue => {
  const context = React.useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};

export default useWorkout;
