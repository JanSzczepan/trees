import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react'
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import getRandomItems from '../functions/getRandomItems'

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
}

const TreeContext = createContext<TreeContextType>({
   trees: [],
   randomTrees: [],
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

   const treesCollectionRef = useMemo(() => collection(db, 'trees'), [])

   const getRandomTrees = useCallback(() => {
      setRandomTrees(getRandomItems(trees, 3))
   }, [trees])

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

   const value = useMemo(() => ({ trees, randomTrees }), [trees, randomTrees])

   return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}
