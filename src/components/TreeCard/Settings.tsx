import { Button, Stack } from 'react-bootstrap'
import { Pen, Trash } from 'react-bootstrap-icons'
import { useTreeContext } from '../../contexts/treesContext'

type SettingsProps = {
   id: string
}

function Settings({ id }: SettingsProps) {
   const { deleteTree, isLoading } = useTreeContext()

   return (
      <Stack gap={1}>
         <Button
            variant='outline-primary'
            className='py-1 px-2'
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
