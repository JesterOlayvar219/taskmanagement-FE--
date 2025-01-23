import React, { useState, useRef, useEffect } from "react";

interface DropdownBtnProps {
  label: string; // The label for the button
  items: string[]; // The dropdown items
  onSelect: (item: string) => void; // Callback when an item is selected
}

const DropdownBtn: React.FC<DropdownBtnProps> = ({
  label,
  items,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-gray-300 text-sm font-bold rounded-xl px-2 py-1 focus:outline-none focus:ring"
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-medium_black_200 border rounded-md shadow-lg z-10">
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-medium_gray_300"
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownBtn;
