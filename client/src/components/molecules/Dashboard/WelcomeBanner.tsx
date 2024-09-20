import { useEffect, useState } from "react";
import { greetUser, shortenHexString } from "../../../config/utils";
import { useStateContext } from "../../../context/Web3";
import { TestLogo } from "../../atom/TestLogo";
import { useMiningContext } from "../../../context/MiningContext";
import { useDevice } from "../../../context/DeviceModeContext";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../types/types";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const WelcomeBanner = () => {
  const { userId } = useTypedSelector((state) => state.client);
  // const { address } = useStateContext();
  const { minings } = useMiningContext();
  const { isMobile } = useDevice();
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const fetchGreeting = async () => {
      const greetingMessage = await greetUser();
      setGreeting(greetingMessage);
    };

    fetchGreeting();
  }, []);
  return (
    <div className="relative bg-pear-600 dark:bg-pear-500 p-4 sm:p-6 rounded-xl overflow-hidden mb-8 shadow-md">
      {/* Background illustration */}
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
        <TestLogo />
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dasrk:text-slate-100 font-bold mb-1">
          {/* {greeting}, {shortenHexString(address, isMobile ? "sh" : "lg")}. 👋 */}
          {greeting}, User {userId}. 👋
        </h1>
        <p className="text-slate-700">
          {minings.length
            ? `${minings.length} Active Stakes.`
            : "0 Active Stakes."}
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
