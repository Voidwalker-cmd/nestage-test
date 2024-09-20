import { HeaderProps } from "../../types/types";
import Search from "../molecules/Search";
import { RiLinkUnlinkM, RiLogoutBoxLine } from "@remixicon/react";
import Dropdown from "../molecules/Dropdown";
import DropdownItem from "../molecules/DropdownItem";
import ConnectToWallet from "../molecules/ConnectToWallet";
import { useDisconnect } from "@thirdweb-dev/react";
import { useStateContext } from "../../context/web3";
import { useEffect, useState } from "react";
import { Axios, Toast } from "../../utils/libs";
import { useNavigate } from "react-router-dom";

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const disconnect = useDisconnect();
  const navigate = useNavigate();

  const { status } = useStateContext();

  const [connectionStatus, setConnectionStatus] = useState<string | undefined>(
    ""
  );

  useEffect(() => {
    status !== null && status !== "" && setConnectionStatus(status);
  }, [status]);
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <button
        onClick={() => setSidebarOpen((open) => !open)}
        className="md:hidden focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
      <Search />
      <div className="flex gap-5 items-center">
        <ConnectToWallet />
        <Dropdown label="Menu">
          {connectionStatus !== "disconnected" ? (
            <DropdownItem
              className="font-bold text-lg"
              onClick={() => disconnect()}
              icon={<RiLinkUnlinkM />}
            >
              Unlink Wallet
            </DropdownItem>
          ) : (
            <div className="block text-center p-2 text-rose-500 italic">
              Wallet not linked
            </div>
          )}
          <DropdownItem
            className="font-bold text-lg"
            onClick={async () => {
              await Axios.get("/logout");
              await disconnect();
              Toast("success", "Logged out successfully");
              navigate("/");
            }}
            icon={<RiLogoutBoxLine />}
          >
            Logout
          </DropdownItem>
        </Dropdown>
        {/* <Select disabled={!!1} defaultValue="1">
          <SelectItem value="1">Menu</SelectItem>
          <SelectItem
            className="font-bold text-lg"
            icon={RiLinkUnlinkM}
            value="2"
          >
            Unlink Wallet
          </SelectItem>
          <SelectItem
            className="font-bold text-lg"
            icon={RiLogoutBoxLine}
            value="3"
          >
            Logout
          </SelectItem>
        </Select> */}
      </div>
    </header>
  );
};

export default Header;
