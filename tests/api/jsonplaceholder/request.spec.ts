import { test, expect } from '@playwright/test';


 const statusCodes = {
    ok: 200,
    notFound: 404,
    serverError: 500,
  }

test('GET user returns successful response', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  // verify response code status
  expect(response.status()).toBe(statusCodes.ok);

  
  // verify response body parameters
  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.name).toBe('Leanne Graham');
  expect(body.username).toBe('Bret');
  
  });

test('GET user returns 404 for non-existing user', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/99999'
  );

  expect(response.status()).toBe(statusCodes.notFound);
  const body = await response.json();
  expect(body).toEqual({});
});

test('GET user returns 404 for invalid endpoint', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/invalid-endpoint'
  );

  expect(response.status()).toBe(statusCodes.notFound);
  const body = await response.json();
  expect(body).toEqual({});
});