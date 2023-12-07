const Box = ({ title }: { title: string }) => {
  return (
    <>
      <div className="bg-secondary flex-1 flex place-content-center">
        {title}
      </div>
    </>
  );
};

const Overview = () => {
  return (
    <div className="gap-4 flex flex-col flex-1 justify-between">
      <div className="flex flex-row gap-4 flex-1">
        <Box title="Average Difficulty" />
        <Box title="Average completion time" />
        <Box title="Number of issues by project" />
      </div>
      <div className="flex flex-row gap-4 flex-1">
        <Box title="Recently open issues" />
        <Box title="Recently closed issues" />
        <Box title="Issues close to due date" />
      </div>
    </div>
  );
};

export default Overview;
