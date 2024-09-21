import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DropdownNotificationsProps,
  RootState,
  getNotificationsRaw,
} from "../../../types/types";
import { Static } from "../../../assets/img";
import { CloseIconL } from "../../atom/Icons";
import { useDispatch } from "../../../hooks";
import { getNotifications } from "../../../features/client";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const DropdownNotifications = ({
  align,
  dropdownOpen,
  setDropdownOpen,
}: DropdownNotificationsProps) => {
  const dispatch = useDispatch();
  const { notifications: noti, userId } = useTypedSelector(
    (state) => state.client
  );
  const [notis, setNotis] = useState<getNotificationsRaw[]>([]);

  const [hasNew, setHasNew] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        (trigger.current && trigger.current.contains(target as Node))
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen, setDropdownOpen]);

  // Close if the ESC key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen, setDropdownOpen]);

  const initX = async () => {
    dispatch(getNotifications({ userId: userId! }));
  };

  useEffect(() => {
    userId && initX();
  }, []);

  useEffect(() => {
    const flipped = noti.slice().reverse();
    setNotis(flipped);
  }, [noti]);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="sr-only">Notifications</span>
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current text-slate-500 dark:text-slate-400"
            d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z"
          />
          <path
            className="fill-current text-slate-400 dark:text-slate-500"
            d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
          />
        </svg>
        {hasNew && (
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#182235] rounded-full"></div>
        )}
      </button>

      <div
        className={`${
          dropdownOpen ? "inline" : "hidden"
        } origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        <div ref={dropdown} className="relative">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <CloseIconL className="w-6 h-6 absolute text-red-400 hover:text-red-700 font-semibold hover:bg-red-100 p-0.5 rounded-lg cursor-pointer right-2 top-0" />
          <ul>
            {notis.length ? (
              <>
                {notis.map((item, index) => (
                  <li
                    key={`adicmoskd-${index}`}
                    className="border-b border-slate-200 dark:border-slate-700 last:border-0"
                  >
                    <span className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20">
                      <span className="text-sm mb-2">
                        {item.type === "new"
                          ? "🆕"
                          : item.type === "announce"
                          ? "📢"
                          : item.type === "update"
                          ? "🔄"
                          : item.type === "delete"
                          ? "🗑️"
                          : item.type === "error"
                          ? "🔴"
                          : item.type === "success"
                          ? "🟢"
                          : "🔥"}{" "}
                        <span className="font-medium text-slate-800 dark:text-slate-100">
                          {item.title}
                        </span>{" "}
                        {item.text}
                      </span>
                      <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                        {item.createdAt}
                      </span>
                    </span>
                  </li>
                ))}
                {/* <li className="border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <Link
                    className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                    to="#0"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="block text-sm mb-2">
                      🚀
                      <span className="font-medium text-slate-800 dark:text-slate-100">
                        Say goodbye to paper receipts!
                      </span>{" "}
                      Sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim.
                    </span>
                    <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                      Jan 24, 2020
                    </span>
                  </Link>
                </li> */}
              </>
            ) : (
              <div className="flex flex-col gap-3 my-5 py-1 items-center justify-center">
                <img src={Static.no_data} alt="" width={55} height={55} />
                No Notifications.
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotifications;
