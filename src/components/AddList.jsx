import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import footerLogo from "../images/footer-logo.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TeamDropdown from "./TeamDropdown";
import PositionDropdown from "./PositionDropdown";
//import { addListSchema } from "../Validations/AddListValidation";

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
    surname: "",
    team_id: "",
    position_id: "",
    email: "",
    phone_number: "",
  });
  const [formDataError, setFormDataError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    //setFormDataError(validate(formData));
    //setIsSubmit(true);
    //navigate("/list");

    localStorage.setItem("formData", JSON.stringify(formData));

    const token = "e113a24d23bb6c990b531705e476123f";

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
      redirect: "follow",
    };

    // axios
    //   .post("https://pcfy.redberryinternship.ge/api/laptop/create", formData, {
    //     headers: headers,
    //   })
    //   .then((response) => console.log(response));

    console.log(JSON.stringify(formData));

    fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

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
    const regexPhone = /^\+\995\d{9}?/g;
    if (!values.name) {
      errors.name = "needed";
    } else if (!regexAlphabet.test(values.name)) {
      errors.name = "ingeorgian";
    } else if (values.name.length < 2) {
      errors.name = "small";
    }
    if (!values.surname) {
      errors.surname = "needed";
    } else if (!regexAlphabet.test(values.surname)) {
      errors.surname = "in georgian";
    } else if (values.surname.length < 2) {
      errors.surname = "more than two";
    }
    if (!values.team_id) {
      errors.team_id = "needed";
    }
    if (!values.position_id) {
      errors.position_id = "needed";
    }
    if (!values.email) {
      errors.email = "needed";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "in email";
    }
    if (!values.phone_number) {
      errors.phone_number = true;
    } else if (!regexPhone.test(values.phone_number)) {
      errors.phone_number = "inccorect number";
    }
    return errors;
  };

  function handleTeam(id, name) {
    setTeam(name);
    const filteredPosition = positions.filter((pos) => pos.team_id === id);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        team_id: id,
      };
    });

    setNewPosition(filteredPosition);
  }

  function handlePosition(name, id) {
    setPosition(name);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        position_id: id,
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
                <label className={formDataError.name && "error-hint"}>
                  სახელი
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="გრიშა"
                  className={formDataError.name ? "error" : null}
                />
                <p className={formDataError.name && "error-hint"}>
                  მინიმუმ 2 სიმბოლო, ქართული ასოები
                </p>
              </div>
              <div className="surname">
                <label className={formDataError.surname && "error-hint"}>
                  გვარი
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  placeholder="ბაგრატიონი"
                  onChange={handleChange}
                  className={formDataError.surname ? "error" : null}
                />
                <p className={formDataError.surname && "error-hint"}>
                  მინიმუმ 2 სიმბოლო, ქართული ასოები
                </p>
              </div>
            </div>
            <div
              className={
                formDataError.phone_number
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
                formDataError.position
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
            <label className={formDataError.email && "error-hint"}>მეილი</label>
            <input
              type="text text-desktop"
              name="email"
              placeholder="grish666@redberry.ge"
              value={formData.email}
              onChange={handleChange}
              className={formDataError.email ? "error" : null}
            />
            <p
              className={
                formDataError.email
                  ? "error-hint mail-validation"
                  : "mail-validation"
              }
            >
              უნდა მთავრდებოდეს @redberry.ge-თი
            </p>
            <label className={formDataError.email && "error-hint"}>
              ტელეფონის ნომერი
            </label>
            <input
              type="text text-desktop"
              name="phone_number"
              placeholder="+995 598 00 07 01"
              value={formData.phone_number}
              className={formDataError.phone_number ? "error" : null}
              onChange={handleChange}
            />
            <p
              className={
                formDataError.email
                  ? "error-hint phone-validation"
                  : "phone-validation"
              }
            >
              ქართული მობ-ნომერის ფორმატი
            </p>
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
