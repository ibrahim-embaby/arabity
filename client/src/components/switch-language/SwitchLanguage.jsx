import i18next from "i18next";
import React, { useEffect, useState } from "react";
import "./switch-language.css";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";

function SwitchLanguage() {
  const initialLang = localStorage.getItem("lang") || "ar";
  const { i18n } = useTranslation();
  const [toggle, setToggle] = useState(initialLang);
  const [cookies, setCookies] = useCookies(["i18next"]);

  useEffect(() => {
    // Set i18next language when component mounts
    i18next.changeLanguage(toggle);
    setCookies("i18next", toggle);
  }, [toggle]);

  useEffect(() => {
    localStorage.setItem("lang", toggle);

    // Reinitialize i18n with the new language
    i18n.init({
      lng: toggle,
    });
    setCookies("i18next", toggle);
  }, [toggle]);

  console.log(cookies);
  return (
    <div className="switch-language">
      {i18n.language === "ar" ? (
        <button className="switch-language-btn" onClick={() => setToggle("en")}>
          EN
        </button>
      ) : (
        <button className="switch-language-btn" onClick={() => setToggle("ar")}>
          ع
        </button>
      )}
    </div>
  );
}

export default SwitchLanguage;
