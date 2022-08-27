import React from "react";
import logo from "../images/Logo.png";
import computer from "../images/home-picture.png";

function Home() {
  return (
    <div>
      <div className="logo">
        <img alt="logo" src={logo} />
      </div>
      <div className="computer-picture">
        <img alt="pic" src={computer} />
      </div>
      <div className="button-container">
        <button className="btn">ჩანაწერების დამატება</button>
        <button className="btn">ჩანაწერების სია</button>
      </div>
    </div>
  );
}

export default Home;
