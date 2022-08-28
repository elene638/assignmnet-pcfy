import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddList() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState("პოზიცია");
  const [selectTeam, setSelectTeam] = useState(false);
  const [selectPosition, setSelectPosition] = useState(false);
  const [team, setTeam] = useState("თიმი");
  const [isDesktop, setDesktop] = useState(window.innerWidth < 670);
  //const [desktop, setdesktop] = useState(window.innerWidth)
  console.log(window.innerWidth);
  const updateMedia = () => {
    setDesktop(window.innerWidth < 670);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

  const fetchTeams = () => {
    fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data.data));
  };
  React.useEffect(() => {
    fetchTeams();
  }, []);

  const fetchPositions = () => {
    fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((res) => res.json())
      .then((data) => setPositions(data.data));
  };
  React.useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className="desktop">
      <main className={isDesktop ? "collegue-info" : null}>
        <div className={isDesktop ? "header" : "desktop-header"}>
          <div className="arrow-btn">
            <button onClick={() => navigate(-1)} className="arrow-button">
              <span className="arrow left" />
            </button>
          </div>
          <div className="collegues">
            <p className="text">თანამშრომლების ინფო</p>
            {!isDesktop && <p className="text">ლეპტოპის მახასიათებლები</p>}
            {isDesktop && <p className="pages">1/2</p>}
          </div>
        </div>
        <div className="center">
          <div className="form">
            <form>
              <div className="desktop-form">
                <div className="name">
                  <label>სახელი</label>
                  <input type="text" />
                  <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
                </div>
                <div className="surname">
                  <label>გვარი</label>
                  <input type="text" />
                  <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
                </div>
              </div>

              <div
                className="dropdown"
                onClick={() => setSelectTeam(!selectTeam)}
              >
                <div className="dropdown-btn">
                  {team}
                  <i className="arrows down" />
                </div>
                {selectTeam && (
                  <div className="dropdown-content">
                    {teams &&
                      teams.map((team, index) => {
                        return (
                          <button
                            className="dropdown-item"
                            onClick={() => setTeam(team.name)}
                          >
                            {team.name}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
              <div
                className="dropdown"
                onClick={() => setSelectPosition(!selectPosition)}
              >
                <div className="dropdown-btn">
                  {position}
                  <i className="arrows down" />
                </div>
                {selectPosition && (
                  <div className="dropdown-content">
                    {positions &&
                      positions.map((position, index) => {
                        return (
                          <button
                            className="dropdown-item"
                            onClick={() => setPosition(position.name)}
                          >
                            {position.name}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
              <label>მეილი</label>
              <input type="text" />
              <p>უნდა მთავრდებოდეს @redberry.ge-თი</p>
              <label>ტელეფონი ნომერი</label>
              <input type="text" />
              <p>ქართული მობ-ნომერის ფორმატი</p>
            </form>
            <Link to="/list">
              <button className="next-page">შემდეგი</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddList;
