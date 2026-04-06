import { Issue, IssuePriority, IssueStatus } from '@src/types/issue';

export const FILTER_VALUES: (IssueStatus | 'all')[] = ['all', 'closed', 'open'];

export const DETAILS_PRIORITIES: IssuePriority[] = ['low', 'medium', 'high'];
export const DETAILS_STATUSES: IssueStatus[] = ['closed', 'open'];

export const SKELETON_ISSUES: Record<IssueStatus, number> = {
  closed: 20,
  open: 40,
};

export const SKELETON_ISSUES_LIST: Pick<Issue, 'status' | 'priority'>[] = [
  { status: 'open', priority: 'low' },
  { status: 'closed', priority: 'high' },
  { status: 'closed', priority: 'medium' },
  { status: 'open', priority: 'low' },
];
