const CampaignCard = () => {
  return (
    <div className="bg-green-200 rounded-lg px-6 py-4 lg:py-8 text-center w-full space-y-10 lg:space-y-24 my-1">
      <div className="relative inline-block">
        <span className="text-2xl lg:text-5xl font-extrabold lg:font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-700">
          NESTAGE CAMPAIGN 1.0
        </span>
        {/* <div className="absolute inset-0 bg-circular-gradient rounded-full blur-sm"></div> */}
      </div>
      <p className="mt-4 text-black text-2xl lg:text-5xl font-extrabold lg:font-bold">
        Extravaganza
      </p>
    </div>
  );
};

export default CampaignCard;
