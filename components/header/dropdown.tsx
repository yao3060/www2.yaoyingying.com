import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

type MenuItem = {
  title: string;
  link: string;
};

const DropdownMenu = ({
  rootItem,
  childrenItems,
}: {
  rootItem: MenuItem;
  childrenItems: MenuItem[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <li ref={parent}>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 "
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex-1 text-left whitespace-nowrap">
          {rootItem.title}
        </span>
        <svg
          className={classNames("fill-current transition-all", {
            "-rotate-90": !expanded,
          })}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </button>
      {expanded && (
        <ul className={classNames("transition-all py-2 space-y-2")}>
          {childrenItems.map((item) => (
            <li key={item.link}>
              <Link href={item.link}>
                <a className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-5 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;
