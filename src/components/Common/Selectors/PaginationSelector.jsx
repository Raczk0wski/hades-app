import React, { useState } from 'react';

const ItemsPerPageSelector = ({ itemsPerPageOptions, onChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const handleChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(selectedItemsPerPage);
    onChange(selectedItemsPerPage);
  };

  return (
    <div>
      <select value={itemsPerPage} onChange={handleChange}>
        {itemsPerPageOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;