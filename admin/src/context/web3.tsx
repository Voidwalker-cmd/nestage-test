import {
  useAddress,
  useBalance,
  useConnectionStatus,
  useContract,
} from "@thirdweb-dev/react";
import * as Types from "../types";
import React, { createContext, useEffect, useState } from "react";
import { eth } from "../utils/libs";
import { BigNumber } from "ethers";
import BUSD_ABI from "../web3/NestageNw.json";
import PLAIN_BUSD_ABI from "../web3/PlainBUSD_ABI.json";

const StateContext = createContext<Types.StateContextValue>(
  {} as Types.StateContextValue
);

// const nestageAddress = "0x8DCf248CC6cc3511b57ad1d6847C505ea3F1bEC1";
// const nullAddress = "0x0000000000000000000000000000000000000000";

// const nestageAddress = "0xD51907bBa97b157dC1475141a355290012Bee07e";

const nestageAddress = "0xd8739D3F17F3d211507EfD9BD186e4B0Ae0aB7dE"; //mainnet
// const nestageAddress = "0x8D96CD1Eb98259ac06cf0AA7b64E2a4814c14eC7"; //testnet

const contractAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; // mainnet
// const contractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"; // testnet

export const StateContextProvider: React.FC<Types.StateContextProps> = ({
  children,
}) => {
  const { contract } = useContract(nestageAddress);
  const [address, setAddress] = useState<string>("Loading Address...");

  const userAddress = useAddress();

  const { data } = useBalance();
  const balance: string | undefined =
    data && typeof data.symbol === "string" ? data.displayValue : undefined;
  const symbol: string | undefined =
    data && typeof data.symbol === "string" ? data.symbol : undefined;

  // Fetch connection status
  const status = useConnectionStatus();

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

  const payReferral = async ({
    stakers,
    stakerPrt,
  }: Types.payoutParams): Promise<Types.payoutResult> => {
    let result: Types.payoutResult = {
      isLoading: true,
      data: null,
      error: null,
    };

    const stakerPrtX = stakerPrt.map((prt) =>
      eth.utils.parseUnits(prt.toString(), "ether")
    ) as BigNumber[];

    const amtX = stakerPrt.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );

    const amt = eth.utils.parseUnits(amtX.toString(), "ether");
    const sending = [stakers, stakerPrtX];
    // console.log(amt, sending);

    try {
      // const data = await contract?.call("distributeUserProfit", sending, {
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
          await busdContract.allowance(
            await signer.getAddress(),
            nestageAddress
          );

          // if (!currentAllowance.lt(amount)) {
          const approvalTx = await busdContract.approve(nestageAddress, amt);
          // dispatch(setTransactionState({ state: "approving" }));
          await approvalTx.wait();
          // dispatch(setTransactionState({ state: "approved" }));

          setTimeout(() => {
            // dispatch(setTransactionState({ state: "awaiting payment" }));
          }, 1200);
          // }

          const gasLimit = 500000;

          const tx = await contract.distributeUserProfit(
            sending[0],
            sending[1],
            amt,
            {
              gasLimit,
            }
          );

          // dispatch(setTransactionState({ state: "paying" }));

          await tx.wait();
          // dispatch(setTransactionState({ state: "payed" }));
        } catch (error) {
          console.error("Error calling distributeUserProfit:", error);
        }
      } else {
        console.error("Dapp is not installed!");
      }

      result = {
        isLoading: false,
        data: data,
        error: null,
      };
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

  // Function to get minings
  const getStakes = async (): Promise<Types.ParsedMiningData[]> => {
    const minings: Types.MiningData[] = await contract?.call("getAllStakes");

    // Parse the raw mining data
    const parsedMining = await Promise.all(
      minings.map(async (mining, i): Promise<Types.ParsedMiningData> => {
        const amount = eth.utils.formatUnits(mining.amount);
        const profit = eth.utils.formatUnits(mining.profit);
        const amountUSD = Number(amount);
        const profitUSD = Number(profit);

        return {
          id: i + 1,
          staker: mining.staker,
          amount,
          amountUSD,
          startDate: mining.startDate.toNumber(),
          endDate: mining.endDate.toNumber(),
          profit,
          profitUSD,
        };
      })
    );

    return parsedMining || [];
  };

  const value: Types.StateContextValue = {
    address,
    contract,
    status,
    balance,
    symbol,
    getStakes,
    payReferral,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateContext = (): Types.StateContextValue =>
  React.useContext(StateContext);
