// Interfacs

import { BigNumber, ethers } from "ethers";
import { ReactNode } from "react";
import { ToastPosition, ToastOptions, Renderable } from "react-hot-toast";
import { AxiosError } from "axios";
import { Address } from "@thirdweb-dev/sdk";
import { ClientState } from "../features/client";

export interface ColorModeContextType {
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark") => void;
}

export type modalContextType = {
  showModal: boolean;
};

export interface SectionTitleProps {
  heading: string;
  subHeading: string;
  className: any | null;
}

export interface ConnectButtonProps {
  radius: "sm" | "md" | "lg" | "none" | "full" | undefined;
  size: "sm" | "md" | "lg" | undefined;
  component?: string;
}

// Types

export type connectionState = "connected" | "connecting" | "not";

export type AboutFeatures = Array<{ title: string; description: string }>;

export type Tpricing = Array<{
  duration: string;
  percentage: string;
  captital: number;
  profit: number;
}>;

export interface StateContextProps {
  children: ReactNode;
}

export interface FormData {
  planId: number;
  rawAmount?: number;
  uuid: string;
  amount: string;
  startDate: string;
  endDate: string;
  profit: string;
}

export interface refData {
  amount: string;
}

export interface MiningResult {
  isLoading: boolean;
  data: any | null;
  error: string | null;
}

export type StateContextValue = {
  address: string | unknown;
  contract: ethers.Contract | unknown;
  connect: () => void;
  status: string;
  balance: string | undefined;
  symbol: string | undefined;
  getMinings: () => Promise<any[]>;
  newMining: (form: FormData) => Promise<MiningResult>;
  newReferral: (form: refData) => Promise<MiningResult>;
  getBUSDBalance: (walletAddress: string) => Promise<string>;
  // handleApprove: (amount: number) => Promise<void>;
};

export interface LogoProps {
  show?: boolean;
  dShow?: boolean;
}

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DropdownNotificationsProps {
  align: "right" | "left";
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TransitionProps {
  show: boolean;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
  appear?: boolean;
  unmountOnExit?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}

export interface TransitionContextValue {
  parent: {
    show: boolean;
    isInitialRender: boolean;
    appear: boolean | undefined;
  };
}

export type TAddress = string | undefined;

export interface DropdownEditMenuProps {
  children: ReactNode;
  align?: "left" | "right";
  [key: string]: any;
}

export interface DecimalOptions {
  n?: number;
  m?: number;
}

export interface FormatterOptions {
  type?: "c" | "d";
  currency?: string;
  decimalOptions?: DecimalOptions;
}

export interface ModalProps {
  wallet: string;
  balance: string;
}

export type BalanceData = {
  displayValue?: string;
  symbol?: string;
};

export interface IconsProps {
  className?: string;
}

export interface CustomIconProps extends IconsProps {
  itype: string;
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

export interface MiningData {
  amount: string;
  endDate: BigNumber;
  staker: string;
  planId: BigNumber;
  profit: string;
  startDate: BigNumber;
}

export type MiningArray = MiningData[][];

export interface ParsedMiningData {
  staker: string;
  id?: number;
  uuid?: string;
  amount: string;
  amtUSD?: number;
  pftUSD?: number;
  startDate: number;
  endDate: number;
  profit: string;
}

export interface PdfViewerProps {
  fileUrl: string;
}

export interface OptionT extends ToastOptions {
  icon?: Renderable;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: number | undefined;
  theme?: "light" | "dark";
}
export interface CustomToastOptions {
  position?: ToastPosition;
  duration?: number;
}

export interface ApproveParams {
  amount: string | number;
}

export interface AuthResponse {
  userId: string;
  token: string;
}

export interface RefResponse {
  id: number;
  uuid: string;
  walletId: string;
  referralCode: string;
}

export interface SaveReferralresponse {
  code: string;
}

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

export interface adminWalletRes {
  admin?: string;
  refAdmin?: string;
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

export interface AddNewRefParams {
  uuid: string;
  walletId?: string;
  referralCode: string;
}

export interface getRefParams
  extends Omit<AddNewRefParams, "uuid" | "walletId"> {}

export interface blankParams {
  blank?: string | number;
}

export interface createRefResponse {
  id: number;
  address: string;
  code: string;
  userID: number;
  uplineCode: string | null;
  uplinkId: number;
  upline: number;
  uplines: Array<{ id: number; address: string; uplinkId: number | null }> | [];
  downlines: Downline;
}

export interface Upline {
  id: number;
  address: string;
  code: string;
  uplinkId: number | null;
}

export interface Downline {
  firstLevel: number;
  secondLevel: number;
  thirdLevel: number;
}

export interface getRefResponse {
  id: number;
  address: string;
  code: string;
  uplinkId: number;
  uplineCode: string | null;
  userID: number;
  upline: number;
  uplines: Array<Upline> | [];
  downlines: Downline;
}

export interface removeRefParams {
  id: number | string;
}

export interface getSelfRefParams {
  address: string;
}

export interface createRefParams {
  selfAddress: string;
  code?: string;
}

export interface createUserParams extends Omit<createRefParams, "uplink"> {}

export interface createPayParams {
  address: string;
  amount: string;
}

export interface getPayParams extends Omit<createPayParams, "amount"> {}

export interface createUserResponse {
  id: number;
}

export interface PayResponse {
  address: any;
  total: number;
}

export interface RootState {
  client: ClientState;
}

export interface EmojiDisplayProps {
  emoji: string;
  size?: number;
}

export interface payUpline {
  hasUpline: boolean;
  uplineAddress: string;
  pay?: BigNumber;
}

export interface getNotificationsRaw {
  type: string;
  title: string;
  text: string;
  date: string;
}

export interface getNotificationsResponse extends Array<getNotificationsRaw> {}

export interface getNotificationsParams {
  userId: number;
}

export interface saveStatParams {
  type: string;
  amount: string;
}

export type bscscan = {
  status: string;
  message: string;
  result: {
    status: string;
  };
};
