const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "zh-CN"],
    defaultLocale: "en",
    localePath: path.resolve("./public/locales"),
  },
};
