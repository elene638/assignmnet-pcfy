import React from "react";
import Laptop from "./Laptop";

function LaptopList() {
  return (
    <div className="main-laptop-list" style={{ backgroundColor: "white" }}>
      <header>
        <div className="arrow-btn">
          <button className="arrow-button">
            <span className="arrow left" />
          </button>
        </div>
        <div className="laptop-list">
          <p>ჩანაწერების სია</p>
        </div>
      </header>
      <div className="laptop-container">
        <Laptop />
        <Laptop />
        <Laptop />
        <Laptop />
        <Laptop />
      </div>
    </div>
  );
}

export default LaptopList;
