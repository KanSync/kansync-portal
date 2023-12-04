import { IUnifiedIssue } from "./issues";

export interface ChartProps {
  issues: IUnifiedIssue[];
}

export interface BurndownProps extends ChartProps {
  numIssues: number;
  endDate: Date;
  // startDate: Date;
}

export interface BacklogStatusProps extends ChartProps {
  startDate: Date;
}