import { useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { IUnifiedIssue } from "../interfaces/issues";
import { ResolutionProps } from "../interfaces/chart_props";
import { time_diff, CATEGORY_DONE, DAY_IN_MS, sum } from "./common";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

export const options: ChartOptions = {
  scales: {
    y: {
      min: 0,
      beginAtZero: true,
    },
  },
};

/**
 * Process issue data to create resolution time for issues graph.
 *
 * @param start Start date for the graph
 * @param stop End date for the graph
 * @param issues A list of issues
 * @returns Resolution time graph data
 */
function create_resolution_data(
  start: Date,
  stop: Date,
  issues: IUnifiedIssue[],
): ChartData {
  start.setHours(0, 0, 0, 0);
  stop.setHours(0, 0, 0, 0);

  // @ts-ignore
  let grouped_by_category = Object.groupBy(
    issues,
    ({ category }: IUnifiedIssue) => category,
  );

  // @ts-ignore
  let grouped_by_doneDate = Object.groupBy(
    grouped_by_category[CATEGORY_DONE],
    ({ statusChangeTime }: IUnifiedIssue) => {
      let date = structuredClone(statusChangeTime);
      date.setHours(0, 0, 0, 0);
      return date;
    },
  );

  // Save the resolution times for all finished issues
  for (let date in grouped_by_doneDate) {
    grouped_by_doneDate[date] = grouped_by_doneDate[date].map(
      ({ statusChangeTime, createdAt }: IUnifiedIssue) => {
        let creation_date = createdAt;

        let done_date = statusChangeTime;

        return time_diff(creation_date, done_date);
      },
    );
  }

  let labels = [];
  let size = 0;
  let resolution_times: number[] = [];

  // Calculate the average at every time step
  for (let date = start.getTime(); date <= stop.getTime(); date += DAY_IN_MS) {
    let new_date = new Date(date);

    // @ts-ignore
    let previous_avg = resolution_times.at(-1) || 0;

    labels.push(new_date.toLocaleDateString());

    if (!grouped_by_doneDate[new_date]) {
      resolution_times.push(previous_avg);
    } else {
      let new_values = sum(grouped_by_doneDate[new_date]);
      let num_values = grouped_by_doneDate[new_date].length;
      let new_size = size + num_values;
      let new_average = (previous_avg * size + new_values) / new_size;
      resolution_times.push(new_average);
      size += 1;
    }
  }

  let dataset = {
    type: "line" as const,
    label: "Average Resolution Time",
    borderColor: "rgb(6, 99, 132)",
    borderWidth: 2,
    fill: false,
    data: resolution_times,
  };

  let data = {
    labels,
    datasets: [dataset],
  };

  return data;
}

const Resolution = (props: ResolutionProps) => {
  const chartRef = useRef<ChartJS>(null);

  return (
    <Chart
      ref={chartRef}
      type="line"
      options={options}
      data={create_resolution_data(
        props.startDate,
        props.endDate,
        props.issues,
      )}
      width={"100%"}
    />
  );
};

export default Resolution;
