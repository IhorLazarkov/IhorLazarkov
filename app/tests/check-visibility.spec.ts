import { test, expect } from './fixtures';
import { test as rawTest } from '@playwright/test';
import { projects } from '../src/data';

test('About section is visible', async ({ page }) => {
  await expect(page.locator('#about')).toBeVisible();
});

test('Experience section is visible', async ({ page }) => {
  await expect(page.locator('#experience')).toBeVisible();
});

test('Projects section is visible', async ({ page }) => {
  await expect(page.locator('#projects')).toBeVisible();
});

for (const project of projects) {
  test(`Project card "${project.title}" is visible with correct details`, async ({ page }) => {
    const projectsSection = page.locator('#projects');
    const card = projectsSection.locator('a', { hasText: project.title });

    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute('href', project.url);
    await expect(card.getByText(project.description)).toBeVisible();

    for (const tech of project.techStack) {
      await expect(card.getByText(tech, { exact: true })).toBeVisible();
    }
  });
}

test('Agent chat textarea is visible', async ({ page }) => {
  await expect(page.getByPlaceholder('Ask my agent ...')).toBeVisible();
});

rawTest('Agent greeting shows message, trending queries and stats', async ({ page }) => {
  // Route must be registered before navigation: the widget fires its
  // GET /api/version request as soon as it mounts.
  await page.route('http://localhost:3008/api/version', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Hello this is test message',
        queries: [{ body: 'test query 1' }, { body: 'test query 2' }],
        stats: {
          input_tokens: 10,
          tokens_per_second: 5.5,
          total_output_tokens: 20,
          time_to_first_token_seconds: 0.5
        },
        error: ''
      })
    });
  });

  await page.goto('');

  await expect(page.getByText('Hello this is test message')).toBeVisible();

  await page.getByText('Trending questions').click();
  await expect(page.getByText('test query 1')).toBeVisible();
  await expect(page.getByText('test query 2')).toBeVisible();

  await expect(page.getByText('input tokens: 10')).toBeVisible();
  await expect(page.getByText('tokens per sec: 5.5')).toBeVisible();
  await expect(page.getByText('total tokens: 20')).toBeVisible();
  await expect(page.getByText('time to first token sec: 0.5')).toBeVisible();
});

rawTest('Agent greeting shows error when /api/version returns error', async ({ page }) => {
  await page.route('http://localhost:3008/api/version', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: '',
        queries: [],
        stats: {
          input_tokens: 0,
          tokens_per_second: 0,
          total_output_tokens: 0,
          time_to_first_token_seconds: 0
        },
        error: 'Failed to fetch greeting from backend'
      })
    });
  });

  await page.goto('');

  await expect(page.getByText('Failed to fetch greeting from backend')).toBeVisible();
  // Stats should not be displayed when error is present
  await expect(page.getByText('input tokens: 0')).not.toBeVisible();
});
