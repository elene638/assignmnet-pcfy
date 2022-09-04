import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import camera from "../images/camera.png";
import footerLogo from "../images/footer-logo.png";
import { useSelector, useDispatch } from "react-redux";
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
  const location = useLocation();
  const { formData } = location.state;

  const [formListData, setFormListData] = useState({
    laptop_image: "",
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
    token: "722b8016d1dacb1a5e1d906de785c4f2",
    name: formData.name,
    surname: formData.surname,
    team_id: formData.team_id,
    position_id: formData.position_id,
    email: formData.email,
    phone_number: formData.phone_number,
  });

  // console.log(formListData.laptop_image.size);
  const [formDataError, setFormDataError] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("formListData");
    const brandData = localStorage.getItem("brand");
    const cpuData = localStorage.getItem("cpu");
    if (data) {
      setFormListData(JSON.parse(data));
    }
    if (brandData) {
      setBrand(JSON.parse(brandData));
    }
    if (cpuData) {
      setCpu(JSON.parse(cpuData));
    }
  }, []);

  // Control the resize

  const updateMedia = () => {
    setDesktop(window.outerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

  // Fetch brands and cpus

  const fetchBrands = () => {
    fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
  };

  const fetchcpu = () => {
    fetch("https://pcfy.redberryinternship.ge/api/cpus")
      .then((res) => res.json())
      .then((data) => setCpus(data.data));
  };
  React.useEffect(() => {
    fetchBrands();
    fetchcpu();
  }, []);

  // Handle the image upload

  function handleImageUpload(event) {
    const { name, value, files } = event.target;
    setFormListData((prevValues) => {
      return {
        ...prevValues,
        laptop_image: event.target.files[0],
      };
    });
    const file = event.target.files[0];

    setImg(URL.createObjectURL(file));
  }

  // Handle change of inputs

  function handleChange(event) {
    const { name, value } = event.target;

    setFormListData((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });

    localStorage.setItem("formListData", JSON.stringify(formListData));
    localStorage.setItem("brand", JSON.stringify(brand));
    localStorage.setItem("cpu", JSON.stringify(cpu));
  }

  //Handle submition

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validate(formListData);
    setFormDataError(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    navigate("/success");
    localStorage.clear();

    const data = new FormData();

    for (let prop in formListData) {
      data.append(prop, formListData[prop]);
    }

    fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
      method: "POST",

      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  // Handle cpu

  function handleCpu(name, id) {
    setFormListData((prevValues) => {
      return {
        ...prevValues,
        laptop_cpu: name,
      };
    });
    setCpu(name);
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

  // handle brand

  function handleBrand(name, id) {
    setBrand(name);

    setFormListData((prevValues) => {
      return {
        ...prevValues,
        laptop_brand_id: id,
      };
    });
  }

  const eachBrand = brands.map((brand, index) => (
    <BrandDropdown
      key={index}
      name={brand.name}
      handleBrand={() => {
        handleBrand(brand.name, brand.id);
      }}
    />
  ));

  // validation

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
        <div className={isDesktop < 1300 ? "header" : "desktop-header"}>
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
            {isDesktop > 1300 && (
              <p
                onClick={() => {
                  navigate("/addList");
                }}
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

            {isDesktop < 1300 && (
              <p className="pages">{laptopIndexSelector}/2</p>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="desktop-list-form">
            <div className="form form-list form-list-first">
              <section>
                <div className={isDesktop < 1300 ? "list-form" : null}>
                  {isDesktop < 1300 ? (
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
                        onChange={handleImageUpload}
                      />
                      {img && (
                        <img
                          alt="d"
                          src={img}
                          style={{
                            width: "100%",
                            height: 250,
                            zIndex: 3,
                            position: "absolute",
                            borderRadius: 8,
                            backgroundColor: "white",
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
                          onChange={handleImageUpload}
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
                            background: "white",
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                {img && (
                  <div className="checked-container">
                    <div className="image-information">
                      <img
                        alt="checked"
                        src={checked}
                        style={{ width: 22, height: 22 }}
                      />
                      <p className="image-name">
                        {formListData.laptop_image.name},
                      </p>
                      <p className="image-size">
                        {formListData.laptop_image.size}
                      </p>
                    </div>

                    <span className="span">თავიდან ატვირთე</span>
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
            {isDesktop > 1300 && <hr className="hr-one" />}
            <div className="form form-list form-list-second">
              <section>
                <div className="cpu">
                  <div className="cpu-info">
                    <div
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
            {isDesktop > 1300 && <hr className="hr-two" />}
            <div className="form form-list third-part">
              <section>
                <div className="first-part">
                  <div className="date">
                    <label>შეძენის რიცხვი (არჩევითი)</label>
                    <input
                      type="text"
                      name="laptop_purchase_date"
                      placeholder="დდ / თთ / წწწწ"
                      value={formListData.laptop_purchase_date}
                      onChange={handleChange}
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

                  <button type="submit" className="save">
                    დამახსოვრება
                  </button>
                </div>
              </section>
            </div>
          </div>
        </form>
        <div className="footer-logo-container-list">
          {isDesktop > 1300 && (
            <img className="footer-logo" alt="footer-logo" src={footerLogo} />
          )}
        </div>
      </main>
    </div>
  );
}

export default List;
