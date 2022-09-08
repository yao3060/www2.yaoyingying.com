import Link from "next/link";

const Nav = () => {
  return (
    <nav className="navigation">
      <ul className="flex">
        <li>
          <Link href="/">
            <a className="px-5 block tracking-wide leading-[75px]">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="px-5 block tracking-wide leading-[75px]">About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className="px-5 block tracking-wide leading-[75px]">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
