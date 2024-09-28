import { Link } from "../../../config/utils";
import { ArrowLeftI } from "../../atom/Icons";
import CampaignCard from "../../molecules/Landing/CampaignCard";
import CampaignCardTwo from "../../molecules/Landing/CampaignCardTwo";

const Exaggerate = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-5">
      <div className="flex flex-col text-white w-[90%] lg:w-[75%] gap-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-1">
              <ArrowLeftI className="size-4" />
              <span>Back</span>
            </div>
          </Link>
          <span>Ends 30th November, 2024.</span>
        </div>
        <CampaignCard />
        <div>
          <h1 className="text-3xl lg:text-5xl mb-3 igr py-3">
            Introducing our First Contest. Read carefully to claim your prize
          </h1>
          <p>
            🏆 <strong>"Extravaganza"</strong> is a competition for all members
            of Nestage. Participate and get the opportunity to become one of
            23winners! -which means that you have a very high chance of being
            among the winners!
          </p>

          <p className="mt-3">End date: November 30, 2024.</p>
        </div>

        <div>
          <h1 className="text-xl mb-3">PRIZES</h1>
          <p>
            The total prize fund is $10,000. Prizes will be distributed as
            follows:
          </p>
          <ul>
            <li>🥇 1st place prize - $3,000</li>
            <li>🥈 2nd place - $1,000</li>
            <li>🥉 3rd place - Six(6) people will receive prizes of $500</li>
            <li>
              🏅 4th place - Fifteen (15) people will receive prizes of $200
            </li>
          </ul>
        </div>
        <div>
          <h1>How to participate</h1>
          <ol>
            <li>
              Share in video format, graphics format and/or write ups, info
              about Nestage on social networks (Youtubes, Instagram, Facebook,
              or any other platform). The more platform, the more chnaces to
              win.
            </li>
            <li>
              Add the hashtag #Nestage to your video or post. To increase your
              chances of winning, mention @ionestage
            </li>
          </ol>
        </div>

        <div className="">
          <h1 className="text-xl mb-3">Registration</h1>
          <ul className="space-y-2">
            <li>
              -- To Submit link to your posts and read the terms of the
              competition, fill out this{" "}
              <a
                href="https://forms.gle/E4nSq58ZVwsKrGAU8"
                target="_blank"
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                form
              </a>
            </li>
            <li>
              -- To get answers to additional questions as well as get access to
              a closed channel where everything is explained in detail, fill out
              this{" "}
              <a
                href="https://t.me/nestagecampaign"
                target="_blank"
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                form
              </a>
            </li>
          </ul>
          <span>Here:</span>
          <p>
            Bring yoyr ideas to life, create cool and useful content, and
            compete for generous prizes
          </p>
          <p>
            📌 keep in mind that low-quality content, plaglarism, or previous
            submitted work will not be accepted!
          </p>
        </div>
        <div className="my-3">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <CampaignCardTwo txt={"1.0"} />
            <CampaignCardTwo txt={"2.0"} />
            <CampaignCardTwo txt={"3.0"} />
            <CampaignCardTwo txt={"4.0"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exaggerate;
