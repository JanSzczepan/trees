import { Button, Stack } from 'react-bootstrap'
import { Pen, Trash } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useTreeContext } from '../../contexts/treesContext'

type SettingsProps = {
   id: string
}

function Settings({ id }: SettingsProps) {
   const { trees, deleteTree, setTreeToUpdate, isLoading } = useTreeContext()

   const navigate = useNavigate()

   const handleEdit = () => {
      setTreeToUpdate(trees.find((t) => t.id === id)!)
      navigate('update-tree')
   }

   return (
      <Stack gap={1}>
         <Button
            variant='outline-primary'
            className='py-1 px-2'
            onClick={handleEdit}
         >
            <Pen />
         </Button>
         <Button
            variant='outline-danger'
            className='py-1 px-2'
            onClick={() => deleteTree(id)}
            disabled={isLoading}
         >
            <Trash />
         </Button>
      </Stack>
   )
}

export default Settings
