import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../images/camera.png";
import footerLogo from "../images/footer-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { index } from "../store/indexSlice";
import checked from "../images/accept-icon.png";
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
    laptop_image: null,
    laptop_name: "",
    laptop_brand_id: "",
    laptop_cpu: "",
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_hard_drive_type: "",
    laptop_purchase_date: "",
    laptop_price: "",
    laptop_state: "",
  });
  const [formDataError, setFormDataError] = useState({});
  //const isValidEmail = formListData.checkValidity();

  useEffect(() => {
    //setFormListData(JSON.parse(localStorage.getItem("formListData")));
  }, []);

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
            laptop_image: event.target.result,
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
    // if (isValidEmail) {
    //   console.log("dcd");
    // }
    localStorage.setItem("formListData", JSON.stringify(formListData));

    //const token = "e113a24d23bb6c990b531705e476123f";
    const headers = {
      "Content-Type": "application/json",
      redirect: "follow",
    };

    fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formListData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleCpu(name, id) {
    setFormListData((prevValues) => {
      return {
        ...prevValues,
        laptop_cpu: id,
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
        laptop_brand_id: id,
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

  //^(\+\d[995])\d{9}?

  const validate = (values) => {
    const errors = {};
    const regexAlphabet = /^[a-zA-Z\s.,]+$/;
    const numbers = /^[0-9]*$/;
    if (!values.laptop_name) {
      errors.laptop_name = "needed";
    } else if (!regexAlphabet.test(values.laptop_name)) {
      errors.laptop_name = "ingeorgian";
    }
    if (!values.laptop_brand_id) {
      errors.laptop_brand_id = "needed";
    }
    if (!values.laptop_cpu) {
      errors.laptop_cpu = "needed";
    }
    if (!values.laptop_cpu_cores) {
      errors.laptop_cpu_cores = "needed";
    } else if (!numbers.test(values.laptop_cpu_cores)) {
      errors.laptop_cpu_cores = "in numbers";
    }
    if (!values.laptop_cpu_threads) {
      errors.laptop_cpu_threads = "needed";
    } else if (!numbers.test(values.laptop_cpu_threads)) {
      errors.laptop_cpu_threads = "in numbers";
    }
    if (!values.laptop_ram) {
      errors.laptop_ram = "needed";
    } else if (!numbers.test(values.laptop_ram)) {
      errors.laptop_ram = "in numbers";
    }
    if (!values.laptop_hard_drive_type) {
      errors.laptop_hard_drive_type = "needed";
    }
    if (!values.laptop_price) {
      errors.laptop_price = "needed";
    } else if (!numbers.test(values.laptop_price)) {
      errors.laptop_price = "in numbers";
    }
    if (!values.laptop_state) {
      errors.laptop_state = "needed";
    }
    if (!values.laptop_image) {
      errors.laptop_image = "needed";
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
                    <div
                      className={
                        formDataError.laptop_image
                          ? "picture-error"
                          : "choose-file-container"
                      }
                    >
                      <label htmlFor="file" className="photo-label">
                        <img alt="camera" src={camera} className="photo" />
                        <p className="phone-size-text">
                          ლეპტოპის <br /> ფოტოს ატვირთვა
                        </p>
                        {formDataError.laptop_image && (
                          <img
                            alt="errorIcon"
                            src={errorIcon}
                            style={{ marginTop: 0, width: 23, height: 21 }}
                          />
                        )}
                      </label>

                      <input
                        type="file"
                        name="laptop_image"
                        className={img && "bring-down"}
                        accept="image/*"
                        onChange={handleChange}
                      />
                      {img && (
                        <img
                          alt="d"
                          src={img}
                          style={{
                            width: 948,
                            height: 244,
                            zIndex: 3,
                            position: "absolute",
                            borderRadius: 8,
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={
                        formDataError.laptop_image
                          ? "picture-error"
                          : "choose-file-container"
                      }
                    >
                      {formDataError.laptop_image && (
                        <img
                          alt="pic"
                          src={errorIcon}
                          style={{ width: 38, height: 34, marginTop: 54 }}
                        />
                      )}
                      <label
                        htmlFor="file"
                        className="photo-label"
                        style={{ marginTop: 130 }}
                      >
                        <p style={{ marginBottom: 30 }}>
                          ჩააგდე ან ატვირთე <br /> ლეპტოპის ფოტო
                        </p>
                        <input
                          type="file"
                          name="laptop_image"
                          accept="image/*"
                          //value={formData.picture}
                          onChange={handleChange}
                          className={img && "bring-down-desktop"}
                        />
                        <span className="upload-file">ატვირთე</span>
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
                            borderRadius: 18,
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                {img && (
                  <div className="checked-container">
                    <img
                      alt="checked"
                      src={checked}
                      style={{ width: 22, height: 22 }}
                    />
                    <span>თავიდან ატვირთე</span>
                  </div>
                )}
                <div className="first-part">
                  <div className="laptop-name">
                    <label
                      className={
                        formDataError.laptop_name ? "error-hint" : null
                      }
                    >
                      ლეპტოპის სახელი
                    </label>
                    <input
                      type="text"
                      name="laptop_name"
                      placeholder="HP"
                      value={formListData.laptop_name}
                      onChange={handleChange}
                      className={formDataError.laptop_name ? "error" : null}
                    />
                    <p
                      className={
                        formDataError.laptop_name ? "error-hint" : null
                      }
                    >
                      ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
                    </p>
                  </div>
                  <div
                    className={
                      formDataError.laptop_brand_id
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
                        formDataError.laptop_cpu
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
                          formDataError.laptop_cpu_cores ? "error-hint" : null
                        }
                      >
                        CPU-ს ბირთვი
                      </label>
                      <input
                        type="text"
                        name="laptop_cpu_cores"
                        placeholder="14"
                        value={formListData.laptop_cpu_cores}
                        onChange={handleChange}
                        className={
                          formDataError.laptop_cpu_cores ? "error" : null
                        }
                      />
                      <p
                        className={
                          formDataError.laptop_cpu_cores ? "error-hint" : null
                        }
                      >
                        მხოლოდ ციფრები
                      </p>
                    </div>
                    <div className="cpu-second">
                      <label
                        className={
                          formDataError.laptop_cpu_threads ? "error-hint" : null
                        }
                      >
                        CPU-ს ნაკადი
                      </label>
                      <input
                        type="text"
                        name="laptop_cpu_threads"
                        placeholder="365"
                        value={formListData.laptop_cpu_threads}
                        onChange={handleChange}
                        className={
                          formDataError.laptop_cpu_threads ? "error" : null
                        }
                      />
                      <p
                        className={
                          formDataError.laptop_cpu_threads ? "error-hint" : null
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
                          formDataError.laptop_ram ? "error-hint" : null
                        }
                      >
                        ლეპტოპის RAM(GB)
                      </label>
                      <input
                        type="text"
                        name="laptop_ram"
                        placeholder="16"
                        value={formListData.laptop_ram}
                        onChange={handleChange}
                        className={formDataError.laptop_ram ? "error" : null}
                      />
                      <p
                        className={
                          formDataError.laptop_ram ? "error-hint" : null
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
                      name="laptop_purchase_date"
                      placeholder="MM-DD-YYYY"
                      // value=""
                      // min="1997-01-01"
                      // max="2030-12-31"
                    />
                  </div>
                  <div className="price">
                    <label
                      className={
                        formDataError.laptop_price ? "error-hint" : null
                      }
                    >
                      ლეპტოპის ფასი
                    </label>
                    <input
                      type="text"
                      name="laptop_price"
                      value={formListData.laptop_price}
                      onChange={handleChange}
                      className={formDataError.laptop_price ? "error" : null}
                      placeholder="₾"
                    />
                    <p
                      className={
                        formDataError.laptop_price ? "error-hint" : null
                      }
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
                  <button type="submit" className="save">
                    დამახსოვრება
                  </button>
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
