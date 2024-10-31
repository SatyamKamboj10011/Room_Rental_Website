import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function HomeCards() {
  return (
    <div className="container mt-5">
      <div className='row g-4'>
        <div className='col-lg-4 col-md-6 col-sm-12'>
  
      <Card>
        <Card.Img variant="top" src="https://erasmusplay.com/uploads/2558000/2558391/large/0.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
          This card has supporting text below as a natural lead-in to
          additional content.{' '}
          </Card.Text>
        </Card.Body>
        
      </Card>
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12'>
      <Card>
        <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.CrjVmMFLy0zcqFAR-5L6pgHaFj?rs=1&pid=ImgDetMain" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
       
      </Card>
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12'>
      <Card>
        <Card.Img variant="top" src="https://d1bvpoagx8hqbg.cloudfront.net/originals/hanoi-cheap-single-rooms-rent-6454453e9fda255b32a75ca976341ef7.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
          This card has supporting text below as a natural lead-in to
          additional content.{' '}
          </Card.Text>
        </Card.Body>
       
      </Card>
 
    </div>
    </div>

    {/* next line */}
    <div className='row g-4'>
        <div className='col-lg-4 col-md-6 col-sm-12'>
  
      <Card>
        <Card.Img variant="top" src="https://erasmusplay.com/uploads/2558000/2558391/large/0.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
          This card has supporting text below as a natural lead-in to
          additional content.{' '}
          </Card.Text>
        </Card.Body>
       
      </Card>
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12'>
      <Card>
        <Card.Img variant="top" src="https://erasmusplay.com/uploads/2558000/2558391/large/0.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        
      </Card>
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12'>
      <Card>
        <Card.Img variant="top" src="https://erasmusplay.com/uploads/2558000/2558391/large/0.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
          This card has supporting text below as a natural lead-in to
          additional content.{' '}
          </Card.Text>
        </Card.Body>
      
      </Card>
 
    </div>
    </div>
    </div>
  );
}

export default HomeCards;