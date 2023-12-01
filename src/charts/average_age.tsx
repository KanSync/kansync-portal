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
import { ChartProps } from "../interfaces/chart_props";
import { CATEGORY_DONE, time_diff, sum } from "./common";

ChartJS.register(LinearScale, CategoryScale, BarElement, Legend, Tooltip);

export const options: ChartOptions = {
  scales: {
    y: {
      min: 0,
      beginAtZero: true,
    },
  },
};

/**
 * Process the issue data to create data for average age of each issue category.
 *
 * @param issues A list of issues.
 * @returns Average age chart data
 */
function create_average_age_data(issues: IUnifiedIssue[]): ChartData {
  // @ts-ignore
  let grouped_by_category = Object.groupBy(issues, ({ category }) => category);
  delete grouped_by_category[CATEGORY_DONE];

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const [key, value] of Object.entries(grouped_by_category)) {
    // @ts-ignore
    let ages = value.map((issue: IUnifiedIssue) =>
      time_diff(issue.createdAt, today)
    );
    grouped_by_category[key] = sum(ages) / ages.length;
  }

  let labels = Object.keys(grouped_by_category);

  let age_dataset = {
    type: "bar" as const,
    label: "Average Age",
    backgroundColor: "rgb(102, 153, 204)",
    borderColor: "rgb(6, 99, 132)",
    fill: false,
    data: grouped_by_category,
  };

  let data = {
    labels,
    datasets: [age_dataset],
  };

  return data;
}

const AverageAge = (props: ChartProps) => {
  const chartRef = useRef<ChartJS>(null);

  return (
    <Chart
      ref={chartRef}
      type="bar"
      options={options}
      data={create_average_age_data(props.issues)}
      width={"100%"}
    />
  );
};

export default AverageAge;
