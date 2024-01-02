import 'chart.js/auto';
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  Colors,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { IUnifiedIssue } from "../interfaces/issues";
import { ChartProps } from "../interfaces/chart_props";

ChartJS.register(Colors, ArcElement, Legend, Tooltip);

export const options: ChartOptions = {
  scales: {
    y: {
      min: 0,
      beginAtZero: true,
    },
  },
};

/**
 * Process the issue data to create data for category overview as a pie chart.
 *
 * @param issues A list of issues.
 * @returns Overview chart data
 */
function create_overview_data(issues: IUnifiedIssue[]) {
  // @ts-ignore
  let grouped_by_category = Object.groupBy(issues, ({ category }) => category);

  for (const [key, value] of Object.entries(grouped_by_category)) {
    let issues = value as IUnifiedIssue[];
    grouped_by_category[key] = issues.length;
  }

  let labels = Object.keys(grouped_by_category);

  let overview_dataset = {
    label: "Average Age",
    data: Object.values(grouped_by_category),
  };

  let data = {
    labels,
    datasets: [overview_dataset],
    borderWidth: 1,
  };

  return data;
}

const OverviewGraph = (props: ChartProps) => {
  return <Pie data={create_overview_data(props.issues)} />;
};

export default OverviewGraph;
