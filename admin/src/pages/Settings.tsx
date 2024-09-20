import SettingsCard from "../components/molecules/SettingsCard";

const Settings: React.FC = () => {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Nestage admin dashboard
        </h2>
        <p>Current Page: {"Settings"}</p>
      </div>
      <SettingsCard />
    </main>
  );
};

export default Settings;
