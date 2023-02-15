import { Button, Row, Stack } from 'react-bootstrap'
import { ArrowLeftShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import TreeCard from '../../components/TreeCard/TreeCard'
import { useTreeContext } from '../../contexts/treesContext'

type TreesType = 'all' | 'users'

type AllTreesProps = {
   treesType: TreesType
}

function AllTrees({ treesType }: AllTreesProps) {
   const { trees, yourTrees } = useTreeContext()

   const treesArr = treesType === 'all' ? trees : yourTrees
   const title =
      treesType === 'all'
         ? 'You can see all trees here'
         : 'You can see your trees here'

   return (
      <main className='p-4'>
         <Stack
            direction='horizontal'
            className='mb-4'
         >
            <Link to='..'>
               <Button
                  variant='primary'
                  className='py-1 px-2'
               >
                  <ArrowLeftShort size={30} />
               </Button>
            </Link>
            <h3 className='mb-0 ms-3'>{title}</h3>
         </Stack>
         <Row
            xs={1}
            md={2}
            lg={3}
         >
            {treesArr.map((tree) => (
               <TreeCard
                  tree={tree}
                  key={tree.id}
               />
            ))}
         </Row>
      </main>
   )
}

export default AllTrees
