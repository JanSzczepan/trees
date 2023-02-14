import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../contexts/userContext'

function Add() {
   const { user } = useUserContext()

   return (
      <section>
         <h3 className='mb-3'>Be the hero, add the tree...</h3>
         <Link to={user.email ? 'add-tree' : 'login'}>
            <Button
               variant='primary'
               size='lg'
            >
               Add tree
            </Button>
         </Link>
      </section>
   )
}

export default Add
