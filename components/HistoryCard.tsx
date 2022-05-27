import Avatar from 'boring-avatars'
import { removeFoodHistory } from "@api/meal"
import useMeal from "@hooks/useMeal"
import useWorkout from "@hooks/useWorkout"
import moment from "moment"
import { FiPlus, FiTrash } from "react-icons/fi"
import { Workout } from '@typeDefs/workout'
import { WorkoutCard } from './WorkoutCard'

interface HistoryCardProps {
    id: number
    user_id: number
    timestamp: number
    workouts: Workout[]
}

export const HistoryCard = ({ id, user_id, timestamp, workouts }: HistoryCardProps) => {
    const { workoutHistory, setWorkoutHistory } = useWorkout()

    let body = [<div></div>]

    workouts.forEach((wo) => {
        body.push(<div style={{margin: 10}}><WorkoutCard key={wo.id} id={wo.id} name={wo.name} time={wo.target_time} calories={wo.estimated_calories} /></div>)
    });

    return <div className="text-gray-400 leading-tight">
        <div>{timestamp}</div>
        <div>{body}</div>
    </div>
  }