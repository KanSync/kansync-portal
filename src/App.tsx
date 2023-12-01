import "./App.css";
import conv_to_unified from "./utils/parse";
import { tmp } from "./charts/tmp";
import BacklogStatus from "./charts/backlog_status";

function App() {
  let parsed_data = conv_to_unified(tmp);
  return (
    <BacklogStatus
      issues={parsed_data.issues}
      startDate={new Date("2023-11-14")}
    />
  );
}

export default App;
