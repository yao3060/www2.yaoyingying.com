import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="supports-backdrop-blur:bg-white/95 sticky top-0 z-40 w-full flex-none bg-white backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10">
      <div className="container mx-auto">
        <div className="border-b border-slate-900/10 py-4 lg:border-0">
          <div className="relative flex items-center">
            <Link
              className="mr-3 w-[2.0625rem] flex-none overflow-hidden md:w-auto"
              href="/"
            >
              Blog
            </Link>

            <div className="relative ml-auto hidden items-center lg:flex">
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
