import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useEffect } from "react";
import { getStats } from "../../features/admin";
import { useDispatch } from "../../hooks";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { getStatsResponse, initialState } from "../../types";

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const StatisticsCard = () => {
  const dispatch = useDispatch();
  const { stats } = useTypedSelector((state) => state.admin);

  const initX = async () => {
    await dispatch(getStats());
  };

  useEffect(() => {
    initX();
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-lg p-5 w-full">
      <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Inflow Statistics
      </h3>
      <div className="">
        {stats.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Level One</TableHeaderCell>
                <TableHeaderCell>Level Two</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {stats.map((item: getStatsResponse, i: number) => (
                <TableRow key={`lauiondw-${i}`}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.levelOne}</TableCell>
                  <TableCell>{item.levelTwo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <span className="w-full block text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
            No data available
          </span>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;
