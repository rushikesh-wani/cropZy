import { ArrowRight, Leaf, Sparkles, Truck, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-violet-50 h-screen">
      <section className="w-full h-full flex justify-center items-center">
        <div className="">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-center my-4">
              <span className="inline-flex items-center gap-2 px-4 py-1 bg-violet-200 border border-violet-600 rounded-xl shadow-md">
                <Sparkles className="size-5 text-violet-950" /> Sell Farm
                Products Hassle-free
              </span>
            </p>
            <h1 className="text-2xl font-bold sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-violet-400 to-gray-600">
                Bridging Farms to Your Table, Fresh and Fast
              </span>
            </h1>
            <p className="mt-5 text-gray-600 text-base sm:text-lg">
              CropZy connects farmers directly with customers, eliminating
              middlemen for fair prices and fresh produce. Our seamless platform
              ensures hassle-free selling for farmers and easy access to
              farm-fresh goods for consumers. Empowering farmers, delivering
              freshness.
            </p>

            <Link
              to={"/signup"}
              className="my-4 inline-flex items-center gap-1 px-4 py-2 font-semibold text-white transition-all duration-200 bg-violet-600 rounded-lg hover:bg-violet-700 focus:bg-violet-700"
            >
              Let's Start <ArrowRight className="size-5" />
            </Link>

            <div className="text-gray-700 font-medium grid grid-cols-1 px-20 mt-8 text-left gap-x-12 gap-y-8 sm:grid-cols-3 sm:px-0">
              <div className="p-4 flex flex-col gap-2 items-center bg-white rounded-xl shadow-xl hover:-translate-y-4 hover:duration-300">
                <div className="p-2 rounded-full bg-violet-300/50">
                  <Leaf className="text-black" />
                </div>
                <p className="ml-3 text-sm text-center">
                  Fresh from the farm, straight to your plate!
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2 items-center bg-white rounded-xl shadow-xl hover:-translate-y-4 hover:duration-300">
                <div className="p-2 rounded-full bg-violet-300/50">
                  <User className="text-black" />
                </div>
                <p className="ml-3 text-sm text-center">
                  Fair prices, zero middlemen empowering farmers!
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2 items-center bg-white rounded-xl shadow-xl hover:-translate-y-4 hover:duration-300">
                <div className="p-2 rounded-full bg-violet-300/50">
                  <Truck className="text-black" />
                </div>
                <p className="ml-3 text-sm text-center">
                  Fast, reliable, and hassle-free farm-to-door delivery!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
