import { ReactNode } from "react";
import { IUnifiedIssue } from "./issues";

export interface CardProps {
  issue: IUnifiedIssue;
  platform: string;
}

export interface GraphProps {
  title: string;
  children: ReactNode
}