import React, { createContext, useEffect, useState } from "react";
import {
  useAddress,
  useBalance,
  useContract,
  useMetamask,
  useContractWrite,
  useConnectionStatus,
  ThirdwebSDK,
} from "@thirdweb-dev/react";
// import {  } from "@thirdweb-dev/sdk";
import * as Types from "../types";
import { eth } from "../config/utils";
import { CLIENT_ID, NETWORK_MODE, tokenAddress } from "./../config/index";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "../hooks";
import {
  createPay,
  createRefs,
  getRef,
  getWallets,
  removeRef,
  saveStat,
  setCheckState,
  setTransactionState,
} from "../features/client";
import { getReferral } from "../helper/functions/SaveReferralLink";
import { Percent } from "lucide-react";
import { Helper } from "../helper";
import BUSD_ABI from "../web3/NestageNw.json";
import PLAIN_BUSD_ABI from "../web3/PlainBUSD_ABI.json";
import Busd from "./../components/molecules/Busd";
import { SiteUrl } from "../const";

const log = console.log;

type ApproveUsdtOptions = {
  onSuccess: (tx: any) => void;
  onError: (error: any) => void;
};

declare function approveUsdt(
  args: [string, number],
  options: ApproveUsdtOptions
): Promise<void>;

const StateContext = createContext<Types.StateContextValue | undefined>(
  undefined
);

const nullAddress = "0x0000000000000000000000000000000000000000";

// const nestageAddress = "0x9D85F015ed59B7FFe40c9ED0825D2722E0084E9d";
// const nestageAddress = "0x3158A72B61e87077404DC8216C8ba997fCBAE919";

const nestageAddress = "0xd8739D3F17F3d211507EfD9BD186e4B0Ae0aB7dE"; //mainnet
// const nestageAddress = "0x8D96CD1Eb98259ac06cf0AA7b64E2a4814c14eC7"; //testnet

// const nestageAddress = "0xD51907bBa97b157dC1475141a355290012Bee07e";
// const nestageAddress = "0x8DCf248CC6cc3511b57ad1d6847C505ea3F1bEC1";

const useTypedSelector: TypedUseSelectorHook<Types.RootState> = useSelector;

