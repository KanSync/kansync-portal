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
  ChartDataset,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { IUnifiedIssue } from "../interfaces/issues";
import { BurndownProps } from "../interfaces/chart_props";
import { time_diff, CATEGORY_DONE, DAY_IN_MS, count } from "./common";

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
  maintainAspectRatio: false,
};

/**
 * Create data necessary for creating ideal burndown.
 *
 * @param num_issues The number of issues
 * @param period The length of the project (start to stop)
 *
 * @returns Ideal burndown data.
 */
function create_ideal(num_issues: number, period: number): ChartDataset {
  let result = [];

  let tasks_per_day = num_issues / (period - 1);
  for (let index = 0; index < period; index++) {
    result.push(num_issues - tasks_per_day * index);
  }

  return {
    type: "line" as const,
    label: "Ideal Burndown",
    borderColor: "rgb(255, 99, 132)",
    borderWidth: 2,
    fill: false,
    data: result,
  };
}

/**
 * Create data necessary for creating actual burndown.
 *
 * @param num_issues Number of issues
 * @param start The starting date for the project
 * @param stop The planned stop date for the project
 * @param doneDates A list of finish dates
 *
 * @returns Data required to create a burndown chart
 */
function create_actual(
  num_issues: number,
  start: Date,
  stop: Date,
  doneDates: Date[],
): ChartDataset {
  let count_done = count(doneDates);

  let result = [];
  let acc_done = 0;

  // For all dates in the range start to stop
  for (let date = start.getTime(); date < stop.getTime(); date += DAY_IN_MS) {
    // @ts-ignore
    acc_done += count_done[new Date(date).toLocaleDateString()] || 0;
    result.push(num_issues - acc_done);
  }

  return {
    type: "line" as const,
    label: "Actual Burndown",
    borderColor: "rgb(6, 99, 132)",
    borderWidth: 2,
    fill: false,
    data: result,
  };
}

/**
 * Process the issue data to create data for ideal and actual burndown.
 *
 * @param num_issues Number of issues
 * @param start Chosen start date
 * @param stop Planned finish date
 * @param issues A list of issues
 *
 * @returns Ideal and actual burndown chart data
 */
function create_burndown_data(
  num_issues: number,
  start: Date,
  stop: Date,
  issues: IUnifiedIssue[],
): ChartData {
  stop.setHours(0, 0, 0, 0); // We do not care about hh:mm:ss
  start.setHours(0, 0, 0, 0);

  let done_dates: string[] = [];

  issues.forEach((issue) => {
    // Might not work with all agile tools
    if (issue.category === CATEGORY_DONE) {
      let done_date = issue.statusChangeTime;
      done_date.setHours(0, 0, 0, 0);
      done_dates.push(done_date.toLocaleDateString());
    }
  });

  done_dates.sort().reverse();

  let period = time_diff(start, stop);

  let labels = [...Array(Math.round(period)).keys()];

  let data = {
    labels,
    datasets: [
      create_ideal(num_issues, period),
      create_actual(num_issues, start, stop, done_dates),
    ],
  };

  return data;
}

const Burndown = (props: BurndownProps) => {
  const chartRef = useRef<ChartJS>(null);

  return (
    <Chart
      ref={chartRef}
      type="bar"
      options={options}
      data={create_burndown_data(
        props.numIssues,
        props.startDate,
        props.endDate,
        props.issues,
      )}
      width={"100%"}
    />
  );
};

export default Burndown;
