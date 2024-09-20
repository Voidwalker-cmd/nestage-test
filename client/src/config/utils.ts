import { ethers } from "ethers";
import { Link as LNK } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { DecimalOptions, FormatterOptions } from "../types/types";
import dayjs, { ConfigType } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { API_URL, AUTH_TOKEN } from ".";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const eth = ethers;
export const uuid = uuidv4();
export const CB = CopyToClipboard;

export const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: !!1,
});

Axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

class F {
  locale: string;

  constructor(locale: string = "en-US") {
    this.locale = locale;
  }

  formatDecimal(
    number: number,
    minDigits: number = 3,
    maxDigits: number = 3
  ): string {
    const formatter = new Intl.NumberFormat(this.locale, {
      style: "decimal",
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return formatter.format(number);
  }

  formatCurrency(
    number: number,
    currency: string,
    minDigits: number = 2,
    maxDigits: number = 2
  ): string {
    const formatter = new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return formatter.format(number);
  }
}

export const Formatter = (
  a: number | string,
  options: FormatterOptions = {}
): string => {
  const { type = "c", currency = "USD", decimalOptions = {} } = options;
  const { n = 2, m = 3 } = decimalOptions;

  const f = new F();
  let i: number;
  if (typeof a === "string") {
    i = Number(a);
  } else {
    if (!Number.isInteger(a)) {
      i = parseFloat(Number(a));
    }
  }
  if (type === "c") {
    return f.formatCurrency(i, currency, n, m);
  } else if (type === "d") {
    return f.formatDecimal(i, n, m);
  }
  throw new Error("Invalid format type");
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

export const Link = LNK;

export const greetUser = async () => {
  let currentGreeting = "";
  try {
    // Fetch user's location data
    const response = await axios.get<{ timezone: string }>(
      "http://ip-api.com/json/"
    );
    const { timezone } = response.data;

    // Get current time in user's time zone
    const userTime = moment.tz(timezone);
    const currentHour = userTime.hour();

    // Determine appropriate greeting
    if (currentHour >= 5 && currentHour < 12) {
      currentGreeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      currentGreeting = "Good afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      currentGreeting = "Good evening";
    } else {
      currentGreeting = "Good evening";
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    currentGreeting = "Good day";
  }
  return currentGreeting;
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

/**
 * Calculate the difference between two dates as a percentage of a given reference period.
 * @param startDate - The start date. Can be a number, string, Date, or Day.js object.
 * @param endDate - The end date. Can be a number, string, Date, or Day.js object.
 * @param referencePeriod - The reference period in days to calculate the percentage (default is 365 days for one year).
 * @returns The difference as a percentage.
 */
export const datetimeDurationPercent = (
  startDate: ConfigType,
  endDate: ConfigType,
  referencePeriod: number = 25
): number => {
  const start = djs();
  const end = djs(endDate);
  const differenceInDays = end.diff(start.format("YYYY/MM/DD"), "day");
  const referencePeriodc = referencePeriod * 24 * 60 * 60 * 1000;
  // console.log(differenceInDays, start.format("YYYY/MM/DD"));
  // console.log((differenceInDays / referencePeriodc) * 100);

  return (differenceInDays / referencePeriodc) * 100;
};
