import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

const Footer = () => {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const [fixedFooter, setFixedFooter] = useState(false);

  useEffect(() => {
    const rect = intersectionRef?.current?.getBoundingClientRect();
    if (rect && rect.bottom < window.innerHeight) {
      setFixedFooter(true);
    }
  }, []);

  return (
    <footer
      ref={intersectionRef}
      className={classNames({
        "w-full bg-[#111] ": true,
        "fixed bottom-0 transition ease-in-out duration-1000": fixedFooter,
      })}
    >
      <div className="container relative m-auto py-9">
        {!fixedFooter && (
          <a
            className="back-to-top -rotate-45 block cursor-pointer absolute right-0 rounded-tr-2xl -top-6 text-gray-300 bg-[#111] text-2xl font-thin w-12 h-12 text-center"
            title="Back To Top"
          >
            <FaAngleDoubleUp
              onClick={() => {
                window.scrollTo({
                  top: 100,
                  behavior: "smooth",
                });
              }}
              className="mx-auto mt-3 rotate-45"
            />
          </a>
        )}

        <p className="text-center text-gray-300">
          Copyright &copy; 2022 姚迎迎 – BY NextJS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
