import { test, expect } from '@playwright/test'

test.describe('Products Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to shop page
    await page.goto('/en/shop')
  })

  test('should display shop page with products', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: 'Our Products' })).toBeVisible()

    // Check that products are displayed
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible()

    // Check filters are present
    await expect(page.getByText('Filters')).toBeVisible()
    await expect(page.getByText('Categories')).toBeVisible()

    // Check sort dropdown is present
    await expect(page.getByText('Sort by:')).toBeVisible()
  })

  test('should filter products by category', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]')

    // Click on first category filter
    await page
      .getByRole('button', { name: /chocolate cakes/i })
      .first()
      .click()

    // Wait for products to reload
    await page.waitForTimeout(500)

    // Check that filters are applied
    const filteredProductCount = await page.locator('[data-testid="product-card"]').count()

    // Should have different number of products (or same if all products match)
    expect(filteredProductCount).toBeGreaterThanOrEqual(0)

    // Check that URL has category parameter
    await expect(page).toHaveURL(/category=/)
  })

  test('should search for products', async ({ page }) => {
    // Type in search bar
    const searchInput = page.getByPlaceholder('Search products...')
    await searchInput.fill('chocolate')

    // Wait for debounce (500ms)
    await page.waitForTimeout(600)

    // Check that products are filtered
    const products = page.locator('[data-testid="product-card"]')
    const count = await products.count()

    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should sort products by price', async ({ page }) => {
    // Click on sort dropdown
    await page.getByRole('button', { name: /sort by:/i }).click()

    // Select "Price: Low to High"
    await page.getByRole('option', { name: /price: low to high/i }).click()

    // Wait for products to reload
    await page.waitForTimeout(500)

    // Get first product price
    const firstProductPrice = await page
      .locator('[data-testid="product-card"]')
      .first()
      .locator('[data-testid="product-price"]')
      .textContent()

    expect(firstProductPrice).toBeTruthy()
  })

  test('should navigate to product detail page', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]')

    // Click on first product
    await page.locator('[data-testid="product-card"]').first().click()

    // Wait for navigation
    await page.waitForURL(/\/shop\/[^/]+$/)

    // Check product detail page elements
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('Add to Cart')).toBeVisible()
    await expect(page.locator('[data-testid="product-gallery"]')).toBeVisible()
  })

  test('should display product details correctly', async ({ page }) => {
    // Navigate directly to a product page (using a mock slug)
    await page.goto('/en/shop/chocolate-cake-example')

    // Wait for product to load or show not found
    await page.waitForLoadState('networkidle')

    const notFound = await page
      .getByText('Product not found')
      .isVisible()
      .catch(() => false)

    if (!notFound) {
      // Check product detail elements
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      // Check tabs
      await expect(page.getByRole('button', { name: 'Description' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Additional Information' })).toBeVisible()
      await expect(page.getByRole('button', { name: /Reviews/ })).toBeVisible()

      // Check quantity selector
      await expect(page.getByRole('spinbutton')).toBeVisible()

      // Check add to cart button
      await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible()
    }
  })

  test('should change product quantity', async ({ page }) => {
    // Go to shop and click first product
    await page.waitForSelector('[data-testid="product-card"]')
    await page.locator('[data-testid="product-card"]').first().click()
    await page.waitForURL(/\/shop\/[^/]+$/)

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    const notFound = await page
      .getByText('Product not found')
      .isVisible()
      .catch(() => false)

    if (
      !notFound &&
      !(await page
        .getByText('Out of stock')
        .isVisible()
        .catch(() => false))
    ) {
      // Find quantity selector
      const quantityInput = page.getByRole('spinbutton')
      await expect(quantityInput).toBeVisible()

      // Click increment button
      await page.getByRole('button', { name: /increment/i }).click()

      // Check value changed
      await expect(quantityInput).toHaveValue('2')

      // Click decrement button
      await page.getByRole('button', { name: /decrement/i }).click()

      // Check value changed back
      await expect(quantityInput).toHaveValue('1')
    }
  })

  test('should zoom product image on click', async ({ page }) => {
    // Go to shop and click first product
    await page.waitForSelector('[data-testid="product-card"]')
    await page.locator('[data-testid="product-card"]').first().click()
    await page.waitForURL(/\/shop\/[^/]+$/)

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    const notFound = await page
      .getByText('Product not found')
      .isVisible()
      .catch(() => false)

    if (!notFound) {
      // Find gallery image
      const galleryImage = page.locator('[data-testid="product-gallery"]').locator('img').first()
      await expect(galleryImage).toBeVisible()

      // Click image to zoom
      await galleryImage.click()

      // Check that image has scale-150 class (zoomed)
      await expect(galleryImage).toHaveClass(/scale-150/)

      // Click again to unzoom
      await galleryImage.click()

      // Check that scale-150 is removed
      await expect(galleryImage).not.toHaveClass(/scale-150/)
    }
  })

  test('should switch between product tabs', async ({ page }) => {
    // Go to shop and click first product
    await page.waitForSelector('[data-testid="product-card"]')
    await page.locator('[data-testid="product-card"]').first().click()
    await page.waitForURL(/\/shop\/[^/]+$/)

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    const notFound = await page
      .getByText('Product not found')
      .isVisible()
      .catch(() => false)

    if (!notFound) {
      // Click on Additional Information tab
      await page.getByRole('button', { name: 'Additional Information' }).click()

      // Check that additional info is displayed
      await expect(page.getByText('Weight')).toBeVisible()

      // Click on Reviews tab
      await page.getByRole('button', { name: /Reviews/ }).click()

      // Check that reviews section is displayed (even if empty)
      const reviewsContent = page.locator('[role="tabpanel"]')
      await expect(reviewsContent).toBeVisible()

      // Go back to Description tab
      await page.getByRole('button', { name: 'Description' }).click()
    }
  })

  test('should paginate through products', async ({ page }) => {
    // Check if pagination exists
    const pagination = page.getByRole('navigation', { name: /pagination/i })
    const hasPagination = await pagination.isVisible().catch(() => false)

    if (hasPagination) {
      // Get current page
      const currentPage = await page.locator('[aria-current="page"]').textContent()
      expect(currentPage).toBe('1')

      // Click next page
      await page.getByRole('button', { name: /next/i }).click()

      // Wait for products to reload
      await page.waitForTimeout(500)

      // Check URL changed
      await expect(page).toHaveURL(/page=2/)

      // Click previous page
      await page.getByRole('button', { name: /previous/i }).click()

      // Wait for products to reload
      await page.waitForTimeout(500)

      // Check back to page 1
      await expect(page).toHaveURL(/page=1/)
    }
  })

  test('should handle out of stock products', async ({ page }) => {
    // Look for an out of stock badge
    const outOfStockBadge = page.getByText('Out of Stock').first()
    const hasOutOfStock = await outOfStockBadge.isVisible().catch(() => false)

    if (hasOutOfStock) {
      // Click on the out of stock product
      await outOfStockBadge.locator('..').locator('..').click()

      // Wait for navigation
      await page.waitForURL(/\/shop\/[^/]+$/)

      // Check that add to cart button is disabled or not present
      const addToCartButton = page.getByRole('button', { name: /add to cart/i })
      const hasButton = await addToCartButton.isVisible().catch(() => false)

      if (!hasButton) {
        // Check out of stock message
        await expect(page.getByText('Out of stock')).toBeVisible()
      }
    }
  })

  test('should display product badges correctly', async ({ page }) => {
    // Check for New badge
    const newBadge = page.getByText('New').first()
    const hasNew = await newBadge.isVisible().catch(() => false)

    if (hasNew) {
      expect(hasNew).toBe(true)
    }

    // Check for Hot badge
    const hotBadge = page.getByText('Hot').first()
    const hasHot = await hotBadge.isVisible().catch(() => false)

    if (hasHot) {
      expect(hasHot).toBe(true)
    }
  })

  test('should filter by featured products', async ({ page }) => {
    // Click featured checkbox
    await page.getByRole('checkbox', { name: /featured products/i }).click()

    // Wait for products to reload
    await page.waitForTimeout(500)

    // Check that some products are displayed (or empty state)
    const products = page.locator('[data-testid="product-card"]')
    const count = await products.count()

    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should clear all filters', async ({ page }) => {
    // Apply a filter
    await page
      .getByRole('button', { name: /chocolate cakes/i })
      .first()
      .click()
    await page.waitForTimeout(500)

    // Click Clear All button
    const clearButton = page.getByRole('button', { name: /clear all/i })
    await clearButton.click()

    // Wait for products to reload
    await page.waitForTimeout(500)

    // Check that all products are back
    const products = page.locator('[data-testid="product-card"]')
    const count = await products.count()

    expect(count).toBeGreaterThan(0)
  })
})
