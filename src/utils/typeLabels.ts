import { IssuePriority, IssueStatus } from '@src/types/issue';

export const issueStatusLabel: Record<IssueStatus, string> = {
  open: 'Open',
  closed: 'Closed',
};
export const issuePriorityLabel: Record<IssuePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const issueFilterLaber: Record<IssueStatus | 'all', string> = {
  ...issueStatusLabel,
  all: 'All',
};
