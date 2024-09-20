import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ActionDropdownProps } from "../../types/types";

const ActionDropdown: React.FC<ActionDropdownProps> = ({ children }) => {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
        Options
        {/* <ChevronDownIcon className="size-4 fill-white/60" /> */}
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {children}
      </MenuItems>
    </Menu>
  );
};

export default ActionDropdown;
