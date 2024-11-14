import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaHome, FaBuilding, FaHouseUser, FaPencilAlt } from 'react-icons/fa'; // Icons from React Icons

function CategoryButtons() {
  return (
    <div className='container'>
      <div className='mt-5 row'>
        <h3 className='col-12 col-md-6 mb-3 mb-md-0' style={{ color: '#333', fontWeight: 'bold' }}>Browse By Categories</h3>
        <div className='col-12 col-md-6 d-flex flex-wrap justify-content-md-end'>
          <ButtonGroup className="mb-2 me-2">
            <Button 
              variant="primary" 
              className="d-flex align-items-center category-button"
              style={{ borderRadius: '30px', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaHome className="me-2" />
              All
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mb-2 me-2">
            <Button 
              variant="primary" 
              className="d-flex align-items-center category-button"
              style={{ borderRadius: '30px', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaBuilding className="me-2" />
              Apartments
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mb-2 me-2">
            <Button 
              variant="primary" 
              className="d-flex align-items-center category-button"
              style={{ borderRadius: '30px', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaHouseUser className="me-2" />
              Houses
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mb-2">
            <Button 
              variant="primary" 
              className="d-flex align-items-center category-button"
              style={{ borderRadius: '30px', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaPencilAlt className="me-2" />
              Studios
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <style jsx>{`
        .category-button {
          background-color: #007bff; /* Bootstrap primary color */
          border: none;
          box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2); /* Adding shadow */
        }
        
        .category-button:hover {
          background-color: #0056b3; /* Darken on hover */
        }
      `}</style>
    </div>
  );
}

export default CategoryButtons;
