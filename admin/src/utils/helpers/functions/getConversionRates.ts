// src/utils/getConversionRates.ts
import axios from "axios";
import { ConversionRatesI } from "../../../types/types";
import { CC_APIKEY } from "../../../config";

export const getConversionRates = async (): Promise<ConversionRatesI> => {
  try {
    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/pricemulti",
      {
        params: {
          fsyms: "BTC,ETH,matic,usdt,bnb",
          tsyms: "usd",
          api_key: CC_APIKEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    throw error;
  }
};
