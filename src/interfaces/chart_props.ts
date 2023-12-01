import { IUnifiedIssue } from "./issues";

export interface BurndownProps extends ChartProps {
  numIssues: number;
  endDate: Date;
  // startDate: Date;
}

export interface ChartProps {
  issues: IUnifiedIssue[];
}
