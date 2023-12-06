import { useEffect, useState } from "react";
import Bolt from "../assets/bolt.svg";
import Footer from "../footer";
import Header from "../header";

const WalkthroughTextBoxes = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row">
      <b className="bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text text-2xl">
        {title}
      </b>
      <p className="text-sm pb-4 pl-4 pr-4">
        Lorem ipsum dolor sit amet consectetur. Id nullam ac congue sed massa
        id.
      </p>
    </div>
  );
};

const PositiveTextBoxes = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={Bolt} className="w-8" alt="" />
      {title}
      <p className="text-xs">
        Lorem ipsum dolor sit amet consectetur. Id in quis bibendum ultricies
        curabitur commodo. Nisl adipiscing tellus malesuada urna neque ac
        commodo ullamcorpessr. Pellentesque quis dignissim amet neque aliquet
        nulla quam gravida semper. Tortor laoreet accumsan id platea ullamcorper
        est bibendum.
      </p>
    </div>
  );
};

const LandingPage = () => {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    status: number;
    data: any;
  }>({
    success: false,
    status: 0,
    data: null,
  });

  useEffect(() => {
    async function asyncFunction() {
      const result = await fetch(
        "https://local.functions.nhost.run/v1/hello_world",
      ).then((res) => res.json());
      setResult(result);
    }

    asyncFunction();
  }, []);

  return (
    <>
      <Header />
      <div className="px-32 min-h-screen">
        <div className="flex flex-col gap-8 place-items-center mt-32">
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            Visualize Your Kanban Board In{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #FF6D4D 0%, #E64623 54.51%, #D12600 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Detail
            </span>
          </div>

          <button className="px-16 py-4 bg-text w-1/3 text-background rounded-lg">
            Import
          </button>
        </div>
        <div className="flex flex-col place-items-center pt-16 gap-10">
          <b className="text-xl">Why KanSync?</b>
          <div className="flex flex-row gap-8">
            <PositiveTextBoxes title="Saves time" />
            <PositiveTextBoxes title="It's Realistic" />
            <PositiveTextBoxes title="It's simple" />
          </div>
        </div>
        <div className="bg-secondary flex flex-row rounded-3xl p-10 mt-16">
          <div className="flex flex-col gap-10 flex-1">
            <b>How does it work</b>
            <b>Get your personlized dashboard in 4 steps.</b>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex justify-around">
              <WalkthroughTextBoxes title="1" />
              <WalkthroughTextBoxes title="2" />
            </div>
            <div className="flex justify-around">
              <WalkthroughTextBoxes title="3" />
              <WalkthroughTextBoxes title="4" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
