import React from "react";

import err from "../assets/404.svg";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="h-full p-10 flex flex-col justify-center items-center">
      <div className="w-full h-96">
        <img
          loading="lazy"
          src={err}
          alt="404 Page not found"
          className="w-full h-full"
        />
      </div>

      {/* <h1 className="text-8xl font-bold text-rose-600">404</h1> */}
      <p className="text-4xl font-bold text-blue-600">Page Not Found!</p>
      <p>
        Back to{" "}
        <Link className="text-blue-600" to={"/dashboard"}>
          Dashboard
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
