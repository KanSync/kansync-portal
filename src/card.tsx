import { useCallback, useState } from "react";
import PlusCircle from "./assets/plus-circle.svg";
import { useProject } from "./providers/ProjectProvider";
import DisplayCard from "./DisplayCard";
import { DefaultInput } from "./DefaultInput";

const AddCard = ({ title }: { title: string }) => {
  const [receivedValue, setReceivedValue] = useState<string>("");

  const handleChildValueChange = (value: string) => {
    setReceivedValue(value);
  };

  const addProject = useProject().addProject;

  const handleClick = useCallback(() => {
    addProject({
      name: receivedValue,
      platform: title,
    });
  }, [addProject, receivedValue, title]);

  return (
    <div className="bg-secondary flex flex-row justify-between px-8 center items-center ml-8 py-4">
      <div className="flex flex-row items-center gap-8">
        <DefaultInput
          placeholder="Enter name of repository"
          onChildValueChange={handleChildValueChange}
        />
        <button className="hover:bg-accent" onClick={handleClick}>
          <img src={PlusCircle} className="w-16" alt="" />
        </button>
      </div>
    </div>
  );
};

const Card = ({ title }: { title: string }) => {
  const activeProjects = useProject().activeProjects;
  const [isAddNewProjectCardVisible, setIsAddNewProjectCardVisible] =
    useState(false); // TODO: set this to false
  const handleClick = useCallback(() => {
    setIsAddNewProjectCardVisible(true);
  }, []);

  return (
    <div className="flex gap-8 flex-col w-1/2">
      <div className="bg-secondary flex flex-row justify-between px-8 center items-center">
        {title}
        <div className="flex flex-row items-center gap-8">
          Add new repository
          <button className="hover:bg-accent" onClick={handleClick}>
            <img src={PlusCircle} className="w-16" alt="" />
          </button>
        </div>
      </div>
      {isAddNewProjectCardVisible && <AddCard title={title} />}
    
    </div>
  );
};

export default Card;
