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
            <Link
               to='/'
               className='text-decoration-none'
            >
               <Navbar.Brand>Trees</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
               <Nav className='ms-auto'>
                  {user.email ? (
                     <div className='d-flex text-white align-items-start align-items-lg-center flex-column flex-lg-row py-3 py-lg-0'>
                        <span className='me-lg-3 mb-2 mb-lg-0'>
                           {user.userName}
                        </span>
                        <Button
                           variant='outline-light'
                           onClick={handleLogout}
                        >
                           Logout
                        </Button>
                     </div>
                  ) : (
                     <div className='py-3 py-lg-0 d-flex align-items-start align-items-lg-center flex-column flex-lg-row'>
                        <Link
                           to='login'
                           className='me-3 mb-2 mb-lg-0'
                        >
                           <Button variant='light'>Login</Button>
                        </Link>
                        <Link to='signup'>
                           <Button variant='outline-light'>Signup</Button>
                        </Link>
                     </div>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default CustomNavbar
