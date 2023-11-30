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
    lastEditedAt: new Date(issue.lastEditedAt),
    projectID: issue.projectID,
    dueDate: issue.dueDate ? new Date(issue.dueDate) : undefined,
    labels: issue.labels,
  };
  return unifiedIssue;
}

export default function conv_to_unified(response: IIssueResponse): {
  num: number;
  issues: IUnifiedIssue[];
} {
  return {
    num: response.num,
    issues: response.issues.map((issue) => toUnified(issue)),
  };
}
