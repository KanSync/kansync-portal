const Box = () => {
  return (
    <>
      <div className="bg-secondary w-60 h-60"></div>
    </>
  );
};

const Overview = () => {
  return (
    <div className="gap-4 flex flex-wrap">
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
};

export default Overview;
