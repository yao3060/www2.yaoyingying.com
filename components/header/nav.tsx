import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const [code, setCode] = useState(false);

  console.log("Nav:", router);

  const activeClassName = (pathname: string) => {
    return router.pathname == pathname ? "active" : "";
  };

  useEffect(() => {
    setCode(true);
  }, []);

  return (
    <>
      <ul className="menu menu-horizontal p-0">
        <li>
          <Link href="/">
            <a className={activeClassName("/")}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className={activeClassName("/about")}>About</a>
          </Link>
        </li>
        {code && (
          <li>
            <Link href="/posts">
              <a className={activeClassName("/posts")}>Blog</a>
            </Link>
          </li>
        )}
        <li tabIndex={0}>
          <Link href="#">
            <a className={activeClassName("/packages")}>
              Packages
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
          </Link>
          <ul className="p-0.5 w-48 bg-base-100">
            <li>
              <Link href="/packages/swiper">
                <a>Swiper</a>
              </Link>
            </li>
            <li>
              <Link href="/packages/mega-menu">
                <a>Mega Menu</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/products">
            <a className={activeClassName("/products")}>Products</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className={activeClassName("/contact")}>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/yao3060/yaoyingying.com">
            <a target="_blank">Github</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
