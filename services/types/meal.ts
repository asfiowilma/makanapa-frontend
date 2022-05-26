export interface Food {
  idMeal: number;
  name: string;
  thumbnail: string;
  calories: number;
}

export interface FoodHistory {
  id: number;
  date: Date;
  serving: number;
  food: Food;
}

export interface FoodHistoryRequest {
  idMeal: number;
  serving: number;
}

export enum CATEGORY {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
}

export interface FoodByCategory {
  category: CATEGORY;
  food: Food;
}
