import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  Button,
} from "@nextui-org/react";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "./Logo";
import Terms from "../organisms/Landing/Terms";
import { Link } from "../../config/utils";
import ConnectionButton from "./Landing/ConnectionButton";
import ComingSoonBotton from "./Landing/ComingSoonBotton";
import { SiteUrl, SS } from "../../const";

const Nav: React.FC = () => {
  return (
    <Navbar shouldHideOnScroll isBordered className={""}>
      <NavbarBrand>
        <Link to="/" aria-current="page">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" to="#">
            About
          </Link>
        </NavbarItem> */}
        <NavbarItem isActive>
          <Link className="text-white" to="/documentation" aria-current="page">
            Documentation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" to="/terms">
            Terms Of Service
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden md:inline">
          <ThemeSwitch />
        </NavbarItem> */}
        <NavbarItem>
          {SiteUrl.includes("nestage.io") && SS() ? (
            <ComingSoonBotton radius="lg" size="md" component="Nav" />
          ) : (
            <ConnectionButton radius="lg" size="md" component="Nav" />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
