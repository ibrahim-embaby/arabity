import { useDispatch } from "react-redux";
import {
  registerUser,
  registerWorkshopOwner,
} from "../../redux/apiCalls/authApiCall";
import { useState } from "react";
import { toast } from "react-toastify";
import SwitchBar from "../../components/switch-bar/SwitchBar";
import TagSelectInput from "../../components/TagSelectInput/TagSelectInput";
import Branch from "./Branch";
import { cars, services } from "../../dummyData";

function Register() {
  const dispatch = useDispatch();
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

  const registerWorkshopOwnerFormHandler = (e) => {
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
      registerWorkshopOwner({
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
    <div className="register">
      <SwitchBar
        option1={"تسجيل كمالك سيارة"}
        option2={"تسجيل كمالك ورشة"}
        visibleForm={visibleForm}
        setVisibleForm={setVisibleForm}
      />
      <div className="form">
        {visibleForm === 1 ? (
          <form className="register-form" onSubmit={registerFormHandler}>
            <label htmlFor="username">الاسم</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />

            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />

            <label htmlFor="mobile">رقم الموبايل</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="form-input"
            />

            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />

            <button className="register-form-btn" type="submit">
              تسجيل
            </button>
          </form>
        ) : (
          <form
            className="register-form"
            onSubmit={registerWorkshopOwnerFormHandler}
          >
            <div className="form-group">
              <h4 className="form-group-title" htmlFor="">
                بيانات الحساب
              </h4>
              <div className="form-group-inputs">
                <div className="form-group-input-wrapper">
                  <label htmlFor="workshopOwnerUsername">الاسم</label>
                  <input
                    type="text"
                    id="workshopOwnerUsername"
                    value={workshopOwnerUsername}
                    onChange={(e) => setWorkshopOwnerUsername(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group-input-wrapper">
                  <label htmlFor="workshopOwnerEmail">البريد الإلكتروني</label>
                  <input
                    type="email"
                    id="workshopOwnerEmail"
                    value={workshopOwnerEmail}
                    onChange={(e) => setWorkshopOwnerEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group-input-wrapper">
                  <label htmlFor="password">كلمة المرور</label>
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
                بيانات الورشة
              </h4>

              <label htmlFor="workshopName">اسم الورشة</label>
              <input
                type="text"
                id="workshopName"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="form-input"
              />

              <label htmlFor="tag-input">خدمات الورشة</label>
              <TagSelectInput
                selectedOptions={selectedServices}
                setSelectedOptions={setSelectedServices}
                options={services}
                placeholder={"اختر خدمة او اكثر"}
              />

              <label htmlFor="tag-input">انواع الماركات</label>
              <TagSelectInput
                selectedOptions={selectedCars}
                setSelectedOptions={setSelectedCars}
                options={cars}
                placeholder={"اختر ماركة او اكثر"}
              />

              <label htmlFor="">الفروع</label>
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
                <button type="button" onClick={handleAddBranch}>
                  أضف فرع آخر
                </button>
              </div>
            </div>

            <button className="register-form-btn" type="submit">
              تسجيل
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
