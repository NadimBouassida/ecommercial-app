require("dotenv").config();
const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: process.env.LOCALES?.split(",") || ["en", "fr"], // e.g., LOCALES=en,fr
  directory: path.join(__dirname, process.env.LOCALES_DIR || "../locales"),
  defaultLocale: process.env.DEFAULT_LOCALE || "en",
  queryParameter: "lang",
  cookie: "locale",
  autoReload: true,
  syncFiles: true,
  objectNotation: true,
});

module.exports = i18n;
