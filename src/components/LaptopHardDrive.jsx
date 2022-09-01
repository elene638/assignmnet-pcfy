import React from "react";
import errorIcon from "../images/warning-icon.png";

function LaptopHardDrive({ formListData, handleChange, formDataError }) {
  return (
    <div>
      <label className={formDataError.memory && "error-hint"}>
        მეხსიერების ტიპი
        {formDataError.memory && (
          <img alt="error" src={errorIcon} className="error-icon" />
        )}
      </label>
      <div className="radio-container">
        <div className="ssd">
          <input
            className="radio"
            type="radio"
            id="ssd"
            name="memory"
            checked={formListData.memory === "ssd"}
            value="ssd"
            onChange={handleChange}
          />
          <label htmlFor="ssd">SSD</label>
        </div>
        <div className="hdd">
          <input
            className="radio"
            type="radio"
            id="hdd"
            name="memory"
            checked={formListData.memory === "hdd"}
            value="hdd"
            onChange={handleChange}
          />
          <label htmlFor="hdd">HDD</label>
        </div>
      </div>
    </div>
  );
}

export default LaptopHardDrive;
