import { IssuePriority, IssueStatus } from '@src/types/issue';

export const FILTER_VALUES: (IssueStatus | 'all')[] = ['all', 'closed', 'open'];

export const DETAILS_PRIORITIES: IssuePriority[] = ['low', 'medium', 'high'];
export const DETAILS_STATUSES: IssueStatus[] = ['closed', 'open'];
