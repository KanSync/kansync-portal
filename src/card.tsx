import {useCallback, useState, useEffect} from "react";
import PlusCircle from "./assets/plus-circle.svg";
import { useProject } from "./providers/ProjectProvider";
import DisplayCard from "./DisplayCard";
import { DefaultInput} from "./DefaultInput";




const AddCard = ({ title }: { title: string }) => {
  const [receivedValue, setReceivedValue] = useState<string>("");

  // Function to receive data from the child component
  const handleChildValueChange = (value: string) => {   
    setReceivedValue(value);
  };

  const addProject = useProject().addProject;
 
 
  
  const handleClick = useCallback(() => {
    
    addProject({
      name: receivedValue,//"test",
      platform: title,
    });
  }, [addProject]);

  return (
    <div className="bg-secondary flex flex-row justify-between px-8 center items-center ml-8 py-4">
      <div className="flex flex-row items-center gap-8">
        <DefaultInput placeholder="Enter name of repository" onChildValueChange={handleChildValueChange}/>
        <a className="hover:bg-accent" onClick={handleClick}>
          <img src={PlusCircle} className="w-16" />
        </a>
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
    <div className="flex gap-8 flex-col">
      <div className="bg-secondary flex flex-row justify-between px-8 center items-center">
        {title}
        <div className="flex flex-row items-center gap-8">
          Add new repository
          <a className="hover:bg-accent" onClick={handleClick}>
            <img src={PlusCircle} className="w-16" />
          </a>
        </div>
      </div>
      {isAddNewProjectCardVisible && <AddCard title={title}/>}
      {activeProjects.map((project) => ( 
      title == project.platform && <DisplayCard projectName={project.name}/>
      ))}
    </div>
  );
};

export default Card;
