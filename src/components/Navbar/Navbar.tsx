import { Container, Navbar, Nav, Button, Stack } from 'react-bootstrap'
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
            <Link to='/'>
               <Navbar.Brand>Trees</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
               <Nav className='ms-auto'>
                  {user.email ? (
                     <Stack
                        className='gap-4 text-white'
                        direction='horizontal'
                     >
                        <span>{user.userName}</span>
                        <Button
                           variant='outline-light'
                           onClick={handleLogout}
                        >
                           Logout
                        </Button>
                     </Stack>
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
