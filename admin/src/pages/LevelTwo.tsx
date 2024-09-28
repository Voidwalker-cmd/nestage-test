import LevelTable from "../components/molecules/LevelTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useDispatch } from "../hooks";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { initialState, RefDetails } from "../types";
import { useEffect, useState } from "react";
import { getAllReferrals } from "../features/admin";
import NotConnected from "../components/molecules/NotConnected";
import { useStateContext } from "../context/web3";

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const LevelOne = () => {
  const { status } = useStateContext();

  const [connectionStatus, setConnectionStatus] = useState<string | undefined>(
    ""
  );
  const dispatch = useDispatch();
  const { allRefs } = useTypedSelector((state) => state.admin);

  const [data, setData] = useState<RefDetails[]>([]);

  const initX = async () => {
    await dispatch(getAllReferrals());
  };

  useEffect(() => {
    initX();
  }, []);

  useEffect(() => {
    setData(allRefs);
  }, [allRefs]);

  useEffect(() => {
    status !== null && status !== "" && setConnectionStatus(status);
  }, [status]);

  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Nestage admin dashboard
        </h2>
        <p>Current Page: {"Level Two"}</p>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-5">
        {connectionStatus !== "disconnected" ? (
          <LevelTable label="LevelTwo">
            <Table className="mt-8">
              <TableHead>
                <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                  <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    S/N
                  </TableHeaderCell>
                  <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    User ID
                  </TableHeaderCell>
                  <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Address
                  </TableHeaderCell>
                  <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Referral Code
                  </TableHeaderCell>
                  <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Upline
                  </TableHeaderCell>
                  <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Total Uplines
                  </TableHeaderCell>
                  <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Downlines
                  </TableHeaderCell>
                  {/* <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Last edited
                </TableHeaderCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow
                    key={item.uuid}
                    className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                  >
                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {i + 1}
                    </TableCell>
                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {item.userId}
                    </TableCell>
                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {item.address}
                    </TableCell>
                    <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      {item.code}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <span>{item.uplineCode || "No upline"}</span>
                        {/* <span>{item?.uplines[0]?.id || null}</span> */}
                      </div>
                    </TableCell>
                    <TableCell>{item.upline || 0}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 lg:gap-2 justify-center">
                        <h4 className="font-semibold text-base">1st:</h4>
                        <span className="flex items-center justify-center size-6 p-1.5 border border-blue-500 text-blue-700 bg-blue-400 bg-opacity-50 rounded-md font-bold text-md shadow-sm">
                          {item.downlines.firstLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2 justify-center">
                        <h4 className="font-semibold text-base">2nd:</h4>
                        <span className="flex items-center justify-center size-6 p-1.5 border border-rose-500 text-rose-700 bg-rose-400 bg-opacity-50 rounded-md font-bold text-md shadow-sm">
                          {item.downlines.secondLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2 justify-center">
                        <h4 className="font-semibold text-base">3rd:</h4>
                        <span className="flex items-center justify-center size-6 p-1.5 border border-purple-500 text-purple-700 bg-purple-400 bg-opacity-50 rounded-md font-bold text-md shadow-sm">
                          {item.downlines.thirdLevel}
                        </span>
                      </div>
                    </TableCell>
                    {/* <TableCell>{item.capacity}</TableCell>
                  <TableCell className="text-right">
                    {item.downlines.secondLevel}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.downlines.thirdLevel}
                  </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LevelTable>
        ) : (
          <NotConnected />
        )}
      </div>
      {/* <DashboardCardOne /> */}
    </main>
  );
};

export default LevelOne;
