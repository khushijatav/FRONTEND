import React from "react";
import Counselors from "../Components/Counselors";

const CounselorsPage = () => {
  return (
    <div className="bg-[#f7fbfa]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold text-slate-900">
          Find Your Counselor
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Meet our experienced professionals and find someone
          who matches your needs.
        </p>
      </div>

      <Counselors />
    </div>
  );
};

export default CounselorsPage;
