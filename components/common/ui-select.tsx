import React, { useState } from "react";
import classNames from "classnames";
import {
  HiChevronRight,
  HiCheck,
  HiOutlineX,
  HiOutlineChevronDown,
} from "react-icons/hi";

export type Option = {
  label: string;
  value: string | number;
};
interface Props {
  className?: string;
  options: Option[] | [];
  value: Option | undefined;
  onChange: (data?: Option) => void;
}

export default function UISelect(props: Props) {
  const [show, setShow] = useState<boolean>(false);

  const handleSelect = (data?: Option) => {
    props.onChange(data);
  };

  function isSelected(option: Option) {
    return props.value && option.value == props.value.value;
  }

  return (
    <div
      className={`relative ${props.className}`}
      onClick={() => setShow((prev) => !prev)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      <div className="flex justify-between items-center h-12 border rounded-lg">
        <span className="min-w-[100px] px-2.5 text-gray-700">
          {props.value ? props.value.label : "Category"}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSelect(undefined);
          }}
          className={classNames(
            "clear-btn pr-2  text-gray-400 cursor-pointer visible",
            { invisible: props.value === undefined }
          )}
        >
          <HiOutlineX className="w-5 h-5  transition duration-300 ease-in-out hover:rotate-180" />
        </button>
        <span className="caret h-12 border-l pt-3 px-2 text-gray-500 cursor-pointer">
          <HiOutlineChevronDown
            className={classNames(
              "w-6 h-6 transition duration-300 ease-in-out",
              { "rotate-180": show }
            )}
          />
        </span>
      </div>
      <ul
        className={`absolute border rounded-lg bg-white text-gray-500 shadow-lg min-w-[200px] max-h-60 overflow-y-auto top-[50px] z-50 ${
          show ? "block" : "hidden"
        }`}
      >
        {props.options.map((option) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(option);
              setShow(false);
            }}
            data-value={option.value}
            className={classNames(
              "flex items-center px-2.5 py-2 cursor-pointer hover:bg-slate-100 border-b",
              { "bg-slate-100": isSelected(option) }
            )}
          >
            <span className="mr-2.5">
              {isSelected(option) ? <HiCheck /> : <HiChevronRight />}
            </span>
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
