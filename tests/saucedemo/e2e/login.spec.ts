  import { test, expect } from '@playwright/test';

  test('Successful login with correct credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('Unsuccessful login with incorrect/invalid username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('incorrect_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });

  test('Unsuccessful login with incorrect/invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('incorrect_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });

  test('Unsuccessful login with empty password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
  });

  test('Unsuccessful login with empty username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();  

  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  });