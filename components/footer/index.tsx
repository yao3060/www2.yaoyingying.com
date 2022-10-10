import { FaAngleDoubleUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111]">
      <div className="container relative m-auto py-9">
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
        <p className="text-center text-gray-300">
          Copyright &copy; 2022 姚迎迎 – BY NextJS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
