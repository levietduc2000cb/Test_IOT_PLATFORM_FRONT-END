import React from 'react';

const DashBoardCart = () => {
  return (
    <div className="max-w-xs w-full max-h-32 h-full bg-[#FF5722] p-4 shadow-xl">
      <div className="text-3xl font-extrabold text-[#FFBDA8]">Temperature</div>
      <div className="text-6xl text-white">
        25
        <span>
          <sup> o</sup>C
        </span>
      </div>
    </div>
  );
};

export default DashBoardCart;
