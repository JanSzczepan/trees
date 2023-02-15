import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Tree } from '../../contexts/treesContext'
import { useUserContext } from '../../contexts/userContext'
import { User } from '../../functions/getUser'

type TreeCardProps = {
   tree: Tree
}

function TreeCard({ tree }: TreeCardProps) {
   const [treeOwner, setTreeOwner] = useState<User>({
      email: '',
      name: '',
      surname: '',
      userName: '',
      uid: '',
   })
   const { name, description, authorId, street, city } = tree
   const { getUserData } = useUserContext()

   useEffect(() => {
      const getData = async () => {
         const owner = await getUserData(authorId)

         setTreeOwner(owner)
      }

      getData()
   }, [authorId, getUserData])

   return (
      <Card className='mb-3'>
         <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text className='mb-2'>{description}</Card.Text>
            <Card.Text className='mb-2'>
               {street}, {city}
            </Card.Text>
            <footer className='blockquote-footer mt-2 mb-2'>
               <cite title='Source Title'>
                  {treeOwner.email
                     ? `${treeOwner.name} ${treeOwner.surname}`
                     : 'loading...'}
               </cite>
            </footer>
         </Card.Body>
      </Card>
   )
}

export default TreeCard
