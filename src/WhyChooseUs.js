import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaShield } from 'react-icons/fa6';


function HeaderAndFooterExample() {
  return (
    <Card className="text-center f" style={{height:'200px'}}>
     
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
  )
}

export default HeaderAndFooterExample;