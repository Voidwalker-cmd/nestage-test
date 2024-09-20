import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  coinbaseWallet,
  metamaskWallet,
  okxWallet,
  ThirdwebProvider,
  trustWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import "./main.css";
import { CLIENT_ID, NETWORK_MODE } from "./config";
import { StateContextProvider } from "./context/Web3";
import { Binance, BinanceTestnet } from "@thirdweb-dev/chains";
import { ModalProvider } from "./context/ModalContext";
import Modal from "./components/molecules/Dashboard/Modal";
import { Toaster } from "react-hot-toast";
import { store } from "./features/store";
import { Provider } from "react-redux";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChainT = BinanceTestnet;
const activeChainM = Binance;

// export const client = createThirdwebClient({
//   clientId: CLIENT_ID,
// });

const container = document.getElementById("nestage");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <NextUIProvider>
      <ThirdwebProvider
        clientId={CLIENT_ID}
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
        <Router>
          <StateContextProvider>
            <ModalProvider>
              <Toaster />
              <App />
              <Modal />
            </ModalProvider>
          </StateContextProvider>
        </Router>
      </ThirdwebProvider>
    </NextUIProvider>
  </Provider>
  // </React.StrictMode>
);
