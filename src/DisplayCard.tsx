interface DisplayCardProps {
  projectName: string;
}

const DisplayCard = ({ projectName}: DisplayCardProps) => {

    
return (
    <>
      <div className="bg-secondary flex flex-row justify-between px-8 center items-center ml-8 py-4">
      <p>Project Name: {projectName}</p>
      </div>
    </>
  );
};

export default DisplayCard;