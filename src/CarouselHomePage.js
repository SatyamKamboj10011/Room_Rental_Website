import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

function CarouselHomePage() {
  return (
    <div className="container">
      <div className="row text-light text-center">
        {/* Left Column for other content */}
        <div
          className="col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center"
          style={{ borderRadius: '10px', padding: '20px' }}
        >
          <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>
            Unlock the Door to Your Perfect Space.
          </h2>
          <p className="mb-3" style={{ fontSize: '1.2rem' }}>
          Your Next Room is Waiting – Start Searching Today.
          </p>

     
          <Card body className="" style={{ width: '100%' }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">🗺️</InputGroup.Text>
              <Form.Control
                placeholder="Location"
                aria-label="Location"
                aria-describedby="basic-addon2"
              />

        
              <FloatingLabel controlId="floatingSelectGrid" label="💵">
                <Form.Select aria-label="Floating label select example">
                  <option>Price Range</option>
                  <option value="1">$200-$400</option>
                  <option value="2">$400-$600</option>
                  <option value="3">$600-$1000</option>
                  <option value ="4">$1000-Above</option>
                </Form.Select>
              </FloatingLabel>

              <Button variant="primary" className="ms-2" style={{borderRadius:'10px'}}>
                Search ➡️
              </Button>
            </InputGroup>
          </Card>
        </div>

   
        <div className="col-md-6">
          <Carousel fade className="" style={{ marginLeft: 'auto' }}>
            <Carousel.Item>
              <img
                src="https://media.karousell.com/media/photos/products/2022/5/18/rent_big_common_room_bishan_st_1652846989_cb2bc9f3.jpg"
                alt="First slide"
                className="d-block w-100"
                style={{ height: '512px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://i.pinimg.com/originals/3d/0f/86/3d0f862d1f7d07f1005e615e0d934b83.png"
                alt="Second slide"
                className="d-block w-100"
                style={{ height: '512px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://www.offcampuspads.com/wp-content/uploads/2018/10/rooms-for-rent-south-boston.jpg"
                alt="Third slide"
                className="d-block w-100"
                style={{ height: '512px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Carousel.Caption>
                {/* <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CarouselHomePage;
