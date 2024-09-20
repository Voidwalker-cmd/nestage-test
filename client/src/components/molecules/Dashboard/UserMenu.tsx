import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/Web3";
import { shortenHexString } from "../../../config/utils";
import { useDisconnect } from "@thirdweb-dev/react";

// import UserAvatar from "../images/user-avatar-32.png";

interface UserMenuProps {
  align: "left" | "right";
}

const UserMenu: React.FC<UserMenuProps> = ({ align }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(!!0);
  const { address } = useStateContext();
  const [userAddress, setUserAddress] = useState<string>("");

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  const disconnect = useDisconnect();

  const disconnectWallet = async () => {
    sessionStorage.removeItem("temp");
    sessionStorage.removeItem("MV938aO");
    localStorage.removeItem("ref");
    await disconnect();
    navigate("/", { replace: !!1 });
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      setDropdownOpen(!!0);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(!!0);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    address !== null && setUserAddress(address);
  }, [address]);

  useEffect(() => {
    if (address === null || address === "") disconnectWallet();
  }, [address]);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <img
          className="w-8 h-8 rounded-full"
          src={""}
          width="32"
          height="32"
          alt="User"
        /> */}
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
            {shortenHexString(userAddress)}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      {/* show={dropdownOpen}
      enter="transition ease-out duration-200 transform"
      enterStart="opacity-0 -translate-y-2"
      enterEnd="opacity-100 translate-y-0"
      leave="transition ease-out duration-200"
      leaveStart="opacity-100"
      leaveEnd="opacity-0" */}
      <div
        className={`${
          dropdownOpen ? "inline" : "hidden"
        } origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(!!0)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              {shortenHexString(userAddress)}
            </div>
            {/* <div className="text-xs text-slate-500 dark:text-slate-400 italic">
              {shortenHexString(userAddress)}
            </div> */}
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <span
                className="cursor-pointer font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                onClick={disconnectWallet}
              >
                Disconnect Wallet
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
