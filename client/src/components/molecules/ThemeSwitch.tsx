import { Switch } from "@nextui-org/react";
import { SunIcon } from "../atom/SunIcon";
import { MoonIcon } from "../atom/MoonIcon";
import { useColorMode } from "../../context/modalProvider";
import { ChangeEvent } from "react";

const ThemeSwitch = () => {
  const { colorMode, setColorMode } = useColorMode();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setColorMode("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setColorMode("light");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <Switch
      defaultSelected
      onChange={onChange}
      size="md"
      color={`${colorMode === "light" ? "primary" : "secondary"}`}
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    ></Switch>
  );
};

export default ThemeSwitch;
