import { IUnifiedIssue } from "./issues";

export interface ChartProps {
  issues: IUnifiedIssue[];
}

export interface BurndownProps extends ChartProps {
  numIssues: number;
  startDate: Date;
  endDate: Date;
}

export interface ResolutionProps extends ChartProps {
  startDate: Date;
  endDate: Date;
}

export interface BacklogStatusProps extends ChartProps {
  startDate: Date;
}

export interface CloseToDueDateChartProps extends ChartProps {
  daysThreshold: number;
}