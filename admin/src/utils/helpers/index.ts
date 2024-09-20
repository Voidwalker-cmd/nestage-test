// import toast from "react-hot-toast";
import {
  ConversionRatesI,
  ConversionRatesT,
  //   CustomToastOptions,
  //   OptionT,
} from "../../types/types";
import { getConversionRates } from "./functions/getConversionRates";
// import { NotificationsIcon } from "./../components/atom/Icons";

export class Helper {
  static async convert(amt: string | number): Promise<ConversionRatesT> {
    const amount = amt as string;

    if (!amount) {
      return { error: { message: "Amount is required" } };
    }

    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      return { error: { message: "Invalid amount" } };
    }

    try {
      const rates: ConversionRatesI = await getConversionRates();

      const btc = (amountNumber / rates.BTC.USD).toFixed(8);
      const eth = (amountNumber / rates.ETH.USD).toFixed(8);
      const usdt = (amountNumber / rates.USDT.USD).toFixed(8);
      const matic = (amountNumber / rates.MATIC.USD).toFixed(8);
      const bnb = (amountNumber / rates.BNB.USD).toFixed(8);

      return {
        usd: amountNumber,
        btc: parseFloat(btc),
        eth: parseFloat(eth),
        usdt: parseFloat(usdt),
        matic: parseFloat(matic),
        bnb: parseFloat(bnb),
      } as ConversionRatesT;
    } catch (error) {
      return { error: { message: "Failed to fetch conversion rates" } };
    }
  }

  static async convertToUSD(
    cryptoId: keyof ConversionRatesI,
    amount: number | string
  ): Promise<number | null> {
    try {
      const res = await getConversionRates();
      const price = res[cryptoId].USD;
      if (price) {
        const usdValue = Number(amount) * price;
        return usdValue;
      } else {
        console.log("Failed to fetch the crypto price.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      return null;
    }
  }

  //   static Toast(
  //     type: string,
  //     message: string,
  //     option: OptionT = {
  //       position: "top-right",
  //       duration: 5000,
  //       style: {},
  //       className: "",
  //     }
  //   ): void {
  //     switch (type) {
  //       case "success":
  //         toast.success(message, {
  //           ...option,
  //         });
  //         break;
  //       case "error":
  //         toast.error(message, {
  //           ...option,
  //         });
  //         break;
  //       case "warning":
  //         toast(message, {
  //           ...option,
  //         });
  //         break;
  //       case "info":
  //         toast(message, { ...option });
  //         break;
  //       case "promise":
  //         toast.loading(message, option);
  //         break;
  //       case "default":
  //         toast(message, option);
  //         break;
  //       case "modal":
  //         toast((t) => "");
  //         break;
  //       default:
  //         toast.dismiss();
  //         break;
  //     }
  //   }

  //   static customToast = (
  //     jsxContent: JSX.Element,
  //     options: CustomToastOptions = {}
  //   ) => {
  //     const { position = "top-right", duration = 5000 } = options;

  //     toast.custom(
  //       (t) => `
  //         <div
  //           className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
  //           role="alert"
  //         >
  //           ${jsxContent}
  //         </div>`,
  //       {
  //         position,
  //         duration,
  //       }
  //     );
  //   };

  //   static bytes32ToUuid(bytes32: string) {
  //     const hex = bytes32.slice(2); // Remove the '0x' prefix
  //     const uuid = [
  //         hex.slice(0, 8),
  //         hex.slice(8, 12),
  //         hex.slice(12, 16),
  //         hex.slice(16, 20),
  //         hex.slice(20)
  //     ].join('-');
  //     return uuid;
  // }

  // // Example usage:
  // const bytes32 = "0x1234567812345678123456781234567812345678123456781234567812345678";
  // const uuid = bytes32ToUuid(bytes32);
  // console.log(uuid); // Outputs: "12345678-1234-5678-1234-567812345678"
}
