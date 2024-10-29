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
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
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
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12'>
      <Card>
        <Card.Img variant="top" src="https://erasmusplay.com/uploads/2558000/2558391/large/0.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
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
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
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
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      </div>
      <div className='col-lg-4 col-md-6 col-sm-12'>
      <Card>
        <Card.Img variant="top" src="https://erasmusplay.com/uploads/2558000/2558391/large/0.webp" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
 
    </div>
    </div>
    </div>
  );
}

export default HomeCards;