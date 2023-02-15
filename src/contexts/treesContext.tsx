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
   addDoc,
   collection,
   CollectionReference,
   deleteDoc,
   doc,
   getDocs,
   query,
   QuerySnapshot,
   where,
} from 'firebase/firestore'
import { db } from '../firebase'
import getRandomItems from '../functions/getRandomItems'
import { useUserContext } from './userContext'

type TreeForm = {
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

export type Tree = TreeForm & { id: string }

type TreeContextType = {
   trees: Tree[]
   randomTrees: Tree[]
   yourTrees: Tree[]
   addTree: (treeForm: TreeForm) => void
   getRandomTrees: () => void
   deleteTree: (id: string) => void
   isLoading: boolean
}

const TreeContext = createContext<TreeContextType>({
   trees: [],
   randomTrees: [],
   yourTrees: [],
   addTree: () => {},
   getRandomTrees: () => {},
   deleteTree: () => {},
   isLoading: false,
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
   const [isLoading, setIsLoading] = useState<boolean>(false)

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

      setIsLoading(true)

      const q = query(treesCollectionRef, where('authorId', '==', user.uid))
      const docs = (await getDocs(q)) as QuerySnapshot<Tree>

      setYourTrees(docs.docs.map((d) => ({ ...d.data(), id: d.id })))

      setIsLoading(false)
   }, [treesCollectionRef, user.uid])

   const getTrees = useCallback(async () => {
      setIsLoading(true)

      const data = (await getDocs(treesCollectionRef)) as QuerySnapshot<Tree>
      setTrees(data.docs.map((d) => ({ ...d.data(), id: d.id })))

      setIsLoading(false)
   }, [treesCollectionRef])

   const addTree = useCallback(
      async (tree: TreeForm) => {
         setIsLoading(true)
         await addDoc<TreeForm>(treesCollectionRef, tree)
         // const q = query(treesCollectionRef, where('id', '==', data.id))
         // const docs = (await getDocs(q)) as QuerySnapshot<Tree>
         // const t: Tree[] = docs.docs.map((doc) => ({
         //    ...doc.data(),
         //    id: doc.id,
         // }))
         // setTrees((prevState) => [...prevState, ...t])
         await getTrees()
         setIsLoading(false)
      },
      [treesCollectionRef, getTrees]
   )

   const deleteTree = useCallback(
      async (id: string) => {
         setIsLoading(true)

         const docRef = doc(db, 'trees', id)
         await deleteDoc(docRef)
         await getTrees()

         setIsLoading(false)
      },
      [getTrees]
   )

   useEffect(() => {
      getTrees()
   }, [getTrees])
   useEffect(() => {
      getRandomTrees()
   }, [getRandomTrees, trees])
   useEffect(() => {
      getYourTrees()
   }, [getYourTrees, trees])

   const value = useMemo(
      () => ({
         trees,
         randomTrees,
         yourTrees,
         addTree,
         getRandomTrees,
         deleteTree,
         isLoading,
      }),
      [
         trees,
         randomTrees,
         yourTrees,
         addTree,
         getRandomTrees,
         deleteTree,
         isLoading,
      ]
   )

   return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}
