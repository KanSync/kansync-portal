import EllipsisVertical from "../assets/ellipsis-vertical.svg";
import UserCircle from "../assets/user-circle.svg";
import Header from "../header";
import Overview from "../overview";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-secondary h-96">
      <div className="flex">
        <img src={UserCircle} className="w-16" alt="" />
        Guest
        <img src={EllipsisVertical} className="w-16" alt="" />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <button>Overview</button>
        <button>Kanban Board</button>
        <button>Generate Graphs</button>
      </div>
    </div>
  );
};

const KanbanPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row gap-4">
        <Sidebar />
        <Overview />
      </div>
    </>
  );
};

export default KanbanPage;
