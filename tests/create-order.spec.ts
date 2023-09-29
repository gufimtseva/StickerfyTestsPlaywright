import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://stickerfy.herokuapp.com/');
});


test.describe('Add items to cart', () => {
  test('add 1 item', async ({ page }) => {
    // Click the 'Add to cart' button for the first sticker
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Make sure the cart only has 1 item and click
    await page.getByRole('link', { name: 'Shopping Cart 1' }).click();

    // Expect page to have an item with the first sticker and count '1'
    await expect(page.getByText('1').first()).toBeVisible();

    // Expect 'Total' is '5.5'
    await expect(page.getByText('Total: 5.5')).toBeVisible();
  });

  test('add multiple same items', async ({ page }) => {
    // Click the 'Add to cart' button for the second sticker twice
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

    // Make sure the cart has 2 item and click
    await page.getByRole('link', { name: 'Shopping Cart 2' }).click();

    // Expect page to have an item with the second sticker and count '2'
    await expect(page.getByText('2', { exact: true }).nth(1)).toBeVisible();

    // Expect 'Total' is '9'
    await expect(page.getByText('Total: 9')).toBeVisible();
  });
  
  test('add multiple different items', async ({ page }) => {
    // Click the 'Add to cart' button for the first, the second and the third sticker
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();

    // Make sure the cart has 3 items and click
    await page.getByRole('link', { name: 'Shopping Cart 3' }).click();

    // Expect page to have items with each of the stickers and count '1'
    await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('1', { exact: true }).nth(1)).toBeVisible();
    await expect(page.getByText('1', { exact: true }).nth(2)).toBeVisible();

    // Expect 'Total' is '17'
    await expect(page.getByText('Total: 17')).toBeVisible();
  });
});
