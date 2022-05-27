import Avatar from 'boring-avatars'
import { removeFoodHistory } from "@api/meal"
import useMeal from "@hooks/useMeal"
import useWorkout from "@hooks/useWorkout"
import moment from "moment"
import { FiPlus, FiTrash } from "react-icons/fi"

interface WorkoutCardProps {
    id: number
    time: number
    calories: number
    name: string
}

export const WorkoutCard = ({ id, name, time, calories }: WorkoutCardProps) => {
    const { workoutHistory, setWorkoutHistory } = useWorkout()
    return <div className="card card-side bg-base-100 shadow-lg">
      <figure>
        <Avatar
          size={80}
          name={name}
          variant="ring"
          colors={["#CC333F", "#00A0B0", "#E29A1E", "#EAB835", "#EDC951"]}
          square
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title">{name}</h2>
        <div className="text-gray-400 leading-tight">
          <div>{time} seconds</div>
          <div>{calories} calories</div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-ghost text-error btn-sm btn-circle"><FiTrash className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  }