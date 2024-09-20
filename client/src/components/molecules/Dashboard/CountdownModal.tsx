import { useState, useEffect } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";

const CountdownModal: React.FC<{
  targetDate: Date;
  isOpen: boolean;
  onClose: () => void;
}> = ({ targetDate, isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setConfetti(true);
      } else {
        setTimeLeft(null);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Modal
      className={
        "flex justify-center items-center bg-white border-none ring-0 outline-none w-full h-full !z-[99]"
      }
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "35rem",
          height: "35rem",
        },
      }}
    >
      {timeLeft && (
        <div style={{ textAlign: "center" }} className="space-y-5">
          <h2 className="text-2xl font-bold lg:font-extrabold leading-5 lg:leading-8 ">
            Countdown to Lunch Day
          </h2>
          <div className="text-2xl text-gray-600 font-semibold tracking-widest">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s{/* {confetti && <Confetti />} */}
          </div>
        </div>
      )}
      <button
        className="py-2 text-rose-500 bg-rose-500/25 px-10 mt-5 rounded hover:text-rose-600"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default CountdownModal;
