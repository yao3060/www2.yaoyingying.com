module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ["en", "zh-CN"],
    defaultLocale: "en",
    localePath:
      typeof window === 'undefined'
        ? require('path').resolve('./public/locales')
        : '/locales',
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
