import Avatar, { genConfig } from "react-nice-avatar";
import { tmp } from "../charts/tmp";
import conv_to_unified from "../utils/parse";
import { CardProps } from "../interfaces/route_props";

const MiniBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={"bg-secondary py-1 px-3 " + className}>{children}</p>;
};

const Card = (props: CardProps) => {
  const config = genConfig();

  return (
    <div className="flex flex-col items-start w-80 h-64 p-4 m-8 border rounded shadow">
      <p className="text-clip flex-1">{props.issue.title}</p>
      <p className="text-clip flex-1">{props.issue.body}</p>
      <div className="flex flex-row gap-4">
        {props.issue.labels.map((label) => (
          <MiniBox className="bg-text text-background">{label}</MiniBox>
        ))}
      </div>
      <p>{props.issue.createdAt.toLocaleString()}</p>
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl font-bold text-text/10">Github</h2>
        <div className="flex flex-row gap-4">
          {props.issue.assignees.map((_assignee) => (
            <Avatar className="w-8 h-8" {...config} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Board = () => {
  const test_data = conv_to_unified(tmp);
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
        {test_data.issues.map((issue) => (
          <Card issue={issue}></Card>
        ))}
      </div>
    </div>
  );
};

export default Board;
