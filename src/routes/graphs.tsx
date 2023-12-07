import JuicyButton from "../juicybutton";

const Graphs = () => {
  return (
    <div className="bg-background flex-1 flex flex-col place-items-center justify-between">
      <div className="w-1/2 flex flex-col gap-3">
        <JuicyButton>Average Difficulty</JuicyButton>
        <JuicyButton>Average Completion Time</JuicyButton>
        <JuicyButton>Number Of Issues</JuicyButton>
        <JuicyButton>Recently Open Issues</JuicyButton>
        <JuicyButton>Recently Closed Issues</JuicyButton>
        <JuicyButton>Issues Close To Due Date</JuicyButton>
      </div>
      <JuicyButton className="bg-accent hover:bg-primary/60">
        Export as PNG
      </JuicyButton>
    </div>
  );
};

export default Graphs;
