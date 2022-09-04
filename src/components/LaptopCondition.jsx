import React from "react";
import errorIcon from "../images/warning-icon.png";

function LaptopCondition({ formListData, handleChange, formDataError }) {
  return (
    <div>
      <label className={formDataError.laptop_state && "error-hint"}>
        ლეპტოპის მდგომარეობა
        {formDataError.laptop_state && (
          <img alt="error" src={errorIcon} className="error-icon" />
        )}
      </label>
      <div className="radio-container">
        <div className="new">
          <input
            className="radio"
            type="radio"
            id="new"
            name="laptop_state"
            checked={formListData.laptop_state === "new"}
            value="new"
            onChange={handleChange}
          />
          <label htmlFor="new">ახალი</label>
        </div>
        <div className="old">
          <input
            className="radio"
            type="radio"
            id="used"
            name="laptop_state"
            checked={formListData.laptop_state === "used"}
            value="used"
            onChange={handleChange}
          />
          <label htmlFor="used">მეორადი</label>
        </div>
      </div>
    </div>
  );
}

export default LaptopCondition;
