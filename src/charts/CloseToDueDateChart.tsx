import { useRef } from "react";
import 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { IUnifiedIssue } from "../interfaces/issues";
import { CloseToDueDateChartProps } from "../interfaces/chart_props";

ChartJS.register(CategoryScale, BarElement, LinearScale, Legend, Tooltip);

export const options: ChartOptions = {
  scales: {
    y: {
      min: 0,
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

export function showIssuesWithinDaysThreshold(
  issues: IUnifiedIssue[],
  daysThreshold: number,
): number {
  const currentDate = new Date();

  const filteredIssues = issues.filter((issue) => {
    if (issue.dueDate) {
      const timeDifference = issue.dueDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      return daysDifference <= daysThreshold;
    }
    return false;
  });

  return filteredIssues.length;
}

function createCloseToDueChartData(
  issues: IUnifiedIssue[],
  daysThreshold: number,
): ChartData {
  let groupedByCategory = Object.groupBy(issues, (issue) => issue.category);

  const closeToDueData = {};

  for (const [category, issuesInCategory] of Object.entries(
    groupedByCategory,
  )) {
    closeToDueData[category] = showIssuesWithinDaysThreshold(
      issuesInCategory,
      daysThreshold,
    );
  }

  const labels = Object.keys(closeToDueData);

  const dueDateDataset = {
    type: "bar" as const,
    label: "Issues Close to Due Date",
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "rgb(255, 159, 64)",
    data: Object.values(closeToDueData),
  };

  return {
    labels,
    datasets: [dueDateDataset],
  };
}

const CloseToDueDateChart = ({
  issues,
  daysThreshold,
}: CloseToDueDateChartProps) => {
  const chartRef = useRef<ChartJS>(null);

  return (
    <Chart
      ref={chartRef}
      type="bar"
      options={options}
      data={createCloseToDueChartData(issues, daysThreshold)}
      width={"100%"}
    />
  );
};

export default CloseToDueDateChart;
