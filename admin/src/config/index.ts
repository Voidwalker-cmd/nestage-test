import { SiteUrl } from "../const";

export const SITE_MODE = import.meta.env.VITE_SITE_MODE;
export const NETWORK_MODE = import.meta.env.VITE_NETWORK_MODE;
const TEST_NESTAGE = import.meta.env.VITE_TEST_NESTAGE;
const LIVE_NESTAGE = import.meta.env.VITE_LIVE_NESTAGE;
const TEST_API = import.meta.env.VITE_TEST_API;
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// const x = import.meta.env.VITE_LIVE_API;
// const LIVE_API = x !== "" || x.length > 0 ? x : "";

let LIVE_API = "";
// kkk

const A = "https://application.nestage.io/api/v1/"; // Mainnet - 1
// const LIVE_API = "https://nestage-server-main.onrender.com/api/v1/"; // Mainnet - 2
const B = "https://api-testing.nestage.io/api/v1/"; // Testnet
// const LIVE_API = "https://n-server-1lbk.onrender.com/api/v1/";

if (SiteUrl.includes("testing") || SiteUrl.includes("localhost")) {
  LIVE_API = B;
} else {
  LIVE_API = A;
}

export const SITE_URL = SITE_MODE === "live" ? LIVE_NESTAGE : TEST_NESTAGE;
export const API_URL = SITE_MODE === "live" ? LIVE_API : TEST_API;

export const CC_APIKEY = import.meta.env.VITE_CC_API_KEY;
export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
