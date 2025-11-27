import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      
      login: (user) => {
        set({
          user,
          isAuth: true
        })
        localStorage.setItem('access_token', user.accessToken)
        localStorage.setItem('refresh_token', user.refreshToken)
      },
      
      logout: () => {
        set({
          user: null,
          isAuth: false,
        })
        localStorage.clear()
      },
    }),
    {
      name: 'auth-store'
    }
  )
)

export default useAuthStore