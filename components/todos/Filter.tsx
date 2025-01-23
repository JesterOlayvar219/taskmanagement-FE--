import React from "react";

interface FilterProps {
  listHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  headingText: string;
  filterList: React.ReactNode;
}

const Filter: React.FC<FilterProps> = ({
  listHeadingRef,
  headingText,
  filterList,
}) => {
  return (
    <div className="flex flex-row justify-center items-center p-2 px-2">
      <span
        id="list-heading"
        className="text-medium_gray_300"
        tabIndex={-1}
        ref={listHeadingRef}
      >
        {headingText}left!
      </span>
      <div className="inline-flex rounded-md gap-4" role="group">
        {filterList}
      </div>
    </div>
  );
};

export default Filter;
