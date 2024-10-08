import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPageLayout from "./components/templates/layout/LandingPageLayout";
import Preloader from "./components/molecules/Preloader";
import { ColorModeProvider } from "./context/ColorModeContext";
import DashboardLayout from "./components/templates/layout/DashboardLayout";
import { DeviceProvider } from "./context/DeviceModeContext";
import {
  useChainId,
  useDisconnect,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NETWORK_MODE } from "./config";
import { useModal } from "./context/ModalContext";
import NotificationProvider from "./components/atom/Notification/NotificationProvider";
import { getRef, getUser, getWallets } from "./features/client";
import { useDispatch } from "./hooks";
import { useStateContext } from "./context/Web3";
import Terms from "./components/organisms/Landing/Terms";
import Documentation from "./components/organisms/Landing/Documentation";
import Exaggerate from "./components/organisms/Landing/Exaggerate";

// lazyly importing all pages to aid the spinner
const Home = lazy(() => import("./pages/Home"));
// const PdfViewerPage = lazy(() => import("./pages/PdfViewerPage"));

const Dashboard = lazy(() => import("./pages/Dashboard"));

const App = () => {
  const navigate = useNavigate();
  const { address } = useStateContext();
  const { isModalVisible, hideModal } = useModal();
  const chainId = useChainId();
  const isMismatched = useNetworkMismatch();
  const location = useLocation();
  const dispatch = useDispatch();

  const disconnect = useDisconnect();

  const disconnectWallet = async () => {
    await disconnect();
    isModalVisible && hideModal();
    sessionStorage.removeItem("temp");
    sessionStorage.removeItem("MV938aO");
    localStorage.removeItem("ref");
    navigate("/", { replace: !!1 });
  };

  useEffect(() => {
    let cid;
    if (NETWORK_MODE === "mainnet") {
      cid = 56;
    } else {
      cid = 97;
    }
    if (chainId !== cid && chainId !== undefined) {
      disconnectWallet();
    }
  }, [chainId, isModalVisible]);

  const initX = async () => {
    dispatch(getWallets({ blank: 0 }));
    if (!address.includes("Loading Address") && address !== "") {
      dispatch(getRef({ address }));
      // alert(address);
      await dispatch(getUser({ selfAddress: address }));
    }
  };

  useEffect(() => {
    initX();
  }, [location.pathname, address]);
  return (
    <>
      <NotificationProvider>
        <ColorModeProvider>
          <DeviceProvider>
            <Routes>
              {/* Landing Section */}
              <Route path="/" element={<LandingPageLayout />}>
                {/* Index Page */}
                <Route
                  index
                  element={
                    <Suspense fallback={<Preloader />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="terms"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <Terms />
                    </Suspense>
                  }
                />
                <Route
                  path="documentation"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <Documentation />
                    </Suspense>
                  }
                />
                <Route
                  path="campaign"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <Exaggerate />
                    </Suspense>
                  }
                />
                {/* <Route
                path="previewer"
                element={
                  <Suspense fallback={<Preloader />}>
                    <PdfViewerPage />
                  </Suspense>
                }
              /> */}
              </Route>
              {/* Dashboard Section */}
              <Route path="/user/:id" element={<DashboardLayout />}>
                {/* Index Page */}
                <Route
                  index
                  element={
                    <Suspense fallback={<Preloader />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </DeviceProvider>
        </ColorModeProvider>
      </NotificationProvider>
    </>
  );
};

export default App;
