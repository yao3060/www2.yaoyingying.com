import I18nNav from "./i18n-nav";
import Logo from "./logo";
import Nav from "./nav";
import ThemeMode from "./theme-mode";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <header className="fixed w-full top-0 shadow bg-base-100 z-50">
      <div className="navbar justify-between container m-auto h-[75px]">
        <div className="logo">
          <Logo />
        </div>
        <div className="hidden lg:flex">
          <Nav />
          <I18nNav />
          <ThemeMode className="ml-5 h-5" size={5} />
          <UserMenu />
        </div>

        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
