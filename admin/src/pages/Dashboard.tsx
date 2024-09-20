import DashboardCardOne from "../components/molecules/DashboardCardOne";

const Dashboard: React.FC = () => {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Nestage admin dashboard
        </h2>
        <p>Current Page: {""}</p>
      </div>
      <DashboardCardOne />
    </main>
  );
};

export default Dashboard;
