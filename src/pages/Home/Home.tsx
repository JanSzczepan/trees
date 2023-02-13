import { Col, Row } from 'react-bootstrap'
import Explore from '../../components/Explore/Explore'

function Home() {
   return (
      <main className='p-4'>
         <Row
            xs={1}
            md={2}
            className='g-5'
         >
            <Col>
               <Explore />
            </Col>
            <Col>
               <h3>Coś</h3>
            </Col>
         </Row>
      </main>
   )
}

export default Home
