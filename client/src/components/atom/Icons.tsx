import {
  ArrowDownUp,
  Bell,
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  CircleX,
  Copy,
  CopyCheck,
  Info,
  PowerOffIcon,
  X,
} from "lucide-react";
import { CustomIconProps, IconsProps } from "../../types/types";

export const PowerButtonI: React.FC<IconsProps> = ({ className }) => {
  return <PowerOffIcon className={className} />;
};

export const SortIconI: React.FC<IconsProps> = ({ className }) => {
  return <ArrowDownUp className={className} />;
};

export const CloseIconL: React.FC<IconsProps> = ({ className }) => {
  return <X className={className} />;
};

export const ArrowLeftI: React.FC<IconsProps> = ({ className }) => {
  return <ChevronLeft className={className} />;
};

export const CopyIcon: React.FC<IconsProps> = ({ className }) => {
  return <Copy className={className} />;
};

export const CopiedIcon: React.FC<IconsProps> = ({ className }) => {
  return <CopyCheck className={className} />;
};

export const NotificationsIcon: React.FC<CustomIconProps> = ({
  itype,
  className,
}) => {
  switch (itype) {
    case "success":
      return <CircleCheck className={className} />;
    case "error":
      return <CircleX className={className} />;
    case "warning":
      return <CircleAlert className={className} />;
    case "info":
      return <Info className={className} />;
    default:
      return <Bell className={className} />;
  }
};
