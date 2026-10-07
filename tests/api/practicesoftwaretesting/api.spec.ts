import { test, expect } from '@playwright/test';

const baseUrl = 'https://api.practicesoftwaretesting.com'

test('Fetch products from products page', async ({ request }) => {
    const response = await request.get(`${baseUrl}/products/`);
    await expect(response).toBeOK();

    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Object);
    expect(responseBody).toHaveProperty('current_page');

    expect(responseBody.data.length).toBeGreaterThan(0);

    const firstProduct = responseBody.data[0];
    console.log('First Product:', firstProduct);
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');

});