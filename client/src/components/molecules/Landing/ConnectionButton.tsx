import { Button, Tooltip } from "@nextui-org/react";
import {
  ConnectButtonProps,
  MiningArray,
  MiningData,
  RootState,
} from "../../../types/types";
import { useStateContext } from "../../../context/Web3";
import { shortenHexString, uuid } from "../../../config/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BigNumber, ethers } from "ethers";

import {
  ConnectWallet,
  lightTheme,
  darkTheme,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import Modal from "../Dashboard/Modal";
import { useModal } from "../../../context/ModalContext";
import { detectDeviceType } from "../../../helper/functions/detectDevice";
import { NETWORK_MODE } from "../../../config";
import { useNotification } from "../../atom/Notification/NotificationProvider";
import { Helper } from "../../../helper";
// import { storeReferral } from "../../../helper/functions/SaveReferralLink";
import { useDispatch } from "../../../hooks";
import { getRef, saveReferral } from "../../../features/client";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { SiteUrl } from "../../../const";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ConnectionButton: React.FC<ConnectButtonProps> = ({
  radius,
  size,
  component = "NotNav",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userRef: userRefDetails,
    checkState,
    checkFailed,
    checkState2,
    checkFailed2,
  } = useTypedSelector((state) => state.client);
  const { address, status, balance, getMinings } = useStateContext();
  const disconnect = useDisconnect();
  const [hasMining, setHasMining] = useState<boolean>(!!0);
  const [hasRef, setHasRef] = useState<boolean>(!!0);
  const [userAddress, setUserAddress] = useState<string>("");
  const [showModalC, setShowModalC] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<BigNumber | null>(null);
  const [device, setDevice] = useState<"Mobile" | "Desktop" | "none">("none");
  const [chain, setChain] = useState(0);
  const [chainList] = useState([56, 97]);

  const { showModal } = useModal();
  const toast = Helper.Toast;

  const [connectionStatus, setConnectionStatus] = useState<string>(status);

  const { addNotification } = useNotification();

  const Nav = async () => {
    if (hasMining || hasRef) {
      navigate(`/user/${userAddress}`);
    } else {
      setWalletBalance(balance);
      setShowModalC(!!1);
      showModal();
    }
  };

  const storeReferral = async () => {
    const url: URL = new URL(window.location.href);
    const params: URLSearchParams = new URLSearchParams(url.search);
    const ttt = String(url) + " " + String(params);
    if (params.has("ref")) {
      const refValue: string | null = params.get("ref");
      if (refValue !== null) {
        try {
          const res = await dispatch(saveReferral({ refValue }));
          if (res.meta.requestStatus === "fulfilled") {
            localStorage.setItem("ref", refValue);
          }
        } catch (err) {
          refValue && localStorage.setItem("ref", refValue);
        }

        // console.log(`Ref parameter (${refValue}) stored in local storage.`);
      }
    }
  };

  useEffect(() => {
    // run();
    let cid = 0;
    if (NETWORK_MODE === "mainnet") {
      cid = 56;
    } else {
      cid = 97;
    }
    setChain(cid);
  }, []);

  const lTheme = lightTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
      modalBg: "#CBD5E1",
      primaryText: "#0f5b37",
      secondaryText: "#000000",
      borderColor: "#334155",
      skeletonBg: "#94A3B8",
      accentText: "#0f5b37",
      accentButtonBg: "#0f5b37",
    },
  });

  const dTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
      modalBg: "#000000",
      primaryText: "#0f5b37",
      secondaryText: "#ffffff",
      borderColor: "#334155",
      skeletonBg: "#94A3B8",
      accentText: "#0f5b37",
      accentButtonBg: "#0f5b37",
    },
  });

  let type;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    type = "dark";
  } else {
    type = "light";
  }

  const customTheme = type === "dark" ? dTheme : lTheme;

  useEffect(() => {
    address !== null && setUserAddress(address);
  }, [address]);

  useEffect(() => {
    setConnectionStatus(status);
  }, [status]);

  // const Connect = async (): Promise<void> => {
  //   const connection = await connect();
  //   console.log(connection);

  //   // navigate(`/user/${address}`, { replace: !!1 });
  // };

  const searchStringInArray = (
    array: MiningData[],
    searchString: string
  ): boolean => {
    const result = array.filter((obj) => obj.staker === searchString);
    console.log(result);
    const res = result.length ? !!1 : !!0;
    return res;
  };

  const initX = async () => {
    let result = !!0;
    const x = await getMinings();
    if (x.length) result = searchStringInArray(x, address);

    setHasMining(result);
    setHasRef(userRefDetails.id > 0);
  };

  const setSession = () => {
    sessionStorage.setItem("Ihs6JSg", uuid);
  };

  const checkSession = async () => {
    const cs = sessionStorage.getItem("Ihs6JSg");
    if (!cs) {
      await disconnect();
    }
  };

  useEffect(() => {
    if (connectionStatus === "connected") initX();
  }, [connectionStatus, userRefDetails]);

  useEffect(() => {
    if (connectionStatus === "connected") setSession();
  }, [connectionStatus]);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    setDevice(detectDeviceType());
  }, []);

  return (
    <>
      {connectionStatus === "connected" ? (
        <>
          {/* {alert(userAddress)} */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-5">
            {component === "Nav" ? (
              <Tooltip
                showArrow={true}
                placement="bottom"
                color="secondary"
                content={
                  <div className="px-1 py-2 rounded-lg">
                    <div className="font-primary text-primary_dark text-small font-bold">
                      Connected Smart Wallat:
                    </div>
                    <div className="font-primary text-primary_dark text-tiny">
                      {userAddress}
                    </div>
                  </div>
                }
              >
                <p className="font-primary font-semibold truncate text-white cursor-pointer hidden lg:inline">
                  {shortenHexString(userAddress)}
                </p>
              </Tooltip>
            ) : (
              ""
            )}
            {checkState === "done" || checkState2 === "done" ? (
              <Button
                onClick={Nav}
                color="secondary"
                className="rounded-lg bg-opacity-70 text-primary font-semibold tracking-wide font-primary border-2 border-secondary hover:border-primary hover:bg-transparent hover:text-white transition-all"
                variant="shadow"
                radius={radius}
                size={size}
              >
                {hasMining || hasRef ? "Login" : "Register"}
              </Button>
            ) : (
              <Button
                color="secondary"
                className="rounded-lg bg-opacity-70 text-primary font-semibold tracking-wide font-primary border-2 border-secondary hover:border-primary hover:bg-transparent transition-all"
                variant="shadow"
                radius={radius}
                isDisabled
                isLoading
                size={size}
                spinner={
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                Loading...
              </Button>
            )}
          </div>
        </>
      ) : connectionStatus === "connecting" ? (
        <Button
          color="primary"
          className="rounded-lg text-white tracking-wide font-primary"
          variant="shadow"
          radius={radius}
          size={size}
          isDisabled
          isLoading
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
        >
          Connecting...
        </Button>
      ) : connectionStatus === "disconnected" ? (
        <ConnectWallet
          detailsBtn={() => (
            <Button
              color="primary"
              className="rounded-lg text-white tracking-wide font-primary"
              variant="shadow"
              radius={radius}
              size={size}
            >
              Connect Wallet
            </Button>
          )}
          showThirdwebBranding={!!0}
          className="rounded-lg text-white tracking-wide font-primary shadow bg-primary"
          btnTitle="Connect Wallet"
          welcomeScreen={{
            subtitle: "Connect your wallet to get started",
            img: {
              src: `https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115769/nestage/logos/${
                type === "dark" ? "wh" : "bk"
              }-icon-text.png`,
              width: 235,
              height: 235,
            },
            title:
              "Connect your wallet to Nestage and begin your Staking journey.",
          }}
          modalSize={device === "Mobile" ? "compact" : "wide"}
          modalTitle={
            device === "Mobile"
              ? "Connect your Wallet to Nestage"
              : "Connet to Nestage"
          }
          modalTitleIconUrl={`https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115769/nestage/logos/${
            type === "dark" ? "wh" : "bk"
          }-icon.png`}
          termsOfServiceUrl={`${SiteUrl}/terms`}
          privacyPolicyUrl={`${SiteUrl}/terms`}
          theme={customTheme}
          onConnect={async (w) => {
            const c = await w.getChainId();
            // console.log("wallet c", w);
            if (!chainList.includes(c)) {
              toast(
                "error",
                `Invalid Network, You just connected your wallet with a network not supported by Nestage, Try connecting with ${
                  NETWORK_MODE === "mainnet" ? "Binance" : "Binance-Testnet"
                }`
              );
            } else {
              const a = await w.getAddress();
              const b = await w.getBalance();
              // await initX();
              setTimeout(() => {
                // console.log(hasMining);
              }, 1500);
              storeReferral();
              setUserAddress(a);
              setWalletBalance(BigNumber.from(b.value));
              await dispatch(getRef({ address: a }));
              setShowModalC(true);
              // hasMining ? navigate(`/user/${a}`, { replace: !!1 }) : showModal();
              // , { replace: !!1 } //dont delete this line
            }
          }}
        />
      ) : connectionStatus === "unknown" ? (
        <Button
          color="primary"
          className="rounded-lg text-white tracking-wide font-primary"
          variant="shadow"
          radius={radius}
          size={size}
          isDisabled
        >
          Initializing
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default ConnectionButton;

// <!====================== DONT DELETE THE BELOW CODE ======================!>

// <Button
//   color="primary"
//   className="rounded-lg text-white tracking-wide font-primary"
//   variant="shadow"
//   radius={radius}
//   size={size}
//   onClick={Connect}
// >
//   Connect Wallet
// </Button>

// className="rounded-lg text-white tracking-wide font-primary shadow bg-primary"

// wallets={wallets}
//   theme={lightTheme({
//     colors: {
//       accentText: "#0f5b37",
//       accentButtonBg: "#0f5b37",
//     },
//   })}
//   connectButton={{
//     label: "Connect wallet",
//   }}
//   connectModal={{
//     size: "compact",
//     title: "Connect Wallet to Nestage",
//     titleIcon: "https://",
//     welcomeScreen: {
//       subtitle: "Connect your wallet to get started",
//       img: {
//         src: "https://",
//         width: 150,
//         height: 150,
//       },
//       title: "Something something about title on welcome screen",
//     },
//     termsOfServiceUrl: "https://",
//     privacyPolicyUrl: "https://",
//     showThirdwebBranding: false,
//   }}
