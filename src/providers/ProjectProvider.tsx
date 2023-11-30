import React from "react";
import { useContext, useState } from "react";

interface IProject {
  name: string;
}

interface IProjectProvider {
  activeProjects: IProject[];
  addProject: (project: IProject) => void;
}

const ProjectProviderContext = React.createContext<IProjectProvider>({
  activeProjects: [],
  addProject: () => {
    throw new Error(`[ProjectProivder] addProject() not implemented`);
  },
});

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeProjects, setActiveProjects] = useState<IProject[]>([]);

  const addProject = (project: IProject) => {
    setActiveProjects([...activeProjects, project]);
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
