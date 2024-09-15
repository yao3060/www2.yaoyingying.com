import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10  bg-white supports-backdrop-blur:bg-white/95  ">
      <div className=" container mx-auto">
        <div className="py-4 border-b border-slate-900/10   lg:border-0 ">
          <div className="relative flex items-center">
            <a
              className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
              href="/"
            >
              Blog
            </a>

            <div className="relative hidden lg:flex items-center ml-auto">
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