export const StateContextProvider: React.FC<Types.StateContextProps> = ({
  children,
}) => {
  const { adminWallet: wallets, userRef } = useTypedSelector(
    (state) => state.client
  );
  // const { adminWallet: wallets } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const { admin: adminWallet, refAdmin: refAdminWallet } = wallets;
  // Fetch contract
  const { contract, isLoading, error } = useContract(nestageAddress);

  const [address, setAddress] = useState<string>("Loading Address...");

  const userAddress = useAddress();

  const { data } = useBalance();
  const balance: string | undefined =
    data && typeof data.symbol === "string" ? data.displayValue : undefined;
  const symbol: string | undefined =
    data && typeof data.symbol === "string" ? data.symbol : undefined;

  // Fetch connection status
  const status = useConnectionStatus();

  // Connect to Metamask
  const connect = useMetamask();

  const contractAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; // mainnet
  // const contractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"; // testnet

  // Function to create a new mining
  const newMining = async (
    form: Types.FormData
  ): Promise<Types.MiningResult> => {
    dispatch(setTransactionState({ state: "initializing" }));
    dispatch(getWallets({ blank: 0 }));
    let result: Types.MiningResult = {
      isLoading: true,
      data: null,
      error: null,
    };

    try {
    } catch (error) {
      const errorMessage = (error as Error).message;
      result = {
        isLoading: false,
        data: null,
        error: errorMessage,
      };
    }

    try {
      const { amount, profit, startDate, endDate, uuid } = form;

      const amt = eth.utils.parseUnits(amount.toString(), "ether");
      const prt = eth.utils.parseUnits(profit.toString(), "ether");

      let pay = eth.utils.parseUnits("0.0", "ether");

      let payUpline: Types.payUpline = {
        hasUpline: !!0,
        uplineAddress: nullAddress,
        pay,
      };
      function findUplineByCode(
        data: Types.getRefResponse,
        code: string
      ): Types.Upline | undefined {
        return data.uplines.find((upline) => upline.code === code);
      }

      const refs = await dispatch(getRef({ address: address }));

      const upline = findUplineByCode(refs, refs.uplineCode);

      if (upline) {
        const bonus = SiteUrl.includes("testing") ? 0.5 : 1.5;
        pay = eth.utils.parseUnits(bonus.toString(), "ether");
        payUpline = {
          hasUpline: !!1,
          uplineAddress: upline.address,
          pay,
        };
      }

      // const data = await contract?.call("startNewStake", sending, {
      //   value: amt,
      // });

      if (window.ethereum) {
        const provider = new eth.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new eth.Contract(nestageAddress, BUSD_ABI, signer);
        const busdContract = new eth.Contract(
          contractAddress,
          PLAIN_BUSD_ABI,
          signer
        );

        try {
          const currentAllowance = await busdContract.allowance(
            await signer.getAddress(),
            nestageAddress
          );

          // if (!currentAllowance.lt(amount)) {
          const approvalTx = await busdContract.approve(nestageAddress, amt);
          dispatch(setTransactionState({ state: "approving" }));
          await approvalTx.wait();
          dispatch(setTransactionState({ state: "approved" }));

          setTimeout(() => {
            dispatch(setTransactionState({ state: "awaiting payment" }));
          }, 1200);
          // }

          const gasLimit = 500000;

          const tx = await contract.startNewStake(
            amt,
            adminWallet,
            startDate,
            endDate,
            prt,
            payUpline.hasUpline,
            payUpline.uplineAddress,
            payUpline.pay,
            {
              gasLimit,
            }
          );

          dispatch(setTransactionState({ state: "paying" }));

          await tx.wait();
          if (tx.status === 1 || tx.status === "1") {
            dispatch(saveStat({ type: "levelOne", amount }));
            dispatch(setTransactionState({ state: "payed" }));

            result = {
              isLoading: false,
              data: tx,
              error: null,
            };
          }
        } catch (error) {
          console.error("Error calling startNewStake:", error);
        }
      } else {
        console.error("Dapp is not installed!");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      result = {
        isLoading: false,
        data: null,
        error: errorMessage,
      };
    }

    return result;
  };

  const newReferral = async (
    form: Types.refData
  ): Promise<Types.MiningResult> => {
    dispatch(getWallets({ blank: 0 }));
    let result: Types.MiningResult = {
      isLoading: true,
      data: null,
      error: null,
    };

    try {
      dispatch(setTransactionState({ state: "initializing" }));
    } catch (error) {
      const errorMessage = (error as Error).message;
      result = {
        isLoading: false,
        data: null,
        error: errorMessage,
      };
    }

    const { amount } = form;
    const xamt = eth.utils.parseUnits(amount.toString(), "ether");

    try {
      const refs = await dispatch(getRef({ address: address }));
      let info;
      let createNewRef = !!1;
      if (refs.meta.requestStatus === "fulfilled") {
        const drefs = refs?.payload;
        const up = drefs?.upline;
        const list = drefs?.uplines;
        const code = drefs?.code;
        sessionStorage.setItem("temp", code);

        if (up >= 1) {
          const yy = [];
          const l = list.length;
          for (let i = 0; i < l; i++) {
            yy.push(list[i].address);
          }

          info = [yy, refAdminWallet];
          createNewRef = !!0;
        }
      } else {
        createNewRef = !!1;
        info = [[], refAdminWallet];
      }

      if (window.ethereum) {
        const provider = new eth.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const contract = new eth.Contract(nestageAddress, BUSD_ABI, signer);
        const busdContract = new eth.Contract(
          contractAddress,
          PLAIN_BUSD_ABI,
          signer
        );

        try {
          const currentAllowance = await busdContract.allowance(
            await signer.getAddress(),
            nestageAddress
          );

          const approvalTx = await busdContract.approve(nestageAddress, xamt);
          dispatch(setTransactionState({ state: "approving" }));
          await approvalTx.wait();
          dispatch(setTransactionState({ state: "approved" }));
          log(approvalTx);

          setTimeout(() => {
            dispatch(setTransactionState({ state: "awaiting payment" }));
          }, 1200);

          const gasEstimate = await contract.estimateGas.startNewReferral(
            info![0],
            info![1],
            xamt
          );

          const gasLimit = Math.ceil(gasEstimate.toNumber() * 1.1);

          const gasPrice = await provider.getGasPrice();

          const gasFee = gasPrice.mul(gasEstimate);
          log(`Estimated Gas Fee (in wei): ${gasFee.toString()}`);

          const gasFeeInEther = eth.utils.formatEther(gasFee);
          log(`Estimated Gas Fee (in ETH): ${gasFeeInEther}`);

          const tx = await contract.startNewReferral(info![0], info![1], xamt, {
            gasLimit,
          });
          dispatch(setTransactionState({ state: "paying" }));

          await tx.wait();
          log({ tx });

          if (tx.status === 1 || tx.status === "1") {
            const l: string[] = info![0];
            const len = l.length;
            let amt,
              didTransfer = 0;
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                amt = Number(amount) * (_rates[i] / SCALE);
                didTransfer += amt;
                await dispatch(
                  createPay({ address: l[i], amount: String(amt) })
                );
              }
              const adminReward = Number(amount) - didTransfer;
              dispatch(
                createPay({
                  address: String(refAdminWallet),
                  amount: String(adminReward),
                })
              );
            } else {
              dispatch(
                createPay({
                  address: String(refAdminWallet),
                  amount: String(amount),
                })
              );
            }
            dispatch(saveStat({ type: "levelTwo", amount }));
            dispatch(setTransactionState({ state: "payed" }));
            createNewRef &&
              (async () => {
                const aa = getReferral();
                const code = aa === null ? null : String(aa);
                let details: Types.createRefParams = { selfAddress: address };
                details = code !== null ? { ...details, code } : { ...details };
                await dispatch(createRefs(details));
              })();
            result = {
              isLoading: false,
              data: tx,
              error: null,
            };
          } else {
            const idx = sessionStorage.getItem("temp");
            const rm = async () => {
              const resx = await dispatch(removeRef({ id: String(idx) }));
              resx.meta.requestStatus !== "rejected" &&
                sessionStorage.removeItem("temp");
            };
            if (idx) rm();
          }
        } catch (error) {
          const idx = sessionStorage.getItem("temp");
          const rm = async () => {
            const resx = await dispatch(removeRef({ id: String(idx) }));
            resx.meta.requestStatus !== "rejected" &&
              sessionStorage.removeItem("temp");
          };
          if (idx) rm();
        }
      } else {
        console.error("Dapp is not installed!");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      result = {
        isLoading: false,
        data: null,
        error: errorMessage,
      };
    }

    return result;
  };

  const getMinings = async (): Promise<Types.ParsedMiningData[]> => {
    const minings: Types.MiningData[] = await contract?.call("getAllStakes");

    try {
      const parsedMining = minings?.map(
        (mining): Types.ParsedMiningData => ({
          staker: mining.staker,
          amount: eth.utils.formatUnits(mining.amount, "ether"),
          startDate: mining.startDate.toNumber(),
          endDate: mining.endDate.toNumber(),
          profit: eth.utils.formatUnits(mining.profit, "ether"),
        })
      );

      return parsedMining || [];
    } catch (error: any) {
      dispatch(setCheckState({ state: "not-found" }));
      return [];
    }
  };

  async function getBUSDBalance(walletAddress: string) {
    const provider = new eth.providers.Web3Provider(window.ethereum);
    try {
      const signer = provider.getSigner();

      const busdContract = new eth.Contract(nestageAddress, BUSD_ABI, signer);

      const balance = await busdContract.getBalance(walletAddress);

      return eth.utils.formatUnits(balance, "ether");
    } catch (error) {
      console.error("Error fetching BUSD balance:", error);
      return "0";
    }
  }

  const value: Types.StateContextValue = {
    address,
    contract,
    connect,
    status,
    balance,
    symbol,
    getMinings,
    newMining,
    newReferral,
    getBUSDBalance,
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (userAddress) {
        setAddress(userAddress);
      } else {
        setAddress("");
      }
    };

    fetchAddress();
  }, [userAddress]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateContext = (): Types.StateContextValue | undefined =>
  React.useContext(StateContext);
