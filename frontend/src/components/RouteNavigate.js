import { ChevronLeft, ChevronRight, Home, LayoutDashboard } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RouteNavigate = ({ page }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goForword = () => {
    navigate(1);
  };
  return (
    <>
      <div className="flex items-center justify-between my-2">
        <p className="text-2xl font-medium">{page}</p>
        <div className="space-x-4">
          <button onClick={goBack} className="p-1 bg-slate-200 rounded-full">
            <ChevronLeft />
          </button>
          <button onClick={goForword} className="p-1 bg-slate-200 rounded-full">
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default RouteNavigate;
