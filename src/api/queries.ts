export const queryKeys = {
  issues: ['issues'] as const,
  issueDetails: (id: string) => ['issues', id] as const,
};
