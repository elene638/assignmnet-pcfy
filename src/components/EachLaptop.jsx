import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

function EachLaptop() {
  const navigate = useNavigate();
  const location = useLocation();
  const [team, setTeam] = useState();
  const [position, setPosition] = useState();
  const [brand, setBrands] = useState();
  const [isDesktop, setDesktop] = useState(window.outerWidth);

  const { eachLaptop } = location.state;

  console.log(team);

  const updateMedia = () => {
    setDesktop(window.outerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

  //Fetch teams

  const fetchTeams = () => {
    fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((res) => res.json())
      .then((data) => setTeam(data.data));
  };
  React.useEffect(() => {
    fetchTeams();
  }, []);

  //Fetch postions

  const fetchPositions = () => {
    fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((res) => res.json())
      .then((data) => setPosition(data.data));
  };
  React.useEffect(() => {
    fetchPositions();
  }, []);

  //Fetch brands
  const fetchBrands = () => {
    fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
  };
  React.useEffect(() => {
    fetchBrands();
  }, []);

  const specificTeam =
    team && team.find((item) => item.id === eachLaptop.user.team_id);

  const specificPosition =
    position &&
    position.find((item) => item.id === eachLaptop.user.position_id);

  const specificBrand =
    brand && brand.find((item) => item.id === eachLaptop.laptop.brand_id);

  console.log("team", specificTeam);

  return (
    <div className={isDesktop < 1000 ? "eachlaptop-container" : null}>
      <header className="eachlaptop-header">
        <div className="arrow-btn">
          <button
            className="arrow-button"
            onClick={() => navigate("/laptopList")}
          >
            <span className="arrow left" />
          </button>
        </div>
        <div className="laptop-list">
          <p>ლეპტოპის ინფო</p>
        </div>
      </header>
      <div className="main-laptop">
        <div className="information information-desktop">
          <div className="laptop-information">
            <img
              alt="leptop"
              src={`https://pcfy.redberryinternship.ge/${eachLaptop.laptop.image}`}
            />
          </div>
          <div className="details-desktop">
            <div className="details">
              <h3>სახელი:</h3>
              <p>
                {eachLaptop.user.name} {eachLaptop.user.surname}
              </p>
            </div>
            <div className="details">
              <h3>თიმი:</h3>
              <p>{specificTeam?.name}</p>
            </div>
            <div className="details">
              <h3>პოზიცია:</h3>
              <p>{specificPosition?.name}</p>
            </div>
            <div className="details">
              <h3>მეილი:</h3>
              <p>{eachLaptop.user.email}</p>
            </div>
            <div className="details">
              <h3>ტელ. ნომერი:</h3>
              <p>{eachLaptop.user.phone_number}</p>
            </div>
          </div>
        </div>
        <hr className="eachlaptop-hr" />
        <div className="information">
          <div className="information-one">
            <div className="details">
              <h3>ლეპტოპის სახელი:</h3>
              <p>{eachLaptop.laptop.name}</p>
            </div>
            <div className="details">
              <h3>ლეპტოპის ბრენდი:</h3>
              <p>{specificBrand?.name}</p>
            </div>
            <div className="details">
              <h3>RAM:</h3>
              <p>{eachLaptop.laptop.ram}</p>
            </div>
            <div className="details">
              <h3>მეხსიერების ტიპი:</h3>
              <p>{eachLaptop.laptop.hard_drive_type}</p>
            </div>
          </div>

          <div className="information-two">
            <div className="details">
              <h3>CPU:</h3>
              <p>{eachLaptop.laptop.cpu.name}</p>
            </div>
            <div className="details">
              <h3>CPU-ს ბირთვი:</h3>
              <p>{eachLaptop.laptop.cpu.cores}</p>
            </div>
            <div className="details">
              <h3>CPU-ს ნაკადი:</h3>
              <p>{eachLaptop.laptop.cpu.threads}</p>
            </div>
          </div>
        </div>
        <hr className="eachlaptop-hr" />
        <div className="information third-part-information">
          <div className="information-three">
            <div className="details">
              <h3>მდგომარეობა:</h3>
              <p>{eachLaptop.laptop.state}</p>
            </div>
            <div className="details">
              <h3>ლეპტოპის ფასი:</h3>
              <p>{eachLaptop.laptop.price}</p>
            </div>
          </div>

          <div className="details details-desk">
            <h3>შეძენის რიცხვი:</h3>
            <p>{eachLaptop.laptop.purchase_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachLaptop;
