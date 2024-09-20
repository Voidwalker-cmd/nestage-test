import { RiCloseLargeLine } from "@remixicon/react";
import { SidebarProps } from "../../types/types";
import { NLink } from "../../utils";

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`absolute lg:relative inset-y-0 left-0 w-48 bg-white border-r shadow-lg z-50 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex p-4 border-b relative">
        <h1 className="text-xl font-bold">Nestage Admin</h1>
        <span
          className={`${
            !sidebarOpen ? "hidden" : "block"
          } bg-white absolute -right-10 border-l-0 top-5 border px-2 py-1.5 rounded`}
          onClick={() => setSidebarOpen(!!0)}
        >
          <RiCloseLargeLine className=" text-rose-500 hover:text-rose-700 cursor-pointer" />
        </span>
      </div>
      <nav className="p-4 space-y-2">
        <NLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 hover:bg-blue-600 text-white block py-2 px-4 rounded"
              : "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-200 block py-2 px-4 rounded"
          }
        >
          Home
        </NLink>
        <NLink
          to="/dashboard/level/1"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 hover:bg-blue-600 text-white block py-2 px-4 rounded"
              : "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-200 block py-2 px-4 rounded"
          }
        >
          Level One
        </NLink>
        <NLink
          to="/dashboard/level/2"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 hover:bg-blue-600 text-white block py-2 px-4 rounded"
              : "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-200 block py-2 px-4 rounded"
          }
        >
          Level Two
        </NLink>
        <NLink
          to="/dashboard/statistics"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 hover:bg-blue-600 text-white block py-2 px-4 rounded"
              : "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-200 block py-2 px-4 rounded"
          }
        >
          Statistics
        </NLink>
        <NLink
          to="/dashboard/notifications"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 hover:bg-blue-600 text-white block py-2 px-4 rounded"
              : "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-200 block py-2 px-4 rounded"
          }
        >
          Notifications
        </NLink>
        <NLink
          to="/dashboard/settings"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 hover:bg-blue-600 text-white block py-2 px-4 rounded"
              : "bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-200 block py-2 px-4 rounded"
          }
        >
          Settings
        </NLink>
      </nav>
    </div>
  );
};

export default Sidebar;
