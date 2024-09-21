import { TypedUseSelectorHook, useSelector } from "react-redux";
import { sendNotiResponse, initialState } from "../../types";
import { useEffect, useState } from "react";
import { getNoti } from "../../features/admin";
import { useDispatch } from "../../hooks";

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const NotificationCreateCard = () => {
  const dispatch = useDispatch();
  const { noti } = useTypedSelector((state) => state.admin);
  const [notis, setNotis] = useState<sendNotiResponse[]>([]);

  const initX = async () => {
    await dispatch(getNoti());
  };

  useEffect(() => {
    initX();
  }, []);

  useEffect(() => {
    const flipped = noti.slice().reverse();
    setNotis(flipped);
  }, [noti]);

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg p-5 w-full lg:w-1/2">
        <h3 className="text-tremor-title py-3 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Pasted Notification
        </h3>
        <>
          <div className="flex flex-col gap-3 overflow-y-scroll h-[450px] pr-3">
            {notis.length ? (
              notis.map((item: sendNotiResponse, i: number) => (
                <div key={`lauionasddw-${i}`}>
                  <div className="flex flex-row lg:flex-col gap-1 items-start justify-between border border-tremor-default rounded-lg p-4 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                      <h5 className="mr-2 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        User ID:
                      </h5>
                      <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        {item.userId}
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                      <h5 className="mr-2 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Type:
                      </h5>
                      <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        {item.type === "new"
                          ? "🆕"
                          : item.type === "announce"
                          ? "📢"
                          : item.type === "update"
                          ? "🔄"
                          : item.type === "delete"
                          ? "🗑️"
                          : item.type === "error"
                          ? "🔴"
                          : item.type === "success"
                          ? "🟢"
                          : "🔥"}{" "}
                        {item.type}
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                      <h5 className="mr-2 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Title:
                      </h5>
                      <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                      <h5 className="mr-2 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Text:
                      </h5>
                      <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        {item.text}
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                      <h5 className="mr-2 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Created:
                      </h5>
                      <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        {item.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span className="w-full block text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
                No data available
              </span>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default NotificationCreateCard;
