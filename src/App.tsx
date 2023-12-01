import Overview from "./charts/overview";
import "./App.css";
import conv_to_unified from "./utils/parse";
import { tmp } from "./charts/tmp";

function App() {
  let parsed_data = conv_to_unified(tmp);
  return <Overview issues={parsed_data.issues} />;
}

export default App;
