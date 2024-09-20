import React, { ReactNode } from "react";
// import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import { Formatter, Link } from "../../../config/utils";
import EditMenu from "./EditMenu";

interface DashboardCardProps {
  children: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children }) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-primary-700 dark:bg-primary-600 shadow-lg border border-primary-600 dark:border-primary rounded-xl">
      {/* Icon */}
      {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      {/* Menu button */}
      {/* <EditMenu align="right" className="relative inline-flex">
        <li>
          <Link
            className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
            to="#0"
          >
            Option 1
          </Link>
        </li>
        <li>
          <Link
            className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
            to="#0"
          >
            Option 2
          </Link>
        </li>
        <li>
          <Link
            className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
            to="#0"
          >
            Remove
          </Link>
        </li>
      </EditMenu> */}
      {children}
    </div>
  );
};

export default DashboardCard;
