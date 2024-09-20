import { Static } from "../../../assets/img";

const CampaignCardTwo = ({ txt }: { txt: string }) => {
  return (
    <div className="w-fullbg bg-gradient-to-b from-green-300 to-green-900 relative py-3 p-x-4 rounded-lg">
      <div className="flex flex-col space-y-5 items-center">
        <span className="text-2xl lg:text-5xl font-extrabold lg:font-bold text-transparent text-white tracking-wider">
          {txt}
        </span>
        <span className="text-2xl lg:text-5xl font-extrabold lg:font-bold text-transparent text-white tracking-wider">
          Campaign
        </span>
        {/* <div className="absolute inset-0 bg-circular-gradient rounded-full blur-sm"></div> */}
      </div>
      <div className="absolute -right-1 -top-2 rounded-full bg-white p-2.5 flex items-center justify-center">
        {txt === "1.0" ? (
          <img src={Static.check} width={32} height={32} alt="checkImg" />
        ) : (
          <img
            src={Static.lockCheck}
            width={32}
            height={32}
            alt="lockChekImg"
          />
        )}
      </div>
    </div>
  );
};

export default CampaignCardTwo;
