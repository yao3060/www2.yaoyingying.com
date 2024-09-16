"use client";
function BackToTop() {
  return (
    <a
      className="back-to-top rounded-tr-2xl flex items-center justify-center
    absolute w-12 h-12 -top-6 right-0  -rotate-45 bg-slate-800 text-slate-100 hover:text-slate-300"
      href="#page"
      title="Back To Top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 rotate-45"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 18.75 7.5-7.5 7.5 7.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </a>
  );
}

export default BackToTop;
