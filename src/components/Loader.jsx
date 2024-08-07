import React from "react";
import { tailspin, pinwheel } from 'ldrs'

tailspin.register()

// Default values shown


function Loader({ isLoading }) {
  return isLoading ? (
    <div className="backdrop-opacity-10 fixed h-[100vh] w-[100vw] flex items-center justify-center ">
      <l-tailspin
        size="50"
        stroke="6"
        speed="0.9"
        color="orange"
      ></l-tailspin>
    </div>
  ) : null;
}

export default Loader;