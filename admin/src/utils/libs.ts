import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { API_URL, AUTH_TOKEN } from "../config";
import toast, { Toaster } from "react-hot-toast";
import { ToastParams } from "../types/types";
import { ethers } from "ethers";
import dayjs, { ConfigType } from "dayjs";

export const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: !!1,
});

Axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

export const uuid = uuidv4();

export const eth = ethers;

export const TC = Toaster;

export const Toast = (
  t: ToastParams["t"] = "",
  m: ToastParams["m"],
  o: ToastParams["o"] = {
    position: "top-right",
    duration: 5000,
  }
) => {
  if (t === "success") {
    toast.success(m, o);
  } else if (t === "error") {
    toast.error(m, o);
  } else if (t === "promise") {
    toast.loading(m, o);
  } else if (t === "default") {
    toast(m, o);
  } else {
    toast.dismiss();
  }
};

export const formatCurrency = (
  amount: string,
  currencyType: string
): string => {
  const numberAmount = parseFloat(amount);
  if (isNaN(numberAmount)) {
    throw new Error("Invalid amount");
  }
  return numberAmount.toLocaleString("en-US", {
    style: "currency",
    currency: currencyType,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const djs = dayjs;

/**
 * Convert a timestamp to a formatted date string.
 * @param timestamp - The timestamp to convert. Can be a number, string, Date, or Day.js object.
 * @param format - The date format string (default is "YYYY/MM/DD").
 * @returns The formatted date string.
 */
export const convertDateTime = (
  timestamp: ConfigType,
  format: string = "YYYY/MM/DD"
): string => {
  return djs(timestamp).format(format);
};

export const shortenHexString = (input: string, len: string = "lg"): string => {
  const limit = len === "sh" ? 40 : 35;
  if (input.length <= 10) return input;

  if (input.toLocaleLowerCase().includes("loading address...")) return input;

  const prefix = input.slice(0, 7);
  const suffix = input.slice(-6);
  const dots = ".".repeat(input.length - limit);
  return prefix + dots + suffix;
};

export const checkDate = (date: number): boolean => {
  const d = convertDateTime(date);
  const tD = djs(d, "YYYY/MM/DD");
  const t = dayjs();
  return t.isAfter(tD);
};
