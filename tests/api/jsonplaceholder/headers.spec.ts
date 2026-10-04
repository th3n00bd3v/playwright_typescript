import { test, expect } from '@playwright/test';
import { credentials, statusCodes } from '../../../test-data/api-testdata';

test('POST request with header', async ({ request }) => {

    const requestData = {
        title: 'API testing using Playwright',
        body: 'Learning API testing concepts using Playwright, currently learning POST request',
        userId: credentials.userIdJsonPlaceholder 
    }

  const response = await request.post(
    `${credentials.baseUrlJsonPlaceholder}/posts`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: requestData
    }
  );

  // expect response code status
  expect(response.status()).toBe(statusCodes.resourceCreated);

  // expect response data to equal request data from above
  const responseData = await response.json();
  expect(responseData.title).toBe(requestData.title);
  expect(responseData.body).toBe(requestData.body);
  expect(responseData.userId).toBe(requestData.userId);
  
  //verify server created unique ID for the resource
  expect(responseData.id).toBeDefined();
  
  expect(response.headers()['content-type']).toContain('application/json');
});
