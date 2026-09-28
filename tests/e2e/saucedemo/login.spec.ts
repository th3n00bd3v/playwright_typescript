import { expect } from '@playwright/test';
import { test } from '../fixtures/saucedemo.fixture';

test('Product page is displayed after login', async ({ loginPage }) => {
  await expect(loginPage.locator('.title')).toHaveText('Products');
});