import { getFoodHistory } from "@api/meal";
import { HeroCards, WorkoutCard } from "@components/Dashboard";
import { Layout } from "@components/Layout";
import { FoodColumn, FoodHeader } from "@components/Meal";
import { MealCard } from "@components/MealCard";
import { MealGenerator } from "@components/MealGenerator";
import useAuth from "@hooks/useAuth";
import useMeal from "@hooks/useMeal";
import { FoodHistory } from "@typeDefs/meal";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

type Props = {
  mealRecord_: FoodHistory[]
}

export default function DashboardPage({ mealRecord_ }: Props) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const { mealHistory, setMealHistory } = useMeal()

  useEffect(() => {
    setMealHistory(mealRecord_)
  }, [])


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated])

  return (
    <Layout>
      <HeroCards />
      <div className='flex justify-between items-center mb-4'>
        <div className="font-bold text-lg">Makanan Saya</div>
        <Link href="/meal"><a className="btn btn-ghost">Lihat Semua</a></Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {mealHistory && mealHistory.slice(0, 5).map((meal) => <MealCard key={meal.id} {...{ ...meal, ...meal.food }} />)}
        <div className="grid place-items-center">
          <Link href="/meal"><a className="btn btn-ghost text-primary-500">Lihat Semua<FiArrowRight className="h-5 w-5 ml-2" /></a></Link>
        </div>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <div className="font-bold text-lg">Workout</div>
        <a className="btn btn-ghost">Lihat Semua</a>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <WorkoutCard id={1} name="Plank" time={30} calories={12} />
        <WorkoutCard id={1} name="Push up" time={30} calories={12} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie('token', { req, res }) as string
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data } = await getFoodHistory()

  return { props: { mealRecord_: data } }
}