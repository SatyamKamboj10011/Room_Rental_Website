import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function CarouselHomePage() {
  return (
    <div class="container"> 
    <Carousel fade>
      <Carousel.Item>
      <img
      src='https://media.karousell.com/media/photos/products/2022/5/18/rent_big_common_room_bishan_st_1652846989_cb2bc9f3.jpg'
      alt="First slide"
      className='d-block w-100'
      style={{ height: '600px', objectFit: 'cover', width: '100%' }} // Best settings for a homepage image
/>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://i.pinimg.com/originals/3d/0f/86/3d0f862d1f7d07f1005e615e0d934b83.png'
          alt="First slide"
          className='d-block w-100'
          style={{height: '600px', objectFit: 'cover', width: '100%' }}/>
        <Carousel.Caption>
        

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://www.offcampuspads.com/wp-content/uploads/2018/10/rooms-for-rent-south-boston.jpg'
          alt="First slide"
          className='d-block w-100'
          style={{height: '600px', objectFit: 'cover', width: '100%' }}/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.

          </p>
          <h1>MADE CHANGES ON THE HOMEPAGE</h1>
          <h2>Room Rental Webdite</h2>
          <h1>Navigation</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div>
    </div>
    
     <InputGroup className="mb-5">
     <Form.Control
       placeholder="Recipient's username"
       aria-label="Recipient's username"
       aria-describedby="basic-addon2"
     />
     <Button variant="outline-secondary" id="button-addon2">
       Button
     </Button>
   </InputGroup>
   </div>
  );
}

export default CarouselHomePage;