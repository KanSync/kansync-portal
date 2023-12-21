import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import Header from "../header";
import { IProject, useProject } from "../providers/ProjectProvider";
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
  trello_redirect,
} from "../utils/oauth";
import {
  BACKEND_GITHUB_URL,
  BACKEND_JIRA_URL,
  BACKEND_TRELLO_URL,
  BaseParams,
  getIssues,
} from "../utils/issues";
import { IUnifiedIssue } from "../interfaces/issues";
import { useUser } from "../providers/UserProvider";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardImporter = () => {
  const [receivedValue2, setReceivedValue2] = useState<string>("");
  const handleChildValueChange = (value: string) => {
    setReceivedValue2(value);
  };

  const [currentPlatform, setCurrentPlatform] = useState<string>("Github");
  const handlePlatformChange = (value: string) => {
    setCurrentPlatform(value);
  };
  const [receivedValue1, setReceivedValue1] = useState<string>("");
  const handleChildValueChange1 = (value: string) => {
    setReceivedValue1(value);
  };

  const { addProject, activeProjects } = useProject();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const adder = (
    addProject: (project: IProject) => void,
    receivedValue1: string,
    receivedValue2: any,
    issues: IUnifiedIssue[],
  ) => {
    addProject({
      name: receivedValue2,
      owner: receivedValue1,
      platform: currentPlatform,
      lastUpdate: new Date(),
      checked: false,
      issues: issues,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleImport = async (
    platform: string,
    baseParams: BaseParams,
    value1: string,
    value2: string,
  ): Promise<IUnifiedIssue[] | undefined> => {
    let result: IUnifiedIssue[] | undefined;

    switch (platform) {
      case "Jira":
        if (!jiraToken || jiraToken.expiresAt! < Date.now()) {
          await oauth(SCOPE.jira, STATE.jira, jira_client);
        }

        result = await getIssues(
          BACKEND_JIRA_URL,
          Object.assign(baseParams, {
            projectKey: value1,
            name: value2,
          }),
          jiraToken!,
        );
        break;

      case "Github":
        if (!githubToken) {
          await oauth(SCOPE.github, STATE.github, github_client);
        }

        result = await getIssues(
          BACKEND_GITHUB_URL,
          Object.assign(baseParams, {
            repo: value1,
            projectName: value2,
          }),
          githubToken!,
        );
        break;

      case "Trello":
        if (!trelloToken) {
          await trello_redirect();
        }

        result = await getIssues(
          BACKEND_TRELLO_URL,
          Object.assign(baseParams, {
            boardId: value2,
          }),
          trelloToken!,
        );
        break;

      default:
        break;
    }

    return result;
  };

  let { jiraToken, githubToken, trelloToken } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const { user } = useUser();

  const handleClick = useCallback(async () => {
    let projectExists = false;
    activeProjects[currentPlatform].forEach((project: IProject) => {
      if (receivedValue1 === project.owner && receivedValue2 === project.name) {
        setErrorMessage("Project is already added");
        projectExists = true;
      }
    });

    if (projectExists) {
      return;
    }

    let baseParams: BaseParams = {
      ...{ project_name: receivedValue1 + receivedValue2 },
      ...(Object.keys(user).length === 0 ? {} : { user: user.nickname }),
    };

    let result = await handleImport(
      currentPlatform,
      baseParams,
      receivedValue1,
      receivedValue2,
    );

    if (result === undefined) {
      setErrorMessage("Project does not exist");
      return;
    }

    setErrorMessage("");
    adder(addProject, receivedValue1, receivedValue2, result);
  }, [
    activeProjects,
    currentPlatform,
    receivedValue1,
    receivedValue2,
    user,
    handleImport,
    adder,
    addProject,
  ]);

  const handleChange = (post: IProject) => {
    activeProjects[currentPlatform].forEach((project: IProject) => {
      if (post.name + post.owner === project.name + project.owner) {
        project.checked = !project.checked;
      }
    });
  };

  const getCurrent = (post: IProject) => {
    let isChecked = false;
    activeProjects[currentPlatform].forEach((project: IProject) => {
      if (post.name + post.owner === project.name + project.owner) {
        isChecked = project.checked;
      }
    });
    return isChecked;
  };

  const handleUpdate = async (post: IProject) => {
    let baseParams: BaseParams = {
      ...{ project_name: post.owner + post.name, update: "true" },
      ...(Object.keys(user).length === 0 ? {} : { user: user.nickname }),
    };

    let result = await handleImport(
      currentPlatform,
      baseParams,
      post.owner,
      post.name,
    );

    if (result === undefined) {
      setErrorMessage("Failed to update project");
      return;
    }

    setErrorMessage("");
    adder(addProject, receivedValue1, receivedValue2, result);
  };

  const lastUpdateInDays = (post: IProject) => {
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - post.lastUpdate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.floor(differenceInDays);
  };

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
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium leading-5">
                            {post.name}
                          </h3>

                          <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                            <li>
                              {" "}
                              <label>
                                <input
                                  type="checkbox"
                                  defaultChecked={getCurrent(post)}
                                  onChange={() => {
                                    handleChange(post);
                                  }}
                                ></input>
                              </label>
                            </li>
                            <li>{post.owner}</li>
                            <li>&middot;</li>
                            <li>{post.name}</li>
                            <li>&middot;</li>
                            <li>{post.platform}</li>
                          </ul>
                        </div>
                        <span className="text-xs text-gray-400">{`Updated ${lastUpdateInDays(
                          post,
                        )} days ago`}</span>
                        <button
                          onClick={() => handleUpdate(post)}
                          className="text-background p-4 rounded-full hover:bg-text/80 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out active:scale-75 bg-text"
                        >
                          Update
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      {errorMessage && (
        <p className="text-text text-xl pb-4 self-center">{errorMessage}</p>
      )}
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
