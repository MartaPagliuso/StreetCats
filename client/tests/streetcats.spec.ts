import { test, expect, Page } from '@playwright/test';

// helper functions
import {
  loginUser, 
  logoutUser,
  registerUser, 
  generateTestUser, 
  navigateToSignalDetail
} from './test-helpers';

const EXISTING_USER = {
  username: 'KungFuMarta',
  password: 'password'
};


test.describe('StreetCats E2E Tests', () => {
  // --------------- TEST 1: HomePage - Verify main elements ---------------

  test('TEST 1: HomePage should display main elements', async ({page}) => {
    await page.goto('/');

    // verify logo
    await expect(page.locator('text=StreetCats').first()).toBeVisible();

    // verify main title
    await expect(page.getByText('Clicca, segnala, miagola')).toBeVisible();

    // verify subtitle
    await expect(page.getByText('La mappa collaborativa per la sicurezza dei gatti liberi')).toBeVisible();

    // verify button 'I nostri mici'
    await expect(page.getByRole('button', {name: 'I nostri mici'})).toBeVisible();

    // verify button 'Accedi'
    await expect(page.getByRole('button', {name: 'Accedi'})).toBeVisible();

    // verify footer
    await expect(page.getByText('Scopo del sito')).toBeVisible();
  });

  // --------------- TEST 2: Register a new user ---------------

  test('TEST 2: User registration should create a new account', async ({page}) => {
    const newUser = generateTestUser();

    await registerUser(page, newUser.username, newUser.password);

    await expect(page.locator('.success-message')).toContainText('Registrazione completata');
    await expect(page).toHaveURL('/login');
  });

  // --------------- TEST 3: Login with valid credentials ---------------

  test('TEST 3: Login with valid credentials should succeed', async ({page}) => {
    await loginUser(page, EXISTING_USER.username, EXISTING_USER.password);

    await expect(page).toHaveURL('/');
    await expect(page.getByText(`Ciao, ${EXISTING_USER.username}!`)).toBeVisible();
    await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
  });

  // --------------- TEST 4: Login with invalid credentials ---------------

  test('TEST 4: Login with invalid credentials should fail', async ({page}) => {
    await page.goto('/login');

    await page.getByPlaceholder('Es. KungFuMarta').fill('wronguser');
    await page.getByPlaceholder('••••••••', { exact: true }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Accedi' }).click();

    await expect(page.locator('.error-message')).toContainText('Credenziali non valide');
    await expect(page).toHaveURL('/login');
  });

  // --------------- TEST 5: Display the list of signals ---------------

  test('TEST 5: Signals list page should display cat sightings', async ({page}) => {
    await page.goto('/signals');

    await expect(page.getByRole('heading', {name: 'Segnalazioni Gatti'})).toBeVisible();

    await expect(page.locator('#map')).toBeVisible();

    await expect(page.locator('.signal-card').first()).toBeVisible();

    const signalCards = page.locator('.signal-card');
    const count = await signalCards.count();
    expect(count).toBeGreaterThan(0);

    const firstCard = signalCards.first();
    await expect(firstCard.locator('.card-title')).toBeVisible();
    await expect(firstCard.locator('.card-image img')).toBeVisible();
    await expect(firstCard.getByRole('button', {name: 'Vedi dettagli'})).toBeVisible();
  });

  // --------------- TEST 6: Click on signal to view its details ---------------

  test('TEST 6: Clicking on signal should navigate to detail map', async ({page}) => {
    await navigateToSignalDetail(page);

    await expect(page).toHaveURL(/\/signals\/\d+/);

    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.image-container img')).toBeVisible();
    await expect(page.locator('#detail-map')).toBeVisible();
    await expect(page.getByText('Posizione dell\'avvistamento')).toBeVisible();
  });

  // --------------- TEST 7:  Create new signal (authenticated user) ---------------

  test('TEST 7: Authenticated user should create new signal', async ({page}) => {
    await loginUser(page, EXISTING_USER.username, EXISTING_USER.password);

    await page.goto('/add-signals');

    await expect(page.getByRole('heading', {name: 'Aggiungi una segnalazione'})).toBeVisible();

    await page.locator('#title').fill('Gatto test E2E');
    await page.locator('#description').fill('Questo è un **gatto di test** per E2E testing');
    await page.getByRole('button', {name: 'Crea Segnalazione'}).click();

    await expect(page.locator('.error-alert')).toContainText('Completa tutti i campi obbligatori');
  });

  // --------------- TEST 8: Address search via geocoding ---------------

  test('TEST 8: Address search should return results', async ({page}) => {
      await loginUser(page, EXISTING_USER.username, EXISTING_USER.password);

      await page.goto('/add-signals');

      const searchInput = page.locator('.search-input');
      await searchInput.fill('Piazza del Plebiscito, Napoli');

      await page.locator('.search-btn').click();

      await expect(page.locator('.search-results')).toBeVisible();
      await expect(page.locator('.result-item').first()).toBeVisible();

      await page.locator('.result-item').first().click();

      await expect(page.locator('search-results')).not.toBeVisible();
  });

  // --------------- TEST 9: Add comment to a signal ---------------

  test('TEST 9: Authenticated user should add comment to signal', async ({page}) => {
    await loginUser(page, EXISTING_USER.username, EXISTING_USER.password);
    await navigateToSignalDetail(page);

    await expect(page.getByRole('heading', {name: /Commenti/})).toBeVisible();

    const commentText = 'Commento di test E2E - ' + Date.now();
    await page.locator('#commentText').fill(commentText);

    await page.getByRole('button', {name: 'Invia Commento'}).click();

    await expect(page.locator('.comment-item').first()).toContainText(commentText);
  });

  // --------------- TEST 10: Logout ---------------

  test('TEST 10: User should logout successfully', async ({page}) => {
    await loginUser(page, EXISTING_USER.username, EXISTING_USER.password);

    await expect(page.getByText(`Ciao, ${EXISTING_USER.username}!`)).toBeVisible();

    await logoutUser(page);

    await expect(page).toHaveURL('/login');

    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Accedi' })).toBeVisible();
  });

  // --------------- TEST 11: Access to protected page without authentication ---------------

  test('TEST 11: Accessing protected page should redirect to login', async ({page}) => {
    await page.goto('/add-signals');

    await expect(page).toHaveURL(/\/login/);

    await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
  });

  // --------------- TEST 12: Breadcrumb navigation on the detail page  ---------------

  test('TEST 12: Breadcrumb navigation should work correctly', async ({page}) => {
    await navigateToSignalDetail(page);

    await expect(page.locator('.breadcrumb')).toBeVisible();
    await expect(page.locator('.breadcrumb a').first()).toContainText('Segnalazioni');

    await page.locator('.breadcrumb a').first().click();

    await expect(page).toHaveURL('/signals');
  });

  // --------------- TEST 13: Registration form validation ---------------

  test('TEST 13: Registration form should validate password mismatch', async ({page}) => {
    await page.goto('/register');

    await page.getByPlaceholder('Es. KungFuMarta').fill('newuser');
    await page.getByPlaceholder('Almeno 6 caratteri').fill('password123');
    await page.getByPlaceholder('Ripeti la password').fill('differentpass');

    await page.getByRole('button', {name: 'Registrati'}).click();

    await expect(page.locator('.error-message')).toContainText('Le password non coincidono');
  });

  // --------------- TEST 14: Interaction with the map ---------------

  test('TEST 14: Map should display markers and respond to clicks', async ({page}) => {
    await page.goto('/signals');


    const map = page.locator('#map');
    await expect(map).toBeVisible();
    await expect(page.locator('.signal-card').first()).toBeVisible();

    await expect(page.locator('.map-legend')).toBeVisible();

    await page.locator('.signal-card').first().click();

    await expect(page.locator('.signal-card').first()).toHaveClass(/selected/);
  });
});