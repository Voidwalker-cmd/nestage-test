import { useState } from "react";

import { SidebarProps } from "../../../types/types";
import DropdownNotifications from "../../molecules/Dashboard/Notifications";
import ThemeToggle from "../../molecules/Dashboard/ThemeToggle";
import UserMenu from "../../molecules/Dashboard/UserMenu";
import LevelStatus from "../../molecules/Dashboard/LevelStatus";
import Logo from "../../molecules/Logo";

function Header({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(!!0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(!!0);

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <Logo show={!!0} />
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <LevelStatus />
            {/* <div onClick={() => setDropdownOpen(!dropdownOpen)}> */}
            <DropdownNotifications
              align="right"
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
            {/* </div> */}
            {/* <ThemeToggle /> */}
            {/* Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
