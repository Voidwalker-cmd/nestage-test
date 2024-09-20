import React, { useState } from "react";
import { DropdownProps } from "../../types/types";
import { RiArrowUpSLine } from "@remixicon/react";

const Dropdown: React.FC<DropdownProps> = ({ children, icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {icon && <span className="mr-2">{icon}</span>}
          {label}
          <span
            className={`ml-2 -mr-1 h-5 w-5 transition-transform duration-300 ease-in-out ${
              isOpen ? "-rotate-180" : "rotate-0"
            }`}
          >
            <RiArrowUpSLine aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
