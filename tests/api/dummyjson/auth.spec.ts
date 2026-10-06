import { expect } from '@playwright/test';
import { credentials, test, statusCodes } from '../../../test-artifacts/fixtures/dummyjson.fixture';

test('Access authenticated user', async ({ request, accessToken }) => {
    const userResponse = await request.get(
        `${credentials.baseUrlDummyJson}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    expect(userResponse.status()).toBe(statusCodes.ok);

    const userResponseBody = await userResponse.json();

    expect(userResponseBody.username).toBe(credentials.username);
});

test('Access authenticated user with invalid token', async ({ request }) => {

    const invalidToken = 'invalid-token';

    const userResponse = await request.get(
        `${credentials.baseUrlDummyJson}/auth/me`,
        {
            headers: {
                'Authorization': `Bearer ${invalidToken}`
            }
        }
    );
    expect(userResponse.status()).toBe(statusCodes.unauthorized);

});

test('Access authenticated user without token', async ({ request }) => {

    const userResponse = await request.get(
        `${credentials.baseUrlDummyJson}/auth/me`
    );
    expect(userResponse.status()).toBe(statusCodes.unauthorized);
});

test('Authenticated user has a user ID', async ({ authenticatedRequest }) => {
    const userResponse = await authenticatedRequest.get(
        `${credentials.baseUrlDummyJson}/auth/me`
    );

    expect(userResponse.status()).toBe(statusCodes.ok);

    const userResponseBody = await userResponse.json();
    expect(userResponseBody.id).toBeDefined();
});