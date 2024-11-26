// src/ButtonGroup.js
import React from 'react';
import Button from 'react-bootstrap/Button';

function CategoryButtons({ onCategoryClick }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <Button variant="outline-primary" onClick={() => onCategoryClick('Room')} style={{ margin: '0 10px' }}>
        Room
      </Button>
      <Button variant="outline-primary" onClick={() => onCategoryClick('Apartment')} style={{ margin: '0 10px' }}>
        Apartment
      </Button>
      <Button variant="outline-primary" onClick={() => onCategoryClick('Studio')} style={{ margin: '0 10px' }}>
        Studio
      </Button>
      <Button variant="outline-primary" onClick={() => onCategoryClick('')} style={{ margin: '0 10px' }}>
        All Types
      </Button>
    </div>
  );
}

export default CategoryButtons;
