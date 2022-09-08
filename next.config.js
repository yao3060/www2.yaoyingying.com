const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "yaoyingying-media.oss-cn-hongkong.aliyuncs.com",
      "www.yaoin.net",
      "yaoin.net",
    ],
  },
};
