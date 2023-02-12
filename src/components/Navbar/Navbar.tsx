import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CustomNavbar() {
   return (
      <Navbar
         collapseOnSelect
         expand='lg'
         bg='primary'
         variant='dark'
      >
         <Container>
            <Navbar.Brand href='#home'>Trees</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
               <Nav className='ms-auto'>
                  <Link
                     to='auth'
                     className='me-3'
                  >
                     <Button variant='light'>Login</Button>
                  </Link>
                  <Link to='auth'>
                     <Button variant='outline-light'>Signup</Button>
                  </Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default CustomNavbar
