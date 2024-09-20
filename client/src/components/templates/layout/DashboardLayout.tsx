import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../context/Web3";
import { useEffect, useState } from "react";
import Sidebar from "../../organisms/Dashboard/Sidebar";
import Header from "../../organisms/Dashboard/Header";
import Footer from "../../organisms/Dashboard/Footer";
import { MiningProvider } from "../../../context/MiningContext";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { MiningData, RootState } from "../../../types/types";
import { useDispatch } from "../../../hooks";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const DashboardLayout = () => {
  const { userRef: userRefDetails, userId } = useTypedSelector(
    (state) => state.client
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { address, getMinings } = useStateContext();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!!0);
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
  });

  const init = async (): Promise<void> => {
    if (address !== "Loading Address..." && address !== "") {
      if (userId !== null) {
        if (userRefDetails.id <= 0 && userId <= 0 && !hasMining) {
          sessionStorage.removeItem("temp");
          sessionStorage.removeItem("MV938aO");
          localStorage.removeItem("ref");
          navigate("/");
        }
      }
      if (id === undefined) {
        sessionStorage.removeItem("temp");
        sessionStorage.removeItem("MV938aO");
        localStorage.removeItem("ref");
        navigate("/");
      }
      if (address.length > 10 && address !== id) {
        sessionStorage.removeItem("temp");
        sessionStorage.removeItem("MV938aO");
        localStorage.removeItem("ref");
        navigate("/");
      }
      // if (address !== undefined) {
      //   console.log(4);
      // navigate("/");
      // }
      // } else {
      //   console.log(4);
      // navigate("/");
    }

    // if (address !== "Loading Address...") {
    //   if (address !== undefined) {
    //     console.log(address !== id, id === undefined);
    //     if (address !== id || id === undefined) {
    //       // console.log("would navigate");
    // navigate("/");
    //     }
    //   }
    // }
  };

  //   comment the useEffect to view dashboard
  useEffect(() => {
    init();
  }, [address, userId]);

  //   console.log({ id, address });
  return (
    <>
      <MiningProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="px-4 lg:px-8 pt-8 pb-20 lg:pb-12 w-full h-full max-w-9xl mx-auto bg-gray-50">
                <Outlet />
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </MiningProvider>
    </>
  );
};

export default DashboardLayout;
