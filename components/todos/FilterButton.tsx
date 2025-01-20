import React from "react";

interface FilterButtonProps {
  name: string;
  isPressed: boolean;
  dispatch: (action: FilterAction) => void;
}

interface FilterAction {
  type: "SET_FILTER";
  payload: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ name, isPressed, dispatch }) => {
  return (
    <button
      type="button"
      // className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-400 border-gray-200 rounded-1-md hover:bg-gray-600 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-700"
      className="p-0.5 px-2 border border-transparent hover:border-red-500 focus:border-red-800 active:shadow-lg active:shadow-red-500/40 transition-all duration-200 ease-in-out"
      aria-pressed={isPressed}
      onClick={() =>
        dispatch({
          type: "SET_FILTER",
          payload: name,
        })
      }
    >
      <span className="hidden">Show </span>
      <span>{name}</span>
      <span className="hidden"> tasks</span>
    </button>
  );
};

export default FilterButton;
