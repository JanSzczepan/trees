import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

export type CathegoryType = 'name' | 'description' | 'street' | 'city'

const Cathegories: CathegoryType[] = ['name', 'description', 'street', 'city']

export type SearchData = {
   cathegory: CathegoryType
   value: string
}

type SearchProps = {
   search: SearchData
   setSearch: Dispatch<SetStateAction<SearchData>>
}

function Search({ search, setSearch }: SearchProps) {
   const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const option = e.target.value as CathegoryType
      setSearch((prevState) => ({ ...prevState, cathegory: option }))
   }

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch((prevState) => ({ ...prevState, value: e.target.value }))
   }

   return (
      <InputGroup className='mb-3 flex-nowrap'>
         <Form.Control
            placeholder='Search...'
            className='w-100'
            value={search.value}
            onChange={handleInputChange}
         />
         <Form.Select
            className='w-25'
            value={search.cathegory}
            onChange={handleSelectChange}
         >
            {Cathegories.map((category) => (
               <option key={category}>{category}</option>
            ))}
         </Form.Select>
      </InputGroup>
   )
}

export default Search
