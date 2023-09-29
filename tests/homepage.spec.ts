import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://stickerfy.herokuapp.com/');
});


test.describe('Homepage', () => {
  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring
    await expect(page).toHaveTitle(/Stickerfy/);
  });

  test('has products for sale', async ({ page }) => {
    // Expect page to have a button with the name of 'Add to cart'
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });

  test('stikerfy link', async ({ page }) => {
    // Click the 'Stikerfy' link
    await page.getByRole('link', { name: 'Stickerfy' }).click();

    // Expect page to have a button with the name of 'Go to cart'
    await expect(page).toHaveURL('https://stickerfy.herokuapp.com/');
  });

  test('go to cart link', async ({ page }) => {
    // Click the 'Go to cart' button
    await page.getByRole('button', { name: 'Go to cart' }).click();

    // Expect page to have a heading with the name of 'Add items to the cart'
    await expect(page.getByRole('heading', { name: 'Add items to the cart' })).toBeVisible();
  });

  test('shopping cart link', async ({ page }) => {
    // Click the 'Shopping Cart' link
    await page.getByRole('link', { name: 'Shopping Cart' }).click();

    // Expect page to have a heading with the name of 'Add items to the cart'
    await expect(page.getByRole('heading', { name: 'Add items to the cart' })).toBeVisible();
  });
}) ;