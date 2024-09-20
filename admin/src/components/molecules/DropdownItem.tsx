import { DropdownItemProps } from "../../types/types";

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default DropdownItem;
