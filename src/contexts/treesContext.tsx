import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react'
import {
   collection,
   CollectionReference,
   getDocs,
   query,
   QuerySnapshot,
   where,
} from 'firebase/firestore'
import { db } from '../firebase'
import getRandomItems from '../functions/getRandomItems'
import { useUserContext } from './userContext'

export type Tree = {
   id: string
   authorId: string
   city: string
   street: string
   location: {
      Latitude: number
      Longitude: number
   }
   name: string
   description: string
}

type TreeContextType = {
   trees: Tree[]
   randomTrees: Tree[]
   yourTrees: Tree[]
}

const TreeContext = createContext<TreeContextType>({
   trees: [],
   randomTrees: [],
   yourTrees: [],
})

export const useTreeContext = () => {
   const context = useContext(TreeContext)

   if (!context) {
      throw new Error('TreeContext can only be used within TreeContextProvider')
   }

   return context
}

type ProviderProps = {
   children: ReactNode
}

export function TreeContextProvider({ children }: ProviderProps) {
   const [trees, setTrees] = useState<Tree[]>([])
   const [randomTrees, setRandomTrees] = useState<Tree[]>([])
   const [yourTrees, setYourTrees] = useState<Tree[]>([])

   const { user } = useUserContext()

   const treesCollectionRef = useMemo(
      () => collection(db, 'trees') as CollectionReference<Tree>,
      []
   )

   const getRandomTrees = useCallback(() => {
      setRandomTrees(getRandomItems(trees, 3))
   }, [trees])

   const getYourTrees = useCallback(async () => {
      if (!user.uid) return

      const q = query(treesCollectionRef, where('authorId', '==', user.uid))
      const docs = (await getDocs(q)) as QuerySnapshot<Tree>

      setYourTrees(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   }, [treesCollectionRef, user.uid])

   const getTrees = useCallback(async () => {
      const data = (await getDocs(treesCollectionRef)) as QuerySnapshot<Tree>
      setTrees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   }, [treesCollectionRef])

   useEffect(() => {
      getTrees()
   }, [getTrees])
   useEffect(() => {
      getRandomTrees()
   }, [getRandomTrees])
   useEffect(() => {
      getYourTrees()
   }, [getYourTrees])

   const value = useMemo(
      () => ({ trees, randomTrees, yourTrees }),
      [trees, randomTrees, yourTrees]
   )

   return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}
