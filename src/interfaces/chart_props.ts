import { IUnifiedIssue } from "./issues";

export interface BurndownProps {
  numIssues: number;
  issues: IUnifiedIssue[];
  endDate: Date;
  // startDate: Date;
}

export interface AverageAgeProps {
  issues: IUnifiedIssue[];
}
