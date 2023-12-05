import { useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { IUnifiedIssue } from "../interfaces/issues";
import { BacklogStatusProps } from "../interfaces/chart_props";
import { CATEGORY_DONE, DAY_IN_MS, count } from "./common";

ChartJS.register(LinearScale, CategoryScale, BarElement, Legend, Tooltip);

export const options: ChartOptions = {
  scales: {
    y: {
      stacked: true,
      min: 0,
      beginAtZero: true,
    },
    x: {
      stacked: true,
    },
  },
};

/**
 * Process the issue data to create data for created vs resolved.
 *
 * @param issues A list of issues
 * @param start Start date for the graph
 * @returns Average age chart data
 */
function create_backlog_status_data(
  issues: IUnifiedIssue[],
  start: Date
): ChartData {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  // @ts-ignore
  let grouped_by_category = Object.groupBy(issues, ({ category }) => category);

  let created = count(
    issues.map((issue: IUnifiedIssue) => {
      let date = issue.createdAt;
      date.setHours(0, 0, 0, 0);
      return date;
    })
  );

  let resolved = count(
    grouped_by_category[CATEGORY_DONE].map((issue: IUnifiedIssue) => {
      let date = issue.statusChangeTime;
      date.setHours(0, 0, 0, 0);
      return date;
    })
  );

  let labels = [];
  let resolved_data = [];
  let created_data = [];

  // For all dates in the range start to today
  for (let date = start.getTime(); date <= today.getTime(); date += DAY_IN_MS) {
    let new_date = new Date(date);
    labels.push(new_date.toLocaleDateString());

    // @ts-ignore
    resolved_data.push(resolved[new_date] || 0);

    // @ts-ignore
    created_data.push(created[new_date] || 0);
  }

  let resolved_dataset = {
    type: "bar" as const,
    label: "Resolved",
    backgroundColor: "#23DC74",
    borderColor: "#23DC74",
    fill: false,
    data: resolved_data,
  };

  let creation_dataset = {
    type: "bar" as const,
    label: "Created",
    backgroundColor: "#DC238B",
    borderColor: "#DC238B",
    fill: false,
    data: created_data,
  };

  let data = {
    labels,
    datasets: [creation_dataset, resolved_dataset],
  };

  return data;
}

const BacklogStatus = (props: BacklogStatusProps) => {
  const chartRef = useRef<ChartJS>(null);

  return (
    <Chart
      ref={chartRef}
      type="bar"
      options={options}
      data={create_backlog_status_data(props.issues, props.startDate)}
      width={"100%"}
    />
  );
};

export default BacklogStatus;
