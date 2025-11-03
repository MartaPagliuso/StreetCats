import { Page } from "@playwright/test";

/**
 * Helper to execute the login
 */

export async function loginUser(page: Page, username: string, password: string) {
  await page.goto('/login');
  
  await page.getByPlaceholder('Es. KungFuMarta').fill(username);
  await page.getByPlaceholder('••••••••', { exact: true }).fill(password);
  await page.getByRole('button', {name: 'Accedi'}).click();

  await page.waitForURL('/');
}

/**
 * Helper to register a new user
 */

export async function registerUser(page: Page, username:string, password: string) {
  await page.goto('/register');

  await page.getByPlaceholder('Es. KungFuMarta').fill(username);
  await page.getByPlaceholder('Almeno 6 caratteri').fill(password);
  await page.getByPlaceholder('Ripeti la password').fill(password);

  await page.getByRole('button', {name: 'Registrati'}).click();
}

/**
 * Helper to execute the logout
 */

export async function logoutUser(page: Page) {
  const logoutBtn = page.getByRole('button', {name: 'Logout'});

  if (await logoutBtn.isVisible()) {
    await logoutBtn.click();
    await page.waitForURL('/login');
  }
}

/**
 * Helper to navigate to a specific signal
 */

export async function navigateToSignalDetail(page: Page, index: number = 0) {
  await page.goto('/signals');

  await page.waitForTimeout(2000);
  
  const cards = page.locator('.signal-card');
  await cards.nth(index).getByRole('button', {name: 'Vedi dettagli'}).click();
}

/**
 * Helper to create a new unique user account for the test
 */

export function generateTestUser() {
  const timestamp = Date.now();

  return {
    username: `testuser_${timestamp}`,
    password: `TestPass123`
  };
}

/**
 * Helper to wait for the page to load completely
 */

export async function waitForPageLoad(page: Page, timeout: number = 2000) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(timeout);
}

/**
 * Helper to verify that the user is authenticated
 */

export async function isUserAuthenticated(page: Page): Promise<boolean> {
  const logoutBtn = page.getByRole('button', {name: 'Logout'});
  return await logoutBtn.isVisible();
}
