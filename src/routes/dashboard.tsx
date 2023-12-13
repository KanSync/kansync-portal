import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import Header from "../header";
import { useProject } from "../providers/ProjectProvider";
import { useAuth } from "../providers/AuthProvider";

import { useCallback, useState } from "react";
import { DefaultInput } from "../DefaultInput";
import JuicyButton from "../juicybutton";
import {
  SCOPE,
  STATE,
  github_client,
  jira_client,
  oauth,
} from "../utils/oauth";
import {
  BACKEND_GITHUB_URL,
  BACKEND_JIRA_URL,
  getIssues,
} from "../utils/issues";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardImporter = () => {
  const [receivedValue1, setReceivedValue1] = useState<string>("");
  const handleChildValueChange1 = (value: string) => {
    setReceivedValue1(value);
  };

  const [receivedValue2, setReceivedValue2] = useState<string>("");
  const handleChildValueChange2 = (value: string) => {
    setReceivedValue2(value);
  };

  const [currentPlatform, setCurrentPlatform] = useState<string>("Github");
  const handlePlatformChange = (value: string) => {
    setCurrentPlatform(value);
  };

  const { addProject, activeProjects } = useProject();

  const adder = (addProjectl, receivedValue1l, receivedValue2l) => {
    addProjectl({
      name: receivedValue2l,
      owner: receivedValue1l,
      platform: currentPlatform,
      checked: false,
    });
  };

  let { jiraToken, githubToken } = useAuth();

  const handleClick = useCallback(() => {
    var pass = true;
    const projectCategories = Object.keys(activeProjects);
    projectCategories.forEach((category) => {
      const projectsInCategory = activeProjects[category];
      projectsInCategory.forEach((project) => {
        if (receivedValue2 + receivedValue1 === project.name + project.owner) {
          pass = false;
        }
      });
    });

    if (!pass) {
      return;
    }

    adder(addProject, receivedValue1, receivedValue2);

    switch (currentPlatform) {
      case "Jira":
        if (!jiraToken || jiraToken.expiresAt! < Date.now()) {
          oauth(SCOPE.jira, STATE.jira, jira_client);
        }

        getIssues(
          BACKEND_JIRA_URL,
          { projectKey: "KAN", name: "iwouldliketotestthis" },
          jiraToken!,
        ).then((resp) => console.log(resp));
        break;

      case "Github":
        if (!githubToken || githubToken.expiresAt! < Date.now()) {
          oauth(SCOPE.github, STATE.github, github_client);
        }

        getIssues(
          BACKEND_GITHUB_URL,
          {
            repo: "kansync/kansync-server",
            projectName: "KanSync Project Planner",
          },
          githubToken!,
        ).then((resp) => console.log(resp));
        break;

      case "Trello":
        break;

      default:
        break;
    }
  }, [
    addProject,
    currentPlatform,
    receivedValue1,
    receivedValue2,
    jiraToken,
    githubToken,
    adder,
    activeProjects,
  ]);

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
                        placeholder={currentPlatform}
                        id="2"
                        onChildValueChange={handleChildValueChange1}
                      />
                      <DefaultInput
                        placeholder={currentPlatform}
                        id="1"
                        onChildValueChange={handleChildValueChange2}
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
                        <li>{post.owner}</li>
                        <li>&middot;</li>
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
        <BoardImporter />
      </div>
    </>
  );
};

export default Dashboard;
