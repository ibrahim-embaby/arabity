import i18next from "i18next";
import React, { useEffect, useState } from "react";
import "./switch-language.css";
import i18n from "../../i18n";

function SwitchLanguage() {
  const initialLang = localStorage.getItem("lang") || "ar";

  const [toggle, setToggle] = useState(initialLang);
  useEffect(() => {
    // Set i18next language when component mounts
    i18next.changeLanguage(toggle);
  }, [toggle]);

  useEffect(() => {
    localStorage.setItem("lang", toggle);

    // Reinitialize i18n with the new language
    i18n.init({
      lng: toggle,
    });
  }, [toggle]);

  return (
    <div className="switch-language">
      <button
        className="switch-language-btn"
        style={{
          backgroundColor: toggle === "en" && "#444",
          color: toggle === "en" && "#fff",
        }}
        onClick={() => setToggle("en")}
      >
        EN
      </button>
      <button
        className="switch-language-btn"
        style={{
          backgroundColor: toggle === "ar" && "#444",
          color: toggle === "ar" && "#fff",
        }}
        onClick={() => setToggle("ar")}
      >
        ع
      </button>
    </div>
  );
}

export default SwitchLanguage;
