import React, { useState, useEffect } from "react";
import logo from "../images/Logo.png";
import computer from "../images/home-picture.png";
import computerDesktop from "../images/home-picture-desktop.png";
import { Link } from "react-router-dom";

function Home() {
  const [isDesktop, setDesktop] = useState(window.outerWidth);

  const updateMedia = () => {
    setDesktop(window.outerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

  return (
    <div className="home-page">
      <div className="logo">
        <img alt="logo" className="logo-picture" src={logo} />
      </div>
      <div className="picture">
        <img
          className={isDesktop < 670 ? "computer-picture " : "computer"}
          alt="pic"
          src={isDesktop < 670 ? computer : computerDesktop}
        />
      </div>

      <div className="button-container">
        <Link to="/addList">
          <button className="btn-add">ჩანაწერების დამატება</button>
        </Link>
        <button className="btn-show">ჩანაწერების სია</button>
      </div>
    </div>
  );
}

export default Home;
