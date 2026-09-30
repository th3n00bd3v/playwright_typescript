import { test, expect, request } from '@playwright/test';

 const statusCodes = {
    ok: 200,
    notFound: 404,
    serverError: 500,
    resourceCreated: 201,
  }

  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const userId = 1;

test('GET returns successful response', async ({ request }) => {
  const response = await request.get(
    `${baseUrl}/users/${userId}`
  );

  // verify response code status
  expect(response.status()).toBe(statusCodes.ok);

  
  // verify response body parameters
  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.name).toBe('Leanne Graham');
  expect(body.username).toBe('Bret');
  
  });

test('GET returns 404 for non-existing user', async ({ request }) => {
  const response = await request.get(
    `${baseUrl}/users/99999`
  );

  expect(response.status()).toBe(statusCodes.notFound);
  const body = await response.json();
  expect(body).toEqual({});
});

test('GET returns 404 for invalid endpoint', async ({ request }) => {
  const response = await request.get(
    `${baseUrl}/invalid-endpoint`
  );

  expect(response.status()).toBe(statusCodes.notFound);
  const body = await response.json();
  expect(body).toEqual({});
});

// create request object for sending POST reqest
test('POST creates a new post', async ({ request }) => {
  const response = await request.post(
    `${baseUrl}/posts`,
    {
      data: {
        title: 'API testing using Playwright',
        body: 'Learning API testing concepts using Playwright, currently learning POST request',
        userId: 1,
      },
    }
  );

  // expect response code status
  expect(response.status()).toBe(statusCodes.resourceCreated);

  // expect response data to equal request data from above
  const response_data = await response.json();
  expect(response_data.title).toBe('API testing using Playwright');
  expect(response_data.body).toBe(
    'Learning API testing concepts using Playwright, currently learning POST request'
  );
  expect(response_data.userId).toBe(1);
  
  //verify server created unique ID for the resource
  expect(response_data.id).toBeDefined();
  
});

// Update resource object using PUT request
test('PUT updates an existing post', async ({ request }) => {
  const response = await request.put(
    `${baseUrl}/posts/${userId}`,
    {
      data: {
        id: 1,
        title: 'API testing using Playwright',
        body: 'Learning API testing concepts using Playwright, currently learning PUT request',
        userId: 1,
      },
    }
  );

  expect(response.status()).toBe(statusCodes.ok);

  const response_data = await response.json();

  expect(response_data.title).toBe('API testing using Playwright');
  expect(response_data.body).toBe(
    'Learning API testing concepts using Playwright, currently learning PUT request'
  );
  expect(response_data.userId).toBe(1);
  
  //verify server created unique ID for the resource
  expect(response_data.id).toBe(1);

});


test('PATCH updates an existing post', async ({ request }) => {
  const response = await request.patch(
    `${baseUrl}/posts//${userId}`,
    {
      data: {
        title: 'API testing using Playwright - Updated',
      },
    }
  );

  expect(response.status()).toBe(statusCodes.ok);

  const response_data = await response.json();

  expect(response_data.title).toBe('API testing using Playwright - Updated');

});

test('DELETE removes existing post', async ({ request })=> {
  const response = await request.delete(
    `${baseUrl}/posts//${userId}`,
  )

  expect(response.status()).toBe(statusCodes.ok);

});

test('GET user by ID', async ({ request }) => {
  const response = await request.get(
    `${baseUrl}/users/${userId}`
  )

  expect(response.status()).toBe(statusCodes.ok);

  const response_body = await response.json();

  expect(response_body.id).toBe(userId);

});