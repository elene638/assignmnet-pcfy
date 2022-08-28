import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../images/camera.png";

function List() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("ლეპტოპის ბრენდი");
  const [selectBrand, setSelectBrand] = useState(false);
  const [cpus, setCpus] = useState([]);
  const [cpu, setCpu] = useState("ლეპტოპის ბრენდი");
  const [selectCpu, setSelectCpu] = useState(false);

  const fetchBrands = () => {
    fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
  };
  React.useEffect(() => {
    fetchBrands();
  }, []);

  const fetchcpu = () => {
    fetch("https://pcfy.redberryinternship.ge/api/cpus")
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  };
  React.useEffect(() => {
    fetchcpu();
  }, []);

  return (
    <div>
      <main className="main-list">
        <div className="header">
          <div className="arrow-btn">
            <button onClick={() => navigate(-1)} className="arrow-button">
              <span className="arrow left" />
            </button>
          </div>
          <div className="collegues">
            <p className="text">ლეპტოპის მახასიათებლები</p>
            <p className="pages">2/2</p>
          </div>
        </div>
        <div className="form form-list">
          <form>
            <div className="list-form">
              <div className="choose-file-container">
                <label for="file" className="photo-label">
                  <img alt="camera" src={camera} className="photo" />
                  <p>ლეპტოპის ფოტოს ატვირთვა</p>
                </label>
                <input type="file" className="inputfile" accept="image/*" />
              </div>
            </div>

            <label>ლეპტოპის სახელი</label>
            <input type="text" />
            <p>ლათინური ასოები, ციფრები, !@#$%^&*()_+= </p>

            <div
              className="dropdown"
              onClick={() => setSelectBrand(!selectBrand)}
            >
              <div className="dropdown-btn">
                {brand}
                <i className="arrows down" />
              </div>
              {selectBrand && (
                <div className="dropdown-content">
                  {brands &&
                    brands.map((brand, index) => {
                      return (
                        <button
                          className="dropdown-item"
                          onClick={() => setBrand(brand.name)}
                        >
                          {brand.name}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="form form-list">
          <form>
            <div className="dropdown" onClick={() => setSelectCpu(!selectCpu)}>
              <div className="dropdown-btn">
                {cpu}
                <i className="arrows down" />
              </div>
              {selectCpu && (
                <div className="dropdown-content">
                  {cpus &&
                    cpus.map((cpu, index) => {
                      return (
                        <button
                          className="dropdown-item"
                          onClick={() => setCpu(cpu.name)}
                        >
                          {cpu.name}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
            <label>CPU-ს ბირთვი</label>
            <input type="text" />
            <p>მხოლოდ ციფრები</p>
            <label>CPU-ს ნაკადი</label>
            <input type="text" />
            <p>მხოლოდ ციფრები</p>
            <label>ლეპტოპის RAM(GB)</label>
            <input type="text" />
            <p>მხოლოდ ციფრები</p>
            <label>მეხსიერების ტიპი </label>
            <div className="radio-type">
              <div className="ssd">
                <input className="radio" type="radio" name="ssd" />
                <label for="ssd">SSD</label>
              </div>
              <div className="hdd">
                <input className="radio" type="radio" name="HDD" />
                <label for="ssd">HDD</label>
              </div>
            </div>
          </form>
        </div>
        <div className="form form-list">
          <form>
            <label>შეძენის რიცხვი (არჩევითი)</label>
            <input
              type="date"
              name="begin"
              placeholder="დდ-თთ-წწწწ"
              value=""
              min="1997-01-01"
              max="2030-12-31"
            />
            <label>ლეპტოპის ფასი</label>
            <input type="text" />
            <p>მხოლოდ ციფრები</p>
            <label>ლეპტოპს მდგომარეობა</label>
            <div className="radio-type">
              <div className="new">
                <input className="radio" type="radio" name="new" />
                <label for="new">ახალი</label>
              </div>
              <div className="old">
                <input className="radio" type="radio" name="old" />
                <label for="old">მეორადი</label>
              </div>
            </div>
          </form>
          <div className="btn-container">
            <button className="back">უკან</button>
            <button className="save">დამახსოვრება</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default List;
