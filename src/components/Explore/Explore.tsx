import { Button, Stack } from 'react-bootstrap'
import { ArrowRepeat } from 'react-bootstrap-icons'
import { useTreeContext } from '../../contexts/treesContext'
import TreeCard from '../TreeCard/TreeCard'

function Explore() {
   const { randomTrees, trees, getRandomTrees } = useTreeContext()

   return (
      <section>
         <Stack
            direction='horizontal'
            className='mb-4'
         >
            <h3 className='me-auto'>Explore Trees</h3>
            {trees.length > 3 && (
               <Button
                  variant='primary'
                  onClick={getRandomTrees}
               >
                  <ArrowRepeat size={20} />
               </Button>
            )}
         </Stack>
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
