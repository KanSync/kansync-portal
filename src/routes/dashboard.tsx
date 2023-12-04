import { Link } from "react-router-dom";
import Card from "../card";
import Header from "../header";
import { useProject } from "../providers/ProjectProvider";

const Dashboard = () => {
  const activeProjects = useProject().activeProjects;

  return (
    <>
      <Header />
      <div className="flex flex-col flex-1 gap-8">
        <Card title="Github" />
        <Card title="Jira" />
        <Card title="Trello" />
        {activeProjects.length > 0 && (
          <Link to="/kanban">
            <button className="self-center">
              Continue with selected boards
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Dashboard;
