import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaClock } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';


function HeaderAndFooterExample() {
  return (
    <div className=''>
    <div className='container bg-light'>
    
    <Card className="text-center mt-4" style={{height:'200px'}}>
     
      <Card.Body className='text-center' style={{display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',}}>
        <Card.Title><FaShield className='text-primary'/>
        <br/>Verified Listings</Card.Title>
        <Card.Text>
        All our listings are verified and trusted by thousands of renters
        </Card.Text>
        </Card.Body>
    </Card>

    <Card className="text-center mt-4" style={{height:'200px'}}>
     
     <Card.Body className='text-center' style={{display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',}}>
       <Card.Title><FaClock className='text-primary'/>
       <br/>24/7 Support</Card.Title>
       <Card.Text>
       Team Support is also  available 24/7 to help you with any questions or concerns.

       </Card.Text>
       </Card.Body>
   </Card>

   <Card className="text-center mt-4" style={{height:'200px'}}>
     
     <Card.Body className='text-center' style={{display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',}}>
       <Card.Title><FaShield className='text-primary'/>
       <br/>Verified Listings</Card.Title>
       <Card.Text>
       All our listings are verified and trusted by thousands of renters
       </Card.Text>
       </Card.Body>
   </Card>
    </div>
    </div>
  )
}

export default HeaderAndFooterExample;