import React, { useState } from "react";

const Tab = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number, className: string) =>
    toggleState === index ? className : "";

  return (
    <div className="w-96 h-60">
      <ul className="h-12 flex list-none text-lg">
        <li
          className={`w-1/2 flex justify-center items-center bg-[#80808013] cursor-pointer relative ${getActiveClass(
            1,
            "active:bg-[#eeeded]"
          )}`}
          onClick={() => toggleTab(1)}
        >
          Tab 1
        </li>
        <li
          className={`w-1/2 flex justify-center items-center bg-[#80808013] cursor-pointer relative ${getActiveClass(
            2,
            "active:bg-[#eeeded]"
          )}`}
          onClick={() => toggleTab(2)}
        >
          Tab 2
        </li>
        <li
          className={`w-1/2 flex justify-center items-center bg-[#80808013] cursor-pointer relative ${getActiveClass(
            3,
            "active:bg-[#eeeded]"
          )}`}
          onClick={() => toggleTab(3)}
        >
          Tab 3
        </li>
      </ul>
      <div className="contain-content">
        <div className={`bg-[#eeeded] p-3 ${getActiveClass(1, "active:flex")}`}>
          <h2 className="text-black">Lorem</h2>
        </div>
        <div className={`bg-[#eeeded] p-3 ${getActiveClass(2, "active:flex")}`}>
          <h2 className="text-black">Ipsum</h2>
        </div>
        <div className={`bg-[#eeeded] p-3 ${getActiveClass(3, "active:flex")}`}>
          <h2 className="text-black">Doloar</h2>
        </div>
      </div>
    </div>
  );
};

export default Tab;
