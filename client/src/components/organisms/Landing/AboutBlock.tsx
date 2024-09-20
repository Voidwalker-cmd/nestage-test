import { aboutFeatures } from "../../../const/Features";
import SectionTitle from "../../molecules/Landing/SectionTitle";
import { useState } from "react";

const AboutBlock = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <div className="max-w-full lg:mt-44 py-16">
      <div className="mx-2 lg:mx-20">
        <SectionTitle
          heading="About"
          subHeading="Get to know our Key Features" className={'text-white'}        />
        <div className="py-5 px-2 mt-3">
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-6">
            {aboutFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          <div className="block lg:hidden space-y-4">
            {aboutFeatures.map((txt, index) => (
              <details
                key={`kjdlas-${index}`}
                className={`group ${activeIndex === index ? "open" : ""}`}
                open={activeIndex === index}
                onClick={() => handleToggle(index)}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                  <h2 className="font-medium">{txt.title}</h2>
                  <svg
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 px-4 leading-relaxed text-white">
                  {txt.description}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!0);

  return (
    <div
      className="col-span-4 bg-secondary shadow-lg border-2 lg:border border-primary_dark rounded-tr-2xl rounded-bl-2xl lg:rounded-xl px-5 py-3.5 cursor-pointer lg:hover:scale-105 lg:hover:shadow-xl transition-all w-[370px] h-64 flex flex-col items-center justify-center text-center"
      onMouseEnter={() => setIsExpanded(!!1)}
      onMouseLeave={() => setIsExpanded(!!0)}
    >
      <div
        className={`transition-all duration-500 text-xl font-bold ${
          isExpanded ? "" : ""
        }`}
      >
        {title}
      </div>
      {isExpanded && (
        <p className="mt-4 transition-opacity duration-500 opacity-100">
          {description}
        </p>
      )}
    </div>
  );
};

export default AboutBlock;
