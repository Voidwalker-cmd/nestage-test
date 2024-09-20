import { Divider } from "@nextui-org/react";
import { SectionTitleProps } from "../../../types/types";

const SectionTitle: React.FC<SectionTitleProps> = ({
  heading,
  subHeading,
  className,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center py-5 space-y-3">
        <h2
          className={`${className} block text-center text-3xl font-primary font-semibold text-primary`}
        >
          {heading}
        </h2>
        <div className="flex justify-center items-center gap-3">
          <Divider className="bg-primary h-px w-2/12" />
          <p
            className={`shrink-0 text-base font-primary font-medium ${className}`}
          >
            {subHeading}
          </p>
          <Divider className="bg-primary h-px w-2/12" />
        </div>
      </div>
    </>
  );
};

export default SectionTitle;
