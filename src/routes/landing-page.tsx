import { Link } from "react-router-dom";
import Bolt from "../assets/bolt.svg";
import Footer from "../footer";
import Header from "../header";

const WalkthroughTextBoxes = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="rounded-xl mx-auto mt-10 bg-gradient-to-r p-[6px] from-primary via-primary to-accent">
      <div className="flex flex-col h-full bg-background rounded-lg p-4 flex-1">
        <b className="bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text text-2xl">
          {title}
        </b>
        <div className="text-sm pb-4 pl-4 pr-4">{children}</div>
      </div>
    </div>
  );
};

const PositiveTextBoxes = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={Bolt} className="w-8" alt="" />
      {title}
      <p className="text-xs">{description}</p>
    </div>
  );
};

const LandingPage = () => (
  <div className="flex flex-col">
    <Header />
    <div className="min-h-screen w-3/4 self-center">
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

        <Link to="/dashboard" className="w-1/3">
          <button className="px-16 py-4 bg-text w-full text-background rounded-lg hover:bg-text/80 transition duration-300 ease-in-out">
            Import
          </button>
        </Link>
      </div>
      <div className="flex flex-col place-items-center pt-16 gap-10">
        <b className="text-xl">Why KanSync?</b>
        <div className="flex flex-row gap-8">
          <PositiveTextBoxes
            title="Saves time"
            description="By using KanSync you save time when generating charts and useful data from your projects. This is achieved by parts of information that would be relevant for both developers and managers."
          />
          <PositiveTextBoxes
            title="It's Realistic"
            description="The data we extract is show in the most accurate way possible. We fetch the project data from the original sources and use the raw data to perform the number crunching locally."
          />

          <PositiveTextBoxes
            title="It's simple"
            description="We try to minimize the amount of steps required for grpah viewing and generation. Any person should be able to understand and use KanSync."
          />
        </div>
      </div>
      <div className="bg-secondary flex flex-col rounded-3xl p-10 mt-16 2xl:items-center">
        <div className="flex flex-col gap-10 flex-1">
          <b>How does it work</b>
          <b>Get your personlized dashboard in 4 steps.</b>
        </div>
        <div className="flex flex-col flex-1 gap-4 2xl:w-1/2">
          <div className="flex justify-around gap-8">
            <WalkthroughTextBoxes title="1">
              <p className="w-40">
                Start by pressing the{" "}
                <span className=" bg-text text-secondary px-1 py-0.5 rounded-sm">
                  Import
                </span>{" "}
                button to begin importing your{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #FF6D4D 0%, #E64623 54.51%, #D12600 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  favorite
                </span>{" "}
                projects!
              </p>
            </WalkthroughTextBoxes>
            <WalkthroughTextBoxes title="2">
              <p>
                Choose your favorite projects to import. We allow importing from
                Jira, Trello and Github. All imports require
                authentication. After entering board information, click
                the plus button to mark a project as selected. Click on the
                button "Continue with selected boards" in order to proceed to
                the next step.
              </p>
            </WalkthroughTextBoxes>
          </div>
          <div className="flex justify-around gap-8">
            <WalkthroughTextBoxes title="3">
              <p>
                Tabs on the left are used for navigation.{" "}
                <strong>Overview</strong> is the first page you see. There are six different types of charts are presented
                that show average age, average completion time, burndown,
                backlog status, overview of the issues in different stages of
                development, and issues that are close to due date.{" "}
                <strong>Kanban Board</strong> is the page where you can see all
                of your issues/tasks in a unified view.
              </p>
            </WalkthroughTextBoxes>
            <WalkthroughTextBoxes title="4">
              <strong>Generate Graphs</strong> is the page where you can
              generate different types of graphs. This can be done by selecting valid start and end dates for the graphs. Optionally you can also pick a deadline which is for showing all tasks that must be completed before that date.
            </WalkthroughTextBoxes>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default LandingPage;
