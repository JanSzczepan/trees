import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../contexts/userContext'

function CustomNavbar() {
   const { user, logout } = useUserContext()

   const handleLogout = () => logout()

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
                  {user.email ? (
                     <Button
                        variant='outline-light'
                        onClick={handleLogout}
                     >
                        Logout
                     </Button>
                  ) : (
                     <>
                        <Link
                           to='login'
                           className='me-3'
                        >
                           <Button variant='light'>Login</Button>
                        </Link>
                        <Link to='signup'>
                           <Button variant='outline-light'>Signup</Button>
                        </Link>
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default CustomNavbar
