import { Outlet } from "react-router-dom";
import Header from "../../organisms/Landing/Header";
import Nav from "../../molecules/Nav";
import Hero from "../../organisms/Landing/Hero";
import Footer from "../../organisms/Landing/Footer";
import { useEffect } from "react";
import { useDispatch } from "../../../hooks";
import { saveReferral } from "../../../features/client";
// import { storeReferral } from "../../../helper/functions/SaveReferralLink";
// import { storeReferral } from "./../../molecules/Landing/ConnectionButton";
// style={{ background: "linear-gradient(180deg,#0F5B37,#111A28)" }}

const LandingPageLayout: React.FC = () => {
  const dispatch = useDispatch();

  const storeReferral = async () => {
    const url: URL = new URL(window.location.href);
    const params: URLSearchParams = new URLSearchParams(url.search);
    const ttt = String(url) + " " + String(params);
    if (params.has("ref")) {
      const refValue: string | null = params.get("ref");
      if (refValue !== null) {
        try {
          const res = await dispatch(saveReferral({ refValue }));
          if (res.meta.requestStatus === "fulfilled") {
            localStorage.setItem("ref", refValue);
          }
        } catch (err) {
          refValue && localStorage.setItem("ref", refValue);
        }

        // console.log(`Ref parameter (${refValue}) stored in local storage.`);
      }
    }
  };

  useEffect(() => {
    storeReferral();
  }, []);
  return (
    <div
      style={{ background: "linear-gradient(to bottom, #013220,#011412)" }}
      className="overflow-hidden"
    >
      <Nav />

      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
