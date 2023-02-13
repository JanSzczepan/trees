import { Col, Row } from 'react-bootstrap'
import Explore from '../../components/Explore/Explore'
import Yours from '../../components/Yours/Yours'
import { useUserContext } from '../../contexts/userContext'

function Home() {
   const { user } = useUserContext()

   return (
      <main className='p-4'>
         <h3 className='mb-5'>Hello, {user.name}</h3>
         <Row
            xs={1}
            md={2}
            className='g-5'
         >
            <Col>
               <Explore />
            </Col>
            <Col>
               <Yours />
            </Col>
         </Row>
      </main>
   )
}

export default Home
