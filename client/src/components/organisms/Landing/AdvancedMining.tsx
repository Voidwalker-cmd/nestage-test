import { useState } from "react";
import { Static } from "../../../assets/img";
import SectionTitle from "../../molecules/Landing/SectionTitle";
import { faqData } from "./../../../const/faqData";

const AdvancedMining = () => {
  const [data] = useState(faqData);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <>
      <div className="max-w-full mt-5 py-16">
        <div className="mx-2 lg:mx-20">
          <SectionTitle
            heading="FAQs"
            subHeading="See fequently asked questins."
            className={"text-white"}
          />
          <div className="py-5 px-2 mt-3">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-7">
              <div className="flex gap-[10px] w-full lg:w-1/2">
                <img
                  src={Static.Question}
                  alt="NestageCustomer"
                  className="object-cover w-full h-full scale-35 lg:scale-50 overflow-hidden"
                />
                <img
                  src={Static.Question}
                  alt="NestageCustomer"
                  className="object-cover w-full h-full scale-55 lg:scale-60 overflow-hidden"
                />
                <img
                  src={Static.Question}
                  alt="NestageCustomer"
                  className="object-cover w-full h-full scale-35 lg:scale-50 overflow-hidden"
                />
              </div>
              <div className="flex flex-col gap-5 lg:gap-3 w-full lg:w-1/2 lg:px-10">
                <div className="space-y-4">
                  {data.map((faq, index) => (
                    <details
                      key={index}
                      className={`group ${activeIndex === index ? "open" : ""}`}
                      open={activeIndex === index}
                      onClick={() => handleToggle(index)}
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-[#2d6a4f] p-4 text-white">
                        <h2 className="font-medium">{faq.question}</h2>
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
                      <p className="mt-4 px-4 leading-relaxed text-white dark:!text-white">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedMining;
