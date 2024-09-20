import LevelTable from "../components/molecules/LevelTable";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useStateContext } from "../context/web3";
import { useEffect, useState } from "react";
import NotConnected from "../components/molecules/NotConnected";
import { ParsedMiningData } from "../types/types";
import { checkDate, convertDateTime, Toast } from "../utils/libs";
import { Checkbox } from "@headlessui/react";
import { Static } from "../assets/img";

const LevelOne = () => {
  const { status, getStakes, payReferral } = useStateContext();

  const [data, setData] = useState<ParsedMiningData[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string | undefined>(
    ""
  );

  const [allChecked, setAllChecked] = useState<boolean>(!!0);
  // const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showAction, setShowAction] = useState<boolean>(!!0);
  // const [convertedAmt, setConvertedAmt] = useState<number>(0);
  // const [convertedPrt, setConvertedPrt] = useState<number>(0);

  const initX = async () => {
    const gs: ParsedMiningData[] = await getStakes();

    if (gs.length > 0) {
      setData(gs);
      // const initialCheckedState = gs.reduce((acc, item) => {
      //   acc[Number(item?.id)] = false;
      //   return acc;
      // }, {} as Record<string, boolean>);
      // setCheckedItems(initialCheckedState);
    }
  };

  const payRefs = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    payBtn: string = "single",
    endDate: number = 0
  ) => {
    e.preventDefault();
    let ed = endDate;
    if (payBtn === "bulk") {
      ed = 0;
    }
    // console.log(payBtn, endDate);
    if (payBtn === "single" && !checkDate(ed)) {
      Toast("error", "Stake has not ended yet");
      return 0;
    }
    const selectedStakers = getSelectedStakers(selectedItems);
    const selectedProfits = getSelectedProfits(selectedItems);
    await payReferral({
      stakers: selectedStakers,
      stakerPrt: selectedProfits,
    });
    // console.log(result);
  };

  useEffect(() => {
    status !== null && status !== "" && setConnectionStatus(status);
  }, [status]);

  useEffect(() => {
    initX();
  }, [getStakes]);

  const handleMasterCheckboxChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setShowAction(newCheckedState);
    // console.log(newCheckedState);

    if (newCheckedState) {
      let allStakers = data.map((item) => {
        const res = checkDate(item?.endDate) ? item?.id : 0.1;
        return res;
      });
      allStakers = allStakers.filter((x) => x !== 0.1);
      if (allStakers.length) {
        setSelectedItems(allStakers);
      } else {
        setAllChecked(!!0);
        setShowAction(!!0);
        Toast("error", "All users stake has not ended yet.");
      }
    } else {
      setSelectedItems([]);
      setAllChecked(!!0);
      setShowAction(!!0);
    }
    if (selectedItems.length > 10) {
      Toast(
        "error",
        "You can only select 10 stakers at a time, To reduce Blockchain time."
      );
      const slicedSelectedItems = selectedItems.slice(0, 10);
      setSelectedItems(slicedSelectedItems);
    }
  };

  const handleCheckboxChange = (id: number, endDate: number) => {
    console.log(endDate);
    // if (!checkDate(endDate)) {
    //   Toast("error", "Stake has not ended yet");
    //   return;
    // }
    setSelectedItems((prevSelectedItems) => {
      let updatedItems;
      if (prevSelectedItems.includes(id)) {
        updatedItems = prevSelectedItems.filter((item) => item !== id);
      } else {
        updatedItems = [...prevSelectedItems, id];
      }

      setAllChecked(updatedItems.length > 0);
      setShowAction(updatedItems.length > 0);

      return updatedItems;
    });
    if (selectedItems.length > 10) {
      Toast(
        "error",
        "You can only select 10 stakers at a time, To reduce Blockchain time."
      );
      const slicedSelectedItems = selectedItems.slice(0, 10);
      setSelectedItems(slicedSelectedItems);
    }
  };

  const getSelectedProfits = (selectedItems: number[]): number[] => {
    return selectedItems.map((id) => {
      const foundItem = data.find((item) => Number(item?.id) === id);
      return foundItem ? Number(foundItem.profit) : 0;
    });
  };

  const getSelectedStakers = (selectedItems: number[]): string[] => {
    return selectedItems.map((id) => {
      const foundItem = data.find((item) => Number(item?.id) === id);
      return foundItem ? foundItem.staker : "";
    });
  };

  // const Convert = (amt: string | number, type: string): string => {
  //   (async () => {
  //     const x = (await Helper.convertToUSD("BNB", amt)) as number;
  //     type === "amt" ? setConvertedAmt(x) : setConvertedPrt(x);
  //   })();
  //   return "";
  // };

  const Icon = () => (
    <>
      <img src={Static.busd} alt="tetherImg" width={16} height={16} />
    </>
  );

  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Nestage admin dashboard
        </h2>
        <p>Current Page: {"Level One"}</p>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-5">
        {connectionStatus !== "disconnected" ? (
          <LevelTable
            label="LevelOne"
            showAction={showAction}
            payRefs={payRefs}
          >
            {data.length ? (
              <Table className="mt-8">
                <TableHead>
                  <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      <Checkbox
                        checked={allChecked}
                        onChange={handleMasterCheckboxChange}
                        className="payoutCheckboxMaster group block size-4 rounded border border-gray-400 bg-white data-[checked]:bg-blue-500"
                      >
                        <svg
                          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Checkbox>
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Staker
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Amount
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Profit
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Start Date
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      End Date
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Status
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Action
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow
                      key={`${item.staker}-${i}`}
                      className={`${
                        selectedItems.includes(Number(item?.id))
                          ? "bg-blue-100"
                          : "even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                      }`}
                    >
                      <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        <Checkbox
                          checked={selectedItems.includes(Number(item?.id))}
                          disabled={!checkDate(item?.endDate)}
                          onChange={() =>
                            handleCheckboxChange(
                              Number(item?.id),
                              item?.endDate
                            )
                          }
                          className="payoutCheckbox group block size-4 rounded border border-gray-400 bg-white data-[checked]:bg-blue-500"
                        >
                          <svg
                            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Checkbox>
                      </TableCell>
                      <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {item.staker}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-start items-center">
                          <Icon />
                          <span className="font-semibold">{item.amount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-start items-center">
                          <Icon />
                          <span className="font-semibold">{item.profit}</span>
                        </div>
                      </TableCell>
                      <TableCell>{convertDateTime(item.startDate)}</TableCell>
                      <TableCell>{convertDateTime(item.endDate)}</TableCell>
                      <TableCell>in progress</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          color="green"
                          onClick={(e) => payRefs(e, "single", item?.endDate)}
                          className="mt-4 whitespace-nowrap rounded-tremor-small bg-green-500 px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-green-600 dark:bg-green-400 dark:text-green dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                        >
                          Payout
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <span className="italic block text-center font-semibold my-3">
                LevelOne Table Data is Empty
              </span>
            )}
          </LevelTable>
        ) : (
          <NotConnected />
        )}
      </div>
    </main>
  );
};

export default LevelOne;
