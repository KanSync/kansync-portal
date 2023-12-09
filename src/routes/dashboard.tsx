import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import Header from "../header";
import { useProject } from "../providers/ProjectProvider";

import { useCallback, useState } from "react";
import { DefaultInput } from "../DefaultInput";
import JuicyButton from "../juicybutton";

const BACKEND_TRELLO_OAUTH_URL = 'http://localhost:3000/';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function oauth_trello() {
  window.location.href = BACKEND_TRELLO_OAUTH_URL;
}

const BoardImporter = () => {
  const [receivedValue, setReceivedValue] = useState<string>("");
  const handleChildValueChange = (value: string) => {
    setReceivedValue(value);
  };

  const [currentPlatform, setCurrentPlatform] = useState<string>("");
  const handlePlatformChange = (value: string) => {
    setCurrentPlatform(value);
  };

  const { addProject, activeProjects } = useProject();

  const handleClick = useCallback(() => {
    switch (currentPlatform) {
      case "Jira":
        break;

      case "Github":
        break;

      case "Trello":
        oauth_trello();
        break;

      default:
        break;
    }

    addProject({
      name: receivedValue,
      platform: currentPlatform,
    });
  }, [addProject, currentPlatform, receivedValue]);

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
                onClick={() => handlePlatformChange(category)}
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
                      <JuicyButton onClick={handleClick} className="bg-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </JuicyButton>
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
        {(activeProjects.Github.length > 0 ||
          activeProjects.Jira.length > 0 ||
          activeProjects.Trello.length > 0) && (
          <Link to="/kanban/overview" className="flex place-content-center">
            <JuicyButton className="bg-text px-8">
              Continue with selected boards
            </JuicyButton>
          </Link>
        )}
        {/* add trello component */}
        <BoardImporter />
      </div>
    </>
  );
};

export default Dashboard;
