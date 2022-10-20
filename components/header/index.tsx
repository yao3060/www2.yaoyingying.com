import Logo from "./logo";
import Nav from "./nav";

const Header = () => {
  return (
    <header className="fixed w-full top-0 shadow bg-white z-50">
      <div className="navbar container m-auto  h-[75px]">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex-none">
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
