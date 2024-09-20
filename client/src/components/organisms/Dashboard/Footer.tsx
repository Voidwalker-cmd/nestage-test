import { Link } from "../../../config/utils";
import Logo from "../../molecules/Logo";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 bg-white px-0 dark:bg-[#182235] border-t border-slate-200 dark:border-slate-700 z-30">
      <div className="py-3 flex flex-col md:flex-row justify-between items-center w-screen">
        {/* <div className="flex items-center justift-between">
          <div className="px-5">
            <Logo />
          </div>
          <div className="px-5 flex items-center gap-4 text-slate-600 dark:text-anti_white">
            <Link to="/">Home</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/policy">Policy</Link>
          </div>
        </div> */}
        <div className="px-5 flex items-center">
          <p className="mx-auto max-w-xl text-center leading-relaxed text-gray-600 dark:text-anti_white font-primary font-semibold">
            {new Date().getFullYear()} &copy;{" "}
            <Link
              className="text-gray-700 dark:text-anti_white transition-all hover:text-pear hover:underline font-semibold"
              to="#"
            >
              Nestage.io
            </Link>{" "}
            . All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
