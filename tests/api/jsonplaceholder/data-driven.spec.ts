import { test, expect } from '@playwright/test';
import { credentials, statusCodes } from '../../../test-data/api-testdata';

const userIds = [1, 2, 3];

for (const userId of userIds) {
  test(`GET user by ID - ${userId}`, async ({ request }) => {
    const response = await request.get(
        `${credentials.baseUrlJsonPlaceholder}/users/${userId}`
    )

    expect(response.status()).toBe(statusCodes.ok);

    const responseBody = await response.json();
    expect(responseBody.id).toBe(userId);

  });

  test(`GET posts filtered by userId - ${userId}`, async ({ request }) => {
    const response = await request.get(
        `${credentials.baseUrlJsonPlaceholder}/posts`, { params: { userId, _limit: 5 } }
    )
    
    expect(response.status()).toBe(statusCodes.ok);

    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody).toHaveLength(5);

    for (const post of responseBody) {
      expect(post.userId).toBe(userId);
    }
    
  });

}