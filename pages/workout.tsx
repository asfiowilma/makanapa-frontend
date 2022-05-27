import { Layout } from '@components/Layout'
import { WorkoutCard } from '@components/WorkoutCard'
import useWorkout from '@hooks/useWorkout'

import { Workout, WorkoutHistory } from '@typeDefs/workout'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { fetchWorkout, fetchWorkoutHistory } from '@api/workout'
import { HistoryCard } from '@components/HistoryCard'

type Props = {
  workoutRecord_: WorkoutHistory[]
}

function WorkoutPage({ workoutRecord_ }: Props) {
  const { workoutHistory, setWorkoutHistory } = useWorkout()

  useEffect(() => {
    setWorkoutHistory(workoutRecord_);
  }, []);

  return (
    <Layout>
      <div>
        <div className="text-primary-500 font-bold mb-4">Workout Saya</div>
        <div className="grid grid-cols-3 gap-4">
          {workoutHistory && workoutHistory.map((history) => <HistoryCard id={history.id} timestamp={history.timestamp} user_id={history.user_id} workouts={history.workouts} />)}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const token = getCookie('token') as string
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data } = await fetchWorkoutHistory(8);

  return { props: { workoutRecord_: data } }
}

export default WorkoutPage