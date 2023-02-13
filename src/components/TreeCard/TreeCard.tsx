import { Card } from 'react-bootstrap'
import { Tree } from '../../contexts/treesContext'

type TreeCardProps = {
   tree: Tree
}

function TreeCard({ tree }: TreeCardProps) {
   const { name, description, authorId, street, city } = tree

   return (
      <Card>
         <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text className='mb-2'>{description}</Card.Text>
            <Card.Text className='mb-2'>
               {street}, {city}
            </Card.Text>
            <footer className='blockquote-footer mt-2 mb-2'>
               <cite title='Source Title'>{authorId}</cite>
            </footer>
         </Card.Body>
      </Card>
   )
}

export default TreeCard
