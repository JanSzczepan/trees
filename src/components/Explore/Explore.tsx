import { Button, Spinner, Stack } from 'react-bootstrap'
import { ArrowRepeat } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useTreeContext } from '../../contexts/treesContext'
import TreeCard from '../TreeCard/TreeCard'

function Explore() {
   const { randomTrees, trees, getRandomTrees, isLoading } = useTreeContext()

   const isMoreThanThree = trees.length > 3

   return (
      <section>
         <Stack
            direction='horizontal'
            className='mb-4'
         >
            <h3 className='me-auto mb-0'>Explore Trees</h3>
            {isMoreThanThree && (
               <Button
                  variant='primary'
                  onClick={getRandomTrees}
               >
                  <ArrowRepeat size={20} />
               </Button>
            )}
         </Stack>
         {isLoading ? (
            <Spinner
               animation='border'
               variant='primary'
            />
         ) : (
            randomTrees.map((tree) => (
               <TreeCard
                  tree={tree}
                  key={tree.id}
               />
            ))
         )}
         {isMoreThanThree && !isLoading && (
            <Link to='/all-trees'>
               <span>See all trees</span>
            </Link>
         )}
      </section>
   )
}

export default Explore
