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
   updateDoc,
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
   updateTree: (treeToUpdate: Tree) => void
   getRandomTrees: () => void
   deleteTree: (id: string) => void
   treeToUpdate: Tree | undefined
   setTreeToUpdate: (tree: Tree) => void
   isLoading: boolean
}

const TreeContext = createContext<TreeContextType>({
   trees: [],
   randomTrees: [],
   yourTrees: [],
   addTree: () => {},
   updateTree: () => {},
   getRandomTrees: () => {},
   deleteTree: () => {},
   treeToUpdate: undefined,
   setTreeToUpdate: () => {},
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
   const [treeToUpdate, setTreeToUpdate] = useState<Tree | undefined>(undefined)

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
         await getTrees()
         setIsLoading(false)
      },
      [treesCollectionRef, getTrees]
   )

   const updateTree = useCallback(
      async (tToUpdate: Tree) => {
         setIsLoading(true)

         const docRef = doc(db, 'trees', tToUpdate.id)
         await updateDoc(docRef, tToUpdate)
         await getTrees()

         setTreeToUpdate(undefined)
         setIsLoading(false)
      },
      [getTrees]
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
         updateTree,
         getRandomTrees,
         deleteTree,
         treeToUpdate,
         setTreeToUpdate,
         isLoading,
      }),
      [
         trees,
         randomTrees,
         yourTrees,
         addTree,
         updateTree,
         getRandomTrees,
         deleteTree,
         treeToUpdate,
         setTreeToUpdate,
         isLoading,
      ]
   )

   return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}
