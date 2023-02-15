import { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAddTreePhaseContext } from '../../contexts/addTreePhase'
import AddTreeHeader from './AddTreeHeader'
import BackNextButtons from './AddTreePhases/BackNextButtons'
import Info, { TreeForm } from './AddTreePhases/Info'
import Location from './AddTreePhases/Location'
import Summary from './AddTreePhases/Summary'

function AddTree() {
   const [tree, setTree] = useState<TreeForm>({
      name: '',
      description: '',
      street: '',
      city: '',
   })

   const { addTreePhase, changeAddTreePhase } = useAddTreePhaseContext()
   const navigate = useNavigate()

   let title: string
   let progress: number
   let phaseComponent: JSX.Element
   let handleNext: () => void
   let handleBack: () => void
   let disabled: boolean

   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
      setTree((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }))

   switch (addTreePhase) {
      case 'info':
         title = '1. Add info about the tree'
         progress = (1 / 3) * 100
         phaseComponent = (
            <Info
               tree={tree}
               handleOnChange={handleOnChange}
            />
         )
         handleBack = () => navigate('..')
         handleNext = () => changeAddTreePhase('location')
         disabled = !(tree.name && tree.description)
         break
      case 'location':
         title = '2. Add tree location'
         progress = (2 / 3) * 100
         phaseComponent = (
            <Location
               tree={tree}
               handleOnChange={handleOnChange}
            />
         )
         handleBack = () => changeAddTreePhase('info')
         handleNext = () => changeAddTreePhase('summary')
         disabled = !(tree.street && tree.city)
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
         disabled = !(tree.name && tree.description && tree.street && tree.city)
         break
      default:
         title = '1. Add info about the tree'
         progress = (1 / 3) * 100
         phaseComponent = (
            <Info
               tree={tree}
               handleOnChange={handleOnChange}
            />
         )
         handleBack = () => navigate('..')
         handleNext = () => changeAddTreePhase('location')
         disabled = !(tree.name && tree.description)
         break
   }

   return (
      <main className='p-4'>
         <AddTreeHeader
            title={title}
            progress={progress}
         />
         <Form>
            {phaseComponent}
            <BackNextButtons
               handleBack={handleBack}
               handleNext={handleNext}
               disabled={disabled}
            />
         </Form>
      </main>
   )
}

export default AddTree
