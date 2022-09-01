import React from "react";
import errorIcon from "../images/warning-icon.png";

function LaptopCondition({ formListData, handleChange, formDataError }) {
  return (
    <div>
      <label className={formDataError.laptopCondition && "error-hint"}>
        ლეპტოპის მდგომარეობა
        {formDataError.laptopCondition && (
          <img alt="error" src={errorIcon} className="error-icon" />
        )}
      </label>
      <div className="radio-container">
        <div className="new">
          <input
            className="radio"
            type="radio"
            id="new"
            name="laptopCondition"
            checked={formListData.laptopCondition === "new"}
            value="new"
            onChange={handleChange}
          />
          <label htmlFor="new">ახალი</label>
        </div>
        <div className="old">
          <input
            className="radio"
            type="radio"
            id="old"
            name="laptopCondition"
            checked={formListData.laptopCondition === "old"}
            value="old"
            onChange={handleChange}
          />
          <label htmlFor="old">მეორადი</label>
        </div>
      </div>
    </div>
  );
}

export default LaptopCondition;
