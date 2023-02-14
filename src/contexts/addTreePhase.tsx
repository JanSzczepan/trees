import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useMemo,
} from 'react'
import getAddTreePhase, { AddTreePhase } from '../functions/getAddTreePhase'
import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage'

type AddTreePhaseContextType = {
   addTreePhase: AddTreePhase
   changeAddTreePhase: (phase: AddTreePhase) => void
}

const AddTreePhaseContext = createContext<AddTreePhaseContextType>({
   addTreePhase: 'info',
   changeAddTreePhase: () => {},
})

export const useAddTreePhaseContext = () => {
   const context = useContext(AddTreePhaseContext)

   if (!context) {
      throw new Error(
         'AddTreePhaseContext can only be used within AddTreePhaseContextProvider'
      )
   }

   return context
}

type ProviderProps = {
   children: ReactNode
}

export function AddTreePhaseContextProvider({ children }: ProviderProps) {
   const [addTreePhase, setAddTreePhase] = useLocalStorage<AddTreePhase>(
      'addTreePhase',
      getAddTreePhase()
   )

   const changeAddTreePhase = useCallback(
      (phase: AddTreePhase) => {
         setAddTreePhase(phase)
      },
      [setAddTreePhase]
   )

   const value = useMemo(
      () => ({ addTreePhase, changeAddTreePhase }),
      [addTreePhase, changeAddTreePhase]
   )

   return (
      <AddTreePhaseContext.Provider value={value}>
         {children}
      </AddTreePhaseContext.Provider>
   )
}
