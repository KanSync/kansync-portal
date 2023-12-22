import { ReactNode } from "react";
import { IUnifiedIssue } from "./issues";

export interface CardProps {
  issue: IUnifiedIssue;
  platform: string;
}

export interface GraphProps {
  issues: IUnifiedIssue[];
  title: string;
  graph: ReactNode
}