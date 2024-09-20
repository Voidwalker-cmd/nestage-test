import SectionTitle from "../../molecules/Landing/SectionTitle";
import { Static } from "../../../assets/img";

const ReferralProgram = () => {
  return (
    <>
      <div className="max-w-full mt-5 pt-16">
        <div className="mx-2 lg:mx-20">
          <SectionTitle
            className={"text-white"}
            heading="Decentralized Matrix"
            subHeading="Powered by Smart Contract Technology"
          />
        </div>
      </div>

      <div className="relative py-0.5 overflow-hidden">
        <div className="relative flex flex-col lg:flex-row-reverse justify-center items-center gap-5 lg:gap-7">
          <div className="w-full">
            <video
              src={Static.referral}
              autoPlay
              loop
              muted
              className="overflow-hidden absolute top-0 left-0 w-full h-full object-cover video-background"
            />
          </div>
          <p className="block py-36 opacity-100 px-10 lg:px-0 text-center font-primary text-white font-light text-lg tracking-wide">
            Nestage’s decentralized matrix is an additional earning structure
            that allows participants to earn rewards from their direct
            downlines, second-level downlines, third-level downlines, and
            spillovers.It is a structure based on the activities and growth of
            your network. By actively engaging your community and leveraging the
            referral system, you can maximize your earnings and build a
            sustainable income stream within the Nestage platform.
          </p>
          <div className="relative z-10 flex w-full lg:px-10 justify-center items-center">
            {/* Uncomment and adjust the header as needed */}
            {/* <h3 className="block text-center lg:text-left text-4xl text-primary font-primary font-semibold tracking-wide ">
            Grow with Our Referral Program
          </h3> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ReferralProgram;
