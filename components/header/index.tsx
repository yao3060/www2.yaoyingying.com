import Logo from "./logo";
import Nav from "./nav";
import ThemeMode from "./theme-mode";

const Header = () => {
  return (
    <header className="fixed w-full top-0 shadow bg-base-100 z-50">
      <div className="navbar container m-auto h-[75px]">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex">
          <Nav />
          <ThemeMode className="ml-5 h-5" size={5} />
        </div>
      </div>
    </header>
  );
};

export default Header;
