import { createContext, ReactNode, useContext, useMemo } from 'react'
import getUser, { User } from '../functions/getUser'
import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage'

type UserContextType = {
   user: User
   setUser: (user: User) => void
}

const UserContext = createContext<UserContextType>({
   user: getUser(),
   setUser: () => {},
})

export const useUserContext = () => {
   const context = useContext(UserContext)

   if (!context) {
      throw new Error('UserContext can only be used within UserContextProvider')
   }

   return context
}

type ProviderProps = {
   children: ReactNode
}

export function UserContextProvider({ children }: ProviderProps) {
   const [user, setUser] = useLocalStorage('user', getUser())

   const value = useMemo(() => ({ user, setUser }), [user, setUser])

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
