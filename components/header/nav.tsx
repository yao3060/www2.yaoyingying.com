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
          <Link href="/posts">
            <a className="px-5 block tracking-wide leading-[75px]">Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <a className="px-5 block tracking-wide leading-[75px]">Products</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className="px-5 block tracking-wide leading-[75px]">Contact</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/yao3060/yaoyingying.com">
            <a
              className="px-5 block tracking-wide leading-[75px]"
              target="_blank"
            >
              Github
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
