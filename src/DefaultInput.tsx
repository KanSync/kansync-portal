import {useState, ChangeEvent} from "react";

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

  export { DefaultInput};
  
