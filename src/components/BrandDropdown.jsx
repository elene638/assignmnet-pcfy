import React from "react";

function BrandDropdown({ name, handleBrand }) {
  return (
    <div>
      <button className="dropdown-item" onClick={handleBrand}>
        {name}
      </button>
    </div>
  );
}

export default BrandDropdown;
