import { test, expect, request } from '@playwright/test';
import { credentials, statusCodes } from '../../../test-data/api-testdata';

  const requestData = {
    title: 'API testing using Playwright',
    body: 'Learning API testing concepts using Playwright, currently learning POST request',
    userId: credentials.userIdJsonPlaceholder
  }
  
test('GET returns successful response', async ({ request }) => {
  const response = await request.get(
    `${credentials.baseUrlJsonPlaceholder}/users/${credentials.userIdJsonPlaceholder}`
  );

  // verify response code status
  expect(response.status()).toBe(statusCodes.ok);

  
  // verify response body parameters
  const responseBody = await response.json();

  expect(responseBody.id).toBe(1);
  expect(responseBody.name).toBe('Leanne Graham');
  expect(responseBody.username).toBe('Bret');
  
  });

test('GET returns 404 for non-existing user', async ({ request }) => {
  const response = await request.get(
    `${credentials.baseUrlJsonPlaceholder}/users/99999`
  );

  expect(response.status()).toBe(statusCodes.notFound);
  const responseBody = await response.json();
  expect(responseBody).toEqual({});
});

test('GET returns 404 for invalid endpoint', async ({ request }) => {
  const response = await request.get(
    `${credentials.baseUrlJsonPlaceholder}/invalid-endpoint`
  );

  expect(response.status()).toBe(statusCodes.notFound);
  const responseBody = await response.json();
  expect(responseBody).toEqual({});
});

test('POST creates a new post', async ({ request }) => {
  const response = await request.post(
    `${credentials.baseUrlJsonPlaceholder}/posts`,
    {
      data: requestData
    }
  );

  // expect response code status
  expect(response.status()).toBe(statusCodes.resourceCreated);

  // expect response data to equal request data from above
  const responseData = await response.json();
  expect(responseData.title).toBe('API testing using Playwright');
  expect(responseData.body).toBe(
    'Learning API testing concepts using Playwright, currently learning POST request'
  );
  expect(responseData.userId).toBe(1);
  
  //verify server created unique ID for the resource
  expect(responseData.id).toBeDefined();
  
});

// Update resource object using PUT request
test('PUT updates an existing post', async ({ request }) => {
  const response = await request.put(
    `${credentials.baseUrlJsonPlaceholder}/posts/${credentials.userIdJsonPlaceholder}`,
    {
      data: {
        id: 1,
        title: 'API testing using Playwright',
        body: 'Learning API testing concepts using Playwright, currently learning PUT request',
        userId: credentials.userIdJsonPlaceholder,
      },
    }
  );

  expect(response.status()).toBe(statusCodes.ok);

  const responseData = await response.json();

  expect(responseData.title).toBe('API testing using Playwright');
  expect(responseData.body).toBe(
    'Learning API testing concepts using Playwright, currently learning PUT request'
  );
  expect(responseData.userId).toBe(credentials.userIdJsonPlaceholder);
  
  //verify server created unique ID for the resource
  expect(responseData.id).toBe(1);

});


test('PATCH updates an existing post', async ({ request }) => {
  const response = await request.patch(
    `${credentials.baseUrlJsonPlaceholder}/posts//${credentials.userIdJsonPlaceholder}`,
    {
      data: {
        title: 'API testing using Playwright - Updated',
      },
    }
  );

  expect(response.status()).toBe(statusCodes.ok);

  const responseData = await response.json();

  expect(responseData.title).toBe('API testing using Playwright - Updated');

});

test('DELETE removes existing post', async ({ request })=> {
  const response = await request.delete(
    `${credentials.baseUrlJsonPlaceholder}/posts//${credentials.userIdJsonPlaceholder}`,
  )

  expect(response.status()).toBe(statusCodes.ok);

});

test('GET user by ID', async ({ request }) => {
  const response = await request.get(
    `${credentials.baseUrlJsonPlaceholder}/users/${credentials.userIdJsonPlaceholder}`
  )

  expect(response.status()).toBe(statusCodes.ok);

  const responseBody = await response.json();

  expect(responseBody.id).toBe(credentials.userIdJsonPlaceholder);

});