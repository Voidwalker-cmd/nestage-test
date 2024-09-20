import { useEffect, useState } from "react";
import DashboardAction from "../../components/molecules/Dashboard/DashboardAction";
import WelcomeBanner from "../../components/molecules/Dashboard/WelcomeBanner";
import { Formatter } from "../../config/utils";
import { useMiningContext } from "../../context/MiningContext";
import DashboardCard from "../../components/molecules/Dashboard/DashboardCard";
import { useStateContext } from "../../context/Web3";
import DashboardTable from "./../../components/molecules/Dashboard/DashboardTable";
import DashboardTableL2 from "./../../components/molecules/Dashboard/DashboardTableL2";
import { Static } from "../../assets/img";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../types/types";
import { useDispatch } from "../../hooks";
import { getPay } from "../../features/client";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const index = () => {
  const { total } = useTypedSelector((state) => state.client);
  const dispatch = useDispatch();
  const { minings } = useMiningContext();
  const { address } = useStateContext();
  const [bal, setBal] = useState<number>(0);
  const [lvlOne, setLvlOne] = useState<number>(0);
  const [lvlTwo, setLvlTwo] = useState<number>(0);
  const [totallevels, setTotallevels] = useState<number>(0);

  const levelOne = () => {
    let profit = 0;
    for (let i = 0; i < minings.length; i++) {
      profit = profit + Number(minings[i]?.profit);
    }
    const t = isNaN(profit) ? 0 : profit;
    setLvlOne(t);
  };

  const levelTwo = async () => {
    await dispatch(getPay({ address }));
  };

  const totalLevel = () => {
    setTotallevels(lvlOne + lvlTwo);
  };

  useEffect(() => {
    if (!address.includes("Loading Address") && address !== "") {
      levelTwo();
    }
  }, [address]);

  useEffect(() => {
    setLvlTwo(total.levelTwo.total);
  }, [total]);

  useEffect(() => {
    levelOne();
  }, [minings]);

  useEffect(() => {
    totalLevel();
  }, [lvlOne, lvlTwo]);

  const Icon = () => (
    <>
      <img src={Static.busd} alt="tetherImg" width={30} height={30} />
    </>
  );
  return (
    <>
      <div className="w-full p-2 lg:p-8">
        <WelcomeBanner />
        <DashboardAction />
        <div className="grid grid-cols-12 gap-6 mb-0.5">
          {/* Line chart (Acme Plus) */}
          <DashboardCard>
            <div className="px-5 py-5">
              <header className="flex justify-between items-start mb-2"></header>
              <h2 className="text-lg font-semibold text-anti_white  mb-2">
                Total Amount Earned
              </h2>
              <div className="text-xs font-semibold text-anti_white mb-1">
                Total Amount earned in Level 1 and Level 2
              </div>
              <div className="flex items-start">
                <div className="text-3xl font-bold text-anti_white mr-2">
                  <span className="flex items-center gap-2 py-1">
                    <Icon />
                    {totallevels === 0 ? 0 : totallevels.toFixed(2)}
                  </span>
                </div>
                {/* <div className="text-sm font-semibold text-white px-2 bg-emerald-500 rounded-xl">
                  {Formatter(24780, { type: "c" })}
                </div> */}
              </div>
            </div>
            {/* Chart built with Chart.js 3 */}
            <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
              {/* Change the height attribute to adjust the chart height */}
              {/* <LineChart data={chartData} width={389} height={128} /> */}
            </div>
          </DashboardCard>
          <DashboardCard>
            <div className="px-5 py-5">
              <header className="flex justify-between items-start mb-2"></header>
              <h2 className="text-lg font-semibold text-anti_white mb-2">
                Level 1 Earnings
              </h2>
              {/* <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                Earned in Level 2
              </div> */}
              <div className="flex items-start">
                <div className="text-3xl font-bold text-anti_white mr-2">
                  <span className="flex items-center gap-2 py-1">
                    <Icon />
                    {lvlOne === 0 ? 0 : lvlOne.toFixed(2)}
                  </span>
                </div>
                {/* <div className="text-sm font-semibold text-white px-2 bg-emerald-500 rounded-xl">
                  {Formatter(24780, { type: "c" })}
                </div> */}
              </div>
            </div>
          </DashboardCard>
          <DashboardCard>
            <div className="px-5 py-5">
              <header className="flex justify-between items-start mb-2"></header>
              <h2 className="text-lg font-semibold text-anti_white mb-2">
                Level 2 Earnings
              </h2>
              {/* <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                Earned in Level 1
              </div> */}
              <div className="flex items-start">
                <div className="text-3xl font-bold text-anti_white mr-2">
                  <span className="flex items-center gap-2 py-1">
                    <Icon />
                    {lvlTwo === 0 ? 0 : lvlTwo.toFixed(2)}
                  </span>
                </div>
                {/* <div className="text-sm font-semibold text-white px-2 bg-emerald-500 rounded-xl">
                  {Formatter(24780, { type: "c" })}
                </div> */}
              </div>
            </div>
          </DashboardCard>
        </div>
        <div className="block">
          <h1 className="font-bold font-primary text-primary text-2xl tracking-wider mt-10">
            LEVEL ONE
          </h1>
        </div>
        <div className="mt-5 w-full">
          <DashboardTable />
        </div>
        <div className="block">
          <h1 className="font-bold font-primary text-primary text-2xl tracking-wider mt-10">
            LEVEL TWO
          </h1>
        </div>
        <div className="mt-5 w-full">
          <DashboardTableL2 />
        </div>
      </div>
    </>
  );
};

export default index;
