import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../organisms/Sidebar";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
// import { useDispatch } from "../../../hooks";

import {
  coinbaseWallet,
  metamaskWallet,
  okxWallet,
  ThirdwebProvider,
  trustWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { Binance, BinanceTestnet } from "@thirdweb-dev/chains";
import { CLIENT_ID, NETWORK_MODE } from "../../../config";
import { StateContextProvider } from "../../../context/web3";

const activeChainT = BinanceTestnet;
const activeChainM = Binance;

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(!!1);

  useEffect(() => {
    setSidebarOpen(!!0);
  }, [location.pathname]);

  return (
    <ThirdwebProvider
      clientId={CLIENT_ID}
      autoConnect={!!0}
      activeChain={NETWORK_MODE === "mainnet" ? activeChainM : activeChainT}
      supportedChains={[Binance, BinanceTestnet]}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        trustWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
        okxWallet(),
      ]}
    >
      <StateContextProvider>
        <div className="flex h-screen overflow-hidden bg-gray-100">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div
            className={`relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden`}
          >
            <Header setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="px-4 lg:px-8 pt-8 pb-20 lg:pb-12 w-full h-full max-w-9xl mx-auto bg-gray-50">
                <Outlet />
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </StateContextProvider>
    </ThirdwebProvider>
  );
};

export default DashboardLayout;
