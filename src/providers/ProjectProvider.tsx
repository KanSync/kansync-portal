import React from "react";
import { useContext, useState } from "react";

interface IProject {
  name: string;
  owner: string;
  platform: string;
  currentDate: Date;
  checked: boolean;
}

interface IProjectProvider {
  activeProjects: {
    Github: IProject[];
    Jira: IProject[];
    Trello: IProject[];
  };
  addProject: (project: IProject) => void;
}

const ProjectProviderContext = React.createContext<IProjectProvider>({
  activeProjects: {
    Github: [],
    Jira: [],
    Trello: [],
  },
  addProject: () => {
    throw new Error(`[ProjectProivder] addProject() not implemented`);
  },
});

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeProjects, setActiveProjects] = useState<{
    Github: IProject[];
    Jira: IProject[];
    Trello: IProject[];
  }>({
    Github: [],
    Jira: [],
    Trello: [],
  });

  const addProject = (project: IProject) => {
    switch (project.platform) {
      case "Github":
        return setActiveProjects({
          ...activeProjects,
          Github: [...activeProjects.Github, project],
        });
      case "Jira":
        return setActiveProjects({
          ...activeProjects,
          Jira: [...activeProjects.Jira, project],
        });
      case "Trello":
        return setActiveProjects({
          ...activeProjects,
          Trello: [...activeProjects.Trello, project],
        });
    }
  };

  return (
    <ProjectProviderContext.Provider
      value={{
        activeProjects,
        addProject,
      }}
    >
      {children}
    </ProjectProviderContext.Provider>
  );
};

const useProject = () => useContext(ProjectProviderContext);

export { ProjectProvider, useProject };
