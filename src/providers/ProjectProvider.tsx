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

function saveProject(platform: string, project: IProject): void {
  let projects: IProject[] = JSON.parse(
    localStorage.getItem(platform + "Projects") || "[]",
  );
  projects.push(project);
  localStorage.setItem(platform, JSON.stringify(projects));
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
    Github: IProject[];
    Jira: IProject[];
    Trello: IProject[];
  }>({
    Github: loadProjects("Github"),
    Jira: loadProjects("Jira"),
    Trello: loadProjects("Trello"),
  });

  const addProject = (project: IProject) => {
    saveProject(project.platform, project);
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
