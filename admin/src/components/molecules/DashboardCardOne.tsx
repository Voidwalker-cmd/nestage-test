// 'use client';
import {
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { DataItem, initialState, SummaryItem } from "../../types/types";
import { useStateContext } from "../../context/web3";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/libs";
import NotConnected from "./NotConnected";
import { useDispatch } from "../../hooks";
import { getPay } from "../../features/admin";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Static } from "../../assets/img";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const data: DataItem[] | [] = [];

const summary: SummaryItem[] | [] = [];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const DashboardCardOne = () => {
  const { lvlTwoTotal, adminWallets } = useTypedSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const { status, getStakes } = useStateContext();

  const [connectionStatus, setConnectionStatus] = useState<string | undefined>(
    ""
  );
  const [totalOne, setTotalOne] = useState<string | number>(0);
  const [totalUSDOne, setTotalUSDOne] = useState<string | number>(0);
  const [totalTwo, setTotalTwo] = useState<string | number>(0);
  const [totalUSDTwo, setTotalUSDTwo] = useState<string | number>(0);

  const getTotalLevelOne = async () => {
    let amount = 0;
    const gs = await getStakes();
    if (gs.length > 0) {
      gs.forEach((x) => {
        amount += Number(x.amount);
      });
    }
    const amt = amount.toFixed(2);
    const usd = amount.toFixed(0);
    setTotalOne(amt);
    setTotalUSDOne(usd);
  };

  const getTotalLevelTwo = async () => {
    await dispatch(getPay({ address: adminWallets.refAdmin }));
  };

  useEffect(() => {
    status !== null && status !== "" && setConnectionStatus(status);
  }, [status]);

  useEffect(() => {
    getTotalLevelOne();
  }, [getStakes]);

  useEffect(() => {
    adminWallets.refAdmin && getTotalLevelTwo();
  }, [adminWallets]);

  const setValues = async () => {
    const amt = lvlTwoTotal.toFixed(2);
    const usd = lvlTwoTotal.toFixed(0) ?? 0;
    setTotalTwo(amt);
    setTotalUSDTwo(usd);
  };

  useEffect(() => {
    setValues();
  }, [lvlTwoTotal]);

  const Icon = () => (
    <>
      <img src={Static.busd} alt="tetherImg" width={22} height={22} />
    </>
  );

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg p-5">
        <h2 className="text-tremor-title font-bold mb-3 dark:text-dark-tremor-content">
          Montly Performance
        </h2>
        <div className="flex items-center gap-5">
          {connectionStatus === "disconnected" ? (
            <NotConnected />
          ) : (
            <div className="bg-gray-50 shadow-md rounded-lg px-2.5 py-4">
              <h3 className="text-tremor-default text-tremor-content font-semibold dark:text-dark-tremor-content">
                Level One performance
              </h3>
              <p className="flex gap-3 items-center mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <Icon /> <span>{totalOne}</span>
              </p>
              <p className="mt-1 text-tremor-default font-medium">
                <span className="text-gray-500 dark:text-white">
                  {formatCurrency(String(totalUSDOne), "usd")}
                </span>{" "}
                {/* <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
                  Past 24 hours
                </span> */}
              </p>
            </div>
          )}
          {connectionStatus === "disconnected" ? (
            <NotConnected />
          ) : (
            <div className="bg-gray-50 shadow-md rounded-lg px-2.5 py-4">
              <h3 className="text-tremor-default text-tremor-content font-semibold dark:text-dark-tremor-content">
                Level Two performance
              </h3>
              <p className="flex gap-3 items-center mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <Icon /> <span>{totalTwo}</span> 
              </p>
              <p className="mt-1 text-tremor-default font-medium">
                <span className="text-gray-500 dark:text-white">
                  {formatCurrency(String(totalUSDTwo), "usd")}
                </span>{" "}
                {/* <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
                  Past 24 hours
                </span> */}
              </p>
            </div>
          )}
        </div>
        {connectionStatus === "disconnected" ? (
          <NotConnected />
        ) : (
          <>
            <LineChart
              data={data}
              index="date"
              categories={["Level One", "Level Two"]}
              colors={["blue", "violet", "fuchsia"]}
              valueFormatter={valueFormatter}
              yAxisWidth={55}
              onValueChange={() => {}}
              className="mt-6 hidden h-96 sm:block"
            />
            <LineChart
              data={data}
              index="date"
              categories={["Level One", "Level Two"]}
              colors={["blue", "violet", "fuchsia"]}
              valueFormatter={valueFormatter}
              showYAxis={false}
              showLegend={false}
              startEndOnly={true}
              className="mt-6 h-72 sm:hidden"
            />
            {summary.length ? (
              <Table className="mt-8">
                <TableHead>
                  <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Name
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Value
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Invested
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Cashflow
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Gain
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Realized
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        <div className="flex space-x-3">
                          <span
                            className={classNames(
                              item.bgColor,
                              "w-1 shrink-0 rounded"
                            )}
                            aria-hidden={true}
                          />
                          <span>{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                      <TableCell className="text-right">
                        {item.invested}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.cashflow}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={classNames(
                            item.changeType === "positive"
                              ? "text-emerald-700 dark:text-emerald-500"
                              : "text-red-700 dark:text-red-500"
                          )}
                        >
                          {item.gain}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={classNames(
                            item.changeType === "positive"
                              ? "text-emerald-700 dark:text-emerald-500"
                              : "text-red-700 dark:text-red-500"
                          )}
                        >
                          {item.realized}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="w-full py-10 border border-dashed rounded-lg mt-8 leading-relaxed text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
                No data available
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardCardOne;
