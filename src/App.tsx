import Burndown from "./charts/burndown";
import "./App.css";
import conv_to_unified from "./utils/parse";
import { tmp } from "./charts/tmp";
import {
  showIssuesWithinDaysThreshold,
  showClosestDeadlines,
} from "./utils/dueDataFuntions";

function App() {
  let parsed_data = conv_to_unified(tmp);

  const issuesWithinDaysCount = showIssuesWithinDaysThreshold(
    parsed_data.issues,
    7,
  );

  const closestDeadlinesIssues = showClosestDeadlines(parsed_data.issues, 3);

  return (
    <>
      <Burndown
        issues={parsed_data.issues}
        numIssues={parsed_data.num}
        endDate={new Date()}
      />
      <p>{`Number of issues within 7 days: ${issuesWithinDaysCount}`}</p>
      <div>
        <p>Issues closest to their deadline:</p>
        <ul>
          {closestDeadlinesIssues.map((issue, index) => (
            <li
              key={index}
            >{`Issue: ${issue.title}, Due Date: ${issue.dueDate}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
