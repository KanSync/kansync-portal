import AverageAge from "./charts/average_age";
import "./App.css";
import conv_to_unified from "./utils/parse";
import { tmp } from "./charts/tmp";

function App() {
  let parsed_data = conv_to_unified(tmp);
  return <AverageAge issues={parsed_data.issues} />;
}

export default App;
