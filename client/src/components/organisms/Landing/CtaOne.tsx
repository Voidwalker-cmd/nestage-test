import { Static } from "../../../assets/img";
import { SiteUrl, SS } from "../../../const";
import ComingSoonBotton from "../../molecules/Landing/ComingSoonBotton";
import ConnectionButton from "../../molecules/Landing/ConnectionButton";

const CtaOne = () => {
  return (
    <>
      <section className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center py-5 lg:py-10 lg:pr-5">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="font-primary text-2xl font-bold text-white md:text-3xl">
              Nestage Mission
            </h2>

            <p className="text-white mt-4 block">
              Nestage's mission is to empower individuals to earn passive income
              through referrals and smart staking, leveraging blockchain
              technology. The platform aims to revolutionize affiliate marketing
              and staking by providing innovative, secure, and transparent
              solutions that align with users' financial goals. Nestage combines
              affiliate marketing with blockchain benefits, offering lucrative
              referral programs, secure transactions, and user-friendly
              interfaces. Its goal is to help users unlock financial potential,
              achieve wealth-building goals, and explore opportunities in the
              digital asset space.
            </p>

            <div className="mt-4 md:mt-8">
              {SiteUrl.includes("nestage.io") && SS() ? (
                <ComingSoonBotton radius="lg" size="md" />
              ) : (
                <ConnectionButton radius="lg" size="lg" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:flex sm:items-center sm:justify-end sm:rounded-[30px] md:rounded-[60px]">
          <img
            alt="Nestage CtaImg"
            src={Static.customer}
            className="block  h-[70%] w-[80%] object-cover sm:h-[calc(100% - 2rem)] md:h-[calc(100% - 4rem)] md:rounded-[60px]"
          />
        </div>
      </section>
    </>
  );
};

export default CtaOne;
