import React, { useState, useRef, useEffect } from "react";
import { DropdownEditMenuProps } from "../../../types/types";

const DropdownEditMenu: React.FC<DropdownEditMenuProps> = ({
  children,
  align = "left",
  ...rest
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(!!0);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLUListElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div {...rest}>
      <button
        ref={trigger}
        className={`rounded-full ${
          dropdownOpen
            ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
            : "text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
        </svg>
      </button>
      {/* <div
        className={`origin-top-right z-10 absolute top-full min-w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        <ul
          ref={dropdown}
          onFocus={() => setDropdownOpen(!!1)}
          onBlur={() => setDropdownOpen(!!0)}
        >
          {children}
        </ul>
      </div> */}
    </div>
  );
};

export default DropdownEditMenu;
