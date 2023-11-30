import Header from "../header";
import Footer from "../footer";
import Card from "../card";
import { useProject } from "../providers/ProjectProvider";
import { Link } from "react-router-dom";

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
      <Footer />
    </>
  );
};

export default Dashboard;
