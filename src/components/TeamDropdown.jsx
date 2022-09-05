import React from "react";
function TeamDropdown({ name, handleTeam }) {
  return (
    <div>
      <button className="dropdown-item" onClick={handleTeam}>
        {name}
      </button>
    </div>
  );
}

export default TeamDropdown;
