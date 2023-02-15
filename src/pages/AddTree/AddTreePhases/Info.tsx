import { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'

export type TreeForm = {
   name: string
   description: string
   street: string
   city: string
}

type InfoProps = {
   tree: TreeForm
   handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Info({ tree, handleOnChange }: InfoProps) {
   return (
      <>
         <Form.Group
            className='mb-3'
            controlId='name'
         >
            <Form.Label>Name</Form.Label>
            <Form.Control
               type='text'
               placeholder='Enter tree name'
               name='name'
               value={tree.name}
               onChange={handleOnChange}
            />
         </Form.Group>
         <Form.Group
            className='mb-3'
            controlId='description'
         >
            <Form.Label>Description</Form.Label>
            <Form.Control
               as='textarea'
               rows={3}
               placeholder='Enter tree description'
               name='description'
               value={tree.description}
               onChange={handleOnChange}
            />
         </Form.Group>
      </>
   )
}

export default Info
