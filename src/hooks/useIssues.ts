import { useQuery } from '@tanstack/react-query';
import { fetchIssues, fetchIssueById } from '@src/api/issues';
import { queryKeys } from '@src/api/queries';

export const useIssues = () => {
  return useQuery({
    queryKey: queryKeys.issues,
    queryFn: fetchIssues,
  });
};

export const useIssue = (id: string) => {
  return useQuery({
    queryKey: queryKeys.issueDetails(id),
    queryFn: () => fetchIssueById(id),
    enabled: !!id,
  });
};
