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

  // Trending prompts are visible by default now, no disclosure needed.
  await expect(page.getByText('test query 1')).toBeVisible();
  await expect(page.getByText('test query 2')).toBeVisible();

  // Stats sit behind a per-message <details> disclosure.
  await page.getByText('stats').click();
  await expect(page.getByText('input tokens: 10')).toBeVisible();
  await expect(page.getByText('tokens per sec: 5.5')).toBeVisible();
  await expect(page.getByText('total tokens: 20')).toBeVisible();
  await expect(page.getByText('time to first token sec: 0.5')).toBeVisible();
});

rawTest('Agent chat textarea placeholder shows average response time after a reply', async ({ page }) => {
  await page.route('http://localhost:3008/api/version', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Hello this is test message',
        queries: [{ body: 'test query 1' }],
        // generation time = 20 / 5.5 = 3.636..., + 0.5 ttft = 4.136... -> "4.1"
        stats: { input_tokens: 10, tokens_per_second: 5.5, total_output_tokens: 20, time_to_first_token_seconds: 0.5 },
        error: ''
      })
    });
  });

  await page.goto('');
  await expect(page.getByText('Hello this is test message')).toBeVisible();

  await expect(page.getByPlaceholder('avg response ~4.1s')).toBeVisible();
});

rawTest('Agent chat keeps prior exchanges visible after a new prompt', async ({ page }) => {
  let callCount = 0
  await page.route('http://localhost:3008/api/version', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Hello this is test message',
        queries: [{ body: 'test query 1' }],
        stats: { input_tokens: 10, tokens_per_second: 5.5, total_output_tokens: 20, time_to_first_token_seconds: 0.5 },
        error: ''
      })
    });
  });
  await page.route('http://localhost:3008/api/generate', async route => {
    callCount++
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: `Second answer ${callCount}`,
        queries: [{ body: 'test query 1' }],
        stats: { input_tokens: 1, tokens_per_second: 1, total_output_tokens: 1, time_to_first_token_seconds: 0.1 },
        error: ''
      })
    });
  });

  await page.goto('');
  await expect(page.getByText('Hello this is test message')).toBeVisible();

  await page.getByPlaceholder('Ask my agent ...').fill('Second question');
  await page.locator('.action-toolbar button[type="submit"]').click();

  await expect(page.getByText('Second answer 1')).toBeVisible();
  // The greeting exchange should still be present, not replaced.
  await expect(page.getByText('Hello this is test message')).toBeVisible();
});

rawTest('Agent chat submits on Ctrl+Enter / Meta+Enter without inserting a newline', async ({ page }) => {
  await page.route('http://localhost:3008/api/version', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Hello this is test message',
        queries: [{ body: 'test query 1' }],
        stats: { input_tokens: 10, tokens_per_second: 5.5, total_output_tokens: 20, time_to_first_token_seconds: 0.5 },
        error: ''
      })
    });
  });
  await page.route('http://localhost:3008/api/generate', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Shortcut answer',
        queries: [{ body: 'test query 1' }],
        stats: { input_tokens: 1, tokens_per_second: 1, total_output_tokens: 1, time_to_first_token_seconds: 0.1 },
        error: ''
      })
    });
  });

  await page.goto('');
  await expect(page.getByText('Hello this is test message')).toBeVisible();

  const textarea = page.getByPlaceholder('Ask my agent ...');
  await textarea.fill('Shortcut question');

  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
  await textarea.press(`${modifier}+Enter`);

  await expect(page.getByText('Shortcut answer')).toBeVisible();
  // The shortcut must submit rather than insert a newline into the textarea.
  await expect(textarea).toHaveValue('');
});

rawTest('Agent chat shows a thinking indicator while waiting on a slow response', async ({ page }) => {
  await page.route('http://localhost:3008/api/version', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Hello this is test message',
        queries: [{ body: 'test query 1' }],
        stats: { input_tokens: 10, tokens_per_second: 5.5, total_output_tokens: 20, time_to_first_token_seconds: 0.5 },
        error: ''
      })
    });
  });
  await page.route('http://localhost:3008/api/generate', async route => {
    // Emulate agentic-server latency so the pending/"thinking" bubble has time to render.
    await new Promise(resolve => setTimeout(resolve, 1000));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Slow answer',
        queries: [{ body: 'test query 1' }],
        stats: { input_tokens: 1, tokens_per_second: 1, total_output_tokens: 1, time_to_first_token_seconds: 0.1 },
        error: ''
      })
    });
  });

  await page.goto('');
  await expect(page.getByText('Hello this is test message')).toBeVisible();

  await page.getByPlaceholder('Ask my agent ...').fill('Slow question');
  await page.locator('.action-toolbar button[type="submit"]').click();

  await expect(page.getByTestId('loader')).toBeVisible();
  await expect(page.getByText('Slow answer')).not.toBeVisible();

  await expect(page.getByText('Slow answer')).toBeVisible();
  await expect(page.getByTestId('loader')).not.toBeVisible();
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
