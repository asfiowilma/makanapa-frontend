import { Layout } from '@components/Layout'
import { WorkoutCard } from '@components/WorkoutCard'
import useWorkout from '@hooks/useWorkout'

import { Workout, WorkoutHistory } from '@typeDefs/workout'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { fetchWorkout, fetchWorkoutHistory } from '@api/workout'
import { HistoryCard } from '@components/HistoryCard'
import {Stomp} from "@stomp/stompjs";
import {loadUserProfile} from "@api/auth";
import toast from "react-hot-toast";
import {AUTH_URL} from "@constants/endpoints";

type Props = {
  workoutRecord_: WorkoutHistory[]
}

export default function WorkoutPage({ workoutRecord_ }: Props) {
  const { workoutHistory, setWorkoutHistory } = useWorkout()
  const client = Stomp.client('ws://infralabs.cs.ui.ac.id:55571/ws/');
  const [workoutMQData, setWorkoutMQData] = useState({
      name: '',
      time: 0,
      estimatedCalories: 0
  });
  const [userProfile, setUserProfile] = useState({id: 0});
  const [connectedMq, setConnectedMq] = useState(false);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => {
    setWorkoutHistory(workoutRecord_);
    const token_ = getCookie('token') as string
    axios.defaults.headers.common['Authorization'] = `Bearer ${token_}`
    loadUserProfile(token_).then((data) => {
        setUserProfile(data)
    }).catch((error) => {
        const errorMsg = error.response?.data.error
        toast.error(errorMsg)
    })
  }, []);

  const subscribeMq = function() {
    client.subscribe(`/exchange/user/${userProfile.id}`, function(message: any){
        setWorkoutMQData(JSON.parse(message.body))
    })
};

const connectMq = function() {
    setConnectedMq(true);
    client.connect('guest' , 'guest', subscribeMq)
};

const handleStartWorkoutButton = async function() {
    // dummy data pls change with workout service real API
    const workout = await startWorkout(userProfile.id, targetTime)
    const req = parseJson(workout.data)
    
    const res = await axios.post(
      'http://host-1806205571-port-55571.proxy.infralabs.cs.ui.ac.id/tk/workout-worker/receive-workout-data',
      req
    );
    // please until here is dummy data
    if (res.status === 200 && !connectedMq) connectMq();
  }

  return (
    <Layout>
      <div>
        <div className="font-bold text-lg mb-4">Workout</div>
        <input
          className="input input-bordered w-full"
          type="number"
          placeholder="20 (dalam menit)"
          onChange={e => { setTargetTime(parseInt(e.currentTarget.value)); }}
        />
        <p className="btn btn-primary mb-8" onClick={() => handleStartWorkoutButton()}>Start Workout</p>
        <div className='border-2 rounded-xl px-8 py-4 bg-primary-200'>
          {
            workoutMQData.name === '' && workoutMQData.time === 0 && workoutMQData.estimatedCalories === 0 ?
            <div className='px-auto'>Mulai Workout Sekarang</div>
            :
            <div>
              <p className='mb-8 font-bold text-lg'>{workoutMQData.name}</p>
              <p className='mb-8'>Time Remaining: {workoutMQData.time}</p>
              <p>Estimated Calories: {workoutMQData.estimatedCalories}</p>
            </div>
          }
        </div>
        <div className="text-primary-500 font-bold mb-4">Workout Saya</div>
        <div className="grid grid-cols-3 gap-4">
          {workoutHistory && workoutHistory.map((history) => <HistoryCard key={history.id} id={history.id} timestamp={history.timestamp} user_id={history.user_id} workouts={history.workouts} />)}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const token = getCookie('token') as string
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data } = await fetchWorkoutHistory();

  return { props: { workoutRecord_: data } }
}

export const startWorkout = async (userId:number ,target_time: number) => {
  const token = getCookie('token') as string
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const data = fetchWorkout(userId, target_time);

  return data
}

const parseJson = (data: any) => {
  let newWorkouts:any = []
  data.workouts.forEach((workout: any) => {
    newWorkouts.push({
      name: workout.name,
      time: workout.target_time,
      estimatedCalories: workout.estimated_calories
    })
  })

  const newJson = {
    "userId": parseInt(data.user_id),
    "workouts": newWorkouts,
  }

  return newJson;
}