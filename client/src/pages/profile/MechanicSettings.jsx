import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMechanic,
  updateMechanic,
} from "../../redux/apiCalls/mechanicApiCall";
import { useParams } from "react-router-dom";
import TagSelectInput from "../../components/TagSelectInput/TagSelectInput";
import { fetchControls } from "../../redux/apiCalls/controlsApiCalls";
import BranchesList from "../../components/branch-list/BranchList";
import CircularProgress from "@mui/joy/CircularProgress";
import { toast } from "react-toastify";

function MechanicSettings() {
  const [currentComponent, setCurrentComponent] = useState(1);
  const { t, i18n } = useTranslation();
  document.title = t("admin_page_title");

  const { user } = useSelector((state) => state.auth);
  const { mechanic, loading } = useSelector((state) => state.mechanic);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [workshopOwnerUsername, setWorkshopOwnerUsername] = useState(
    user.username
  );
  const { services, cars, provinces } = useSelector((state) => state.controls);
  const [selectServices, setSelectServices] = useState([]);
  const [selectCars, setSelectCars] = useState([]);
  const [workshopName, setWorkshopName] = useState(user.workshopName);
  const [workshopDescription, setWorkshopDescription] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);

  useEffect(() => {
    dispatch(fetchMechanic(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchControls());
  }, []);

  useEffect(() => {
    setSelectCars(cars);
    setSelectServices(services);
  }, []);

  useEffect(() => {
    if (mechanic?.cars) {
      setSelectedCars(mechanic.cars);
    }
    if (mechanic?.workshopBranches) {
      setBranches(
        mechanic.workshopBranches.map((branch) => {
          return {
            province: {
              label: branch.province.label,
              value: branch.province.value,
              cities: branch.province.cities,
              _id: branch.province._id,
            },
            city: {
              label: branch.city.label,
              value: branch.city.value,
              _id: branch.city._id,
            },
            address: branch.address,
            mobile: branch.mobile,
          };
        })
      );
    }
    if (mechanic?.workshopServices) {
      setSelectedServices(mechanic.workshopServices);
    }
    if (mechanic?.workshopDescription) {
      setWorkshopDescription(mechanic.workshopDescription);
    }
  }, [mechanic, i18n.language]);

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    if (!selectedCars.length) {
      return toast.warning("اختر سيارة واحدة علي الأقل");
    }
    if (!selectedServices.length) {
      return toast.warning("اختر خدمة واحدة علي الأقل");
    }
    if (!selectedServices.length) {
      return toast.warning("اختر خدمة واحدة علي الأقل");
    }
    const workshopCars = selectedCars.map((car) => car._id);
    const workshopServices = selectedServices.map((service) => service._id);
    const workshopBranches = branches.map((branch) => {
      return {
        province: branch.province._id,
        city: branch.city._id,
        address: branch.address,
        mobile: branch.mobile,
      };
    });
    let fieldsToUpdate = {
      username: workshopOwnerUsername,
      workshopName,
      cars: workshopCars,
      workshopBranches,
      workshopDescription,
      workshopServices,
    };
    if (newPassword) {
      fieldsToUpdate.password = newPassword;
    }

    dispatch(updateMechanic(mechanic._id, fieldsToUpdate));
    setSelectCars(cars);
    setSelectServices(services);
  };

  return (
    <div className="mechanic-settings">
      <div
        className="container"
        style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
      >
        {loading && !mechanic ? (
          <div
            className="loading-page"
            style={{
              minHeight: "calc(100vh - var(--difference-value))",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="mechanic-profile-settings-wrapper">
            <div className="mechanic-settings-sidebar">
              <div
                onClick={() => setCurrentComponent(1)}
                style={{
                  backgroundColor: currentComponent === 1 && "#ffd1d1da",
                }}
                className="admin-sidebar-component"
              >
                <p className="admin-sidebar-text">اعدادت الحساب </p>
              </div>

              <div
                onClick={() => setCurrentComponent(2)}
                style={{
                  backgroundColor: currentComponent === 2 && "#ffd1d1da",
                }}
                className="admin-sidebar-component"
              >
                <p className="admin-sidebar-text">اعدادات الورشة </p>
              </div>
            </div>

            <div className="mechanic-settings-components">
              {currentComponent === 1 ? (
                <div className="mechanic-account-settings">
                  <form
                    className="mechanic-account-settings-form"
                    onSubmit={handleUpdateAccount}
                  >
                    <label htmlFor="workshopOwnerUsername">
                      {t("register_name")}
                    </label>
                    <input
                      type="text"
                      id="workshopOwnerUsername"
                      value={workshopOwnerUsername}
                      onChange={(e) => setWorkshopOwnerUsername(e.target.value)}
                      className="mechanic-account-settings-form-input"
                    />
                    <label htmlFor="workshopOwnerUsername">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="text"
                      className="mechanic-account-settings-form-input"
                      disabled
                      value={user.email}
                    />
                    <label htmlFor="workshopOwnerUsername">كلمة المرور </label>
                    <input
                      type="password"
                      value={newPassword}
                      className="mechanic-account-settings-form-input"
                      placeholder="new password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="mechanic-account-settings-form-btn"
                    >
                      حفظ التغييرات
                    </button>
                  </form>
                </div>
              ) : (
                <div className="mechanic-profile-settings">
                  <form
                    className="mechanic-profile-settings-form"
                    onSubmit={handleUpdateAccount}
                  >
                    <div className="mechanic-profile-form-group">
                      <div className="mechanic-profile-info-input-wrapper">
                        <label htmlFor="workshopName">
                          {t("register_workshop_name")}
                        </label>
                        <input
                          type="text"
                          id="workshopName"
                          value={workshopName}
                          onChange={(e) => setWorkshopName(e.target.value)}
                          className="mechanic-profile-form-input"
                        />
                      </div>

                      <div className="mechanic-profile-info-input-wrapper">
                        <label htmlFor="description">
                          {t("workshop_description")}
                        </label>
                        <textarea
                          type="text"
                          id="description"
                          value={workshopDescription}
                          onChange={(e) =>
                            setWorkshopDescription(e.target.value)
                          }
                          className="mechanic-profile-form-input"
                        ></textarea>
                      </div>

                      <div className="mechanic-profile-info-input-wrapper">
                        <label htmlFor="tag-input">
                          {t("register_workshop_services")}
                        </label>
                        <TagSelectInput
                          selectedOptions={selectedServices}
                          setSelectedOptions={setSelectedServices}
                          selectOptions={selectServices}
                          setSelectOptions={setSelectServices}
                          placeholder={t("choose_service")}
                        />
                      </div>

                      <div className="mechanic-profile-info-input-wrapper">
                        <label htmlFor="tag-input">
                          {t("register_workshop_cars")}
                        </label>
                        <TagSelectInput
                          selectedOptions={selectedCars}
                          setSelectedOptions={setSelectedCars}
                          selectOptions={selectCars}
                          setSelectOptions={setSelectCars}
                          placeholder={t("choose_model")}
                        />
                      </div>

                      <label htmlFor="">
                        {t("register_workshop_branches")}
                      </label>

                      <div className="branches">
                        <BranchesList
                          provinces={provinces}
                          branches={branches}
                          setBranches={setBranches}
                          lang={i18n.language}
                          t={t}
                        />
                      </div>
                    </div>

                    <button className="register-form-btn" type="submit">
                      {t("user_settings_edit")}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MechanicSettings;
