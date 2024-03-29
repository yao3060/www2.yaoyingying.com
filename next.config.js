/** @type {import('next').NextConfig} */

const path = require("path")
const { i18n } = require("./next-i18next.config")

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "yaoyingying-media.oss-cn-hongkong.aliyuncs.com",
      "www.yaoin.net",
      "yaoin.net",
      "yaoyingying.com",
      "www.yaoyingying.com"
    ],
  },
  i18n,
}
