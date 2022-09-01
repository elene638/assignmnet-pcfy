import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import footerLogo from "../images/footer-logo.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TeamDropdown from "./TeamDropdown";
import PositionDropdown from "./PositionDropdown";

function AddList() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState("პოზიცია");
  const [selectTeam, setSelectTeam] = useState(false);
  const [selectPosition, setSelectPosition] = useState(false);
  const [team, setTeam] = useState("თიმი");
  const [isDesktop, setDesktop] = useState(window.outerWidth);
  const [newPosition, setNewPosition] = useState();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    team: "",
    position: "",
    email: "",
    phoneNumber: "",
  });
  const [formDataError, setFormDataError] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);

  //console.log(formData);

  // useEffect(() => {
  //   setFormData(JSON.parse(localStorage.getItem("formData")));
  // }, []);

  const collegueIndexSelector = useSelector(
    (state) => state.index.collegueIndex
  );

  const dispatch = useDispatch();

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
      .then((data) => setTeams(data.data));
  };
  React.useEffect(() => {
    fetchTeams();
  }, []);

  //Fetch postions

  const fetchPositions = () => {
    fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((res) => res.json())
      .then((data) => setPositions(data.data));
  };
  React.useEffect(() => {
    fetchPositions();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
    //localStorage.setItem("formData", JSON.stringify(formData));
  }

  //console.log(formData);
  function handleSubmit(event) {
    event.preventDefault();
    setFormDataError(validate(formData));
    if (formDataError) {
      navigate("/list");
    }

    localStorage.setItem("formData", JSON.stringify(formData));
    //setIsSubmit(true);
    const token = "e113a24d23bb6c990b531705e476123f";

    const requestOptions = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: { token },
      },
      body: JSON.stringify(formData),
    })
      .then((res) => console.log(res))

      .catch((e) => console.log("e", e));

    //var responseClone;
    // fetch(
    //   "https://pcfy.redberryinternship.ge/api/laptop/create",
    //   requestOptions
    // )
    //   .then(function (response) {
    //     responseClone = response.clone(); // 2
    //     return response.json();
    //   })
    //   .then(
    //     function (data) {
    //       console.log(data);
    //     },
    //     function (rejectionReason) {
    //       // 3
    //       console.log(
    //         "Error parsing JSON from response:",
    //         rejectionReason,
    //         responseClone
    //       ); // 4
    //       responseClone
    //         .text() // 5
    //         .then(function (bodyText) {
    //           console.log(
    //             "Received the following instead of valid JSON:",
    //             bodyText
    //           ); // 6
    //         });
    //     }
    //   );
  }

  //e113a24d23bb6c990b531705e476123f

  const validate = (values) => {
    const errors = {};
    const regexAlphabet = /^[ა-ჰ]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "needed";
    } else if (!regexAlphabet.test(values.name)) {
      errors.name = "ingeorgian";
    } else if (values.name.length < 2) {
      errors.name = "small";
    }
    if (!values.lastName) {
      errors.lastName = "needed";
    } else if (!regexAlphabet.test(values.lastName)) {
      errors.lastName = "in georgian";
    } else if (values.lastName.length < 2) {
      errors.lastName = "more than two";
    }
    if (!values.team) {
      errors.team = "needed";
    }
    if (!values.position) {
      errors.position = "needed";
    }
    if (!values.email) {
      errors.email = "needed";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "in email";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = true;
    }
    return errors;
  };

  function handleTeam(id, name) {
    setTeam(name);
    const filteredPosition = positions.filter((pos) => pos.team_id === id);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        team: id,
      };
    });

    setNewPosition(filteredPosition);
  }
  //console.log(newPosition);
  function handlePosition(name, id) {
    setPosition(name);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        position: id,
      };
    });
  }

  const eachTeam = teams.map((team, index) => (
    <TeamDropdown
      key={index}
      name={team.name}
      id={team.id}
      handleTeam={() => handleTeam(team.id, team.name)}
    />
  ));

  const eachPosition =
    newPosition &&
    newPosition.map((position, index) => (
      <PositionDropdown
        key={index}
        name={position.name}
        id={position.id}
        formDataError={formDataError}
        handlePosition={() => handlePosition(position.name, position.id)}
      />
    ));

  return (
    <div className="desktop">
      <main className={isDesktop < 670 ? "collegue-info" : null}>
        <div className={isDesktop < 670 ? "header" : "desktop-header"}>
          <div className="arrow-btn">
            <button
              onClick={() => {
                navigate("/");
                setFormData({});
              }}
              className="arrow-button"
            >
              <span className="arrow left" />
            </button>
          </div>
          <div className="collegues">
            <p
              className={
                collegueIndexSelector === "1" ? "active-text text" : "text"
              }
            >
              თანამშრომლების ინფო
            </p>
            {isDesktop > 670 && (
              <p
                className={
                  collegueIndexSelector === "2" ? "active-text text" : "text"
                }
              >
                ლეპტოპის მახასიათებლები
              </p>
            )}
            {isDesktop < 670 && (
              <p className="pages">{collegueIndexSelector}/2</p>
            )}
          </div>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="desktop-form">
              <div className="name">
                <label>სახელი</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="გრიშა"
                  className={formDataError.name ? "error" : null}
                />
                <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
              </div>
              <div className="surname">
                <label>გვარი</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="ბაგრატიონი"
                  onChange={handleChange}
                  className={formDataError.lastName ? "error" : null}
                />
                <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
              </div>
            </div>
            <div
              className={
                formDataError.phoneNumber
                  ? "error dropdown first"
                  : "dropdown first"
              }
              onClick={() => setSelectTeam(!selectTeam)}
            >
              <div className="dropdown-btn">
                <p>{team}</p>

                <i className="arrows down" />
              </div>

              {selectTeam && <div className="dropdown-content">{eachTeam}</div>}
            </div>
            <div
              className={
                formDataError.phoneNumber
                  ? "error dropdown second"
                  : "dropdown second"
              }
              onClick={() => setSelectPosition(!selectPosition)}
            >
              <div className="dropdown-btn">
                <p>{position}</p>
                <i className="arrows down" />
              </div>
              {selectPosition && (
                <div className="dropdown-content">{eachPosition}</div>
              )}
            </div>
            <label>მეილი</label>
            <input
              type="text text-desktop"
              name="email"
              placeholder="grish666@redberry.ge"
              value={formData.email}
              onChange={handleChange}
              className={formDataError.email ? "error" : null}
            />
            <p className="mail-validation">უნდა მთავრდებოდეს @redberry.ge-თი</p>
            <label>ტელეფონის ნომერი</label>
            <input
              type="text text-desktop"
              name="phoneNumber"
              placeholder="+995 598 00 07 01"
              value={formData.phoneNumber}
              className={formDataError.phoneNumber ? "error" : null}
              onChange={handleChange}
            />
            <p className="phone-validation">ქართული მობ-ნომერის ფორმატი</p>
            {/* <Link to="/list"></Link> */}
            <button type="submit" className="next-page">
              შემდეგი
            </button>
          </form>
        </div>
        <div className="footer-logo-container">
          {isDesktop > 670 && (
            <img className="footer-logo" alt="footer-logo" src={footerLogo} />
          )}
        </div>
      </main>
    </div>
  );
}

export default AddList;

//const config = { headers: { Authorization: token } };
// const passedValue = {
//   key: formData,
// };
// axios
//   .post("https://pcfy.redberryinternship.ge/api/laptop/create", formData, {
//     headers: {
//       Authorization: { token },
//       "Content-Type": "application/json",
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
