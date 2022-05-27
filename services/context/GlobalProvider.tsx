import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { MealProvider } from './MealContext'
import { WorkoutProvider } from './WorkoutContext'

interface Props {
  children?: ReactNode
}

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <AuthProvider>
      <MealProvider>
        <WorkoutProvider>{children}</WorkoutProvider>
      </MealProvider>
    </AuthProvider>
  )
}

export default GlobalProvider