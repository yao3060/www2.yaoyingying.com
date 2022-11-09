import I18nNav from "./i18n-nav";
import Logo from "./logo";
import Nav from "./nav";
import ThemeMode from "./theme-mode";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <header className="fixed w-full top-0 shadow bg-base-100 z-50">
      <div className="navbar justify-between container m-auto h-[75px]">
        <div className="">
          <Logo />
        </div>
        <div className="hidden lg:flex">
          <Nav />
          <I18nNav />
          <ThemeMode className="ml-5 h-5" size={5} />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
