import { Button, Stack } from 'react-bootstrap'
import { Pen, Trash } from 'react-bootstrap-icons'

function Settings() {
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
         >
            <Trash />
         </Button>
      </Stack>
   )
}

export default Settings
