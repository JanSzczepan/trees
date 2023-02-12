import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../Navbar'

describe('Navbar', () => {
   test('display brand link', () => {
      render(<Navbar />, { wrapper: BrowserRouter })

      const brandLink = screen.getByRole('link', { name: 'Trees' })

      expect(brandLink).toBeInTheDocument()
   })
})
