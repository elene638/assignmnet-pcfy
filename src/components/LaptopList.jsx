import React, { useState } from "react";
import Laptop from "./Laptop";
import { useNavigate } from "react-router-dom";

function LaptopList() {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const fetchPositions = () => {
    fetch(
      "https://pcfy.redberryinternship.ge/api/laptops?token=722b8016d1dacb1a5e1d906de785c4f2"
    )
      .then((res) => res.json())
      .then((data) => setFormData(data.data));
  };
  React.useEffect(() => {
    fetchPositions();
  }, []);

  console.log(formData);

  return (
    <div className="main-laptop-list" style={{ backgroundColor: "white" }}>
      <header>
        <div className="arrow-btn">
          <button
            className="arrow-button"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="arrow left" />
          </button>
        </div>
        <div className="laptop-list">
          <p>ჩანაწერების სია</p>
        </div>
      </header>
      <div className="laptop-container">
        {formData &&
          formData.map((form, index) => {
            return (
              <Laptop
                key={index}
                laptopName={form.laptop.name}
                userName={form.user.name}
                userSurname={form.user.surname}
                laptopImage={form.laptop.image}
                id={form.laptop.id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default LaptopList;
