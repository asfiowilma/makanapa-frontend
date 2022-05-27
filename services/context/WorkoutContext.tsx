import { WorkoutHistory } from '@typeDefs/workout';
import React, { ReactNode, useState } from 'react'

interface WorkoutProviderProps {
    children: ReactNode
}

export interface WorkoutContextValue {
    workoutHistory: WorkoutHistory[]
    setWorkoutHistory: Function
}

const WorkoutContext = React.createContext<WorkoutContextValue | undefined>(undefined)

const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
    const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([])

    return <WorkoutContext.Provider value={{ workoutHistory, setWorkoutHistory }}>{children}</WorkoutContext.Provider>
}

export { WorkoutContext, WorkoutProvider }
