import React from "react";

function PositionDropdown({ name, handlePosition }) {
  return (
    <div>
      <button className="dropdown-item" onClick={handlePosition}>
        {name}
      </button>
    </div>
  );
}

export default PositionDropdown;
