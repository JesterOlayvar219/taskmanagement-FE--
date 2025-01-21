import React from 'react';

interface FilterProps {
  listHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  headingText: string;
  filterList: React.ReactNode;
}

const Filter: React.FC<FilterProps> = ({listHeadingRef, headingText, filterList}) => {
  return(
    <div className='flex flex-row justify-between items-center  border bg-gray-400 p-2 px-2'>
      <div>
          <h2
            id="list-heading"
            className="text-green-950"
            tabIndex={-1}
            ref={listHeadingRef}
          >
             {headingText}left!
          </h2>
        </div>
        <div className="inline-flex rounded-md gap-6" role="group">
          {filterList}
        </div>
    </div>
  );
}

export default Filter;