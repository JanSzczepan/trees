import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import CustomNavbar from './components/Navbar/Navbar'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'

function App() {
   return (
      <div className='App'>
         <CustomNavbar />
         <Container>
            <Routes>
               <Route
                  path='/'
                  element={<Home />}
               />
               <Route
                  path='/login'
                  element={<Auth authState='login' />}
               />
               <Route
                  path='/signup'
                  element={<Auth authState='signup' />}
               />
            </Routes>
         </Container>
      </div>
   )
}

export default App
