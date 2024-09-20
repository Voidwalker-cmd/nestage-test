import { Pricing } from "../../../const/Features";
import SectionTitle from "../../molecules/Landing/SectionTitle";
import { Formatter } from "./../../../config/utils";

const Packages = () => {
  return (
    <>
      <div className="max-w-full mt-5 py-16">
        <div className="mx-2 lg:mx-20">
          <SectionTitle
            className={'text-white'}
            heading="Nestage Packages"
            subHeading="Get the best package for you"
          />
          <div className="py-5 lg:py-8 px-2 mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-5 px-5 lg:px-10">
              {Pricing.map((x, i) => (
                <div
                  key={`aujdfbki${i}`}
                  className="col-span-1 lg:col-span-3 bg-secondary flex flex-col items-center gap-3 py-10 shadow-lg border-2 lg:border border-primary_dark rounded-tr-2xl rounded-bl-2xl lg:rounded-xl cursor-pointer lg:hover:scale-105 lg:hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <h5 className="font-primary font-semibold text-xl text-primary_dark tracking-wider">
                      Duration
                    </h5>
                    <p className="font-primary font-light text-white tracking-wide">
                      {x.duration}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h5 className="font-primary font-semibold text-xl text-primary_dark tracking-wider">
                      Percentage
                    </h5>
                    <p className="font-primary font-light text-white tracking-wide">
                      {x.percentage}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h5 className="font-primary font-semibold text-xl text-primary_dark tracking-wider">
                      Investment Amount
                    </h5>
                    <p className="font-primary font-light text-white tracking-wide">
                      {Formatter(x.captital, { type: "c" })}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h5 className="font-primary font-semibold text-xl text-primary_dark tracking-wider">
                      Profit
                    </h5>
                    <p className="font-primary font-light text-white tracking-wide">
                      {Formatter(x.profit, { type: "c" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;
