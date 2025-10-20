import { test, expect } from '@playwright/test';

test.describe('Timer Application Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the timer application before each test
    await page.goto('https://kishizaki-42.github.io/timer/');
  });

  test.describe('Countdown Timer - Basic Functionality', () => {
    test('should start countdown with custom time', async ({ page }) => {
      // Verify the timer application is loaded
      await expect(page.getByRole('heading', { name: 'タイマー' })).toBeVisible();

      // Verify timer is displayed
      await expect(page.getByRole('timer', { name: '' })).toBeVisible();

      // Set custom time - minutes to 1
      await page.getByRole('spinbutton', { name: '分' }).fill('1');

      // Set custom time - seconds to 30
      await page.getByRole('spinbutton', { name: '秒' }).fill('30');

      // Click start button to begin countdown
      await page.getByRole('button', { name: 'スタート' }).click();

      // Verify start button is disabled when timer is running
      await expect(page.getByRole('button', { name: 'スタート' })).toBeDisabled();

      // Verify pause button is enabled
      await expect(page.getByRole('button', { name: '一時停止' })).toBeEnabled();
    });

    test('should pause and resume countdown', async ({ page }) => {
      // Set custom time - seconds to 30
      await page.getByRole('spinbutton', { name: '秒' }).fill('30');

      // Click start button to begin countdown
      await page.getByRole('button', { name: 'スタート' }).click();

      // Click pause button to pause the countdown
      await page.getByRole('button', { name: '一時停止' }).click();

      // Verify pause button changed to resume button
      await expect(page.getByRole('button', { name: '再開' })).toBeVisible();

      // Click resume button to continue countdown
      await page.getByRole('button', { name: '再開' }).click();

      // Verify pause button is visible again
      await expect(page.getByRole('button', { name: '一時停止' })).toBeVisible();
    });

    test('should reset countdown', async ({ page }) => {
      // Set custom time - seconds to 30
      await page.getByRole('spinbutton', { name: '秒' }).fill('30');

      // Click start button to begin countdown
      await page.getByRole('button', { name: 'スタート' }).click();

      // Click reset button to reset the countdown
      await page.getByRole('button', { name: 'リセット' }).click();

      // Verify start button is enabled again
      await expect(page.getByRole('button', { name: 'スタート' })).toBeEnabled();

      // Verify reset button is disabled
      await expect(page.getByRole('button', { name: 'リセット' })).toBeDisabled();
    });

    test('should show alert when countdown completes', async ({ page }) => {
      // Set very short time - 3 seconds for countdown completion test
      await page.getByRole('spinbutton', { name: '秒' }).fill('3');

      // Set minutes to 0 for countdown completion test
      await page.getByRole('spinbutton', { name: '分' }).fill('0');

      // Start countdown with 3 seconds
      await page.getByRole('button', { name: 'スタート' }).click();

      // Wait for countdown to complete (4 seconds)
      await new Promise(f => setTimeout(f, 4 * 1000));

      // Verify countdown completion alert message is displayed
      await expect(page.getByText('タイマーが完了しました！')).toBeVisible();
    });
  });

  test.describe('Countdown Timer - 5-minute Preset', () => {
    test('should set time to 5 minutes and start countdown', async ({ page }) => {
      // Click 5-minute preset button
      await page.getByRole('button', { name: '分セット' }).click();

      // Verify minutes spinbutton is set to 5
      await expect(page.getByRole('spinbutton', { name: '分' })).toHaveValue('5');

      // Verify hours spinbutton is set to 0
      await expect(page.getByRole('spinbutton', { name: '時間' })).toHaveValue('0');

      // Verify seconds spinbutton is set to 0
      await expect(page.getByRole('spinbutton', { name: '秒' })).toHaveValue('0');

      // Start countdown with 5-minute preset to verify it works
      await page.getByRole('button', { name: 'スタート' }).click();

      // Verify timer is running
      await expect(page.getByRole('button', { name: '一時停止' })).toBeEnabled();
    });
  });

  test.describe('Stopwatch - Basic Functionality', () => {
    test('should switch to stopwatch tab', async ({ page }) => {
      // Switch to stopwatch tab
      await page.getByRole('tab', { name: 'ストップウォッチ' }).click();

      // Verify stopwatch tab is selected
      await expect(page.getByRole('tab', { name: 'ストップウォッチ' })).toBeVisible();

      // Verify start button is visible
      await expect(page.getByRole('button', { name: 'スタート' })).toBeVisible();
    });

    test('should start stopwatch and count up', async ({ page }) => {
      // Switch to stopwatch tab
      await page.getByRole('tab', { name: 'ストップウォッチ' }).click();

      // Start stopwatch
      await page.getByRole('button', { name: 'スタート' }).click();

      // Wait for stopwatch to count up for 2 seconds
      await new Promise(f => setTimeout(f, 2 * 1000));

      // Verify pause button is enabled
      await expect(page.getByRole('button', { name: '一時停止' })).toBeEnabled();
    });

    test('should pause and resume stopwatch', async ({ page }) => {
      // Switch to stopwatch tab
      await page.getByRole('tab', { name: 'ストップウォッチ' }).click();

      // Start stopwatch
      await page.getByRole('button', { name: 'スタート' }).click();

      // Wait for stopwatch to count up for 2 seconds
      await new Promise(f => setTimeout(f, 2 * 1000));

      // Pause stopwatch
      await page.getByRole('button', { name: '一時停止' }).click();

      // Verify pause button changed to resume button
      await expect(page.getByRole('button', { name: '再開' })).toBeVisible();

      // Resume stopwatch
      await page.getByRole('button', { name: '再開' }).click();

      // Verify pause button is visible again
      await expect(page.getByRole('button', { name: '一時停止' })).toBeVisible();
    });

    test('should reset stopwatch to 00:00:00', async ({ page }) => {
      // Switch to stopwatch tab
      await page.getByRole('tab', { name: 'ストップウォッチ' }).click();

      // Start stopwatch
      await page.getByRole('button', { name: 'スタート' }).click();

      // Wait for stopwatch to count up for 2 seconds
      await new Promise(f => setTimeout(f, 2 * 1000));

      // Reset stopwatch to 00:00:00
      await page.getByRole('button', { name: 'リセット' }).click();

      // Verify start button is enabled again
      await expect(page.getByRole('button', { name: 'スタート' })).toBeEnabled();

      // Verify reset button is disabled
      await expect(page.getByRole('button', { name: 'リセット' })).toBeDisabled();
    });
  });

  test.describe('Tab Switching', () => {
    test('should maintain timer state when switching tabs', async ({ page }) => {
      // Set custom time on countdown
      await page.getByRole('spinbutton', { name: '秒' }).fill('30');

      // Switch to stopwatch tab
      await page.getByRole('tab', { name: 'ストップウォッチ' }).click();

      // Switch back to countdown tab
      await page.getByRole('tab', { name: 'カウントダウン' }).click();

      // Verify countdown timer is in reset state with start button enabled
      await expect(page.getByRole('button', { name: 'スタート' })).toBeVisible();
    });
  });

  test.describe('Input Validation', () => {
    test('should show validation alert for zero values', async ({ page }) => {
      // Set hours to 0 for validation test
      await page.getByRole('spinbutton', { name: '時間' }).fill('0');

      // Set minutes to 0 for validation test
      await page.getByRole('spinbutton', { name: '分' }).fill('0');

      // Set seconds to 0 for validation test
      await page.getByRole('spinbutton', { name: '秒' }).fill('0');

      // Click start button with all zero values to trigger validation alert
      await page.getByRole('button', { name: 'スタート' }).click();

      // Verify validation alert message for zero values
      await expect(page.getByText('1秒以上の時間を設定してください。')).toBeVisible();
    });

    test('should accept custom time input via spinbuttons', async ({ page }) => {
      // Set hours to 1
      await page.getByRole('spinbutton', { name: '時間' }).fill('1');

      // Set minutes to 30
      await page.getByRole('spinbutton', { name: '分' }).fill('30');

      // Set seconds to 45
      await page.getByRole('spinbutton', { name: '秒' }).fill('45');

      // Verify values are updated correctly
      await expect(page.getByRole('spinbutton', { name: '時間' })).toHaveValue('1');
      await expect(page.getByRole('spinbutton', { name: '分' })).toHaveValue('30');
      await expect(page.getByRole('spinbutton', { name: '秒' })).toHaveValue('45');

      // Verify start button is enabled with valid values
      await expect(page.getByRole('button', { name: 'スタート' })).toBeEnabled();
    });
  });
});
