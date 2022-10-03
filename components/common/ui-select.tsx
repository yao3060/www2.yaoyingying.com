import React, { useEffect, useState } from "react";
import classNames from "classnames";

type Option = {
  label: string;
  value: string;
};
interface Props {
  className?: string;
  options: Option[] | [];
  value: string | undefined;
  onChange: (data?: Option) => void;
}

export default function UISelect(props: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<Option | undefined>(undefined);

  const handleSelect = (data?: Option) => {
    setValue(data);
    props.onChange(data);
  };

  useEffect(() => {
    const selected = props.options.find(
      (option) => option.value == props.value
    );
    if (selected) setValue(selected);
  }, [props]);

  return (
    <div
      className={`relative ${props.className}`}
      onClick={() => setShow((prev) => !prev)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      <div className="flex justify-between items-center h-12 border rounded-lg">
        <span className="min-w-[100px] px-2.5 text-gray-700">
          {value ? value.label : "Category"}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setValue(undefined);
            handleSelect(undefined);
          }}
          className={classNames(
            "clear-btn pr-2  text-gray-400 cursor-pointer visible",
            { invisible: value === undefined, visible: value !== undefined }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6  transition duration-300 ease-in-out hover:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <span className="caret h-12 border-l pt-3 px-2 text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames(
              "w-6 h-6 transition duration-300 ease-in-out",
              { "rotate-180": show }
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>
      <ul
        className={classNames(
          "absolute border rounded-lg bg-white text-gray-500 shadow-lg min-w-[150px] max-h-40 overflow-y-auto top-[50px] z-50",
          { hidden: !show, block: show }
        )}
      >
        {props.options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option)}
            data-value={option.value}
            className={classNames(
              "px-2.5 py-2 cursor-pointer hover:bg-slate-100 border-b",
              { "bg-slate-100": option.value === value?.value }
            )}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
