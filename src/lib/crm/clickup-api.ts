/**
 * Utility functions for interacting with ClickUp API
 */

// Constants
const CLICKUP_API_URL = "https://api.clickup.com/api/v2";

/**
 * Make authenticated request to ClickUp API
 */
export async function clickupRequest(
  endpoint: string,
  options: RequestInit = {},
) {
  const url = `${CLICKUP_API_URL}${endpoint}`;

  const headers = {
    Authorization: `${process.env.CLICKUP_API_KEY}`,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ClickUp API error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ClickUp request to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get task from ClickUp by ID
 */
export async function getTask(taskId: string) {
  return await clickupRequest(`/task/${taskId}`);
}

/**
 * Create task in ClickUp
 */
export async function createTask(listId: string, taskData: any) {
  return await clickupRequest(`/list/${listId}/task`, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

/**
 * Update task in ClickUp
 */
export async function updateTask(taskId: string, taskData: any) {
  return await clickupRequest(`/task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

/**
 * Search tasks in ClickUp
 */
export async function searchTasks(
  listId: string,
  queryParams: URLSearchParams,
) {
  return await clickupRequest(`/list/${listId}/task?${queryParams}`);
}

/**
 * Add comment to task in ClickUp
 */
export async function addComment(taskId: string, comment: string) {
  return await clickupRequest(`/task/${taskId}/comment`, {
    method: "POST",
    body: JSON.stringify({
      comment_text: comment,
    }),
  });
}

/**
 * Update custom fields for a task
 */
export async function updateCustomFields(
  taskId: string,
  customFields: Array<{ id: string; value: any }>,
) {
  return await clickupRequest(`/task/${taskId}/field`, {
    method: "POST",
    body: JSON.stringify({
      fields: customFields,
    }),
  });
}
