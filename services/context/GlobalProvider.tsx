import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { MealProvider } from './MealContext'

interface Props {
  children?: ReactNode
}

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <AuthProvider>
      <MealProvider>{children}</MealProvider>
    </AuthProvider>
  )
}

export default GlobalProvider