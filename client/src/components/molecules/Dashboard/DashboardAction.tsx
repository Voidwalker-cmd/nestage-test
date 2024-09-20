import { useModal } from "../../../context/ModalContext";

const DashboardAction = () => {
  const { showModal } = useModal();
  return (
    <>
      {/* Dashboard actions */}
      <div className="flex justify-end items-center mb-8 w-full">
        {/* Right: Actions */}
        <div className="flex items-end">
          {/* Start new mining button */}
          <button
            onClick={() => {
              sessionStorage.setItem("MV938aO", "kYgxU8x");
              showModal();
            }}
            className="btn bg-primary-600 hover:bg-primary text-white p-2 shadow-xl rounded-md flex items-center"
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0 text-white"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="block ml-2">New Stake</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardAction;
