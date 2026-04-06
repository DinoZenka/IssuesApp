import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchIssues, fetchIssueById, updateIssue } from '@src/api/issues';
import { queryKeys } from '@src/api/queries';
import { Issue } from '@src/types/issue';

export const useIssues = () => {
  return useQuery({
    queryKey: queryKeys.issues,
    queryFn: fetchIssues,
    staleTime: 0,
  });
};

export const useIssue = (id: string) => {
  return useQuery({
    queryKey: queryKeys.issueDetails(id),
    queryFn: () => fetchIssueById(id),
    enabled: !!id,
  });
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Issue> }) =>
      updateIssue(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.issues });
      await queryClient.cancelQueries({ queryKey: queryKeys.issueDetails(id) });

      const previousIssues = queryClient.getQueryData<Issue[]>(
        queryKeys.issues,
      );
      const previousIssue = queryClient.getQueryData<Issue>(
        queryKeys.issueDetails(id),
      );

      queryClient.setQueryData<Issue[]>(queryKeys.issues, old => {
        return old?.map(issue =>
          issue.id === id ? { ...issue, ...updates } : issue,
        );
      });

      queryClient.setQueryData<Issue>(queryKeys.issueDetails(id), old => {
        return old ? { ...old, ...updates } : undefined;
      });

      return { previousIssues, previousIssue };
    },
    onError: (err, variables, context) => {
      if (context?.previousIssues) {
        queryClient.setQueryData(queryKeys.issues, context.previousIssues);
      }
      if (context?.previousIssue) {
        queryClient.setQueryData(
          queryKeys.issueDetails(variables.id),
          context.previousIssue,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issues });
      queryClient.invalidateQueries({
        queryKey: queryKeys.issueDetails(variables.id),
      });
    },
  });
};
