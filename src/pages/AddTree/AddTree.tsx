import { useNavigate } from 'react-router-dom'
import { useAddTreePhaseContext } from '../../contexts/addTreePhase'
import AddTreeHeader from './AddTreeHeader'
import BackNextButtons from './AddTreePhases/BackNextButtons'
import Info from './AddTreePhases/Info'
import Location from './AddTreePhases/Location'
import Summary from './AddTreePhases/Summary'

function AddTree() {
   const { addTreePhase, changeAddTreePhase } = useAddTreePhaseContext()

   const navigate = useNavigate()

   let title: string
   let progress: number
   let phaseComponent: JSX.Element
   let handleNext: () => void
   let handleBack: () => void

   switch (addTreePhase) {
      case 'info':
         title = '1. Add info about the tree'
         progress = (1 / 3) * 100
         phaseComponent = <Info />
         handleBack = () => navigate('..')
         handleNext = () => changeAddTreePhase('location')
         break
      case 'location':
         title = '2. Add tree location'
         progress = (2 / 3) * 100
         phaseComponent = <Location />
         handleBack = () => changeAddTreePhase('info')
         handleNext = () => changeAddTreePhase('summary')
         break
      case 'summary':
         title = '3. Summary'
         progress = (3 / 3) * 100
         phaseComponent = <Summary />
         handleBack = () => changeAddTreePhase('location')
         handleNext = () => {
            navigate('/')
            changeAddTreePhase('info')
         }
         break
      default:
         title = '1. Add info about the tree'
         progress = (1 / 3) * 100
         phaseComponent = <Info />
         handleBack = () => navigate('..')
         handleNext = () => changeAddTreePhase('location')
         break
   }

   return (
      <main className='p-4'>
         <AddTreeHeader
            title={title}
            progress={progress}
         />
         {phaseComponent}
         <BackNextButtons
            handleBack={handleBack}
            handleNext={handleNext}
         />
      </main>
   )
}

export default AddTree
