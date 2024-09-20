import { Axios } from "../../config/utils";
import { RefResponse } from "../../types/types";

export const storeReferralX = async (): Promise<void> => {
  const url: URL = new URL(window.location.href);
  const params: URLSearchParams = new URLSearchParams(url.search);
  const ttt = String(url) + " " + String(params);
  if (params.has("ref")) {
    const refValue: string | null = params.get("ref");
    if (refValue !== null) {
      try {
        const { status } = await Axios.get<RefResponse>(
          `get-ref?ref=${refValue}`
        );
        if (status === 200) {
          localStorage.setItem("ref", refValue);
        }
      } catch (err) {}

      // console.log(`Ref parameter (${refValue}) stored in local storage.`);
    } else {
    }
    //   else {
    //     console.log("No 'ref' parameter found in the URL.");
    //   }
  }
};

export const getReferral = () => localStorage.getItem("ref");
