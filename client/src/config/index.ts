export const CLIENT_ID = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
export const SITE_MODE = import.meta.env.VITE_SITE_MODE;
export const NETWORK_MODE = import.meta.env.VITE_NETWORK_MODE;
export const CC_APIKEY = import.meta.env.VITE_CC_API_KEY;
export const tokenAddress = import.meta.env.VITE_TOKENADDRESS;
export const SS = import.meta.env.VITE_SITE_STAGE;

const SITEURL = SITE_MODE === "live";

const x = import.meta.env.VITE_LIVE_API;
const TEST_API = import.meta.env.VITE_TEST_API;
// const LIVE_API = x !== "" || x.length > 0 ? x : ""; //

// const LIVE_API = "https://application.nestage.io/api/v1/"; // Mainnet - 1
// const LIVE_API = "https://nestage-server-main.onrender.com/api/v1/"; // Mainnet - 2
const LIVE_API = "https://api-testing.nestage.io/api/v1/"; // Testnet - 1
// const LIVE_API = "https://nestage-server-testing.onrender.com/api/v1/"; // Testnet - 2
// const LIVE_API = "https://n-server-1lbk.onrender.com/api/v1/";

export const API_URL = SITE_MODE === "live" ? LIVE_API : TEST_API;

export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
