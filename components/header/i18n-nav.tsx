import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function I18nNav() {
  const { asPath, locale, locales, defaultLocale } = useRouter();
  const format = (locale: string) => {
    if (locale === "zh-CN") {
      return "中文";
    }

    return locale;
  };
  return (
    <div
      className="tabs tabs-boxed"
      data-current-locale={locale}
      data-default-locale={defaultLocale}
    >
      {locales?.map((item) => (
        <Link key={item} href={asPath} locale={item}>
          <a
            className={classNames("tab uppercase", {
              "tab-active": item === locale,
            })}
          >
            {format(item)}
          </a>
        </Link>
      ))}
    </div>
  );
}
