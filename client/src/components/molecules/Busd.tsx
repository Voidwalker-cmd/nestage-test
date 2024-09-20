import { useEffect, useState } from "react";
import { useStateContext } from "../../context/Web3";

const Busd = ({ address }: { address: string }) => {
  const { getBUSDBalance } = useStateContext();

  const [busd, setBusd] = useState<string>("0.0");

  const getBUSD = async () => {
    const x = await getBUSDBalance(address);
    setBusd(parseFloat(x).toFixed(2));
  };

  useEffect(() => {
    getBUSD();
  }, []);
  return <>{busd}</>;
};

export default Busd;
