import Logo from "./logo";
import Nav from "./nav";
import ThemeMode from "./theme-mode";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <header className="fixed w-full top-0 shadow bg-base-100 z-50">
      <div className="navbar container m-auto h-[75px]">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-end hidden lg:flex">
          <Nav />
          <ThemeMode className="ml-5 h-5" size={5} />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
