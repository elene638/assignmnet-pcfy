import React from "react";
import errorIcon from "../images/warning-icon.png";

function LaptopHardDrive({ formListData, handleChange, formDataError }) {
  return (
    <div>
      <label className={formDataError.laptop_hard_drive_type && "error-hint"}>
        მეხსიერების ტიპი
        {formDataError.laptop_hard_drive_type && (
          <img alt="error" src={errorIcon} className="error-icon" />
        )}
      </label>
      <div className="radio-container">
        <div className="ssd">
          <input
            className="radio"
            type="radio"
            id="SSD"
            name="laptop_hard_drive_type"
            checked={formListData.laptop_hard_drive_type === "SSD"}
            value="SSD"
            onChange={handleChange}
          />
          <label htmlFor="SSD">SSD</label>
        </div>
        <div className="hdd">
          <input
            className="radio"
            type="radio"
            id="HDD"
            name="laptop_hard_drive_type"
            checked={formListData.laptop_hard_drive_type === "HDD"}
            value="HDD"
            onChange={handleChange}
          />
          <label htmlFor="HDD">HDD</label>
        </div>
      </div>
    </div>
  );
}

export default LaptopHardDrive;
