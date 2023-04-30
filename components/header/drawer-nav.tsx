import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import DropdownMenu from "./dropdown";

const DrawerNav = () => {
  const router = useRouter();
  const [code, setCode] = useState(false);

  const activeClassName = (pathname: string) => {
    return router.pathname == pathname ? "active" : "";
  };

  function isActive(pathname: string) {
    return router.pathname == pathname;
  }

  useEffect(() => {
    setCode(true);
  }, []);

  return (
    <>
      <ul className="p-4 w-80 bg-base-100 font-medium">
        <li>
          <Link href="/">
            <a
              className={classNames(
                "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                { active: isActive("/") }
              )}
            >
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a
              className={classNames(
                "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                { active: isActive("/about") }
              )}
            >
              About
            </a>
          </Link>
        </li>
        {code && (
          <li>
            <Link href="/posts">
              <a
                className={classNames(
                  "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                  { active: isActive("/posts") }
                )}
              >
                Blog
              </a>
            </Link>
          </li>
        )}

        <DropdownMenu
          rootItem={{ title: "Packages", link: "#" }}
          childrenItems={[
            {
              title: "Swiper",
              link: "/packages/swiper",
            },
            {
              title: "SWR",
              link: "/packages/swr",
            },
            {
              title: "Mega Menu",
              link: "/packages/mega-menu",
            },
          ]}
        />

        <li>
          <Link href="/products">
            <a
              className={classNames(
                "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                { active: isActive("/products") }
              )}
            >
              Products
            </a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a
              className={classNames(
                "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                { active: isActive("/contact") }
              )}
            >
              Contact
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/yao3060/yaoyingying.com">
            <a
              target="_blank"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Github
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default DrawerNav;
