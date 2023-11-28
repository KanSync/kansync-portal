import Burndown from "./charts/burndown";
import "./App.css";
import conv_to_unified from "./utils/parse";
import { tmp } from "./charts/tmp";

function App() {
  let parsed_data = conv_to_unified(tmp)
  return (
    <Burndown
      issues={parsed_data.issues}
      numIssues={parsed_data.num}
      endDate={new Date()}
    />
  );
}

export default App;
