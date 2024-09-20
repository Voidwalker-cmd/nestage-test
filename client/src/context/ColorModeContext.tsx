import { createContext, useContext, useEffect, useState } from "react";
import { ColorModeContextType } from "../types/types";

const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: "dark",
  setColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    let preferredColorScheme: "light" | "dark" | unknown;

    preferredColorScheme = localStorage.getItem("theme");
    // console.log(preferredColorScheme);

    if (preferredColorScheme) {
      const ColorScheme = preferredColorScheme === "dark" ? "dark" : "light";
      document.body.classList.add(ColorScheme);
      setColorMode(ColorScheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
      setColorMode("dark");
    } else {
      document.body.classList.add("light");
    }
  }, []);

  const handleColorModeChange = (mode: "light" | "dark") => {
    setColorMode(mode);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    // document.body.classList.add(["text-foreground", "bg-background"]);
  };

  return (
    <ColorModeContext.Provider
      value={{ colorMode, setColorMode: handleColorModeChange }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};
