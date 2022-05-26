import { removeFoodHistory } from "@api/meal"
import useMeal from "@hooks/useMeal"
import moment from "moment"
import { FiPlus, FiTrash } from "react-icons/fi"

interface MealCardProps {
  id: number
  calories: number
  name: string
  thumbnail: string
  date?: Date
  isRecommendation?: boolean
  openMealHistoryModal?: (id: number) => void
}

export const MealCard = ({ id, thumbnail, name, date, calories, isRecommendation, openMealHistoryModal }: MealCardProps) => {
  const { mealHistory, setMealHistory } = useMeal()

  const deleteMealHistory = async () => {
    await removeFoodHistory(id)
    setMealHistory(mealHistory.filter(m => m.id !== id))
  }

  return <div className="card card-side bg-base-100 shadow-lg flex-1">
    <figure>
      <img alt={name} src={thumbnail} className="w-[160px] h-full object-cover object-center" />
    </figure>
    <div className="card-body p-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <div className="flex-1">
        <div className="text-gray-400">{calories} calories</div>
        {date && <div className="text-primary-400">{moment(date).fromNow()}</div>}
      </div>
      <div className="card-actions justify-end">
        {isRecommendation ?
          <button onClick={() => openMealHistoryModal!(id)} className="btn btn-primary btn-sm btn-circle"><FiPlus className="w-5 h-5" /></button> :
          <button onClick={deleteMealHistory} className="btn btn-ghost text-error btn-sm btn-circle"><FiTrash className="w-5 h-5" /></button>
        }
      </div>
    </div>
  </div>
}