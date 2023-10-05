import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://stickerfy.herokuapp.com/');
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished '${testInfo.title}' - status '${testInfo.status}'`);
});

test.describe('Add stickers to the cart', () => {
  test('add 1 sticker', async ({ page }) => {
    // Click the 'Add to cart' button for the 'Happy' sticker
    await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();

    // Make sure the cart only has 1 item and click
    await page.getByRole('link', { name: 'Shopping Cart 1' }).click();

    // Expect page to have an item with the 'Happy' sticker and count '1'
    await expect(page.getByText('1').first()).toBeVisible();

    // Expect 'Total' is '5.5'
    await expect(page.getByText('Total: 5.5')).toBeVisible();
  });

  test('add multiple same stickers', async ({ page }) => {
    // Click the 'Add to cart' button for the 'Angry' sticker twice
    const Angry = page.getByRole('button', { name: 'Add to cart' }).nth(1);
    await Angry.click();
    await Angry.click();

    // Make sure the cart has 2 items and click
    await page.getByRole('link', { name: 'Shopping Cart 2' }).click();

    // Expect page to have an item with the 'Angry' sticker and count '2'
    await expect(page.getByText('2', { exact: true }).nth(1)).toBeVisible();

    // Expect 'Total' is '9'
    await expect(page.getByText('Total: 9')).toBeVisible();
  });
  
  test('add multiple different stickers', async ({ page }) => {
    // Click the 'Add to cart' button for the 'Happy', 'Angry' and 'Sad' sticker
    await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();

    // Make sure the cart has 3 items and click
    await page.getByRole('link', { name: 'Shopping Cart 3' }).click();

    // Expect page to have items with each of the stickers and count '1'
    await expect(page.getByText('1', { exact: true }).nth(0)).toBeVisible();
    await expect(page.getByText('1', { exact: true }).nth(1)).toBeVisible();
    await expect(page.getByText('1', { exact: true }).nth(2)).toBeVisible();

    // Expect 'Total' is '17'
    await expect(page.getByText('Total: 17')).toBeVisible();
  });
});

test.describe('Remove stickers from the cart', () => {
  test('remove 1 sticker', async ({ page }) => {
    // Click the 'Add to cart' button for the 'Happy' sticker
    await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();

    // Make sure the cart only has 1 item and click
    await page.getByRole('link', { name: 'Shopping Cart 1' }).click();

    // Click the button 'Options->Remove 1' next to the 'Happy' sticker
    await page.getByRole('button', { name: 'Options' }).click();
    await page.getByRole('link', { name: 'Remove 1' }).click();  
    
    // Expect page to have a heading with the name of 'Add items to the cart'
    await expect(page.getByRole('heading', { name: 'Add items to the cart' })).toBeVisible();
  });

  test('remove all quantities of stickers', async ({ page }) => {
    // Click the 'Add to cart' button for the 'Angry' sticker once and for the 'Sad' sticker twice
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();

    // Make sure the cart only has 3 items and click
    await page.getByRole('link', { name: 'Shopping Cart 3' }).click();

    // Click the button 'Options->Remove 1' next to the 'Angry' sticker
    await page.locator('li').filter({ hasText: '1 Angry $4.5 Options Remove 1 Remove all' }).getByRole('button').click();
    await page.getByRole('link', { name: 'Remove 1' }).click(); 
    
    // Click the button 'Options->Remove all' next to the 'Sad' sticker
    await page.getByRole('button', { name: 'Options' }).click();
    await page.getByRole('link', { name: 'Remove all' }).click(); 
    
    // Expect page to have a heading with the name of 'Add items to the cart'
    await expect(page.getByRole('heading', { name: 'Add items to the cart' })).toBeVisible();
  });
});