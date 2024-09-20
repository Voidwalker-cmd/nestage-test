import { Button } from "@tremor/react";
import { LevelTableProps } from "../../types/types";
// import ActionDropdown from "./ActionDropdown";
// import { MenuItem } from "@headlessui/react";

const LevelTable: React.FC<LevelTableProps> = ({
  label,
  showAction,
  children,
  payRefs,
}) => {
  return (
    <>
      <div className="flex items-center justify-between space-x-10 w-full">
        <div>
          <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {label}
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Overview of all {label} within nestage.
          </p>
        </div>
        {label.toLowerCase() === "levelone" && (
          <div className="flex gap-3">
            <Button
              type="button"
              disabled={!!1}
              className="mt-4 w-1/2 lg:w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
            >
              Add stake
            </Button>
            <Button
              type="button"
              disabled={!showAction}
              color="green"
              onClick={(e) => payRefs && payRefs(e, "bulk")}
              className="mt-4 w-1/2 lg:w-full whitespace-nowrap rounded-tremor-small bg-green-500 px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-green-600 dark:bg-green-400 dark:text-green dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
            >
              Bulk Pay
            </Button>
          </div>
        )}
        {/* {showAction && ( */}
        {/* // <ActionDropdown>
            //   <MenuItem>
            //     <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            //       {/* <PencilIcon className="size-4 fill-white/30" /> */}
        {/* //       Edit
            //       <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
            //         ⌘E
            //       </kbd>
            //     </button>
            //   </MenuItem>
            // </ActionDropdown> */}
        {/* )} */}
        {/* </div> */}
      </div>
      {children}
    </>
  );
};

export default LevelTable;
