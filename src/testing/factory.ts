import { Issue, IssueStatus } from '@src/types/issue';

export const createMockIssue = (overrides?: Partial<Issue>): Issue => ({
  id: 'default-id',
  title: 'Default Title',
  description: 'Default Description',
  status: 'closed',
  priority: 'medium',
  updatedAt: new Date().toISOString(),
  ...overrides,
});
