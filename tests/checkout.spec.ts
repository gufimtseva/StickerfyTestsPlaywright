import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://stickerfy.herokuapp.com/');
});


test.describe('Checkout', () => {
  test('checkout 1 item', async ({ page }) => {
    // Click the 'Add to cart' button for the first sticker
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Make sure the cart only has 1 item and click
    await page.getByRole('link', { name: 'Shopping Cart 1' }).click();

    // Click the 'Checkout' button
    await page.getByRole('link', { name: 'Checkout' }).click();

    // Expect information about successful checkout
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Total: $5.5' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thanks for your order!' })).toBeVisible();
  });
});