import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(''); //the url to open is driven from playwright config as BASE_URL

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ihor Lazarkov/);
});

