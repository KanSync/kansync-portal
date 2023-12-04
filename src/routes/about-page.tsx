import { useEffect, useState } from "react";
import Bolt from "../assets/bolt.svg";
import Footer from "../footer";
import Header from "../header";

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

const AboutPage = () => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5em",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          About{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #FF6D4D 0%, #E64623 54.51%, #D12600 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Us
          </span>
        </div>
      </div>
      <div className="flex flex-col place-items-center pt-16 gap-10">
        <b className="text-xl">Why KanSync?</b>
        <div className="flex flex-row">
          <PositiveTextBoxes title="Saves time" />
          <PositiveTextBoxes title="It's Realistic" />
          <PositiveTextBoxes title="It's simple" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
