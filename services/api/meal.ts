import { MEAL_URL } from "@constants/endpoints";
import { CATEGORY, FoodByCategory, FoodHistory, FoodHistoryRequest } from "@typeDefs/meal";
import axios from "axios";

export const generateRandomFood = (filter?: CATEGORY) =>
  axios.get<FoodByCategory[]>(`${MEAL_URL}/generate${!!filter ? "?filter=" + filter : ""}`);
export const getFoodHistory = () => axios.get<FoodHistory[]>(`${MEAL_URL}/history`);
export const addFoodHistory = (history: FoodHistoryRequest) =>
  axios.post<FoodHistory>(`${MEAL_URL}/history`, history);
export const removeFoodHistory = (id: number) => axios.delete(`${MEAL_URL}/history/${id}`);
