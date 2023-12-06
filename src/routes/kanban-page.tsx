import { Link, Outlet } from "react-router-dom";
import EllipsisVertical from "../assets/ellipsis-vertical.svg";
import UserCircle from "../assets/user-circle.svg";
import Header from "../header";

const ShinyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-primary hover:bg-primary/60bg-text text-background p-4 rounded-full hover:bg-text/80 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out active:scale-75 w-full">
      {children}
    </button>
  );
};

const KanbanPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row gap-4 p-4 ">
        <div className="flex flex-col w-1/5 py-8 px-4 border rounded-lg">
          <div className="flex w-full justify-between items-center bg-background shadow-md p-4 rounded-full">
            <img src={UserCircle} className="w-8" alt="" />
            Guest
            <img src={EllipsisVertical} className="w-8" alt="" />
          </div>
          <div className="flex-1 flex flex-col gap-8 py-32">
            <Link to="/kanban/overview">
              <ShinyButton>Overview</ShinyButton>
            </Link>
            <Link to="/kanban/board">
              <ShinyButton>Kanban Board</ShinyButton>
            </Link>
            <Link to="/kanban/graphs">
              <ShinyButton>Generate Graphs</ShinyButton>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default KanbanPage;
