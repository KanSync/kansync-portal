import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import Header from "../header";
import { useProject } from "../providers/ProjectProvider";

import { useCallback, useState } from "react";
import { DefaultInput } from "../DefaultInput";
import PlusCircle from "../assets/plus-circle.svg";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardImporter = () => {
  const [receivedValue, setReceivedValue] = useState<string>("");
  const handleChildValueChange = (value: string) => {
    setReceivedValue(value);
  };

  const { addProject, activeProjects } = useProject();

  const handleClick = useCallback(() => {
    addProject({
      name: receivedValue,
      platform: "Github",
    });
  }, [addProject, receivedValue]);

  return (
    <div className="w-full flex flex-col place-items-center">
      <p className="text-text text-xl pb-4 self-center">
        Import your boards from:
      </p>
      <div className="w-full max-w-3xl px-8 py-16 bg-gradient-to-b from-accent to-primary rounded-sm shadow-inner">
        <Tab.Group>
          <Tab.List className="flex space-x-3 rounded-xl bg-background/20 p-1 shadow-lg">
            {Object.keys(activeProjects).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                    "ring-background/60 ring-offset-2 ring-offset-accent focus:outline-none focus:ring-2",
                    selected
                      ? "bg-background text-text shadow"
                      : "text-secondary hover:bg-background/[0.12] hover:text-background",
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 shadow-lg">
            {Object.values(activeProjects).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-background p-3",
                  "ring-background/60 ring-offset-2 ring-offset-accent focus:outline-none focus:ring-2",
                )}
              >
                <ul>
                  <li className="relative rounded-md p-3">
                    <div className="flex flex-row items-center gap-8">
                      <DefaultInput
                        placeholder="Enter name of repository"
                        onChildValueChange={handleChildValueChange}
                      />
                      <button className="hover:bg-accent" onClick={handleClick}>
                        <img src={PlusCircle} className="w-16" alt="" />
                      </button>
                    </div>
                  </li>

                  {posts.map((post) => (
                    <li
                      key={post.name}
                      className="relative rounded-md p-3 hover:bg-secondary"
                    >
                      <h3 className="text-sm font-medium leading-5">
                        {post.name}
                      </h3>

                      <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{post.name}</li>
                        <li>&middot;</li>
                        <li>{post.platform}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const activeProjects = useProject().activeProjects;

  return (
    <>
      <Header />
      <div className="flex flex-col flex-1 gap-8 place-items-center py-16">
        <BoardImporter />
        {(activeProjects.Github.length > 0 ||
          activeProjects.Jira.length > 0 ||
          activeProjects.Trello.length > 0) && (
          <Link to="/kanban" className="flex place-content-center">
            <button className="bg-text text-background px-16 py-4 rounded-md">
              Continue with selected boards
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Dashboard;
