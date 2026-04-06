import { Issue } from '@src/types/issue';

const API_BASE_URL = 'http://192.168.0.1/api'; // Mock URL for MSW

export const fetchIssues = async (signal?: AbortSignal): Promise<Issue[]> => {
  const response = await fetch(`${API_BASE_URL}/issues`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  return response.json();
};

export const fetchIssueById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Issue> => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch issue');
  }
  return response.json();
};

export const updateIssue = async (
  id: string,
  updates: Partial<Issue>,
): Promise<Issue> => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update issue');
  }
  return response.json();
};
