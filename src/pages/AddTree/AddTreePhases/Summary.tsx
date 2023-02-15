import TreeCard from '../../../components/TreeCard/TreeCard'
import { Tree } from '../../../contexts/treesContext'
import { useUserContext } from '../../../contexts/userContext'
import { TreeForm } from './Info'

type SummaryProps = {
   formTree: TreeForm
}

function Summary({ formTree }: SummaryProps) {
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

   return <TreeCard tree={tree} />
}

export default Summary
