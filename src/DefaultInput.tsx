import {useState, ChangeEvent} from "react";

interface DefaultInputProps {
    placeholder: string;
    id: string;
    onChildValueChange: (value: string) => void; // Function prop to send data to the parent
  }
  

const DefaultInput = ({ placeholder, id, onChildValueChange }: DefaultInputProps) => {
    const [inputValue, setInputValue] = useState<string>("");
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChildValueChange(e.target.value);
    };

    const placeholderText = (placeholder: string, id: string)=> {
      placeholder = placeholder+id;
      switch (placeholder) {
        case "Github1":
          return "Enter name of repository" 
        case "Github2":
            return "Enter owner of repository"
        case "Trello1":
          return "Enter board ID of repository" 
        case "Trello2":
          return "Enter owner of repository"
        case "Jira1":
          return "Enter domain of repository" 
        case "Jira2":
          return "Enter project key of repository"
    }
  }
  
    return (
      <>
        <input
          type="text"
          placeholder={placeholderText(placeholder, id)}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-3 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
        />
      </>
    );
  };

  export { DefaultInput};
  
