import React from "react";
import img from "../images/camera.png";
import { useNavigate } from "react-router-dom";

function Laptop() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="see-laptop">
        <img className="laptop" alt="laptop" src={img} />
        <div className="description">
          <p>nameaaaaaaaaaas</p>
          <p className="another-one">name</p>
          <button
            href="#"
            className="see-more"
            onClick={() => {
              navigate("/eachLaptop");
            }}
          >
            მეტის ნახვა
          </button>
        </div>
      </div>
    </div>
  );
}

export default Laptop;
