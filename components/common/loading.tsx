import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="absolute  transition-opacity w-full h-96">
      <div className="absolute w-full text-center top-1/2 -mt-5">
        <FaSpinner className="inline w-10 h-10 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
