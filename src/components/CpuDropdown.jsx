import React from "react";

function CpuDropdown({ name, handleCpu }) {
  return (
    <div>
      <button className="dropdown-item" onClick={handleCpu}>
        {name}
      </button>
    </div>
  );
}

export default CpuDropdown;
