import { MouseEventHandler, ReactNode } from "react"
import { FiRefreshCw } from "react-icons/fi"

interface FoodHeaderProps {
  category: string
  generateButton?: boolean
  onGenerate?: MouseEventHandler
}

interface FoodColumnProps {
  children: ReactNode
}

export const FoodHeader = ({ category, generateButton, onGenerate }: FoodHeaderProps) => {
  return <div className={`bg-primary-100 text-primary-800 rounded-lg uppercase font-medium ${generateButton ? "flex justify-between items-center py-2 pl-4 pr-2" : "text-center p-2"} `}>
    <div>{category}</div>
    {generateButton && (<div className="btn btn-ghost btn-sm" onClick={onGenerate!}><FiRefreshCw className="w-5 h-5" /></div>)}
  </div>
}

export const FoodColumn = ({ children }: FoodColumnProps) => {
  return <div className="flex flex-col gap-4 ">{children}</div>
}