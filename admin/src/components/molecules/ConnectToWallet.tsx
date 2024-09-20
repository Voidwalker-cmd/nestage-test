import { Button } from "@tremor/react";
import { useState, useEffect } from "react";
import { ConnectWallet, lightTheme, darkTheme } from "@thirdweb-dev/react";
import { RiLink } from "@remixicon/react";
import { NETWORK_MODE } from "../../config";
import { useDisconnect } from "@thirdweb-dev/react";
import { shortenHexString, Toast } from "../../utils/libs";
import { detectDeviceType } from "../../utils/detectDeciveType";
import { useStateContext } from "../../context/web3";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { initialState } from "../../types";

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const ConnectToWallet = () => {
  const { adminWallets } = useTypedSelector((state) => state.admin);
  const context = useStateContext();
  const disconnect = useDisconnect();

  if (!context) {
    return <div>Loading...</div>;
  }

  const disconnectWallet = async () => {
    await disconnect();
    setConnectionStatus("disconnected");
    setUserAddress("");
  };

  const { address, status } = context;

  const [connectionStatus, setConnectionStatus] = useState<string | undefined>(
    ""
  );
  const [userAddress, setUserAddress] = useState<string | undefined>("");
  const [device, setDevice] = useState<"Mobile" | "Desktop" | "none">("none");
  const [chainList] = useState([56, 97]);

  useEffect(() => {
    status !== null && status !== "" && setConnectionStatus(status);
  }, [status]);

  useEffect(() => {
    address !== null && address !== "" && setUserAddress(address);
  }, [address]);

  useEffect(() => {
    setDevice(detectDeviceType());
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

  return (
    <>
      {connectionStatus === "connected" ? (
        <>
          {/* {alert(userAddress)} */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-5">
            <div className="px-1 py-2 rounded-lg">
              <div className="font-primary text-primary_dark text-sm font-bold">
                Connected Smart Wallat:
              </div>
              <div className="font-primary text-primary_dark text-tiny text-sm">
                {shortenHexString(String(userAddress))}
              </div>
            </div>
          </div>
        </>
      ) : connectionStatus === "connecting" ? (
        <Button loading={true}>Connecting...</Button>
      ) : connectionStatus === "disconnected" ? (
        <ConnectWallet
          detailsBtn={() => <Button icon={RiLink}>Link wallet</Button>}
          showThirdwebBranding={!!0}
          className="rounded-lg text-white py-2 tracking-wide font-primary shadow bg-green-600"
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
          termsOfServiceUrl="https://"
          privacyPolicyUrl="https://"
          theme={customTheme}
          onConnect={async (w) => {
            const c = await w.getChainId();
            if (!chainList.includes(c)) {
              Toast(
                "error",
                `Invalid Network, You just connected your wallet with a network not supported by Nestage, Try connecting with ${
                  NETWORK_MODE === "mainnet" ? "Binance" : "Binance-Testnet"
                }`
              );
              disconnectWallet();
            } else {
              const a = await w.getAddress();
              if (a !== adminWallets.admin) {
                Toast(
                  "error",
                  `Unauthorized wallet, Please connect an authorized wallet.`
                );
                disconnectWallet();
              } else {
                //   const b = await w.getBalance();
                Toast(
                  "success",
                  `Wallet with address ${a}, linked sucessfully.`
                );
                // await initX();
                setTimeout(() => {
                  // console.log(hasMining);
                }, 1500);
                //   storeReferral();
                //   setUserAddress(a);
                //   setWalletBalance(BigNumber.from(b.value));
                //   setShowModalC(true);
                // hasMining ? navigate(`/user/${a}`, { replace: !!1 }) : showModal();
                // , { replace: !!1 } //dont delete this line
              }
            }
          }}
        />
      ) : connectionStatus === "unknown" ? (
        // <Button
        //   color="primary"
        //   className="rounded-lg text-white tracking-wide font-primary"
        //   variant="shadow"
        //   radius={radius}
        //   size={size}
        // >
        //   Initializing
        // </Button>
        <Button loading={true}>Initializing</Button>
      ) : (
        ""
      )}
    </>
  );
};

export default ConnectToWallet;
