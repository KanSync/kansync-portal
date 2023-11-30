import { useCallback, useState, ChangeEvent } from "react";
import PlusCircle from "./assets/plus-circle.svg";
import { useProject } from "./providers/ProjectProvider";



interface DefaultInputProps {
  placeholder?: string;
  onChildValueChange: (value: string) => void; // Function prop to send data to the parent
}

const DefaultInput = ({ placeholder, onChildValueChange }: DefaultInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChildValueChange(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
      />
    </>
  );
};

const AddCard: React.FC = () => {
  const [receivedValue, setReceivedValue] = useState<string>("");

  // Function to receive data from the child component
  const handleChildValueChange = (value: string) => {   
    setReceivedValue(value);
  };


  const addProject = useProject().addProject;

  const handleClick = useCallback(() => {
    addProject({
      name: receivedValue//"test",
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
      {isAddNewProjectCardVisible && <AddCard />}
    </div>
  );
};

export default Card;
