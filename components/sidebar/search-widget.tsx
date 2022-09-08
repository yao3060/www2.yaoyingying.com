import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { useDebounce } from "usehooks-ts";

const SearchWidget = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce<string>(keyword, 500);
  const [s, setS] = useQueryParam("s", withDefault(StringParam, ""));

  // Fetch API (optional)
  useEffect(() => {
    console.log('Triggers when "debouncedValue" changes', debouncedValue);
    setS(debouncedValue);
  }, [debouncedValue]);

  const search = async () => {
    console.log("keyword:", keyword);

    if (keyword === "") {
      alert("keyword is empty.");
      return;
    }

    if (router.route.includes("posts")) {
      router.push({
        pathname: "/",
        query: { s },
      });
    }
  };

  return (
    <aside className="widget widget_search">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={search}
            className={`btn btn-square ${isLoading ? "loading" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`"h-6 w-6 ${isLoading ? "hidden" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SearchWidget;
