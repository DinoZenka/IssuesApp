import { renderHook, waitFor, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIssues, useIssue, useUpdateIssue } from '../useIssues';
import { fetchIssues, fetchIssueById, updateIssue } from '@src/api/issues';
import { queryKeys } from '@src/api/queries';
import { Issue } from '@src/types/issue';
import { createMockIssue } from '@src/testing/factory';

// Mock the API functions
jest.mock('@src/api/issues');
jest.mock('@src/api/queries', () => ({
  queryKeys: {
    issues: ['issues'],
    issueDetails: (id: string) => ['issues', 'detail', id],
  },
}));

// Mock implementation for API functions
const mockFetchIssues = fetchIssues as jest.Mock;
const mockFetchIssueById = fetchIssueById as jest.Mock;
const mockUpdateIssue = updateIssue as jest.Mock;

describe('useIssues hooks', () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: Infinity },
        mutations: { retry: false },
      },
    });
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // Reset mocks before each test
    mockFetchIssues.mockClear();
    mockFetchIssueById.mockClear();
    mockUpdateIssue.mockClear();

    // Set default mock implementations
    mockFetchIssues.mockResolvedValue([]);
    mockFetchIssueById.mockResolvedValue(
      createMockIssue({
        id: '1',
        status: 'open',
      }),
    );
    mockUpdateIssue.mockResolvedValue(
      createMockIssue({
        id: '1',
        status: 'closed',
      }),
    );
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useIssues', () => {
    it('should fetch issues on mount', async () => {
      mockFetchIssues.mockResolvedValue([]);
      const { result } = renderHook(() => useIssues(), {
        wrapper: wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(mockFetchIssues).toHaveBeenCalledTimes(1);
        expect(result.current.data).toEqual([]);
      });
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Failed to fetch issues');
      mockFetchIssues.mockRejectedValue(error);
      const { result } = renderHook(() => useIssues(), {
        wrapper: wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useIssue', () => {
    it('should fetch issue by ID on mount when ID is provided', async () => {
      const issueId = '1';
      const mockIssue = createMockIssue({
        id: '1',
        status: 'open',
      });
      mockFetchIssueById.mockResolvedValue(mockIssue);

      const { result } = renderHook(() => useIssue(issueId), {
        wrapper: wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(mockFetchIssueById).toHaveBeenCalledWith(
          issueId,
          expect.any(AbortSignal),
        );
        expect(result.current.data).toEqual(mockIssue);
      });
    });

    it('should not fetch issue if ID is not provided', async () => {
      const { result } = renderHook(() => useIssue(''), {
        wrapper: wrapper,
      });

      await waitFor(() => {
        expect(mockFetchIssueById).not.toHaveBeenCalled();
        expect(result.current.data).toBeUndefined();
      });
    });

    it('should handle fetch errors for a specific issue', async () => {
      const issueId = '1';
      const error = new Error('Failed to fetch issue');
      mockFetchIssueById.mockRejectedValue(error);

      const { result } = renderHook(() => useIssue(issueId), {
        wrapper: wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(error);
      });
    });
  });

  describe('useUpdateIssue', () => {
    const issueId = '1';
    const mockIssue = createMockIssue({ id: issueId, status: 'open' });

    beforeEach(() => {
      queryClient.setQueryData(queryKeys.issues, [mockIssue]);
      queryClient.setQueryData(queryKeys.issueDetails(issueId), mockIssue);
    });

    it('should successfully update an issue', async () => {
      const { result } = renderHook(() => useUpdateIssue(), { wrapper });
      const updates = { status: 'closed' as const };
      mockUpdateIssue.mockResolvedValue({ ...mockIssue, ...updates });

      await act(async () => {
        await result.current.mutateAsync({ id: issueId, updates });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(mockUpdateIssue).toHaveBeenCalledWith(issueId, updates);
      });
    });

    it('should perform optimistic updates and cancel active queries', async () => {
      const cancelSpy = jest.spyOn(queryClient, 'cancelQueries');
      const updates = { status: 'closed' as const };

      // Return a promise that DOES resolve eventually, but we won't wait for it yet
      let resolveMutation: (value: any) => void;
      const mutationPromise = new Promise(resolve => {
        resolveMutation = resolve;
      });
      mockUpdateIssue.mockReturnValue(mutationPromise);

      const { result } = renderHook(() => useUpdateIssue(), { wrapper });

      // Trigger the mutation but DO NOT await it inside act
      // This allows the test execution to move to the next line while mutation is "loading"
      act(() => {
        result.current.mutate({ id: issueId, updates });
      });

      // Verify the optimistic state (while mutation is still pending)
      await waitFor(() => {
        expect(cancelSpy).toHaveBeenCalledWith({ queryKey: queryKeys.issues });
        expect(cancelSpy).toHaveBeenCalledWith({
          queryKey: queryKeys.issueDetails(issueId),
        });

        const optimisticIssue = queryClient.getQueryData<Issue>(
          queryKeys.issueDetails(issueId),
        );
        expect(optimisticIssue?.status).toBe('closed');
      });

      // Cleanup: Resolve the promise so the hook finishes its lifecycle
      await act(async () => {
        resolveMutation!({ ...mockIssue, ...updates });
      });
    });

    it('should rollback both list and details state on error', async () => {
      const error = new Error('Update failed');
      mockUpdateIssue.mockRejectedValue(error);
      const { result } = renderHook(() => useUpdateIssue(), { wrapper });

      await act(async () => {
        try {
          await result.current.mutateAsync({
            id: issueId,
            updates: { status: 'closed' },
          });
        } catch {}
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
      expect(queryClient.getQueryData(queryKeys.issues)).toEqual([mockIssue]);
      expect(queryClient.getQueryData(queryKeys.issueDetails(issueId))).toEqual(
        mockIssue,
      );
    });

    it('should invalidate queries on settlement', async () => {
      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');
      const { result } = renderHook(() => useUpdateIssue(), { wrapper });

      await act(async () => {
        await result.current.mutateAsync({
          id: issueId,
          updates: { status: 'closed' },
        });
      });

      await waitFor(() => {
        expect(invalidateSpy).toHaveBeenCalledWith({
          queryKey: queryKeys.issues,
        });
        expect(invalidateSpy).toHaveBeenCalledWith({
          queryKey: queryKeys.issueDetails(issueId),
        });
      });
    });

    it('should handle onMutate correctly even if query data is missing', async () => {
      queryClient.clear();
      const { result } = renderHook(() => useUpdateIssue(), { wrapper });

      await act(async () => {
        await result.current.mutateAsync({
          id: issueId,
          updates: { title: 'New' },
        });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });
  });
});
