import React from "react";
import error from "../assets/404_Error.svg";
const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        loading="lazy"
        src={error}
        alt="404 Page not found"
        className="w-4/6"
      />
      {/* <h1 className="text-8xl font-bold text-rose-600">404</h1> */}
      <p className="text-5xl font-medium">Page not found!</p>
    </div>
  );
};

export default PageNotFound;
