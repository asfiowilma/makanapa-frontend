import { getFoodHistory } from '@api/meal'
import { Layout } from '@components/Layout'
import { MealCard } from '@components/MealCard'
import { MealGenerator } from '@components/MealGenerator'
import useMeal from '@hooks/useMeal'

import { FoodHistory } from '@typeDefs/meal'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'

type Props = {
  mealRecord_: FoodHistory[]
}

function MealPage({ mealRecord_ }: Props) {
  const { mealHistory, setMealHistory } = useMeal()

  useEffect(() => {
    setMealHistory(mealRecord_)
  }, [])

  return (
    <Layout>
      <MealGenerator />
      <div>
        <div className="text-primary-500 font-bold mb-4">Makanan Saya</div>
        <div className="grid grid-cols-3 gap-4">
          {mealHistory && mealHistory.map((meal) => <MealCard key={meal.id} {...{ ...meal, ...meal.food }} />)}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const token = getCookie('token', { req, res }) as string
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data } = await getFoodHistory()

  return { props: { mealRecord_: data } }
}

export default MealPage