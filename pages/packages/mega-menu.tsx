import React, { useEffect } from "react";
import Layout from "layouts/one-column-layout";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import ExampleMegaMenu from "components/example/mega-menu";

export default function PackageMegaMenu() {
  const code = `
import React, { useState } from "react";
import classNames from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useClickAway } from "react-use";

export default function ExampleMegaMenu() {
  const [parent] = useAutoAnimate<HTMLElement>();
  const [isHidden, setIsHidden] = useState(true);

  useClickAway(parent, () => {
    setIsHidden(true);
  });

  return (
    <nav
      ref={parent}
      className="relative bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900"
    >
      <div className="border w-full flex flex-wrap justify-between items-center px-4 md:px-6 py-2.5">
        <a href="#" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Logo
          </span>
        </a>

        <div
          id="mega-menu-full-image"
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        >
          <ul className="flex flex-col mt-4 text-sm font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <button
                onMouseEnter={() => {
                  setIsHidden(false);
                }}
                data-collapse-toggle="mega-menu-full-image-dropdown"
                className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Company
                <svg
                  className="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Marketplace
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Resources
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {!isHidden && (
        <div
          onMouseLeave={() => setIsHidden(true)}
          className={classNames(
            "absolute w-full z-50 mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600"
          )}
        >
          <div className="grid py-5 px-4 mx-auto max-w-screen-xl text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
            <ul
              className="hidden mb-4 space-y-4 md:mb-0 md:block"
              aria-labelledby="mega-menu-full-image-button"
            >
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Online Stores
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Segmentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Marketing CRM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Online Stores
                </a>
              </li>
            </ul>
            <ul className="mb-4 space-y-4 md:mb-0">
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Our Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  License
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Resources
                </a>
              </li>
            </ul>
            <a
              href="#"
              className="p-8 text-left bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
              style={{
                backgroundImage:
                  "url(https://flowbite.com/docs/images/dashboard-overview.png)",
              }}
            >
              <p className="mb-5 max-w-xl font-extrabold tracking-tight leading-tight text-white">
                Preview the new Flowbite dashboard navigation.
              </p>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700"
              >
                Get started
                <svg
                  className="ml-1 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
    `;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout title="MegaMenu: React + TailWindCss Example">
      <div className="pb-10">
        <ExampleMegaMenu />
        <h3 className="mt-20 mb-5 text-2xl font-bold">Code Example</h3>
        <pre>
          <code className={`language-javascript`}>{code}</code>
        </pre>
      </div>
    </Layout>
  );
}
