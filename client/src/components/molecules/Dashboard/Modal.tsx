import { useEffect, useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { useDisconnect } from "@thirdweb-dev/react";
import { djs, Formatter, shortenHexString, uuid } from "../../../config/utils";
import { CloseIconL, PowerButtonI } from "../../atom/Icons";
import { useStateContext } from "../../../context/Web3";
import {
  AddNewRefParams,
  FormData,
  MiningResult,
  RootState,
} from "../../../types/types";
import { Helper } from "../../../helper";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { SITE_MODE } from "../../../config";
import { useDispatch } from "../../../hooks";
import {
  addNewRef,
  createUser,
  getWallets,
  removeRef,
  setTransactionState,
} from "../../../features/client";
import { generateRandomString } from "../../../helper/functions/randomString";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { getReferral } from "../../../helper/functions/SaveReferralLink";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import Busd from "../Busd";
import { SiteUrl } from "../../../const";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Define the Modal component
const Modal = () => {
  const { userRef: userRefDetails, transactionState } = useTypedSelector(
    (state) => state.client
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isModalVisible, hideModal, address, balance, symbol } = useModal();
  const { newMining, newReferral, getBUSDBalance } = useStateContext();
  const disconnect = useDisconnect();
  const [isLoading, setIsLoading] = useState<boolean>(!!0);
  const [inDashboard, setInDashboard] = useState<boolean>(!!0);
  const [stage, setStage] = useState<string>("init");
  const [level, setLevel] = useState<"one" | "two">("one");
  const [txt, setTxt] = useState<string>("Awaiting Approval");
  const [txtt, setTxtt] = useState<string>("Awaiting Approval");
  const [err, setErr] = useState<string>("");
  const [btnState, setBtnState] = useState<string>("init");
  const [refCode, setRefCode] = useState<string | null>(
    localStorage.getItem("ref")
  );
  const [busd, setBusd] = useState<string>("0");
  const [form, setForm] = useState<FormData>({
    amount: "",
    planId: 0,
    startDate: "",
    uuid: "",
    endDate: "",
    profit: "",
  });

  const getRef = async () => {
    const upline = userRefDetails.uplineCode;
    if (upline) {
      setRefCode(upline);
    } else {
      await setRefCode(getReferral());
    }
  };

  useEffect(() => {
    if (location.pathname.includes(address as string)) {
      getRef();
    } else {
      setTimeout(() => {
        getRef();
      }, 3000);
    }
  }, [userRefDetails]);

  useEffect(() => {
    setBtnState(transactionState);
  }, [transactionState]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Adjust type for event
    setForm({ ...form, [e.target.name]: e.target.value.replace(/\s+/g, "") });
  };

  if (!isModalVisible) return null;

  const createNewUser = async () => {
    await dispatch(createUser({ selfAddress: String(address) }));
  };

  const getBUSD = async () => {
    const x = await getBUSDBalance(address);
    return x;
  };

  const handleStartStake = async (e: React.FormEvent<HTMLButtonElement>) => {
    // Adjust type for event
    e.preventDefault();
    setErr("");
    const amt = form.amount;

    if (amt === "") {
      setErr("Amount can't be empty.");
      return 0;
    }

    const isNumeric =
      SITE_MODE === "live" ? /^\d+$/.test(amt) : /^\d+(\.\d+)?$/.test(amt);

    if (!isNumeric) {
      setErr("Amount is invalid.");
      return 0;
    }

    // TODO: Remove 6am
    if (SITE_MODE === "live") {
      const lmt = SiteUrl.includes("testing") ? 2 : 10;
      if (Number(amt) < lmt) {
        setErr(
          `Amount should be above ${SiteUrl.includes("testing") ? "2" : "10"}.`
        );
        return 0;
      }
    }

    const busd: string = await getBUSD();

    // TODO: Remove 6am
    if (busd === "0.0") {
      setErr("Oops, Your BUSD balance is low.");
      return 0;
    }

    // TODO: Remove 6am
    if (Number(busd) < Number(amt)) {
      setErr("Oops, Insufficient BUSD balance.");
      return 0;
    }

    let sym: "BTC" | "ETH" | "USDT" | "MATIC" | "BNB" = symbol ?? "BNB";
    sym = symbol?.toLowerCase().includes("bnb") ? "BNB" : sym;

    // const getBal = (await Helper.convertToUSD(sym, Number(balance))) ?? 0;
    // const getBal = Number(balance);
    // TODO: Remove later by 6am
    if (parseFloat(String(balance)) === 0) {
      setErr(`Oops, Not enough BNB to pay for gasfee.`);
      return 0;
    }

    setIsLoading(!!1);
    let p: string | number = Number(amt) * 0.4;
    p = String(Number(amt) + p);
    // let x;
    // try {
    //   x = await Helper.convert(amt);
    //   p = await Helper.convert(p);
    // } catch (err) {
    //   setIsLoading(!!0);
    //   return 0;
    // }

    const a = djs().valueOf();
    const b = djs().add(1, "day").valueOf();
    const y = sym.toLocaleLowerCase();
    // console.log(p, y, x);
    // // console.log(x[y]);
    const send = {
      ...form,
      amount: amt,
      startDate: a,
      endDate: b,
      profit: p,
      uuid,
    };
    const res = await newMining(send).then((result: MiningResult) => {
      setTxt("Awaiting Confirmations");
      if (result.isLoading) {
        setTxt("Awaiting Confirmations");
      } else if (result.error !== "x") {
        console.error("Error:", result.error);
      } else {
        createNewUser();
        if (result.data?.confirmations > 0) {
          setTxt("Finishing your request");
          const referralCode = generateRandomString(8);

          const info: AddNewRefParams = {
            uuid,
            walletId: address,
            referralCode,
          };
          // const dispatchPromise = () =>
          //   new Promise(async (resolve, reject) => {
          //     try {
          //       const x = await dispatch(addNewRef(info)).unwrap();
          //       console.log(x);
          //       resolve(x);
          //     } catch (error) {
          //       console.error("Failed to add new referral:", error);
          //       reject(error);
          //     }
          //   });

          // dispatchPromise()
          //   .then((result) => {
          //     console.log("Dispatch resolved:", result);
          //     navigate(`/user/${address}`);
          //   })
          //   .catch((error) => {
          //     console.error("Dispatch rejected:", error);
          //   });
        }
        navigate(`/user/${address}`);
      }
      setIsLoading(!!0);
      hideModal();
    });
  };

  const handlePayReferral = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("ready");
    const amt = SiteUrl.includes("testing") ? 2 : 10;

    const busd: string = await getBUSD();

    //TODO: Revert this
    if (busd === "0.0") {
      setErr("Oops, Your BUSD balance is low.");
      return 0;
    }

    //TODO: Revert this
    if (Number(busd) < amt) {
      setErr("Oops, Insufficient BUSD balance.");
      return 0;
    }

    // let sym: "BTC" | "ETH" | "USDT" | "MATIC" | "BNB" = symbol ?? "BNB";
    // sym = symbol?.toLowerCase().includes("bnb") ? "BNB" : sym;

    // const getBal = (await Helper.convertToUSD(sym, Number(balance))) ?? 0;
    // const getBal = Number(balance);

    //TODO: Revert this
    if (parseFloat(String(balance)) === 0) {
      setErr(`Oops, Not enough BNB to pay for gasfee.`);
      return 0;
    }

    setIsLoading(!!1);
    // const y = sym.toLocaleLowerCase();
    const send = { amount: amt };

    const res = await newReferral(send).then((result: MiningResult) => {
      setTxt("Awaiting Confirmations");
      if (result.isLoading) {
        setTxt("Awaiting Confirmations");
      } else if (result.error !== "x") {
        console.error("Error:", result.error);
        const idx = sessionStorage.getItem("temp");
        if (idx) {
          const rm = async () => {
            const resx = await dispatch(removeRef({ id: idx }));
            resx.meta.requestStatus !== "rejected" &&
              sessionStorage.removeItem("temp");
          };
          rm();
        }
      } else {
        createNewUser();
        if (result.data) {
          setTxt("Finishing your request");
          const referralCode = generateRandomString(8);

          sessionStorage.removeItem("temp");
          localStorage.removeItem("ref");

          const info: AddNewRefParams = {
            uuid,
            walletId: address,
            referralCode,
          };
          // const dispatchPromise = () =>
          //   new Promise(async (resolve, reject) => {
          //     try {
          //       const x = await dispatch(addNewRef(info)).unwrap();
          //       console.log(x);
          //       resolve(x);
          //     } catch (error) {
          //       console.error("Failed to add new referral:", error);
          //       reject(error);
          //     }
          //   });

          // dispatchPromise()
          //   .then((result) => {
          //     console.log("Dispatch resolved:", result);
          //     navigate(`/user/${address}`);
          //   })
          //   .catch((error) => {
          //     console.error("Dispatch rejected:", error);
          //   });
          navigate(`/user/${address}`);
        }
      }
      setIsLoading(!!0);
      hideModal();
    });
  };

  // useEffect(() => {

  const click = sessionStorage.getItem("MV938aO");
  if (click) {
    if (click === "kYgxU8x") {
      setInDashboard(!!1);
      setStage("pay");
      setLevel("one");
    } else if (click === "IcOtcCJ") {
      setInDashboard(!!1);
      setStage("pay");
      setLevel("two");
    }
    sessionStorage.removeItem("MV938aO");
  }
  // }, []);

  // useEffect(() => {
  //   isModalVisible ? !balance && hideModal() : "";
  // }, [balance]);

  return (
    <>
      <div className="relkative flex justify-center font-primary">
        <div className="fixed inset-0 overflow-y-hidden bg-gray-200 z-50">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relhative inline-block px-4 pt-2 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:p-2 lg:p-6 sm:align-middle">
              <div className="relative w-full">
                <div
                  onClick={() => {
                    setTxt("Awaiting Approval");
                    setIsLoading(!!0);
                    setErr("");
                    hideModal();
                    setStage("init");
                  }}
                >
                  <CloseIconL className="w-6 h-6 absolute text-red-700 font-semibold hover:bg-red-100 p-0.5 rounded-lg cursor-pointer right-1 top-1" />
                </div>
              </div>
              <div className="block items-center">
                <Logo />
              </div>
              <div
                className={`${
                  inDashboard && stage === "pay"
                    ? "md:h-auto md:overflow-y-hidden"
                    : !inDashboard && stage === "pay"
                    ? "h-auto overflow-hidden"
                    : "h-[580px] overflow-y-scroll md:h-auto md:overflow-y-hidden"
                }`}
              >
                {stage === "init" ? (
                  <div className="flex flex-col justify-between items-center space-y-5">
                    <div className="flex flex-col lg:flex-row justify-center gap-5 my-2">
                      <Card className="w-full bg-slate-100 shadow-md rounded-lg">
                        <CardHeader className="flex gap-3">
                          <div className="flex flex-col font-primary items-center justify-center w-full">
                            <p className="text-lg font-semibold">Level One</p>
                            <p className="text-small text-default-500 text-center block">
                              Nestage DeFi Staking Advantages
                            </p>
                          </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <span className="text-small text-default-500">
                            <ul className="checklist">
                              <li>
                                Minimum entry fee{" "}
                                {SiteUrl.includes("testing") ? 2 : 10} BUSD
                              </li>
                              <li>40% profit on your stake</li>
                              <li>Instant transactions</li>
                              <li>Zero effort required</li>
                              <li>Fixed profit and fall protection</li>
                              <li>Low network commissions</li>
                            </ul>
                          </span>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <button
                            onClick={() => {
                              setLevel("one");
                              setStage("pay");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold font-primary transition-all w-full py-2 rounded-md"
                          >
                            Select
                          </button>
                        </CardFooter>
                      </Card>
                      {/* <-------------> */}
                      <Card className="w-full bg-slate-100 shadow-md rounded-lg">
                        <CardHeader className="flex gap-3">
                          <div className="flex flex-col font-primary items-center justify-center w-full">
                            <p className="text-lg font-semibold">Level Two</p>
                            <p className="text-small text-default-500 text-center block">
                              Nestage Decentralized matrix Advantages
                            </p>
                          </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <span className="text-small text-default-500">
                            <ul className="checklist">
                              <li>
                                Entry fee {SiteUrl.includes("testing") ? 2 : 10}{" "}
                                BUSD
                              </li>
                              <li>Referral-based earnings</li>
                              <li>Transparency and automation</li>
                              <li>3 level matrix</li>
                              <li>Earnings are not limited</li>
                              <li>Network Growth</li>
                            </ul>
                          </span>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <button
                            onClick={() => {
                              setLevel("two");
                              setStage("pay");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold font-primary transition-all w-full py-2 rounded-md"
                          >
                            Select
                          </button>
                        </CardFooter>
                      </Card>
                    </div>
                    <div className="block items-center justify-center ">
                      <Button
                        onClick={() => {
                          setTxt("Awaiting Approval");
                          setIsLoading(!!0);
                          setErr("");
                          hideModal();
                          setStage("init");
                        }}
                        color="primary"
                        variant="solid"
                        radius="lg"
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-red-500 bg-white border border-red-400 capitalize transition-colors duration-300 transform rounded-md sm:w-1/2 sm:mx-2 dark:text-red-200 dark:hover:text-white dark:border-red-700 dark:hover:bg-red-800 hover:bg-white hover:text-red-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                        fullWidth={!!1}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <div className="flex justify-around overflow-x-auto overflow-y-hidden whitespace-nowrap dark:border-gray-700">
                    <button
                      onClick={() => setLevel("one")}
                      type="button"
                      className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center ${
                        level === "one"
                          ? "font-bold text-primary bg-transparent border-b-4 border-primary sm:text-base dark:border-primary dark:text-primary whitespace-nowrap focus:outline-none"
                          : "text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
                      }`}
                    >
                      Level One
                    </button>

                    <button
                      onClick={() => setLevel("two")}
                      type="button"
                      className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center ${
                        level === "two"
                          ? "font-bold text-primary bg-transparent border-b-4 border-primary sm:text-base dark:border-primary dark:text-primary whitespace-nowrap focus:outline-none"
                          : "text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
                      }`}
                    >
                      Level Two
                    </button>
                  </div> */}
                    <div className="pt-3">
                      <p className="block text-center text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white">
                        Activating Level{" "}
                        <span className="capitalize">{level}</span>
                      </p>
                      {/* <p className="block text-center mt-2 text-sm text-blue-500 dark:text-blue-400 italic">
                      {level === "one"
                        ? "You are required to start a stake"
                        : "You're required to activate Level One to Start Level Two"}
                    </p> */}
                    </div>

                    {level === "one" ? (
                      <>
                        <div className="flex flex-col gap-1">
                          <h5 className="mt-2 text-sm text-black font-bold dark:text-gray-300 flex gap-2   items-center">
                            Upline ID:{" "}
                            <span className="text-base text-gray-600 dark:text-gray-300">
                              {refCode} {!refCode && "You have no upline."}
                            </span>
                          </h5>
                          <h5 className="mt-2 text-sm text-black font-bold dark:text-gray-300 flex gap-2   items-center">
                            Connected Wallet:{" "}
                            <div className="flex gap-1 lg:gap-2 items-center justify-between">
                              <span className="text-base text-gray-600 dark:text-gray-300">
                                {shortenHexString(String(address))}
                              </span>
                              <span
                                onClick={async () => {
                                  sessionStorage.removeItem("temp");
                                  sessionStorage.removeItem("MV938aO");
                                  localStorage.removeItem("ref");
                                  const d = await disconnect();
                                  hideModal();
                                  setStage("init");
                                }}
                                title="Disconnect Wallet"
                                className="text-red-600 hover:text-red-800 transition-all cursor-pointer"
                              >
                                <PowerButtonI className="w-5 h-5" />
                              </span>
                            </div>
                          </h5>
                          <h5 className="mt-2 text-sm text-black font-bold dark:text-gray-400">
                            BUSD balance:{" "}
                            <span className="text-base text-gray-600 dark:text-gray-300 italic">
                              {"BUSD"} <Busd address={String(address)} />
                              {/* {Formatter(balance, {
                                type: "d",
                                decimalOptions: { n: 8, m: 8 },
                              })} */}
                            </span>
                          </h5>
                          <h5 className="mt-2 text-sm text-black font-bold dark:text-gray-400">
                            BNB balance:{" "}
                            <span className="text-base text-gray-600 dark:text-gray-300 italic">
                              {symbol}{" "}
                              {Formatter(balance, {
                                type: "d",
                                decimalOptions: { n: 8, m: 8 },
                              })}
                            </span>
                          </h5>
                        </div>

                        <form className="mt-4">
                          {err && (
                            <span className="block text-xs font-primary italic tracking-wider text-rose-600">
                              {err}{" "}
                              {err.includes(
                                "Oops, Your wallet balance is low."
                              ) && (
                                <a
                                  className="text-blue-500 hover:text-blue-700 hover:underline"
                                  href="https://portfolio.metamask.io/buy"
                                  target="_blank"
                                >
                                  Topup here
                                </a>
                              )}
                            </span>
                          )}
                          <label
                            htmlFor="amount"
                            className="text-sm text-gray-700 dark:text-gray-200"
                          >
                            Amount{" "}
                            <small className="italic font-semibold font-primary text-sm">
                              (Min. ${SiteUrl.includes("testing") ? "2" : "10"})
                            </small>
                          </label>

                          <label className="block mt-3" htmlFor="amount">
                            <input
                              type="text"
                              name="amount"
                              id="amount"
                              onChange={onChange}
                              placeholder="Enter amount in USD"
                              className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                          </label>

                          <div className="w-full mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button
                              onClick={() => {
                                setTxt("Awaiting Approval");
                                setIsLoading(!!0);
                                setErr("");
                                // hideModal();
                                setStage("init");
                              }}
                              type="button"
                              className={`${
                                inDashboard ? "hidden" : ""
                              } w-full px-4 py-2 text-sm font-medium tracking-wide text-red-500 bg-white border border-red-400 capitalize transition-colors duration-300 transform rounded-md sm:w-1/2 sm:mx-2 dark:text-red-200 dark:hover:text-white dark:border-red-700 dark:hover:bg-red-800 hover:bg-white hover:text-red-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40`}
                            >
                              Back
                            </button>

                            {isLoading ? (
                              <button
                                type="button"
                                className="flex gap-2 items-center justify-center w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize border border-blue-400 transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 opacity-50 cursor-default"
                              >
                                {btnState === "initializing" ||
                                btnState === "approving" ||
                                btnState === "paying" ? (
                                  <svg
                                    className="h-5 w-5 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      className="opacity-25"
                                    ></circle>
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      d="M4 12a8 8 0 0116 0"
                                    ></path>
                                  </svg>
                                ) : (
                                  ""
                                )}
                                <span>{btnState}</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleStartStake}
                                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                              >
                                Start
                              </button>
                            )}
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col justify-center w-full items-center my-1 space-y-3">
                          <p className="block text-center text-black dark:text-white">
                            To activate Level Two you are to pay $
                            {SiteUrl.includes("testing") ? "2" : "10"}
                          </p>
                          {err && (
                            <span className="block text-center text-xs font-primary italic tracking-wider text-rose-600">
                              {err}{" "}
                              {err.includes(
                                "Oops, Your wallet balance is low."
                              ) && (
                                <a
                                  className="text-blue-500 hover:text-blue-700 hover:underline"
                                  href="https://portfolio.metamask.io/buy"
                                  target="_blank"
                                >
                                  Topup here
                                </a>
                              )}
                            </span>
                          )}
                          <h5 className="flex flex-col lg:flex-row gap-1 lg:gap-2 items-center justify-between mt-2 text-sm text-black font-bold dark:text-gray-300">
                            Your Direct Upline ID:{" "}
                            <span className="text-base text-gray-600 dark:text-gray-300">
                              {refCode} {!refCode && "You have no upline."}
                            </span>
                          </h5>
                          <h5 className="flex flex-col lg:flex-row gap-1 lg:gap-2 items-center justify-between mt-2 text-sm text-black font-bold dark:text-gray-300">
                            Connected Wallet:{" "}
                            <div className="flex gap-1 lg:gap-2 items-center justify-between">
                              <span className="text-base text-gray-600 dark:text-gray-300">
                                {shortenHexString(String(address))}
                              </span>
                              <span
                                onClick={async () => {
                                  sessionStorage.removeItem("temp");
                                  sessionStorage.removeItem("MV938aO");
                                  localStorage.removeItem("ref");
                                  const d = await disconnect();
                                  hideModal();
                                  setStage("init");
                                }}
                                title="Disconnect Wallet"
                                className="text-red-600 hover:text-red-800 transition-all cursor-pointer"
                              >
                                <PowerButtonI className="w-5 h-5" />
                              </span>
                            </div>
                          </h5>
                          <h5 className="mt-2 text-sm text-black font-bold dark:text-gray-400">
                            BUSD balance:{" "}
                            <span className="text-base text-gray-600 dark:text-gray-300 italic">
                              {"BUSD"} <Busd address={String(address)} />
                              {/* {Formatter(balance, {
                                type: "d",
                                decimalOptions: { n: 8, m: 8 },
                              })} */}
                            </span>
                          </h5>
                          <h5 className="mt-2 text-sm text-black font-bold dark:text-gray-400">
                            BNB balance:{" "}
                            <span className="text-base text-gray-600 dark:text-gray-300 italic">
                              {symbol}{" "}
                              {Formatter(balance, {
                                type: "d",
                                decimalOptions: { n: 8, m: 8 },
                              })}
                            </span>
                          </h5>

                          <div className="w-full mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button
                              onClick={() => {
                                setTxt("Awaiting Approval");
                                setIsLoading(!!0);
                                setErr("");
                                // hideModal();
                                setStage("init");
                              }}
                              type="button"
                              className={`${
                                inDashboard ? "hidden" : ""
                              } w-full px-4 py-2 text-sm font-medium tracking-wide text-red-500 bg-white border border-red-400 capitalize transition-colors duration-300 transform rounded-md sm:w-1/2 sm:mx-2 dark:text-red-200 dark:hover:text-white dark:border-red-700 dark:hover:bg-red-800 hover:bg-white hover:text-red-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40`}
                            >
                              Back
                            </button>

                            {isLoading ? (
                              <button
                                type="button"
                                className="flex gap-2 items-center justify-center w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize border border-blue-400 transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 opacity-50 cursor-default"
                              >
                                {btnState === "initializing" ||
                                btnState === "approving" ||
                                btnState === "paying" ? (
                                  <svg
                                    className="h-5 w-5 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      className="opacity-25"
                                    ></circle>
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      d="M4 12a8 8 0 0116 0"
                                    ></path>
                                  </svg>
                                ) : (
                                  ""
                                )}
                                <span>{btnState}</span>
                              </button>
                            ) : address && balance ? (
                              <button
                                type="button"
                                onClick={handlePayReferral}
                                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                              >
                                PAY ${SiteUrl.includes("testing") ? "2" : "10"}
                              </button>
                            ) : (
                              <span className="cursor-not-allowed bg-opacity-50 w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-400 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-40">
                                PAY ${SiteUrl.includes("testing") ? "2" : "10"}
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
