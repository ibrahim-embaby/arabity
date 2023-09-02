import { useDispatch } from "react-redux";
import {
  registerUser,
  registerMechanic,
} from "../../redux/apiCalls/authApiCall";
import { useState } from "react";
import { toast } from "react-toastify";
import SwitchBar from "../../components/switch-bar/SwitchBar";
import TagSelectInput from "../../components/TagSelectInput/TagSelectInput";
import Branch from "./Branch";
import { cars, services } from "../../dummyData";
import { useTranslation } from "react-i18next";

function Register() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  document.title = t("register_page_title");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [workshopOwnerUsername, setWorkshopOwnerUsername] = useState("");
  const [workshopOwnerEmail, setWorkshopOwnerEmail] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [workshopOwnerPassword, setWorkshopOwnerPassword] = useState("");
  const [branches, setBranches] = useState([
    {
      branchProvince: "",
      branchCity: "",
      cities: [],
      branchAddress: "",
      branchMobile: "",
    },
  ]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);

  const [visibleForm, setVisibleForm] = useState(1);

  const registerFormHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("username is empty");
    if (email.trim() === "") return toast.error("email is empty");
    if (mobile.trim() === "") return toast.error("mobile is empty");
    if (password.trim() === "") return toast.error("password is empty");

    dispatch(
      registerUser({
        email,
        mobile,
        password,
        username,
      })
    );
  };

  const registerMechanicFormHandler = (e) => {
    e.preventDefault();
    const workshopServices = selectedServices.map((service) => {
      return service.label;
    });
    const cars = selectedCars.map((car) => {
      return car.label;
    });
    const workshopBranches = branches.map((branch) => {
      return {
        branchProvince: branch.branchProvince,
        branchCity: branch.branchCity,
        branchAddress: branch.branchAddress,
        branchMobile: branch.branchMobile,
      };
    });
    if (workshopOwnerUsername.trim() === "") return toast.error("ادخل الاسم");
    if (workshopOwnerEmail.trim() === "")
      return toast.error("ادخل البريد الالكتروني");
    // if (workshopOwnerMobile.trim() === "")
    //   return toast.error("ادخل رقم الموبايل");
    if (workshopName.trim() === "") return toast.error("ادخل اسم الورشة");
    // if (!province) return toast.error("ادخل المحافظة");
    // if (!city) return toast.error("ادخل المدينة");
    if (workshopOwnerPassword.trim() === "")
      return toast.error("ادخل كلمة المرور");
    dispatch(
      registerMechanic({
        username: workshopOwnerUsername,
        email: workshopOwnerEmail,
        password: workshopOwnerPassword,
        workshopName: workshopName,
        workshopBranches: workshopBranches,
        workshopServices: workshopServices,
        cars: cars,
      })
    );
    setWorkshopOwnerUsername("");
    setWorkshopOwnerEmail("");
    setWorkshopName("");
    setWorkshopOwnerPassword("");
    setBranches([
      {
        branchProvince: "",
        branchCity: "",
        cities: [],
        branchAddress: "",
        branchMobile: "",
      },
    ]);
    setSelectedServices([]);
    setSelectedCars([]);
  };

  const handleBranchChange = (index, newBranch) => {
    const newBranches = [...branches];
    newBranches[index] = newBranch;
    // Remove null addresses
    const filteredAddresses = newBranches.filter((branch) => branch !== null);
    // Ensure at least one address input group is always present
    if (filteredAddresses.length === 0) {
      filteredAddresses.push({
        street: "",
        province: "",
        city: "",
        cities: [],
        postalCode: "",
      });
    }
    setBranches(filteredAddresses);
  };

  const handleAddBranch = () => {
    const newBranches = [
      ...branches,
      {
        branchProvince: "",
        branchCity: "",
        cities: [],
        branchAddress: "",
        branchMobile: "",
      },
    ];
    setBranches(newBranches);
  };

  return (
    <div
      className="register"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="form">
        <SwitchBar
          option1={t("register_as_user")}
          option2={t("register_as_workshop_owner")}
          visibleForm={visibleForm}
          setVisibleForm={setVisibleForm}
        />
        {visibleForm === 1 ? (
          <form className="register-form" onSubmit={registerFormHandler}>
            <div className="form-group">
              <div className="form-group-inputs">
                <label htmlFor="username">{t("register_name")}</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />

                <label htmlFor="email"> {t("email")}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />

                <label htmlFor="mobile">{t("register_mobile")} </label>
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="form-input"
                />

                <label htmlFor="password">{t("password")}</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <button className="register-form-btn" type="submit">
              {t("register")}
            </button>
          </form>
        ) : (
          <form
            className="register-form"
            onSubmit={registerMechanicFormHandler}
          >
            <div className="form-group">
              <h4 className="form-group-title" htmlFor="">
                {t("register_account_info")}
              </h4>
              <div className="form-group-inputs">
                <div className="form-group-input-wrapper">
                  <label htmlFor="workshopOwnerUsername">
                    {t("register_name")}
                  </label>
                  <input
                    type="text"
                    id="workshopOwnerUsername"
                    value={workshopOwnerUsername}
                    onChange={(e) => setWorkshopOwnerUsername(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group-input-wrapper">
                  <label htmlFor="workshopOwnerEmail"> {t("email")}</label>
                  <input
                    type="email"
                    id="workshopOwnerEmail"
                    value={workshopOwnerEmail}
                    onChange={(e) => setWorkshopOwnerEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group-input-wrapper">
                  <label htmlFor="password"> {t("password")}</label>
                  <input
                    type="password"
                    id="password"
                    value={workshopOwnerPassword}
                    onChange={(e) => setWorkshopOwnerPassword(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <h4 className="form-group-title" htmlFor="">
                {t("register_workshop_info")}
              </h4>

              <div className="workshop-info-input-wrapper">
                <label htmlFor="workshopName">
                  {t("register_workshop_name")}
                </label>
                <input
                  type="text"
                  id="workshopName"
                  value={workshopName}
                  onChange={(e) => setWorkshopName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="workshop-info-input-wrapper">
                <label htmlFor="tag-input">
                  {t("register_workshop_services")}
                </label>
                <TagSelectInput
                  selectedOptions={selectedServices}
                  setSelectedOptions={setSelectedServices}
                  options={services}
                  placeholder={t("choose_service")}
                  input_placeholder={t("add_another_service")}
                />
              </div>

              <div className="workshop-info-input-wrapper">
                <label htmlFor="tag-input">{t("register_workshop_cars")}</label>
                <TagSelectInput
                  selectedOptions={selectedCars}
                  setSelectedOptions={setSelectedCars}
                  options={cars}
                  placeholder={t("choose_model")}
                  input_placeholder={t("add_another_model")}
                />
              </div>

              <label htmlFor="">{t("register_workshop_branches")}</label>
              <div className="branches">
                {branches.map((branch, index) => (
                  <Branch
                    key={index}
                    index={index}
                    branch={branch}
                    onBranchChange={handleBranchChange}
                    canRemove={branches.length > 1 && branch !== null}
                  />
                ))}
                <button
                  className="branch-btn add-branch-btn"
                  type="button"
                  onClick={handleAddBranch}
                >
                  {t("register_workshop_add_branch")}
                </button>
              </div>
            </div>

            <button className="register-form-btn" type="submit">
              {t("register")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
