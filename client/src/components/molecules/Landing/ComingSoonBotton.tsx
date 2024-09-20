import { Button } from "@nextui-org/react";
import { ConnectButtonProps } from "../../../types";
import CountdownModal from "../Dashboard/CountdownModal";
import { useState } from "react";
import { targetDate } from "../../../const";

const ComingSoonBotton: React.FC<ConnectButtonProps> = ({
  radius,
  size,
  component = "NotNav",
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(!!0);

  return (
    <>
      <Button
        color="primary"
        className="rounded-lg text-white tracking-wide font-primary"
        variant="shadow"
        radius={radius}
        size={size}
        onClick={() => setModalIsOpen(true)}
      >
        Connect Wallet
      </Button>
      <CountdownModal
        targetDate={targetDate}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default ComingSoonBotton;
