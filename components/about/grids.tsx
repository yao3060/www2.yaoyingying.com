import React from "react";
import { FaRegThumbsUp, FaRegLightbulb, FaRegEye } from "react-icons/fa";

export default function Grids() {
  return (
    <div className="bg-cyan-500 py-36">
      <div className="container m-auto">
        <div className="grid grid-cols-3 gap-10 text-center  font-light">
          <div className="shadow py-20 bg-white">
            <FaRegThumbsUp className="text-emerald-500 text-[72px] m-auto" />
            <h3 className="text-2xl py-5">Responsibility</h3>
            <p className="text-lg text-gray-400">We are serious people</p>
          </div>
          <div className="shadow py-20 bg-white">
            <FaRegLightbulb className="text-emerald-500 text-[72px] m-auto" />
            <h3 className="text-2xl py-5">Responsibility</h3>
            <p className="text-lg text-gray-400">We are passionnate</p>
          </div>
          <div className="shadow py-20 bg-white">
            <FaRegEye className="text-emerald-500 text-[72px] m-auto" />
            <h3 className="text-2xl py-5">Responsibility</h3>
            <p className="text-lg text-gray-400">We are determined</p>
          </div>
        </div>
      </div>
    </div>
  );
}
