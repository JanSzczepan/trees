import { useTreeContext } from '../../contexts/treesContext'
import { useUserContext } from '../../contexts/userContext'
import TreeCard from '../TreeCard/TreeCard'

function Yours() {
   const { user } = useUserContext()
   const { yourTrees } = useTreeContext()

   return (
      <section>
         <h3 className='mb-4'>Your Trees</h3>
         {user.email &&
            (yourTrees.length ? (
               yourTrees.map((tree) => (
                  <TreeCard
                     tree={tree}
                     key={tree.id}
                  />
               ))
            ) : (
               <p>You haven&apos;t added any trees yet...</p>
            ))}
         {!user.email && <p>Log in to see you trees...</p>}
      </section>
   )
}

export default Yours
