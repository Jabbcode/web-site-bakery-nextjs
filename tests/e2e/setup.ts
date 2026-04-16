import { test as setup } from '@playwright/test'

/**
 * Global setup for E2E tests
 * Runs once before all tests
 */
setup('do global setup', async () => {
  // You can add any global setup here
  // For example: seed database, authenticate, etc.
  console.log('Running global E2E setup...')
})
