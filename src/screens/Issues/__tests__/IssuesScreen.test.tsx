import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IssuesScreen from '../index';
import { useIssues } from '@src/hooks/useIssues';
import { createMockIssue } from '@src/testing/factory';
import { useDebounce } from '@src/hooks/useDebounce';

jest.mock('@src/hooks/useIssues');
jest.mock('@src/hooks/useDebounce');

const mockUseIssues = useIssues as jest.Mock;
const mockUseDebounce = useDebounce as jest.Mock;

describe('IssuesScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  const mockIssues = [
    createMockIssue({
      id: '1',
      title: 'Issue 1',
      status: 'open',
      priority: 'high',
    }),
    createMockIssue({
      id: '2',
      title: 'Issue 2',
      status: 'closed',
      priority: 'low',
    }),
    createMockIssue({
      id: '3',
      title: 'Third Issue',
      status: 'open',
      priority: 'medium',
    }),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDebounce.mockImplementation(v => v);
  });

  it('renders loading state correctly', () => {
    mockUseIssues.mockReturnValue({
      isLoading: true,
      data: undefined,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    const { queryByText } = render(
      <IssuesScreen navigation={mockNavigation} route={{} as any} />,
    );

    // In loading state, "Issues" title should NOT be there.
    expect(queryByText('Issues')).toBeNull();
  });

  it('renders issues correctly', async () => {
    mockUseIssues.mockReturnValue({
      isLoading: false,
      data: mockIssues,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    const { getByText, getByTestId } = render(
      <IssuesScreen navigation={mockNavigation} route={{} as any} />,
    );

    expect(getByTestId('header-title')).toBeTruthy();
    expect(getByText('3')).toBeTruthy(); // Total count

    // Check if issues are rendered
    expect(getByText('Issue 1')).toBeTruthy();
    expect(getByText('Issue 2')).toBeTruthy();
    expect(getByText('Third Issue')).toBeTruthy();
  });

  it('filters issues by status', async () => {
    mockUseIssues.mockReturnValue({
      isLoading: false,
      data: mockIssues,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    const { getByText, queryByText, getByLabelText } = render(
      <IssuesScreen navigation={mockNavigation} route={{} as any} />,
    );

    // Initial state: All issues
    expect(getByText('Issue 1')).toBeTruthy();
    expect(getByText('Issue 2')).toBeTruthy();

    // Filter by Closed
    fireEvent.press(getByLabelText('Filter issues by Closed'));
    expect(queryByText('Issue 1')).toBeNull();
    expect(getByText('Issue 2')).toBeTruthy();

    // Filter by Open
    fireEvent.press(getByLabelText('Filter issues by Open'));
    expect(getByText('Issue 1')).toBeTruthy();
    expect(queryByText('Issue 2')).toBeNull();
  });

  it('searches issues by title', async () => {
    mockUseIssues.mockReturnValue({
      isLoading: false,
      data: mockIssues,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <IssuesScreen navigation={mockNavigation} route={{} as any} />,
    );

    const searchInput = getByPlaceholderText('Search for');
    fireEvent.changeText(searchInput, 'Third');

    expect(getByText('Third Issue')).toBeTruthy();
    expect(queryByText('Issue 1')).toBeNull();
    expect(queryByText('Issue 2')).toBeNull();
  });

  it('navigates to issue details on press', () => {
    mockUseIssues.mockReturnValue({
      isLoading: false,
      data: mockIssues,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    const { getByLabelText } = render(
      <IssuesScreen navigation={mockNavigation} route={{} as any} />,
    );

    // Find first issue by its accessibility label
    const firstIssue = getByLabelText(/Issue: Issue 1/);
    fireEvent.press(firstIssue);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('IssueDetails', {
      ID: '1',
    });
  });

  it('shows error message when no search results found', () => {
    mockUseIssues.mockReturnValue({
      isLoading: false,
      data: mockIssues,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    const { getByPlaceholderText, getByText } = render(
      <IssuesScreen navigation={mockNavigation} route={{} as any} />,
    );

    const searchInput = getByPlaceholderText('Search for');
    fireEvent.changeText(searchInput, 'Non-existent issue');

    expect(getByText('An error occured while searching')).toBeTruthy();
  });
});
