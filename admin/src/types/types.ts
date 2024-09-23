import { AxiosError } from "axios";
import { BigNumber, ethers } from "ethers";
import { ReactNode } from "react";
import { ToastOptions } from "react-hot-toast";

export interface initialState {
  admin: initialStateMain;
}
export interface initialStateMain {
  loading: boolean;
  regLoading: boolean;
  users: getUsersResponse;
  noti: Array<sendNotiResponse>;
  stats: Array<getStatsResponse>;
  isAuthenticated: boolean;
  details: {};
  error: boolean;
  lvlTwoTotal: number;
  adminWallets: {
    admin: string;
    refAdmin: string;
    [key: string]: string;
  };
  allRefs: Array<RefDetails>;
}

export interface AuthResponse {
  userId: string;
  token: string;
  detail?: string;
  total?: any;
}

export interface ErrorResponse {
  status: number | null;
  statusText: string | null;
  detail: any;
}

export type ExtendedError = AxiosError & {
  response?: {
    status: number;
    statusText: string;
    data: any;
  };
};

export interface loginParams {
  username: string;
  password: string;
}

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToastParams {
  t?: "success" | "error" | "promise" | "default" | "";
  m: string;
  o?: ToastOptions;
}

export interface DropdownProps {
  children: ReactNode;
  icon?: React.ReactElement;
  label: string;
}

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  icon?: React.ReactElement;
}

export type StateContextValue = {
  address?: string;
  contract: ethers.Contract | unknown;
  // connect: () => void;
  status: string;
  balance: string | undefined;
  symbol: string | undefined;
  getStakes: () => Promise<ParsedMiningData[]>;
  payReferral: ({ stakers, stakerPrt }: payoutParams) => Promise<payoutResult>;
  // newReferral: (form: refData) => Promise<MiningResult>;
  // handleApprove: (amount: number) => Promise<void>;
};

export interface StateContextProps {
  children: ReactNode;
}

export interface DataItem {
  date: string;
  "Level One": number;
  "Level Two": number;
}

export interface SummaryItem {
  name: string;
  total: string;
  invested: string;
  cashflow: string;
  gain: string;
  realized: string;
  bgColor: string;
  changeType: "positive" | "negative";
}

export interface LevelTableProps {
  label: string;
  action?: string;
  showAction?: boolean;
  payRefs?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    payBtn?: string,
    endDate?: number
  ) => void;
  children: React.ReactNode;
}

export interface ActionDropdownProps
  extends Omit<LevelTableProps, "label" | "action" | "showAction"> {}

export interface MiningData {
  amount: BigNumber;
  endDate: BigNumber;
  staker: string;
  planId: BigNumber;
  profit: BigNumber;
  startDate: BigNumber;
}

export type MiningArray = MiningData[][];

export interface ParsedMiningData {
  staker: string;
  id: number;
  uuid?: string;
  amount: string;
  amountUSD?: number;
  startDate: number;
  endDate: number;
  profit: string;
  profitUSD?: number;
}

// Interface for conversion rates
type errorObj = { message: string };

export type ConversionRatesT = {
  usd?: number | string;
  btc?: number | string;
  eth?: number | string;
  usdt?: number | string;
  matic?: number | string;
  bnb?: number | string;
  error?: errorObj;
};

export interface ConversionRatesI {
  BTC: {
    USD: number;
  };
  ETH: {
    USD: number;
  };
  MATIC: {
    USD: number;
  };
  USDT: {
    USD: number;
  };
  BNB: {
    USD: number;
  };
}

export interface PayResponse {
  address: any;
  total: number;
}

export interface createPayParams {
  address: string;
  amount: string;
}

export interface getPayParams extends Omit<createPayParams, "amount"> {}

export type Res = {
  id?: number;
  adminId?: number;
  type?: string;
  address?: string;
  active?: boolean;
};

export interface adminWalletResponse {
  admin: Res;
  refAdmin: Res;
}

export interface Res2 {
  id: number;
  address: string;
  code: string;
  uplinkId: number | null;
}

export interface RefDetails extends Res2 {
  userId: number;
  uuid: string;
  uplineCode: string | null;
  upline: number;
  uplines: Array<Res2>;
  downlines: {
    firstLevel: number;
    secondLevel: number;
    thirdLevel: number;
  };
  children?: Array<Res2>;
}

export interface changePasswordParams {
  newPassword: string;
  currentPassword: string;
}

export interface changeAdminAddressParams {
  address: string;
  currentAddress: string;
  type: "admin" | "refAdmin";
}

export interface changeAdminAddressResponse {
  id: number;
  adminId: number;
  type: string;
  address: string;
  active: boolean;
}

export interface payoutResult {
  isLoading: boolean;
  data: any | null;
  error: string | null;
}

export interface payoutParams {
  stakers: Array<string>;
  stakerPrt: Array<number>;
}

export interface getUsersRaw {
  id: number;
  uuid: string;
}

export interface getUsersResponse extends Array<getUsersRaw> {}

export interface Stats {
  date: string;
  levelOne: number;
  levelTwo: number;
}

export interface sendNotiParams {
  users: string[];
  type: string;
  title: string;
  text: string;
}

export interface sendNotiResponse {
  userId: number;
  type: string;
  title: string;
  text: string;
  createdAt: string;
}

export interface getStatsResponse {
  date: string;
  levelOne: number;
  levelTwo: number;
}
