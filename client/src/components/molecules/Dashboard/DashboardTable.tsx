import { useEffect, useState } from "react";
import { useMiningContext } from "../../../context/MiningContext";
import { ParsedMiningData } from "../../../types/types";
import { SortIconI } from "../../atom/Icons";
import { Lock } from "lucide-react";
import {
  convertDateTime,
  datetimeDurationPercent,
  Formatter,
} from "../../../config/utils";
import { Helper } from "../../../helper";
import { Static } from "../../../assets/img";
import { useModal } from "../../../context/ModalContext";

type SortOrder = "asc" | "desc";
type SortField = "id" | "amount" | "profit" | "startDate" | "endDate";

const DashboardTable = () => {
  const { minings } = useMiningContext();
  const { showModal } = useModal();
  const [sortedMinings, setSortedMinings] = useState<ParsedMiningData[]>([]);
  const [idSort, setIdSort] = useState<SortOrder>("asc");
  const [amountSort, setAmountSort] = useState<SortOrder>("asc");
  const [profitSort, setProfitSort] = useState<SortOrder>("asc");
  const [startDateSort, setStartDateSort] = useState<SortOrder>("asc");
  const [endDateSort, setEndDateSort] = useState<SortOrder>("asc");
  const [convertedAmt, setConvertedAmt] = useState<number>(0);
  const [d, setD] = useState<number | string>(0);
  const [levelOneOpened, setLevelOneOpened ] = useState<boolean>(!!0);

  const sortMining = (
    data: ParsedMiningData[],
    field: SortField,
    order: SortOrder = "asc"
  ): ParsedMiningData[] => {
    return data.slice().sort((a, b) => {
      let aValue: number | string = a[field] ?? 0;
      let bValue: number | string = b[field] ?? 0;

      if (field === "amount" || field === "profit") {
        aValue = parseFloat(aValue as string);
        bValue = parseFloat(bValue as string);
      }

      if (aValue < bValue) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const resetIcons = (field: SortField) => {
    const list = [
      "idSort",
      "amountSort",
      "profitSort",
      "startDateSort",
      "endDateSort",
    ];
    for (let x = 0; x <= 5; x++) {
      field.includes("id") && idSort === "asc"
        ? setIdSort("desc")
        : setIdSort("asc");
      field.includes("amount") && amountSort === "asc"
        ? setAmountSort("desc")
        : setAmountSort("asc");
      field.includes("profit") && profitSort === "asc"
        ? setProfitSort("desc")
        : setProfitSort("asc");
      field.includes("startDate") && startDateSort === "asc"
        ? setStartDateSort("desc")
        : setStartDateSort("asc");
      field.includes("endDate") && endDateSort === "asc"
        ? setEndDateSort("desc")
        : setEndDateSort("asc");
    }
  };

  useEffect(() => {
    if (minings.length > 0) {
      setSortedMinings(minings);
    }
  }, [minings]);

  const handleSort = (field: SortField, order: SortOrder) => {
    const sortedData = sortMining(minings, field, order);
    setSortedMinings(sortedData);
    resetIcons(field);
  };

  const handleConvert = async (x: number | string) => {
    // setD(x);
    const r = await sss(x);
    return r;
  };

  const sss = async (x: number | string) => {
    const res = (await Helper.convertToUSD("BNB", x)) ?? 0;
    setConvertedAmt(res);
    return Math.floor(res);
  };

  // useEffect(() => {
  //   // sss(d);
  // }, [d]);

  return (
    <>
      <section className="container mx-auto">
        <h2 className="text-lg font-medium text-gray-800">All Minings</h2>

        <p className="mt-1 text-sm text-gray-500">
          This table displays all your mining history
        </p>

        {sortedMinings.length ? (
          <div className="flex flex-col mt-6 shadow-lg mx-5 lg:mx-0">
            <div className=" -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-primary-200 dark:border-secondary rounded-lg ">
                  <table className="min-w-full divide-y divide-primary-200 dark:divide-secondary">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button
                            onClick={() => handleSort("id", idSort)}
                            className="flex items-center gap-x-3 focus:outline-none"
                          >
                            <span>ID</span>

                            <SortIconI className={"w-3 h-3"} />
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button
                            onClick={() => handleSort("amount", amountSort)}
                            className="flex items-center gap-x-3 focus:outline-none"
                          >
                            <span>Amount</span>

                            <SortIconI className={"w-3 h-3"} />
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button
                            onClick={() => handleSort("profit", profitSort)}
                            className="flex items-center gap-x-3 focus:outline-none"
                          >
                            <span>Profit</span>

                            <SortIconI className={"w-3 h-3"} />
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Duration
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Status
                        </th>

                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {sortedMinings.map((x, i) => (
                        <tr key={`z8srhfl${i}`}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                {x.id}
                              </h2>
                              {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                              catalogapp.io
                            </p> */}
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                            BUSD {x.amount}
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                              {x?.amtUSD}
                              {/* {x.amount} */}
                            </p>
                            {/* <div className="inline px-3 py-1 text-sm font-normal rounded-xl text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          </div> */}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                            BUSD {x.profit}
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                              {x.pftUSD}
                              {/* {x.amount} */}
                            </p>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="">
                              <h4 className="text-gray-700 dark:text-gray-200 flex items-center gap-1">
                                Start Date:{" "}
                                <p className="text-gray-500 dark:text-gray-400">
                                  {convertDateTime(x.startDate)}
                                </p>
                              </h4>
                              <h4 className="text-gray-700 dark:text-gray-200 flex items-center gap-1">
                                End Date:{" "}
                                <p className="text-gray-500 dark:text-gray-400">
                                  {convertDateTime(x.endDate)}
                                </p>
                              </h4>
                            </div>
                          </td>
                          {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <img
                              className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                              alt=""
                            />
                            <img
                              className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                              alt=""
                            />
                            <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              +4
                            </p>
                          </div>
                        </td> */}

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="w-48 h-1.5 bg-secondary-800 overflow-hidden rounded-full">
                              <div
                                className={`bg-primary w-[${datetimeDurationPercent(
                                  x.startDate,
                                  x.endDate
                                )}%] h-1.5`}
                              ></div>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 my-5 py-1 items-center justify-center">
            <img src={Static.no_data} alt="" width={90} height={90} />
            No Active Stake.
            <div className="my-2">
            {ddddd ? (
              <button
                onClick={() => {
                  sessionStorage.setItem("MV938aO", "kYgxU8x");
                  showModal();
                }}
                className="btn bg-blue-600 hover:bg-blue text-white p-2 shadow-xl rounded-md flex items-center"
              >
                Activate Level 1
              </button>
            ) : (
              (
                <span
                title="Level One Staking on Hold!"
                  className="w-full flex justify-center items-center px-4 py-2 mt-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform bg-rose-200 text-rose-600 border border-rose-600 cursor-not-allowed rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-rose-300 hover:text-rose-700 focus:outline-none focus:ring focus:ring-rose-300 focus:ring-opacity-40"
                >
                  <Lock className="w-5 h-5" />
                </span>
              )}
            </div>
          </div>
        )}

        {/* <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>previous</span>
          </a>

          <div className="items-center hidden md:flex gap-x-3">
            <a
              href="#"
              className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
            >
              1
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              ...
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              12
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              13
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              14
            </a>
          </div>

          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div> */}
      </section>
    </>
  );
};

export default DashboardTable;
