import { useTreeContext } from '../../contexts/treesContext'
import TreeCard from '../TreeCard/TreeCard'

function Explore() {
   const { randomTrees } = useTreeContext()

   return (
      <section>
         <h3 className='mb-4'>Explore Trees</h3>
         {randomTrees.map((tree) => (
            <TreeCard
               tree={tree}
               key={tree.id}
            />
         ))}
      </section>
   )
}

export default Explore
