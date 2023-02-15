import { ChangeEvent } from 'react'
import { Form, Stack } from 'react-bootstrap'
import { TreeForm } from './Info'

type LocationProps = {
   tree: TreeForm
   handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Location({ tree, handleOnChange }: LocationProps) {
   return (
      <Stack
         direction='horizontal'
         gap={3}
      >
         <Form.Group
            className='w-100'
            controlId='street'
         >
            <Form.Label>Street</Form.Label>
            <Form.Control
               type='text'
               placeholder='Enter street address'
               name='street'
               value={tree.street}
               onChange={handleOnChange}
            />
         </Form.Group>
         <Form.Group
            className='w-100'
            controlId='city'
         >
            <Form.Label>City</Form.Label>
            <Form.Control
               type='text'
               placeholder='Enter city'
               name='city'
               value={tree.city}
               onChange={handleOnChange}
            />
         </Form.Group>
      </Stack>
   )
}

export default Location
