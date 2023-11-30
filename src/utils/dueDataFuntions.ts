import { IUnifiedIssue } from "../interfaces/issues";

/*
takes a list of unified issues and number of days to consider for the deadline.
retrun a number of issues with a deadline within the specified days.
*/
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

  console.log(
    `Number of issues with a deadline within ${daysThreshold} days: ${filteredIssues.length}`,
  );

  return filteredIssues.length;
}

/*
takes a List of unified issues and number of issues to include in the list.
retrun a list of issues closest to their deadline.
*/
export function showClosestDeadlines(
  issues: IUnifiedIssue[],
  numIssuesToShow: number,
): IUnifiedIssue[] {
  const currentDate = new Date();

  const sortedIssues = issues
    .filter(
      (issue) =>
        issue.dueDate && issue.dueDate.getTime() >= currentDate.getTime(),
    )
    .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime())
    .slice(0, numIssuesToShow);

  console.log(`Issues closest to their deadline:`);
  sortedIssues.forEach((issue) => {
    console.log(`Issue: ${issue.title}, Due Date: ${issue.dueDate}`);
  });
  return sortedIssues;
}
