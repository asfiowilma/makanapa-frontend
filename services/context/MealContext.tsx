import { FoodHistory } from '@typeDefs/meal';
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface MealProviderProps {
  children: ReactNode
}

export interface MealContextValue {
  mealHistory: FoodHistory[]
  setMealHistory: Function
}

const MealContext = React.createContext<MealContextValue | undefined>(undefined)

const MealProvider = ({ children }: MealProviderProps) => {
  const [mealHistory, setMealHistory] = useState<FoodHistory[]>([])

  return <MealContext.Provider value={{ mealHistory, setMealHistory }}>{children}</MealContext.Provider>
}

export { MealContext, MealProvider }
