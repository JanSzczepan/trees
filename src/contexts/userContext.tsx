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
import {
   addDoc,
   collection,
   CollectionReference,
   where,
   query,
   getDocs,
   QuerySnapshot,
} from 'firebase/firestore'
import getUser, { User } from '../functions/getUser'
import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage'
import { app, db } from '../firebase'

export type LoginFormInputs = {
   email: string
   password: string
}
export type SignupFormInputs = {
   userName: string
   name: string
   surname: string
} & LoginFormInputs

type UserContextType = {
   user: User
   setUser: (user: User) => void
   signup: (data: SignupFormInputs) => void
   login: (data: LoginFormInputs) => void
   logout: () => void
   getUserData: (id: string) => Promise<User>
   isLoading: boolean
   error: string
}

const UserContext = createContext<UserContextType>({
   user: getUser(),
   setUser: () => {},
   signup: () => {},
   login: () => {},
   logout: () => {},
   getUserData: async () => ({
      email: '',
      name: '',
      surname: '',
      userName: '',
      uid: '',
   }),
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
   const [user, setUser] = useLocalStorage<User>('user', getUser())
   const [error, setError] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const navigate = useNavigate()
   const auth = getAuth(app)
   const usersCollectionRef = useMemo(
      () => collection(db, 'users') as CollectionReference<User>,
      []
   )

   const getUserData = useCallback(
      async (id: string) => {
         try {
            const q = query(usersCollectionRef, where('uid', '==', id))
            const docs = (await getDocs(q)) as QuerySnapshot<User>

            return docs.docs[0].data()
         } catch (e: any) {
            throw new Error(e.message)
         }
      },
      [usersCollectionRef]
   )

   const signup = useCallback(
      ({ email, password, name, surname, userName }: SignupFormInputs) => {
         setIsLoading(true)
         setError('')

         createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
               const { user: u } = userCredential as {
                  user: { email: string; uid: string }
               }

               await addDoc<User>(usersCollectionRef, {
                  uid: u.uid,
                  name,
                  surname,
                  userName,
                  email,
               })

               const userData = await getUserData(u.uid)

               setUser(userData)
               navigate('/')
               setIsLoading(false)
            })
            .catch((e) => {
               const errorMessage = e.message

               setError(errorMessage)
               setIsLoading(false)
            })
      },
      [auth, navigate, setUser, usersCollectionRef, getUserData]
   )

   const login = useCallback(
      ({ email, password }: LoginFormInputs) => {
         setIsLoading(true)
         setError('')

         signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
               const { user: u } = userCredential as {
                  user: { email: string; uid: string }
               }

               const userData = await getUserData(u.uid)

               setUser(userData)
               navigate('/')
               setIsLoading(false)
            })
            .catch((e) => {
               const errorMessage = e.message

               setError(errorMessage)
               setIsLoading(false)
            })
      },
      [auth, navigate, setUser, getUserData]
   )

   const logout = useCallback(() => {
      signOut(auth)
         .then(() => {
            setUser({ email: '', name: '', surname: '', userName: '', uid: '' })
         })
         .catch((e) => {
            throw new Error(e)
         })
   }, [auth, setUser])

   const value = useMemo(
      () => ({
         user,
         setUser,
         login,
         signup,
         logout,
         getUserData,
         error,
         isLoading,
      }),
      [user, setUser, login, signup, logout, getUserData, error, isLoading]
   )

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
