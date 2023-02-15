import { useMemo, useState } from 'react'
import { Button, Row, Spinner, Stack } from 'react-bootstrap'
import { ArrowLeftShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Search, { SearchData } from '../../components/Search/Search'
import TreeCard from '../../components/TreeCard/TreeCard'
import { Tree, useTreeContext } from '../../contexts/treesContext'

type TreesType = 'all' | 'users'

type AllTreesProps = {
   treesType: TreesType
}

function AllTrees({ treesType }: AllTreesProps) {
   const [search, setSearch] = useState<SearchData>({
      cathegory: 'name',
      value: '',
   })
   const { trees, yourTrees, isLoading } = useTreeContext()

   const treesArr = useMemo(
      () => (treesType === 'all' ? trees : yourTrees),
      [trees, treesType, yourTrees]
   )
   const title = useMemo(
      () =>
         treesType === 'all'
            ? 'You can see all trees here'
            : 'You can see your trees here',
      [treesType]
   )

   const filteredTrees: Tree[] = useMemo(
      () =>
         treesArr.filter((t) =>
            t[search.cathegory]
               .toLowerCase()
               .trim()
               .includes(search.value.toLowerCase().trim())
         ),
      [search.cathegory, search.value, treesArr]
   )

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
         <Search
            search={search}
            setSearch={setSearch}
         />
         {isLoading ? (
            <div className='py-3 w-100 d-flex justify-content-center'>
               <Spinner
                  animation='border'
                  variant='primary'
               />
            </div>
         ) : (
            <Row
               xs={1}
               md={2}
               lg={3}
            >
               {filteredTrees.map((tree) => (
                  <TreeCard
                     tree={tree}
                     key={tree.id}
                  />
               ))}
            </Row>
         )}
      </main>
   )
}

export default AllTrees
