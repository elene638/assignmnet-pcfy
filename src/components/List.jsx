import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../images/camera.png";
import footerLogo from "../images/footer-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { index } from "../store/indexSlice";
import { parseValue } from "graphql";
import CpuDropdown from "./CpuDropdown";
import BrandDropdown from "./BrandDropdown";
import LaptopCondition from "./LaptopCondition";
import LaptopHardDrive from "./LaptopHardDrive";
import errorIcon from "../images/warning-icon.png";

function List() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("ლეპტოპის ბრენდი");
  const [selectBrand, setSelectBrand] = useState(false);
  const [cpus, setCpus] = useState([]);
  const [cpu, setCpu] = useState("CPU");
  const [selectCpu, setSelectCpu] = useState(false);
  const [isDesktop, setDesktop] = useState(window.outerWidth);
  const laptopIndexSelector = useSelector((state) => state.index.laptopIndex);
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const [formListData, setFormListData] = useState({
    picture: null,
    laptopName: "",
    brand: "",
    cpu: "",
    cpuCore: "",
    cpuFlow: "",
    ram: "",
    memory: "",
    date: "",
    price: "",
    laptopCondition: "",
  });
  const [formDataError, setFormDataError] = useState({});

  // useEffect(() => {
  //   setFormListData(JSON.parse(localStorage.getItem("formListData")));
  //   //localStorage.setItem("formListData", JSON.stringify(formListData));
  // }, []);

  //console.log(formData.picture);
  const updateMedia = () => {
    setDesktop(window.outerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

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
      .then((data) => setCpus(data.data));
  };
  React.useEffect(() => {
    fetchcpu();
  }, []);

  //console.log(formListData);

  function handleChange(event) {
    const { name, value } = event.target;
    // console.log(value);
    setFormListData((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
    const file = event.target.files[0];
    setImg(URL.createObjectURL(file));
    //localStorage.setItem("formListData", JSON.stringify(formListData));
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormListData((prevValues) => {
          return {
            ...prevValues,
            picture: event.target.result,
          };
        });
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }
  //console.log(formListData);

  function handleSubmit(event) {
    event.preventDefault();
    //navigate("/success");
    setFormDataError(validate(formListData));
    localStorage.setItem("formListData", JSON.stringify(formListData));
  }

  function handleCpu(name, id) {
    setFormListData((prevValues) => {
      return {
        ...prevValues,
        cpu: id,
      };
    });
    setCpu(name);
  }

  function handleBrand(name, id) {
    setBrand(name);
    console.log(name, id);
    setFormListData((prevValues) => {
      return {
        ...prevValues,
        brand: id,
      };
    });
  }

  const eachCpu = cpus.map((cpu, index) => (
    <CpuDropdown
      key={index}
      name={cpu.name}
      handleCpu={() => {
        handleCpu(cpu.name, cpu.id);
      }}
    />
  ));

  const eachBrand = brands.map((brand, index) => (
    <BrandDropdown
      key={index}
      name={brand.name}
      handleBrand={() => {
        handleBrand(brand.name, brand.id);
      }}
    />
  ));

  const validate = (values) => {
    const errors = {};
    const regexAlphabet = /^[a-zA-Z\s.,]+$/;
    const numbers = /^[0-9]*$/;
    if (!values.laptopName) {
      errors.laptopName = "needed";
    } else if (!regexAlphabet.test(values.laptopName)) {
      errors.laptopName = "ingeorgian";
    } else if (values.name.length < 2) {
      errors.name = "small";
    }
    if (!values.brand) {
      errors.brand = "needed";
    }
    if (!values.cpu) {
      errors.cpu = "needed";
    }
    if (!values.cpuCore) {
      errors.cpuCore = "needed";
    } else if (!numbers.test(values.cpuCore)) {
      errors.cpuCore = "in numbers";
    }
    if (!values.cpuFlow) {
      errors.cpuFlow = "needed";
    } else if (!numbers.test(values.cpuFlow)) {
      errors.cpuFlow = "in numbers";
    }
    if (!values.ram) {
      errors.ram = "needed";
    } else if (!numbers.test(values.ram)) {
      errors.ram = "in numbers";
    }
    if (!values.memory) {
      errors.memory = "needed";
    }
    if (!values.price) {
      errors.price = "needed";
    } else if (!numbers.test(values.price)) {
      errors.price = "in numbers";
    }
    if (!values.laptopCondition) {
      errors.laptopCondition = "needed";
    }
    if (!values.picture) {
      errors.picture = "needed";
    }
    return errors;
  };

  return (
    <div>
      <main className="main-list-desktop">
        <div className={isDesktop < 670 ? "header" : "desktop-header"}>
          <div className="arrow-btn">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="arrow-button"
            >
              <span className="arrow left" />
            </button>
          </div>
          <div className="collegues">
            {isDesktop > 670 && (
              <p
                className={
                  laptopIndexSelector === "1" ? "active-text text" : "text"
                }
              >
                თანამშრომლების ინფო
              </p>
            )}
            <p
              className={
                laptopIndexSelector === "2" ? "active-text text" : "text"
              }
            >
              ლეპტოპის მახასიათებლები
            </p>

            {isDesktop < 670 && (
              <p className="pages">{laptopIndexSelector}/2</p>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="desktop-list-form">
            <div className="form form-list form-list-first">
              <section>
                <div className={isDesktop < 670 ? "list-form" : null}>
                  {isDesktop < 670 ? (
                    <div className="choose-file-container">
                      <label htmlFor="file" className="photo-label">
                        <img alt="camera" src={camera} className="photo" />
                        <p className="phone-size-text">
                          ლეპტოპის <br /> ფოტოს ატვირთვა
                        </p>
                        {formDataError.picture && (
                          <img
                            alt="errorIcon"
                            src={errorIcon}
                            style={{ marginTop: 0, width: 23, height: 21 }}
                          />
                        )}
                      </label>

                      <input
                        type="file"
                        name="picture"
                        className="inputfile"
                        accept="image/*"
                        // value={formData.picture}
                      />
                    </div>
                  ) : (
                    <div
                      className={
                        formDataError.picture
                          ? "picture-error choose-file-container"
                          : "choose-file-container"
                      }
                    >
                      <label htmlFor="file" className="photo-label">
                        <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>

                        <button className="upload-file">ატვირთე</button>
                        <input
                          type="file"
                          name="picture"
                          accept="image/*"
                          //value={formData.picture}
                          onChange={handleChange}
                        />
                      </label>

                      {img && (
                        <img
                          alt="d"
                          src={img}
                          style={{
                            width: 878,
                            height: 460,
                            zIndex: 3,
                            position: "absolute",
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="first-part">
                  <div className="laptop-name">
                    <label
                      className={formDataError.laptopName ? "error-hint" : null}
                    >
                      ლეპტოპის სახელი
                    </label>
                    <input
                      type="text"
                      name="laptopName"
                      placeholder="HP"
                      value={formListData.laptopName}
                      onChange={handleChange}
                      className={formDataError.laptopName ? "error" : null}
                    />
                    <p
                      className={formDataError.laptopName ? "error-hint" : null}
                    >
                      ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
                    </p>
                  </div>
                  <div
                    className={
                      formDataError.brand
                        ? "first-dropdown dropdown error"
                        : "first-dropdown dropdown"
                    }
                    //className="first-dropdown dropdown"
                    onClick={() => setSelectBrand(!selectBrand)}
                  >
                    <div className="dropdown-btn">
                      <p>{brand}</p>
                      <i className="arrows down" />
                    </div>

                    {selectBrand && (
                      <div className="dropdown-content">{eachBrand}</div>
                    )}
                  </div>
                </div>
              </section>
            </div>
            {isDesktop > 670 && <hr className="hr-one" />}
            <div className="form form-list form-list-second">
              <section>
                <div className="cpu">
                  <div className="cpu-info">
                    <div
                      //className="second-dropdown dropdown"
                      className={
                        formDataError.cpu
                          ? "second-dropdown dropdown error"
                          : "second-dropdown dropdown"
                      }
                      onClick={() => setSelectCpu(!selectCpu)}
                    >
                      <div className="dropdown-btn">
                        <p>{cpu}</p>
                        <i className="arrows down" />
                      </div>
                      {selectCpu && (
                        <div className="dropdown-content">{eachCpu}</div>
                      )}
                    </div>
                    <div className="cpu-first">
                      <label
                        className={
                          formDataError.laptopName ? "error-hint" : null
                        }
                      >
                        CPU-ს ბირთვი
                      </label>
                      <input
                        type="text"
                        name="cpuCore"
                        placeholder="14"
                        value={formListData.cpuCore}
                        onChange={handleChange}
                        className={formDataError.cpuCore ? "error" : null}
                      />
                      <p
                        className={
                          formDataError.laptopName ? "error-hint" : null
                        }
                      >
                        მხოლოდ ციფრები
                      </p>
                    </div>
                    <div className="cpu-second">
                      <label
                        className={
                          formDataError.laptopName ? "error-hint" : null
                        }
                      >
                        CPU-ს ნაკადი
                      </label>
                      <input
                        type="text"
                        name="cpuFlow"
                        placeholder="365"
                        value={formListData.cpuFlow}
                        onChange={handleChange}
                        className={formDataError.cpuFlow ? "error" : null}
                      />
                      <p
                        className={
                          formDataError.laptopName ? "error-hint" : null
                        }
                      >
                        მხოლოდ ციფრები
                      </p>
                    </div>
                  </div>
                  <div className="laptop-info">
                    <div className="laptop-ram">
                      <label
                        className={
                          formDataError.laptopName ? "error-hint" : null
                        }
                      >
                        ლეპტოპის RAM(GB)
                      </label>
                      <input
                        type="text"
                        name="ram"
                        placeholder="16"
                        value={formListData.ram}
                        onChange={handleChange}
                        className={formDataError.ram ? "error" : null}
                      />
                      <p
                        className={
                          formDataError.laptopName ? "error-hint" : null
                        }
                      >
                        მხოლოდ ციფრები
                      </p>
                    </div>
                    <div className="radio-type">
                      <LaptopHardDrive
                        formListData={formListData}
                        formDataError={formDataError}
                        handleChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {isDesktop > 670 && <hr className="hr-two" />}
            <div className="form form-list third-part">
              <section>
                <div className="first-part">
                  <div className="date">
                    <label>შეძენის რიცხვი (არჩევითი)</label>
                    <input
                      type="date"
                      name="begin"
                      placeholder="MM-DD-YYYY"
                      // value=""
                      // min="1997-01-01"
                      // max="2030-12-31"
                    />
                  </div>
                  <div className="price">
                    <label
                      className={formDataError.laptopName ? "error-hint" : null}
                    >
                      ლეპტოპის ფასი
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formListData.price}
                      onChange={handleChange}
                      className={formDataError.price ? "error" : null}
                    />
                    <p
                      className={formDataError.laptopName ? "error-hint" : null}
                    >
                      მხოლოდ ციფრები
                    </p>
                  </div>
                </div>

                <div className="radio-type">
                  <LaptopCondition
                    formDataError={formDataError}
                    formListData={formListData}
                    handleChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div>
                <div className="btn-container">
                  <button
                    className="back"
                    onClick={() => {
                      navigate("/addList");
                    }}
                  >
                    უკან
                  </button>
                  {/* onClick={() => navigate("/success")} */}
                  <button className="save">დამახსოვრება</button>
                </div>
              </section>
            </div>
          </div>
        </form>
        <div className="footer-logo-container-list">
          {isDesktop > 670 && (
            <img className="footer-logo" alt="footer-logo" src={footerLogo} />
          )}
        </div>
      </main>
    </div>
  );
}

export default List;
