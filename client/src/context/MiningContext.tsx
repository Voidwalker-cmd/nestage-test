import React, { createContext, useContext, useState, useEffect } from "react";
import { ParsedMiningData, RootState } from "../types/types";
import { useStateContext } from "./Web3";
import { Helper } from "../helper";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface MiningContextType {
  minings: ParsedMiningData[];
}

const MiningContext = createContext<MiningContextType | undefined>(undefined);

export const useMiningContext = () => {
  const context = useContext(MiningContext);
  if (!context) {
    throw new Error("useMiningContext must be used within a MiningProvider");
  }
  return context;
};

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const MiningProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useTypedSelector((state) => state.client);
  const { address, getMinings } = useStateContext();
  const [minings, setMinings] = useState<ParsedMiningData[]>([]);

  const initX = async () => {
    const x = await getMinings();
    if (x.length) {
      let result = x.filter((obj: ParsedMiningData) => obj.staker === address);
      result = await Promise.all(
        result.map(async (x: ParsedMiningData, i: number) => {
          // const resa = await Helper.convertToUSD("BNB", x.amount);
          // const resb = await Helper.convertToUSD("BNB", x.profit);
          return {
            id: i + 1,
            // amtUSD: `$${resa.toFixed(2)}` ?? 0,
            // pftUSD: `$${resb.toFixed(2)}` ?? 0,
            ...x,
          };
        })
      );
      setMinings(result);
    }
  };

  useEffect(() => {
    initX();
  }, [userId]);

  return (
    <MiningContext.Provider value={{ minings }}>
      {children}
    </MiningContext.Provider>
  );
};
