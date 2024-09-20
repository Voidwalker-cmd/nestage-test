import { Static } from "../../assets/img/index";

const Preloader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-85 z-50">
      <div className="flex items-center justify-center">
        <img
          src={Static.loaderSVG}
          alt="Loading Spinner"
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};

export default Preloader;
