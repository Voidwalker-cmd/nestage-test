import { TypedUseSelectorHook, useSelector } from "react-redux";
import { initialState } from "../../types";
import {
  Button,
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  TextInput,
  Textarea,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { getUsers, sendNoti } from "../../features/admin";
import { useDispatch } from "../../hooks";
import { Toast } from "../../utils/libs";

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const init = {
  type: "",
  title: "",
  text: "",
  userIds: [] as string[],
};

const NotificationCreateCard = () => {
  const dispatch = useDispatch();
  const { users } = useTypedSelector((state) => state.admin);

  const [txt, setTxt] = useState("Send");
  const [loading, setLoading] = useState(!!0);
  const [loadingText] = useState("Sending...");
  const [err, setErr] = useState(!!0);
  const [disabled, setDisabled] = useState(!!1);

  const [data, setData] = useState(init);

  const { title, text, userIds, type } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeT = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (values: string[]) => {
    setData({ ...data, userIds: values });
  };

  const handleTypeSelect = (value: string) => {
    setData({ ...data, type: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(!!1);
    setErr(!!0);
    setDisabled(!!1);

    const ti = title.trim();
    const te = text.trim();
    const ty =
      type === "0"
        ? "hot"
        : type === "1"
        ? "new"
        : type === "2"
        ? "announce"
        : type === "3"
        ? "update"
        : type === "4"
        ? "delete"
        : type === "5"
        ? "error"
        : type === "6"
        ? "success"
        : "";

    Toast("promise", "Sending...");
    setTxt(loadingText);

    // if (title.length < 1 || text.length < 1) {
    //   if (title.length < 1) {
    //     setTxt("Error");
    //     setDisabled(!!1);
    //     setErr(!!1);
    //     setLoading(!!0);
    //     setLoadingText("");
    //   }
    //   if (text.length < 1) {
    //     setTxt("Error");
    //     setDisabled(!!1);
    //     setErr(!!1);
    //     setLoading(!!0);
    //     setLoadingText("");
    //   }
    //   return 0;
    // }
    const res = await dispatch(
      sendNoti({ users: userIds, type: ty, title: ti, text: te })
    );
    if (res.meta.requestStatus === "fulfilled") {
      setLoading(!!0);
      setDisabled(!!1);
      setErr(!!0);
      setTxt("Send");
      Toast("success", "Notification sent successfully");
    } else {
      setLoading(!!0);
      setDisabled(!!1);
      setErr(!!0);
      setTxt("Send");
      Toast("error", "Unable to send notification");
    }
  };

  const initX = () => {
    dispatch(getUsers());
  };

  useEffect(() => {
    initX();
  }, []);

  useEffect(() => {
    const ti = title.split(" ");
    const te = text.split(" ");
    ti.length >= 2 &&
    ti.length <= 6 &&
    ti[ti.length - 1].length > 0 &&
    te.length >= 2 &&
    te.length <= 6 &&
    te[te.length - 1].length > 0 &&
    text &&
    type &&
    data.userIds.length > 0
      ? setDisabled(!!0)
      : setDisabled(!!1);
  }, [data.userIds, type, title, text]);

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg p-5 w-full lg:w-1/2">
        <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Create Notification
        </h3>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-row lg:flex-col gap-1">
            <label
              htmlFor="user-id"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              User ID
            </label>
            <MultiSelect
              value={userIds}
              onValueChange={handleMultiSelectChange}
              name="userIds"
              disabled={users.length < 1}
            >
              {users.map((item, i) => (
                <MultiSelectItem key={`lauiondw-${i}`} value={item.uuid}>
                  User ID: {item.id}
                </MultiSelectItem>
              ))}
            </MultiSelect>
          </div>
          <div className="flex flex-row lg:flex-col gap-1">
            <label
              htmlFor="notiType"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Notification Type
            </label>
            <SearchSelect value={type} onValueChange={handleTypeSelect}>
              {[
                { i: "0", n: "Hot" },
                { i: "1", n: "New" },
                { i: "2", n: "Announce" },
                { i: "3", n: "Update" },
                { i: "4", n: "Delete" },
                { i: "5", n: "Error" },
                { i: "6", n: "Success" },
              ].map((item, i) => (
                <SearchSelectItem key={`lauiondw-${i}`} value={item.i}>
                  {item.n}
                </SearchSelectItem>
              ))}
            </SearchSelect>
          </div>
          <div className="flex flex-row lg:flex-col gap-1">
            <label
              htmlFor="notification-title"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Notification Title
            </label>
            <TextInput
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Must be more than 2 words less than 6"
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
          <div className="flex flex-row lg:flex-col gap-1">
            <label
              htmlFor="notification-text"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Notification Text
            </label>
            <Textarea
              name="text"
              value={text}
              onChange={handleChangeT}
              placeholder="Must be more than 2 words less than 6"
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
          <Button
            type="submit"
            disabled={disabled}
            color={err ? "red" : "blue"}
            loading={loading}
            loadingText={loadingText}
            className={`mt-6 whitespace-nowrap rounded-tremor-small ${
              err ? "bg-rose-600" : "bg-tremor-brand"
            } px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:${
              err ? "bg-rose-500" : "bg-tremor-brand-emphasis"
            } dark:${
              err ? "bg-rose-600" : "bg-tremor-brand"
            } dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:${
              err ? "bg-rose-500" : "bg-dark-tremor-brand-emphasis"
            }`}
          >
            {txt}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NotificationCreateCard;
