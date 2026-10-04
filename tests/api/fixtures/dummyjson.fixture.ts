import {
  test as base,
  expect,
  APIRequestContext,
} from '@playwright/test';
import { credentials, statusCodes } from '../../../test-data/api-testdata';

export { credentials, statusCodes };

export const test = base.extend<{
  accessToken: string;
  authenticatedRequest: APIRequestContext;
}>({
  accessToken: async ({ request }, use) => {
    const loginResponse = await request.post(
      `${credentials.baseUrlDummyJson}/auth/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: credentials.username,
          password: credentials.password,
        },
      }
    );

    expect(loginResponse.status()).toBe(statusCodes.ok);

    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.accessToken;

    expect(accessToken).toBeDefined();

    await use(accessToken);
  },

  authenticatedRequest: async ({ playwright, accessToken }, use) => {
    const authenticatedRequest = await playwright.request.newContext({
      baseURL: credentials.baseUrlDummyJson,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
        
      },
    });

    await use(authenticatedRequest);

    await authenticatedRequest.dispose();
  },
});