import { Static } from "../../../assets/img";
import { Link } from "../../../config/utils";
import { SiteUrl, SS } from "../../../const";
import ComingSoonBotton from "../../molecules/Landing/ComingSoonBotton";
import ConnectionButton from "../../molecules/Landing/ConnectionButton";

const Hero = () => {
  return (
    <>
      <div className="relative w-full h-screen flex flex-col lg:flex-row justify-between items-center lg:items-start px-5 lg:px-32">
        <div className="w-full lg:w-1/2 px-0.5 lg:px-0 h-[calc(100%-10%)] lg:h-[calc(100%-10%)] flex flex-col justify-center items-center lg:items-start">
          <h1
            style={{
              background: "-webkit-linear-gradient(#076f66, #003b36)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="block font-primary font-extrabold text-5xl lg:text-6xl text-center lg:text-left pb-10 lg:py-5"
          >
            NESTAGE
          </h1>
          <p className="block font-primary font-light text-white text-base text-center lg:text-left tracking-wide lg:tracking-wider">
            Nestage is an innovative platform combining DeFi Staking and
            affiliate marketing through decentralized networks and smart
            contracts, offering transparency and security. Join Nestage to
            transform your cryptocurrency earning and staking experience.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start py-10 lg:py-5 z-30">
            {SiteUrl.includes("nestage.io") && SS() ? (
              <ComingSoonBotton radius="lg" size="md" />
            ) : (
              <ConnectionButton radius="lg" size="lg" />
            )}
            <Link
              className="border-2 rounded-xl border-[#0f5b37] w-[8rem] text-white flex items-center justify-center font-semibold tracking-wide"
              to={"/campaign"}
            >
              Campaign
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 absolute lg:static top-32 right-10 lg:top-0 lg:right-0 -z-10 lg:z-0 flex justify-cesnter items-cdenter lg:block">
          <div className="flex flex-col justify-center items-center px-5 lg:px-0">
            <img
              src={Static.heroImg}
              alt="Nestage-HeroImg"
              className="object-cover opacity-15 lg:opacity-100"
            />
          </div>
        </div>
        <div className="absolute bottom-12 lg:-bottom-36 -left-28 lg:left-0 pl-0">
          <img
            src={Static.customImg}
            alt="Nestage-customImg"
            className="object-cover"
          />
        </div>
        <div className="absolute w-full h-full pointer-events-none overflow-hidden">
          <img
            src={Static.dolllarCoin}
            alt="DollarCoin"
            className="float-coin"
          />
          <img
            src={Static.dolllarCoin}
            alt="DollarCoin"
            className="float-coin lg:hidden"
          />
          <img
            src={Static.dolllarCoin}
            alt="DollarCoin"
            className="float-coin"
          />
          <img
            src={Static.BitcoinImg}
            alt="TetherCoin"
            className="float-coin lg:hidden"
          />
          <img
            src={Static.BitcoinImg}
            alt="TetherCoin"
            className="float-coin"
          />
          <img
            src={Static.BitcoinImg}
            alt="TetherCoin"
            className="float-coin lg:hidden"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
