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
            id="ssd"
            name="laptop_hard_drive_type"
            checked={formListData.laptop_hard_drive_type === "ssd"}
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
            name="laptop_hard_drive_type"
            checked={formListData.laptop_hard_drive_type === "hdd"}
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
