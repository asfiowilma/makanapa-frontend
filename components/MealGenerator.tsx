import React, { useEffect, useState } from 'react'
import { FoodColumn, FoodHeader } from '@components/Meal'
import { MealCard } from '@components/MealCard'
import { FiRefreshCw } from 'react-icons/fi'
import { Modal } from './Modal'
import { CATEGORY, Food, FoodByCategory } from '@typeDefs/meal'
import { addFoodHistory, generateRandomFood } from '@api/meal'
import toast from 'react-hot-toast'
import useMeal from '@hooks/useMeal'

type Props = {}

const BREAKFAST = 0,
  LUNCH = 1,
  DINNER = 2

export const MealGenerator = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [targetMeal, setTargetMeal] = useState(0)
  const [serving, setServing] = useState(1)
  const [recommendation, setRecommendation] = useState<FoodByCategory[]>([])
  const { mealHistory, setMealHistory } = useMeal()

  const getMeal = async (filter?: CATEGORY) => {
    setIsLoading(true)
    const { data } = await generateRandomFood(filter)
    console.log("🚀 ~ file: MealGenerator.tsx ~ line 21 ~ getMeal ~ data", data)
    if (!filter) setRecommendation(data)
    else if (filter === CATEGORY.BREAKFAST) setRecommendationOf(BREAKFAST, data[0])
    else if (filter === CATEGORY.LUNCH) setRecommendationOf(LUNCH, data[0])
    else if (filter === CATEGORY.DINNER) setRecommendationOf(DINNER, data[0])
    setIsLoading(false)
  }

  const setRecommendationOf = (idx: number, meal: FoodByCategory) => {
    const rec = [...recommendation]
    rec[idx] = meal
    setRecommendation(rec)
  }

  useEffect(() => {
    getMeal()
  }, [])

  const openMealHistoryModal = (idx: number) => {
    setIsOpen(true)
    setTargetMeal(idx)
  }

  const saveMealRecord = async () => {
    setIsSaving(true)
    const { idMeal, calories } = recommendation[targetMeal].food
    const { data } = await addFoodHistory({ idMeal, serving })
    setMealHistory([...mealHistory, data])
    setIsOpen(false)
    setServing(1)
    toast.success(`Berhasil mencatat konsumsi ${calories * serving} kalori.`)
    setIsSaving(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-primary-500 font-bold">Mau Makan Apa?</div>
          <div className="text-primary-800">Bingung mau makan apa hari ini? Biar kami yang pilihkan~</div>
        </div>
        <div className="btn btn-ghost gap-3" onClick={() => getMeal()}>generate all <FiRefreshCw className="w-5 h-5" /></div>
      </div>
      <div className="w-full rounded-lg bg-primary-50 my-4 p-8 grid grid-cols-3 gap-8">
        {!isLoading && recommendation.map((meal, idx) => (
          <FoodColumn key={idx}>
            <FoodHeader generateButton onGenerate={() => getMeal(meal.category)} category={meal.category} />
            <MealCard id={idx} {...{ ...meal.food, openMealHistoryModal }} isRecommendation />
          </FoodColumn>
        ))}
        {isLoading &&
          ['breakfast', 'lunch', 'dinner'].map((category) => (
            <FoodColumn key={category}>
              <div className={`bg-primary-100 text-primary-800 rounded-lg uppercase font-medium flex justify-between items-center py-2 pl-4 pr-2`}>
                <div>{category}</div>
                <div className="btn btn-ghost btn-sm"><FiRefreshCw className="w-5 h-5 animate-spin" /></div>
              </div>
              <div className="card rounded-lg animate-pulse h-40 bg-primary-100"></div>
            </FoodColumn>
          ))}
      </div>

      <Modal {...{ isOpen, setIsOpen }}>
        {recommendation[targetMeal] && <div className="flex flex-col gap-4">
          <img src={recommendation[targetMeal].food.thumbnail} className="rounded-lg object-cover aspect-video w-full" />
          <div>
            <div className="font-bold text-lg">{recommendation[targetMeal].food.name}</div>
            <div className="text-gray-400">{recommendation[targetMeal].food.calories * serving} calories</div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Makan berapa porsi?</span>
            </label>
            <div className="w-full flex gap-2">
              <input type="number" placeholder="1" onChange={(e) => setServing(parseInt(e.target.value))} className="input input-bordered flex-1" />
              <div className={`btn btn-primary ${isSaving && "loading"}`} onClick={saveMealRecord}>{isSaving ? "menyimpan.." : "simpan"}</div>
            </div>
          </div>
        </div>}
      </Modal>
    </div>
  )
}