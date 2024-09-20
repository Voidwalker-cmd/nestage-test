import { useEffect, useState } from "react";
import { useMiningContext } from "../../../context/MiningContext";
import {
  createRefResponse,
  ParsedMiningData,
  RootState,
} from "../../../types/types";
import { CopiedIcon, CopyIcon, SortIconI } from "../../atom/Icons";
import {
  CB,
  convertDateTime,
  datetimeDurationPercent,
  Formatter,
  shortenHexString,
} from "../../../config/utils";
import { Helper } from "../../../helper";
import { Static } from "../../../assets/img";
import { useModal } from "../../../context/ModalContext";
import { getRef } from "../../../features/client";
import { useStateContext } from "../../../context/Web3";
import { useDispatch } from "../../../hooks";
import { useDevice } from "../../../context/DeviceModeContext";
import { useLocation } from "react-router-dom";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { SiteUrl } from "../../../const";
// import { TypedUseSelectorHook, useSelector } from "react-redux";

type SortOrder = "asc" | "desc";
type SortField = "id" | "amount" | "profit" | "startDate" | "endDate";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const DashboardTableL2 = () => {
  const { userRef: userRefDetails } = useTypedSelector((state) => state.client);
  const dispatch = useDispatch();
  const location = useLocation();
  const { showModal } = useModal();
  // const { address } = useStateContext();
  const { isMobile } = useDevice();
  // const { minings } = useMiningContext();
  const [sortedMinings, setSortedMinings] = useState<ParsedMiningData[]>([]);
  const [idSort, setIdSort] = useState<SortOrder>("asc");
  const [amountSort, setAmountSort] = useState<SortOrder>("asc");
  // const [userRefDetails, setUserRefDetails] = useState<
  //   createRefResponse | subCreateRes
  // >(userRefDetailsi);
  const [profitSort, setProfitSort] = useState<SortOrder>("asc");
  const [startDateSort, setStartDateSort] = useState<SortOrder>("asc");
  const [endDateSort, setEndDateSort] = useState<SortOrder>("asc");
  const [convertedAmt, setConvertedAmt] = useState<number>(0);
  const [d, setD] = useState<number | string>(0);

  const [txt, setTxt] = useState<"copy" | "copied">("copy");

  const onCopy = () => {
    setTxt("copied");
    setTimeout(() => {
      setTxt("copy");
    }, 3000);
  };

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

  // useEffect(() => {
  //   if (minings.length > 0) {
  //     // setSortedMinings(minings);
  //   }
  // }, [minings]);

  // const initx = async () => {
  //   const addr = String(address);
  //   const res = await dispatch(getRef({ address: addr }));
  //   if (res.meta.requestStatus !== "rejected") {
  //     setUserRefDetails(res.payload);
  //   }
  // };

  // useEffect(() => {
  //   address && initx();
  // }, [address, location.pathname]);

  // const handleSort = (field: SortField, order: SortOrder) => {
  //   const sortedData = sortMining(minings, field, order);
  //   setSortedMinings(sortedData);
  //   resetIcons(field);
  // };

  const handleConvert = (x: number | string) => {
    setD(x);
    return "";
  };

  const sss = async (x: number | string) => {
    const res = (await Helper.convertToUSD("BNB", x)) ?? 0;
    setConvertedAmt(res);
  };

  useEffect(() => {
    sss(d);
  }, [d]);

  const isNotEmpty = (obj: Record<string, any>): boolean =>
    Object.keys(obj).length > 0;

  return (
    <>
      <section className="container mx-auto">
        <h2 className="text-lg font-medium text-gray-800">
          All Referral Downlines
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          This table displays all your referrral downline history
        </p>

        {userRefDetails.id > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 my-3">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Referral ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Referral Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Referral Link
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Upline ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userRefDetails.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isNotEmpty(userRefDetails) ? (
                        <span className="text-green-500 font-semibold flex gap-2 items-center">
                          Active
                          <div className="size-3 rounded-full bg-secondary">
                            <div className="size-3 rounded-full animate-ping bg-secondary"></div>
                          </div>
                        </span>
                      ) : (
                        <span className="text-gray-500 font-semibold flex gap-2 items-center">
                          inActive
                          <div className="size-3 rounded-full bg-gray-400"></div>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                      <span className="font-semibold">
                        {SiteUrl}/?ref={userRefDetails.code}
                      </span>
                      <CB
                        text={`${SiteUrl}/?ref=${userRefDetails.code}`}
                        onCopy={onCopy}
                      >
                        <div className="relative inline-block cbBtn">
                          {txt === "copy" ? (
                            <CopyIcon
                              className={`size-4 font-semibold text-blue-700`}
                            />
                          ) : (
                            <CopiedIcon
                              className={`size-4 font-semibold text-green-700`}
                            />
                          )}
                        </div>
                      </CB>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold">
                        {userRefDetails.uplineCode || "None"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="my-3">
              <h3 className="font-semibold text-lg py-5">Downlines</h3>
              <div className="flex gap-5 lg:gap-8 items-start lg:items-center justify-start">
                <div className="flex items-center gap-1 lg:gap-2">
                  <h4 className="font-semibold text-base">
                    1st Level Downlines:
                  </h4>
                  <span className="flex items-center justify-center size-10 p-2 border-2 border-blue-500 text-blue-700 bg-blue-400 bg-opacity-50 rounded-md font-bold text-xl shadow-lg">
                    {userRefDetails.downlines.firstLevel}
                  </span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                  <h4 className="font-semibold text-base">
                    2nd Level Downlines:
                  </h4>
                  <span className="flex items-center justify-center size-10 p-2 border-2 border-rose-500 text-rose-700 bg-rose-400 bg-opacity-50 rounded-md font-bold text-xl shadow-lg">
                    {userRefDetails.downlines.secondLevel}
                  </span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                  <h4 className="font-semibold text-base">
                    3rd Level Downlines:
                  </h4>
                  <span className="flex items-center justify-center size-10 p-2 border-2 border-purple-500 text-purple-700 bg-purple-400 bg-opacity-50 rounded-md font-bold text-xl shadow-lg">
                    {userRefDetails.downlines.thirdLevel}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 my-5 py-1 items-center justify-center">
            <img src={Static.no_data} alt="" width={90} height={90} />
            No Referral Downlines.
            <div className="my-2">
              <button
                onClick={() => {
                  sessionStorage.setItem("MV938aO", "IcOtcCJ");
                  showModal();
                }}
                className="btn bg-blue-600 hover:bg-blue text-white p-2 shadow-xl rounded-md flex items-center"
              >
                Activate Level 2
              </button>
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

export default DashboardTableL2;
