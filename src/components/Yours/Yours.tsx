import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTreeContext } from '../../contexts/treesContext'
import { useUserContext } from '../../contexts/userContext'
import TreeCard from '../TreeCard/TreeCard'

function Yours() {
   const { user } = useUserContext()
   const { yourTrees, isLoading } = useTreeContext()

   const treesArr = yourTrees.slice(0, 3)
   const isMoreThanThree = yourTrees.length > 3

   return (
      <section>
         <h3 className='mb-4'>Your Trees</h3>
         {isLoading && (
            <Spinner
               animation='border'
               variant='primary'
            />
         )}
         {user.email &&
            !isLoading &&
            (yourTrees.length ? (
               <>
                  {treesArr.map((tree) => (
                     <TreeCard
                        tree={tree}
                        key={tree.id}
                     />
                  ))}
                  {isMoreThanThree && !isLoading && (
                     <Link to='/your-trees'>
                        <span>Check out your trees</span>
                     </Link>
                  )}
               </>
            ) : (
               <p>You haven&apos;t added any trees yet...</p>
            ))}
         {!user.email && !isLoading && <p>Log in to see you trees...</p>}
      </section>
   )
}

export default Yours
