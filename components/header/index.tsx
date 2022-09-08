import Logo from "./logo";
import Nav from "./nav";

const Header = () => {
  return (
    <header className="fixed w-full top-0 shadow bg-white z-50">
      <div className="container m-auto flex justify-between h-[75px] items-center">
        <Logo />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
