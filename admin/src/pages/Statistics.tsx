import StatisticsCard from "../components/molecules/StatisticsCard";

const Statistics = () => {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Nestage admin dashboard
        </h2>
        <p>Current Page: {"Statistics"}</p>
      </div>
      <div className="flex justify-between items-center gap-5">
        {/* <NotificationCreateCard /> */}
        <StatisticsCard />
      </div>
    </main>
  );
};

export default Statistics;
