import { expect } from '@playwright/test';
import { test } from '../fixtures/saucedemo.fixture';

test('Add backpack to cart', async ({ loginPage }) => {
  const backpack = loginPage
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  await backpack.getByRole('button', { name: 'Remove' }).isVisible();
});

test('add bike light to cart', async ({ loginPage }) => {

    const bikeLight = loginPage
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Bike Light' });

    await bikeLight.getByRole('button', { name: 'Add to cart' }).click();

    await bikeLight.getByRole('button', { name: 'Remove' }).isVisible();
});

test('add backpack and bike light to cart', async ({ loginPage }) => {

    // define backpack item using locator and click on add to cart button
    const backpack = loginPage.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    //define bike light item using locator and click on add to cart button
    const bikeLight = loginPage
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Bike Light' });
    
    await bikeLight
    .getByRole('button', { name: 'Add to cart' })
    .click();

    // assert that both items have been added by verifying 'Remove' button visibility
    await expect(backpack.getByRole('button', { name: 'Remove' }))
    .toBeVisible();
    
    await expect(bikeLight.getByRole('button', { name: 'Remove' }))
    .toBeVisible();

    // check count of cart shows as 2 after adding both items to cart
    const cartCount = loginPage
    .locator('.shopping_cart_badge');
    await expect(cartCount)
    .toHaveText('2');
});