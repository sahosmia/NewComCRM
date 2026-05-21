import { test, expect } from '@playwright/test';

test('verify requirement show page and reports page', async ({ page }) => {
    // Login
    await page.goto('http://localhost:8000/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    // Requirement Show Page
    await page.goto('http://localhost:8000/requirements/1');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/home/jules/verification/requirement_show_real.png', fullPage: true });

    // Reports Page
    await page.goto('http://localhost:8000/reports');
    await page.waitForLoadState('networkidle');
    // Wait for the requirements table to be visible if possible
    await page.waitForSelector('table', { timeout: 10000 }).catch(() => console.log('Table not found, capturing anyway'));
    await page.screenshot({ path: '/home/jules/verification/reports_final.png', fullPage: true });
});
