import { TypedUseSelectorHook, useSelector } from "react-redux";
import { MiningData, RootState } from "../../../types/types";
import { useStateContext } from "../../../context/Web3";
import { useEffect, useState } from "react";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const LevelStatus = () => {
  const { userRef: userRefDetails } = useTypedSelector((state) => state.client);
  const { address, getMinings } = useStateContext();
  const [hasMining, setHasMining] = useState<boolean>(!!0);

  const searchStringInArray = (
    array: MiningData[],
    searchString: string
  ): boolean => {
    const result = array.filter((obj) => obj.staker === searchString);
    const res = result.length ? !!1 : !!0;
    return res;
  };

  const initX = async () => {
    let result = !!0;
    const x = await getMinings();
    if (x.length) result = searchStringInArray(x, address);

    setHasMining(result);
  };

  useEffect(() => {
    initX();
  }, []);

  return (
    <>
      <div className="hidden lg:flex justify-between items-center gap-4 mr-5 py-4">
        <div className="flex items-center justify-center gap-3 font-primary text-black dark:text-white tracking-wider">
          Level 1{" "}
          {hasMining ? (
            <div className="size-3 rounded-full bg-secondary">
              <div className="size-3 rounded-full animate-ping bg-secondary"></div>
            </div>
          ) : (
            <div className="size-3 rounded-full bg-gray-400"></div>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 border-l-2 border-gray-300 px-4  font-primary text-black dark:text-white tracking-wider">
          Level 2{" "}
          {userRefDetails.id > 0 ? (
            <div className="size-3 rounded-full bg-secondary">
              <div className="size-3 rounded-full animate-ping bg-secondary"></div>
            </div>
          ) : (
            <div className="size-3 rounded-full bg-gray-400"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default LevelStatus;
