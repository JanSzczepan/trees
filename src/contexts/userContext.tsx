import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useMemo,
   useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
} from 'firebase/auth'
import getUser, { User } from '../functions/getUser'
import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage'
import { app } from '../firebase'

export type LoginFormInputs = {
   email: string
   password: string
}
export type SignupFormInputs = {
   userName: string
} & LoginFormInputs

type UserContextType = {
   user: User
   setUser: (user: User) => void
   signup: (data: SignupFormInputs) => void
   login: (data: LoginFormInputs) => void
   logout: () => void
   isLoading: boolean
   error: string
}

const UserContext = createContext<UserContextType>({
   user: getUser(),
   setUser: () => {},
   signup: () => {},
   login: () => {},
   logout: () => {},
   isLoading: false,
   error: '',
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
   const [error, setError] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const navigate = useNavigate()
   const auth = getAuth(app)

   const signup = useCallback(
      ({ email, password }: SignupFormInputs) => {
         setIsLoading(true)
         setError('')

         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const { user: u } = userCredential as {
                  user: { email: string }
               }

               setUser(u)
               navigate('/')
               setIsLoading(false)
            })
            .catch((e) => {
               const errorMessage = e.message

               setError(errorMessage)
               setIsLoading(false)
            })
      },
      [auth, navigate, setUser]
   )

   const login = useCallback(
      ({ email, password }: LoginFormInputs) => {
         setIsLoading(true)
         setError('')

         signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const { user: u } = userCredential as {
                  user: { email: string }
               }

               setUser(u)
               navigate('/')
               setIsLoading(false)
            })
            .catch((e) => {
               const errorMessage = e.message

               setError(errorMessage)
               setIsLoading(false)
            })
      },
      [auth, navigate, setUser]
   )

   const logout = useCallback(() => {
      signOut(auth)
         .then(() => {
            setUser({ email: '' })
         })
         .catch((e) => {
            throw new Error(e)
         })
   }, [auth, setUser])

   const value = useMemo(
      () => ({ user, setUser, login, signup, logout, error, isLoading }),
      [user, setUser, login, signup, logout, error, isLoading]
   )

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
