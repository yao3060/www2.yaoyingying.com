import Link from "next/link";
import { useTranslation } from "next-i18next";
const Logo = () => {
  const { t } = useTranslation("common");
  return (
    <div className="">
      <div className="logo text-2xl">
        <Link href="/">
          <a>姚迎迎</a>
        </Link>
      </div>
      <div className="desc text-sm">{t("description")}</div>
    </div>
  );
};

export default Logo;
