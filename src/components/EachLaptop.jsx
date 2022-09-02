import React from "react";
import pic from "../images/home-picture-desktop.png";
import { useNavigate } from "react-router-dom";

function EachLaptop() {
  const navigate = useNavigate();
  return (
    <div>
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
        {/* <div className="laptop-information">
          <img alt="leptop" src={pic} />
        </div> */}
        <div className="information information-desktop">
          <div className="laptop-information">
            <img alt="leptop" src={pic} />
          </div>
          <div className="details-desktop">
            <div className="details">
              <h3>სახელი:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>თიმი:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>პოზიცია:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>მეილი:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>ტელ. ნომერი:</h3>
              <p>name</p>
            </div>
          </div>
        </div>
        <hr className="eachlaptop-hr" />
        <div className="information">
          <div className="information-one">
            <div className="details">
              <h3>ლეპტოპის სახელი:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>ლეპტოპის ბრენდი:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>RAM:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>მეხსიერების ტიპი:</h3>
              <p>name</p>
            </div>
          </div>

          <div className="information-two">
            <div className="details">
              <h3>CPU:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>CPU-ს ბირთვი:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>CPU-ს ნაკადი:</h3>
              <p>name</p>
            </div>
          </div>
        </div>
        <hr className="eachlaptop-hr" />
        <div className="information third-part-information">
          <div className="information-three">
            <div className="details">
              <h3>მდგომარეობა:</h3>
              <p>name</p>
            </div>
            <div className="details">
              <h3>ლეპტოპის ფასი:</h3>
              <p>name</p>
            </div>
          </div>

          <div className="details details-desk">
            <h3>შეძენის რიცხვი:</h3>
            <p>name</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachLaptop;
