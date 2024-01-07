import { IIssueResponse, IUnifiedIssue } from "../interfaces/issues";

function toUnified(issue: any): IUnifiedIssue {
  let unifiedIssue: IUnifiedIssue = {
    title: issue.title,
    assignees: issue.assignees,
    author: issue.author,
    body: issue.body,
    category: issue.category,
    statusChangeTime: new Date(issue.statusChangeTime),
    createdAt: new Date(issue.createdAt),
    comments: issue.comments,
    lastEditedAt: issue.lastEditedAt ? new Date(issue.lastEditedAt) : null,
    dueDate: issue.dueDate ? new Date(issue.dueDate) : undefined,
    labels: issue.labels,
  };
  return unifiedIssue;
}

export function conv_to_unified(issues: any[]): IUnifiedIssue[] {
  return issues.map((issue) => toUnified(issue))
}

export default function conv_response_to_unified(response: IIssueResponse): {
  num: number;
  issues: IUnifiedIssue[];
} {
  return {
    num: response.num,
    issues: conv_to_unified(response.issues),
  };
}
