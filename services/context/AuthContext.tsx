import axios, { AxiosError } from 'axios'
import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { getCookie, setCookies, removeCookies, checkCookies } from 'cookies-next';
import { loadUserProfile, login, register } from '@api/auth'
import { useRouter } from 'next/router'
import { AuthContextValue, LoginRequestPayload, RegisterRequestPayload, UserProfile } from '@typeDefs/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [token, setToken] = useState('')
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [isLoadingRegister, setIsLoadingRegister] = useState(false)

  const isAuthenticated_ = useRef<boolean>()
  const router = useRouter()

  useEffect(() => {
    if (checkCookies('token')) {
      const token_ = getCookie('token') as string
      setToken(token_)
    }
  }, [])

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      useLoadUserProfile()
    }
  }, [token])

  const useLogin = (userInfo: LoginRequestPayload) => {
    setIsLoadingLogin(true)
    login(userInfo)
      .then((data) => {
        const { token: token_ } = data
        // setUserProfile(userProfile_)
        setToken(token_)
        setCookies('token', token_)

        axios.defaults.headers.common['Authorization'] = `Bearer ${token_}`
        toast.success('Berhasil login')
        setIsLoadingLogin(false)
        router.push('/dashboard')
      }).catch((error) => {
        const errorMsg = error.response?.data.error
        toast.error(errorMsg)
        setIsLoadingLogin(false)
      })
  }

  const useRegister = (payload: RegisterRequestPayload) => {
    setIsLoadingRegister(true)
    register(payload)
      .then(() => {
        toast.success('Berhasil membuat akun. Silakan login kembali.')
        setIsLoadingRegister(false)
        router.push('/auth/login')
      }).catch((error) => {
        const errorMsg = error.response?.data.error
        toast.error(errorMsg)
        setIsLoadingRegister(false)
      })
  }

  const useLoadUserProfile = () => {
    return loadUserProfile(token).then((data) => {
      console.log("🚀 ~ file: AuthContext.tsx ~ line 55 ~ returnloadUserProfile ~ data", data)
      setUserProfile(data)
    }).catch((error) => {
      const errorMsg = error.response?.data.error
      toast.error(errorMsg)
    })
  }

  const logout = () => {
    setToken('')
    setUserProfile(null)
    removeCookies('token')
    router.push('/auth/login')
    toast.success('Berhasil logout')
  }

  isAuthenticated_.current = !!token

  const value = {
    userProfile,
    isAuthenticated: isAuthenticated_.current,
    isLoadingLogin,
    isLoadingRegister,
    useLogin,
    useRegister,
    logout,
    setUserProfile,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
