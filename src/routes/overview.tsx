import CloseToDueDateChart from "../charts/CloseToDueDateChart";
import AverageAge from "../charts/average_age";
import BacklogStatus from "../charts/backlog_status";
import Burndown from "../charts/burndown";
import OverviewGraph from "../charts/overview";
import Resolution from "../charts/resolution_time";
import { GraphProps } from "../interfaces/route_props";
import { useProject } from "../providers/ProjectProvider";

const Box = (props: GraphProps) => {
  return (
    <>
      <div className="bg-secondary flex flex-col gap-4 flex-1">
        <p className="flex-1 self-center grow-0">{props.title}</p>
        <div className="flex-initial grow self-center w-full">
          {props.children}
        </div>
      </div>
    </>
  );
};

const Overview = () => {
  const { activeProjects } = useProject();
  let projects = Object.values(activeProjects)
    .flat()
    .filter((project) => project.checked);

  let issues = projects.map((project) => project.issues).flat();

  // TODO: Let user pick
  let date = new Date();
  let old_date = new Date();
  old_date.setMonth(old_date.getMonth() - 2);

  let daysThreshold = 5;

  return (
    <div className="gap-4 flex flex-col flex-1 justify-between">
      <div className="flex flex-row gap-4 flex-1">
        <Box title="Average Age">
          <AverageAge issues={issues} />
        </Box>
        <Box title="Average Completion Time">
          <Resolution issues={issues} startDate={old_date} endDate={date} />
        </Box>
        <Box title="Burndown">
          <Burndown
            numIssues={issues.length}
            startDate={old_date}
            endDate={date}
            issues={issues}
          />
        </Box>
      </div>
      <div className="flex flex-row gap-4 flex-1">
        <Box title="Backlog Status">
          <BacklogStatus issues={issues} startDate={old_date} />
        </Box>
        <Box title="Overview">
          <OverviewGraph issues={issues} />
          </Box>
        <Box title="Issues Close To Due Date">
          <CloseToDueDateChart
            issues={issues}
            daysThreshold={daysThreshold}
          />
        </Box>
      </div>
    </div>
  );
};

export default Overview;
