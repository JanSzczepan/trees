import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Add() {
   return (
      <section>
         <h3 className='mb-3'>Be the hero, add the tree...</h3>
         <Link to='add-tree'>
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
