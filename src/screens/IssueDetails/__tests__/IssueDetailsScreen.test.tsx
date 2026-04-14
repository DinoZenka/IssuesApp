import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IssueDetailsScreen from '../index';
import { useIssue, useUpdateIssue } from '@src/hooks/useIssues';
import { createMockIssue } from '@src/testing/factory';

jest.mock('@src/hooks/useIssues');
jest.mock('@src/hooks/useDebounce');

const mockUseIssue = useIssue as jest.Mock;
const mockUseUpdateIssue = useUpdateIssue as jest.Mock;

describe('IssueDetailsScreen', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  } as any;

  const mockRoute = {
    params: { ID: '1' },
  } as any;

  const mockIssue = createMockIssue({
    id: '1',
    title: 'Test Issue',
    description: 'Test Description',
    status: 'open',
    priority: 'high',
    updatedAt: new Date().toISOString(),
  });

  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUpdateIssue.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('renders loading state correctly', () => {
    mockUseIssue.mockReturnValue({
      isLoading: true,
      data: undefined,
      isError: false,
      isFetching: false,
      isPending: true,
      refetch: jest.fn(),
    });

    const { queryByText } = render(
      <IssueDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Title should not be visible during loading
    expect(queryByText('Test Issue')).toBeNull();
  });

  it('renders issue details correctly', () => {
    mockUseIssue.mockReturnValue({
      isLoading: false,
      data: mockIssue,
      isError: false,
      isFetching: false,
      isPending: false,
      refetch: jest.fn(),
    });

    const { getByText } = render(
      <IssueDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(getByText('Test Issue')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
  });

  it('handles go back', () => {
    mockUseIssue.mockReturnValue({
      isLoading: false,
      data: mockIssue,
      isError: false,
      isFetching: false,
      isPending: false,
      refetch: jest.fn(),
    });

    const { getByText } = render(
      <IssueDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    fireEvent.press(getByText('Go Back'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('updates priority and enables save button', async () => {
    mockUseIssue.mockReturnValue({
      isLoading: false,
      data: mockIssue,
      isError: false,
      isFetching: false,
      isPending: false,
      refetch: jest.fn(),
    });

    const { getByText, getByLabelText } = render(
      <IssueDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Change priority to Medium
    fireEvent.press(getByLabelText('medium'));

    // Now save should be enabled and clickable
    fireEvent.press(getByText('Save'));

    expect(mockMutate).toHaveBeenCalledWith({
      id: '1',
      updates: expect.objectContaining({
        priority: 'medium',
        status: 'open',
      }),
    });
  });

  it('updates status and enables save button', async () => {
    mockUseIssue.mockReturnValue({
      isLoading: false,
      data: mockIssue,
      isError: false,
      isFetching: false,
      isPending: false,
      refetch: jest.fn(),
    });

    const { getByText, getByLabelText } = render(
      <IssueDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    fireEvent.press(getByLabelText('closed'));

    fireEvent.press(getByText('Save'));

    expect(mockMutate).toHaveBeenCalledWith({
      id: '1',
      updates: expect.objectContaining({
        priority: 'high',
        status: 'closed',
      }),
    });
  });

  it('renders error state correctly', () => {
    mockUseIssue.mockReturnValue({
      isLoading: false,
      data: undefined,
      isError: true,
      isFetching: false,
      isPending: false,
      refetch: jest.fn(),
    });

    const { getByText } = render(
      <IssueDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(getByText('Failed to load issue details.')).toBeTruthy();
  });
});
