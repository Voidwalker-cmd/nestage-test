import Modal from "../components/molecules/Dashboard/Modal";
import AboutBlock from "../components/organisms/Landing/AboutBlock";
import AdvancedMining from "../components/organisms/Landing/AdvancedMining";
import CtaOne from "../components/organisms/Landing/CtaOne";
import Hero from "../components/organisms/Landing/Hero";
import Packages from "../components/organisms/Landing/Packages";
import ReferralProgram from "../components/organisms/Landing/ReferralProgram";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutBlock />
      {/* <Packages /> */}
      <ReferralProgram />
      <AdvancedMining />
      <CtaOne />
      {/* <Modal /> */}
      {/* <div className="border-2 border-blue-400"></div> */}
    </>
  );
};

export default Home;
