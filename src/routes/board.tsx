import Avatar, { genConfig } from "react-nice-avatar";

const MiniBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={"bg-secondary py-1 px-3 " + className}>{children}</p>;
};

const DemoCard = () => {
  const config = genConfig();

  return (
    <div className="flex flex-col items-start w-80 h-64 p-4 m-8 border rounded shadow">
      <MiniBox>Low</MiniBox>
      <p className="text-clip flex-1">
        This is task description that will wrap autmatically into a new line
      </p>
      <div className="flex flex-row gap-4">
        <MiniBox className="bg-text text-background">Mobile</MiniBox>
        <MiniBox className="bg-text text-background">Web</MiniBox>
        <MiniBox className="bg-text text-background">Native</MiniBox>
      </div>
      <p>Mar 3, 2021</p>
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl font-bold text-text/10">Github</h2>
        <div className="flex flex-row gap-4">
          <Avatar className="w-8 h-8" {...config} />
          <Avatar className="w-8 h-8" {...config} />
        </div>
      </div>
    </div>
  );
};

const Board = () => {
  return (
    <div className="flex-1  bg-background shadow-lg">
      <div className="bg-primary flex flex-row p-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Board</h1>

        <input
          type="text"
          name="name"
          id="name"
          className="focus:ring-indigo-500 focus:border-accent shadow-sm sm:text-sm border-accent rounded-md p-1 outline-none"
          placeholder="Filter by"
        />
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
      </div>
    </div>
  );
};

export default Board;
