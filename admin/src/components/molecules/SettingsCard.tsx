import {
  Button,
  // Divider,
  Tab,
  TabGroup,
  TabList,
  TextInput,
  Dialog,
  DialogPanel,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { Toast } from "../../utils/libs";
import { useDispatch } from "../../hooks";
import { changeAdminAddress, changePassword } from "../../features/admin";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { initialState } from "../../types";
import { useStateContext } from "../../context/web3";
import { useDisconnect } from "@thirdweb-dev/react";

const init = {
  pwd: "",
  nwPwd: "",
  cnwPwd: "",
};

const initAddress = {
  admin: "",
  refAdmin: "",
};

const useTypedSelector: TypedUseSelectorHook<initialState> = useSelector;

const SettingsCard = () => {
  const { adminWallets } = useTypedSelector((state) => state.admin);
  const { address } = useStateContext();
  const dispatch = useDispatch();
  const disconnect = useDisconnect();

  const [tab, setTab] = useState(1);

  const [data, setData] = useState(init);
  const [txt, setTxt] = useState("Update password");
  const [loading, setLoading] = useState(!!0);
  const [loadingText] = useState("Updating...");
  const [err, setErr] = useState(!!0);
  const [disabled, setDisabled] = useState(!!1);

  const [dataTwo, setDataTwo] = useState(initAddress);
  const [txtTwo, setTxtTwo] = useState("Save");
  const [loadingTwo, setLoadingTwo] = useState(!!0);
  const [loadingTextTwo] = useState("Saving...");
  const [errTwo, setErrTwo] = useState(!!0);
  const [disabledTwo, setDisabledTwo] = useState(!!1);
  const [isOpen, setIsOpen] = useState(!!0);

  const { pwd, nwPwd, cnwPwd } = data;
  const { admin, refAdmin } = dataTwo;

  const disconnectWallet = async () => {
    await disconnect();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value.replace(/\s+/g, "") });
  };

  const handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataTwo({
      ...dataTwo,
      [e.target.name]: e.target.value.replace(/\s+/g, ""),
    });
  };

  const useAddress = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!address) {
      Toast("error", "Please connect your wallet");
      return 0;
    }
    setDataTwo({ ...dataTwo, admin: address });
  };

  const handleChangePwd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(!!1);
    setErr(!!0);
    setDisabled(!!0);
    if (nwPwd !== cnwPwd) {
      setLoading(!!0);
      setDisabled(!!1);
      setErr(!!1);
      setTxt("Error");
      Toast("error", "Both password don't match.");

      setTimeout(async () => {
        setErr(!!0);
        setDisabled(!!0);
        setTxt("Update password");
      }, 3000);
    }

    const res = await dispatch(
      changePassword({ newPassword: nwPwd, currentPassword: pwd })
    );

    if (res.meta.requestStatus === "fulfilled") {
      Toast("success", "Password updated successfully");
      setLoading(!!0);
      setDisabled(!!1);
      setErr(!!0);
      setTxt("Update password");
      setData({ pwd: "", nwPwd: "", cnwPwd: "" });
    } else {
      Toast("error", "Invalid current password");
      setLoading(!!0);
      setDisabled(!!0);
      setErr(!!0);
      setTxt("Update password");
    }
  };

  const handleChangePwdTwo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsOpen(!!0);

    setLoadingTwo(!!1);
    setErrTwo(!!0);
    setDisabledTwo(!!1);
    setTxtTwo("Saving...");

    if (!address) {
      setLoadingTwo(!!0);
      setDisabledTwo(!!1);
      setErrTwo(!!1);
      setTxtTwo("Error");
      Toast("error", "Please connect your wallet");

      setTimeout(async () => {
        setErrTwo(!!0);
        setDisabledTwo(!!0);
        setTxtTwo("Save");
      }, 3000);

      return 0;
    }

    if (address !== adminWallets.admin) {
      setLoadingTwo(!!0);
      setDisabledTwo(!!1);
      setErrTwo(!!1);
      setTxtTwo("Error");
      Toast("error", "Unable to perform this action");

      setTimeout(async () => {
        setErrTwo(!!0);
        setDisabledTwo(!!0);
        setTxtTwo("Save");
      }, 3000);
    }

    Toast("promise", "Updating...");

    if (adminWallets.admin !== admin) {
      Toast("", "");
      Toast("promise", "Updating Admin Address...");
      const res = await dispatch(
        changeAdminAddress({
          address: admin,
          currentAddress: adminWallets.admin,
          type: "admin",
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        Toast("", "");
        Toast("success", "Admin address updated successfully");
        setTimeout(() => {
          disconnectWallet();
        }, 1000);
      } else {
        Toast("", "");
        Toast("error", "Admin address failed to updated");
      }
      setLoadingTwo(!!0);
      setErrTwo(!!0);
      setDisabledTwo(!!0);
      setTxtTwo("Save");
    } else if (adminWallets.refAdmin !== refAdmin) {
      Toast("", "");
      Toast("promise", "Updating Referrrral Admin Address...");
      const res = await dispatch(
        changeAdminAddress({
          currentAddress: adminWallets.refAdmin,
          address: refAdmin,
          type: "refAdmin",
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        Toast("", "");
        Toast("success", "Referral Admin address updated successfully");
      } else {
        Toast("", "");
        Toast("error", "Referral Admin address failed to updated");
      }
      setLoadingTwo(!!0);
      setErrTwo(!!0);
      setDisabledTwo(!!0);
      setTxtTwo("Save");
    } else {
      Toast("", "");
      Toast("default", "All addresses are the same.");
      setLoadingTwo(!!0);
      setErrTwo(!!0);
      setDisabledTwo(!!0);
      setTxtTwo("Save");
    }
  };

  useEffect(() => {
    pwd && nwPwd && cnwPwd ? setDisabled(!!0) : setDisabled(!!1);
  }, [pwd, nwPwd, cnwPwd]);

  useEffect(() => {
    admin && refAdmin ? setDisabledTwo(!!0) : setDisabledTwo(!!1);
  }, [admin, refAdmin]);

  useEffect(() => {
    setDataTwo(adminWallets);
  }, [adminWallets]);

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg p-5">
        <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Settings
        </h3>
        <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Manage and Control the Nestage Admin.
          {/* Manage your personal details, workspace governance and notifications. */}
        </p>
        <TabGroup className="mt-6">
          <TabList>
            <Tab onClick={() => setTab(1)}>Account details</Tab>
            <Tab onClick={() => setTab(2)}>Wallet details</Tab>
            {/* <Tab>Billing</Tab> */}
          </TabList>
          {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
          {tab === 1 ? (
            <div className="mt-8 space-y-8">
              {/* <form action="#" method="POST">
              <div>
                <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Email
                </h4>
                <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  Update your email address associated with this workspace.
                </p>
                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Update email address
                  </label>
                  <TextInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@company.com"
                    className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  Update email
                </button>
              </div>
            </form>
            <Divider /> */}
              <form onSubmit={handleChangePwd}>
                <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Password
                </h4>
                <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  Update the password associated this account.
                </p>
                <div className="mt-6">
                  <label
                    htmlFor="current-password"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Current password
                  </label>
                  <TextInput
                    type="password"
                    name="pwd"
                    value={pwd}
                    onChange={handleChange}
                    placeholder=""
                    className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="new-password"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    New password
                  </label>
                  <TextInput
                    type="password"
                    name="nwPwd"
                    value={nwPwd}
                    onChange={handleChange}
                    placeholder=""
                    className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="con-new-password"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Confirm new password
                  </label>
                  <TextInput
                    type="password"
                    name="cnwPwd"
                    value={cnwPwd}
                    onChange={handleChange}
                    placeholder=""
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
          ) : (
            <div className="mt-8 space-y-8">
              <form>
                <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Admin Addresses
                </h4>
                <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  Update the Admin Addresses associated this account.
                </p>
                <div className="mt-6">
                  <label
                    htmlFor="admin-addresses"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Admin Addresses
                  </label>
                  <div className="relative">
                    <TextInput
                      type="text"
                      disabled={!address ? !!1 : !!0}
                      name="admin"
                      value={admin}
                      onChange={handleChangeTwo}
                      placeholder=""
                      className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                    />
                    <Button
                      className="absolute right-0 top-0 rounded-l-none"
                      onClick={useAddress}
                      disabled={!address ? !!1 : !!0}
                    >
                      Use wallet address
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="referral Address"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Referral Address
                  </label>
                  <TextInput
                    type="text"
                    name="refAdmin"
                    disabled={!address ? !!1 : !!0}
                    value={refAdmin}
                    onChange={handleChangeTwo}
                    placeholder=""
                    className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
                  />
                </div>
                {address && (
                  <Button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    disabled={disabledTwo}
                    color={errTwo ? "red" : "blue"}
                    loading={loadingTwo}
                    loadingText={loadingTextTwo}
                    className={`mt-6 whitespace-nowrap rounded-tremor-small ${
                      errTwo ? "bg-rose-600" : "bg-tremor-brand"
                    } px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:${
                      errTwo ? "bg-rose-500" : "bg-tremor-brand-emphasis"
                    } dark:${
                      errTwo ? "bg-rose-600" : "bg-tremor-brand"
                    } dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:${
                      errTwo ? "bg-rose-500" : "bg-dark-tremor-brand-emphasis"
                    }`}
                  >
                    {txtTwo}
                  </Button>
                )}
              </form>
              <Dialog
                open={isOpen}
                onClose={(val) => setIsOpen(val)}
                static={true}
              >
                <DialogPanel>
                  <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    You are about to change the admin addresses
                  </h3>
                  <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    This action would affect the following addresses:{" "}
                    <span className="font-bold">Admin Address</span> &{" "}
                    <span className="font-bold">Referral Admin Address</span>{" "}
                    all Transactions would be redirected to the new addresses
                  </p>
                  <div className="flex items-center gap-3 justify-center mt-5">
                    <Button
                      color={"red"}
                      className={`w-1/2 whitespace-nowrap rounded-tremor-small bg-rose-600 px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-rose-500`}
                      onClick={() => setIsOpen(!!0)}
                    >
                      Cancel
                    </Button>
                    <Button
                      color={"blue"}
                      className={`w-1/2 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis`}
                      onClick={handleChangePwdTwo}
                    >
                      Got it!
                    </Button>
                  </div>
                </DialogPanel>
              </Dialog>
            </div>
          )}
        </TabGroup>
      </div>
    </>
  );
};

export default SettingsCard;
