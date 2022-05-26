import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'

interface Props {
  children?: ReactNode
}

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default GlobalProvider