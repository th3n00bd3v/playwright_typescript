import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';
const userIds = [1, 2, 3];

const statusCodes = {
    ok: 200,
    notFound: 404,
    serverError: 500,
    resourceCreated: 201,
  }

for (const userId of userIds) {
  test(`GET user by ID - ${userId}`, async ({ request }) => {
    const response = await request.get(
        `${baseUrl}/users/${userId}`
    )

    expect(response.status()).toBe(statusCodes.ok);

    const response_body = await response.json();
    expect(response_body.id).toBe(userId);

  });
}