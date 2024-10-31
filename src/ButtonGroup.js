import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaHome, FaBuilding, FaHouseUser, FaPencilAlt } from 'react-icons/fa'; // Icons from React Icons

function CategoryButtons() {
  return (
    <div className='container'>
      <div className='mt-5 row'>
        <h3 className='col-12 col-md-6 mb-3 mb-md-0'>Browse By Categories</h3>
        <div className='col-12 col-md-6 d-flex flex-wrap justify-content-md-end'>
          <ButtonGroup className="mb-2 me-2">
            <Button variant="primary" className="d-flex align-items-center">
              <FaHome className="me-2" />
              All
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mb-2 me-2">
            <Button variant="primary" className="d-flex align-items-center">
              <FaBuilding className="me-2" />
              Apartments
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mb-2 me-2">
            <Button variant="primary" className="d-flex align-items-center">
              <FaHouseUser className="me-2" />
              Houses
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mb-2">
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
