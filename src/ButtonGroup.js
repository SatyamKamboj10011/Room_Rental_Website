import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaHome, FaBuilding, FaHouseUser, FaPencilAlt } from 'react-icons/fa'; // Icons from React Icons

function CategoryButtons() {
  return (
    <div className='container'>
    <div className='mt-5  row '>
        <h3 className='col-md-6'>Browse By Categories</h3>
        <div className='col-md-6'>
    <ButtonGroup className="">
      <Button variant="primary" className="d-flex align-items-center">
        <FaHome className="me-2" />
        All
      </Button>
      </ButtonGroup>

      <ButtonGroup className="ms-4">
      <Button variant="primary" className="d-flex align-items-center">
        <FaBuilding className="me-2" />
        Apartments
      </Button>
      </ButtonGroup>

      <ButtonGroup className="ms-4">
      <Button variant="primary" className="d-flex align-items-center">
        <FaHouseUser className="me-2" />
        Houses
      </Button>
      </ButtonGroup>

      <ButtonGroup className="ms-4">
      <Button variant="primary" className="d-flex align-items-center">
        <FaPencilAlt className="me-2" />
        Studios
      </Button>
    </ButtonGroup>
    </div>
    </div>
    </div>
  );
}

export default CategoryButtons;
