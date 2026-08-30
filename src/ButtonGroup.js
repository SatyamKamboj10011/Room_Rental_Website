// src/ButtonGroup.js
import React from 'react';

const TYPES = ['Room', 'Apartment', 'Studio'];

function CategoryButtons({ onCategoryClick, selectedType }) {
  return (
    <>
      {TYPES.map((type) => (
        <button
          key={type}
          type="button"
          className={`category-pill ${selectedType === type ? 'active' : ''}`}
          onClick={() => onCategoryClick(type)}
        >
          {type}
        </button>
      ))}
    </>
  );
}

export default CategoryButtons;
