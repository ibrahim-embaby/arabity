const Backend = require("i18next-fs-backend");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const path = require("path");

function configI18n() {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
      },
      detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"],
      },
      fallbackLng: "en",
      preload: ["en", "ar"],
    });
}

module.exports = { configI18n };
