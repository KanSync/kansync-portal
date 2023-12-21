import React from "react";
import { useContext, useState } from "react";
import { IUnifiedIssue } from "../interfaces/issues";
import { conv_to_unified } from "../utils/parse";

export interface IProject {
  name: string;
  owner: string;
  platform: string;
  lastUpdate: Date;
  checked: boolean;
  issues: IUnifiedIssue[];
}

interface IProjectProvider {
  activeProjects: {
    [Github: string]: IProject[];
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

function saveProject(platform: string, projects: IProject[]): void {
  localStorage.setItem(platform + "Projects", JSON.stringify(projects));
}

function loadProjects(platform: string): IProject[] {
  return JSON.parse(localStorage.getItem(platform + "Projects") || "[]").map(
    (project: IProject) => {
      project.lastUpdate = new Date(project.lastUpdate);
      project.issues = conv_to_unified(project.issues);
      return project;
    },
  );
}

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeProjects, setActiveProjects] = useState<{
    [Github: string]: IProject[];
    Jira: IProject[];
    Trello: IProject[];
  }>({
    Github: loadProjects("Github"),
    Jira: loadProjects("Jira"),
    Trello: loadProjects("Trello"),
  });

  const addProject = (project: IProject) => {
    // activeProjects[project.platform] = activeProjects[project.platform].filter(
    //   ({ name, owner }) => name === project.name && owner === project.owner,
    // );

    let index = activeProjects[project.platform].findIndex(
      ({ name, owner }) => name === project.name && owner === project.owner,
    );

    if (index !== -1) {
      activeProjects[project.platform][index].lastUpdate = project.lastUpdate;
      activeProjects[project.platform][index].issues = project.issues;
      saveProject(project.platform, activeProjects[project.platform]);
      return;
    }

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

    saveProject(project.platform, activeProjects[project.platform]);
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
