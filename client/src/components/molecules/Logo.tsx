import { TestLogo } from "../atom/TestLogo";
import { LogoProps } from "../../types/types";
import { useEffect, useState } from "react";

const Logo: React.FC<LogoProps> = ({ show = !!1, dShow = !!1 }) => {
  const [type, setType] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setType("dark");
    } else {
      setType("light");
    }
  }, []);
  return (
    <>
      {dShow && (
        <div className="flex justify-center items-center text-primary">
          {/* <TestLogo /> */}
          <img
            src={`https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115769/nestage/logos/${
              type === "dark" ? "wh" : "bk"
            }-icon.png`}
            alt="logoImg"
            width={40}
            height={40}
          />
          {show ? (
            <p className="font-bold text-lg text-white font-primary">NESTAGE</p>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default Logo;
``;
