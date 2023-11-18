// FilterBox.js

import React, { useState } from 'react';

const FilterBox = ({ setFilterType, setIsFilterBoxOpen, selectedFilters, setSelectedFilters}) => {
  

  const handleCheckboxChange = (filter) => {
    // Toggle the selected state of the checkbox
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filter)) {
        return prevSelectedFilters.filter((item) => item !== filter);
      } else {
        return [...prevSelectedFilters, filter];
      }
    });
  };

  const handleApplyClick = () => {
    // Pass the selected filters to the parent component
    setFilterType(selectedFilters);
    setIsFilterBoxOpen(false);
  };

  const handleClearClick = () => {
    // Clear the selected filters
    setSelectedFilters([]);
    // Pass an empty array to the parent component to clear filters
    setFilterType([]);
    setIsFilterBoxOpen(false);
  };

  return (
    <div className="filter-box-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={selectedFilters.includes('subscription')}
          onChange={() => handleCheckboxChange('subscription')}
        />
        Subscription
      </label>
      <br />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={selectedFilters.includes('burner')}
          onChange={() => handleCheckboxChange('burner')}
        />
        Burner
      </label>
      <br />
      <button className="action-button" onClick={handleApplyClick}>
        Apply
      </button>
      <button className="action-button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
};

export default FilterBox;
