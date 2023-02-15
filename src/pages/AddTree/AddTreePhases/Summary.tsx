import TreeCard from '../../../components/TreeCard/TreeCard'
import { Tree } from '../../../contexts/treesContext'
import { useUserContext } from '../../../contexts/userContext'
import { TreeForm } from './Info'

type SummaryProps = {
   formTree: TreeForm
   disabled: boolean
}

function Summary({ formTree, disabled }: SummaryProps) {
   const { user } = useUserContext()

   const tree: Tree = {
      ...formTree,
      authorId: user.uid,
      location: {
         Latitude: 0,
         Longitude: 0,
      },
      id: '',
   }

   return disabled ? (
      <h3>Add all required informations about the tree</h3>
   ) : (
      <TreeCard
         tree={tree}
         isSettings={false}
      />
   )
}

export default Summary
