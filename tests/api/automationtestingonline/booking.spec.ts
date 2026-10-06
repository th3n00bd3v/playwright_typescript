import { test, expect } from '@playwright/test';

const baseURL = 'https://automationintesting.online/api';

test('Get room details', async ({ request }) => {
  const roomId = 1;

  const response = await request.get(`${baseURL}/room/${roomId}`);

  expect(response.status()).toBe(200);

  const responseData = await response.json();

  console.log(responseData);
});