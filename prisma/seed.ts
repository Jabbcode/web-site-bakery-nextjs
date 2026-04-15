import { PrismaClient, ProductStatus, StockStatus, UserRole } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // ============================================
  // USERS
  // ============================================
  console.log('Creating users...')

  await prisma.user.upsert({
    where: { email: 'admin@swissdelight.com' },
    update: {},
    create: {
      clerkId: 'clerk_admin_temp_id',
      email: 'admin@swissdelight.com',
      firstName: 'Admin',
      lastName: 'SwissDelight',
      role: UserRole.ADMIN,
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      clerkId: 'clerk_user_temp_id',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
    },
  })

  console.log(`✅ Created ${2} users`)

  // ============================================
  // CATEGORIES
  // ============================================
  console.log('Creating categories...')

  const cakesCategory = await prisma.category.create({
    data: {
      slug: 'cakes',
      name_es: 'Pasteles',
      name_en: 'Cakes',
      description_es: 'Deliciosos pasteles artesanales hechos con ingredientes premium',
      description_en: 'Delicious handcrafted cakes made with premium ingredients',
      image: '/images/categories/cakes.jpg',
      sortOrder: 1,
      isActive: true,
    },
  })

  const cupcakesCategory = await prisma.category.create({
    data: {
      slug: 'cupcakes',
      name_es: 'Cupcakes',
      name_en: 'Cupcakes',
      description_es: 'Cupcakes esponjosos con coberturas cremosas',
      description_en: 'Fluffy cupcakes with creamy toppings',
      image: '/images/categories/cupcakes.jpg',
      sortOrder: 2,
      isActive: true,
    },
  })

  const cookiesCategory = await prisma.category.create({
    data: {
      slug: 'cookies',
      name_es: 'Galletas',
      name_en: 'Cookies',
      description_es: 'Galletas crujientes recién horneadas',
      description_en: 'Crispy freshly baked cookies',
      image: '/images/categories/cookies.jpg',
      sortOrder: 3,
      isActive: true,
    },
  })

  const breadCategory = await prisma.category.create({
    data: {
      slug: 'bread',
      name_es: 'Panes',
      name_en: 'Bread',
      description_es: 'Pan fresco artesanal',
      description_en: 'Fresh artisan bread',
      image: '/images/categories/bread.jpg',
      sortOrder: 4,
      isActive: true,
    },
  })

  console.log(`✅ Created ${4} categories`)

  // ============================================
  // PRODUCTS
  // ============================================
  console.log('Creating products...')

  // Cakes
  const chocolateCake = await prisma.product.create({
    data: {
      slug: 'swiss-chocolate-cake',
      sku: 'CAKE-CHOC-001',
      name_es: 'Pastel de Chocolate Suizo',
      name_en: 'Swiss Chocolate Cake',
      description_es:
        'Delicioso pastel de chocolate con capas de mousse de chocolate belga y cobertura de ganache.',
      description_en:
        'Delicious chocolate cake with layers of Belgian chocolate mousse and ganache frosting.',
      priceUSD: 4500, // $45.00
      priceMXN: 90000, // $900.00 MXN
      priceEUR: 4200, // €42.00
      stock: 15,
      stockStatus: StockStatus.IN_STOCK,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      isNew: false,
      categoryId: cakesCategory.id,
      weight: 1200,
      servings: 8,
      preparationTime: 120,
      images: {
        create: [
          {
            url: '/images/products/chocolate-cake-1.jpg',
            alt_es: 'Pastel de Chocolate Suizo vista frontal',
            alt_en: 'Swiss Chocolate Cake front view',
            sortOrder: 1,
          },
          {
            url: '/images/products/chocolate-cake-2.jpg',
            alt_es: 'Pastel de Chocolate Suizo corte',
            alt_en: 'Swiss Chocolate Cake slice',
            sortOrder: 2,
          },
        ],
      },
    },
  })

  const strawberryCake = await prisma.product.create({
    data: {
      slug: 'strawberry-dream-cake',
      sku: 'CAKE-STRW-001',
      name_es: 'Pastel de Fresa Ensueño',
      name_en: 'Strawberry Dream Cake',
      description_es: 'Esponjoso pastel de vainilla con fresas frescas y crema chantilly.',
      description_en: 'Fluffy vanilla cake with fresh strawberries and whipped cream.',
      priceUSD: 4200,
      priceMXN: 84000,
      priceEUR: 3900,
      discountPercent: 10,
      discountedPriceUSD: 3780,
      discountedPriceMXN: 75600,
      discountedPriceEUR: 3510,
      stock: 12,
      stockStatus: StockStatus.IN_STOCK,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      isNew: true,
      categoryId: cakesCategory.id,
      weight: 1000,
      servings: 8,
      preparationTime: 90,
      images: {
        create: [
          {
            url: '/images/products/strawberry-cake-1.jpg',
            alt_es: 'Pastel de Fresa vista frontal',
            alt_en: 'Strawberry Cake front view',
            sortOrder: 1,
          },
        ],
      },
    },
  })

  // Cupcakes
  await prisma.product.create({
    data: {
      slug: 'vanilla-cupcakes-box',
      sku: 'CUPC-VAN-006',
      name_es: 'Caja de Cupcakes de Vainilla',
      name_en: 'Vanilla Cupcakes Box',
      description_es: 'Caja de 6 cupcakes de vainilla con betún de mantequilla.',
      description_en: 'Box of 6 vanilla cupcakes with buttercream frosting.',
      priceUSD: 1800,
      priceMXN: 36000,
      priceEUR: 1700,
      stock: 25,
      stockStatus: StockStatus.IN_STOCK,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      isNew: false,
      categoryId: cupcakesCategory.id,
      weight: 400,
      servings: 6,
      preparationTime: 45,
      images: {
        create: [
          {
            url: '/images/products/vanilla-cupcakes.jpg',
            alt_es: 'Caja de cupcakes de vainilla',
            alt_en: 'Vanilla cupcakes box',
            sortOrder: 1,
          },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'red-velvet-cupcakes-box',
      sku: 'CUPC-RED-006',
      name_es: 'Caja de Cupcakes Red Velvet',
      name_en: 'Red Velvet Cupcakes Box',
      description_es: 'Caja de 6 cupcakes red velvet con queso crema.',
      description_en: 'Box of 6 red velvet cupcakes with cream cheese frosting.',
      priceUSD: 2000,
      priceMXN: 40000,
      priceEUR: 1900,
      stock: 4,
      stockStatus: StockStatus.LOW_STOCK,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      isNew: true,
      categoryId: cupcakesCategory.id,
      weight: 400,
      servings: 6,
      preparationTime: 50,
      images: {
        create: [
          {
            url: '/images/products/red-velvet-cupcakes.jpg',
            alt_es: 'Cupcakes red velvet',
            alt_en: 'Red velvet cupcakes',
            sortOrder: 1,
          },
        ],
      },
    },
  })

  // Cookies
  await prisma.product.create({
    data: {
      slug: 'chocolate-chip-cookies',
      sku: 'COOK-CHOC-012',
      name_es: 'Galletas con Chispas de Chocolate',
      name_en: 'Chocolate Chip Cookies',
      description_es: 'Docena de galletas con chispas de chocolate.',
      description_en: 'Dozen of chocolate chip cookies.',
      priceUSD: 1200,
      priceMXN: 24000,
      priceEUR: 1100,
      stock: 40,
      stockStatus: StockStatus.IN_STOCK,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      isNew: false,
      categoryId: cookiesCategory.id,
      weight: 300,
      servings: 12,
      preparationTime: 30,
      images: {
        create: [
          {
            url: '/images/products/choc-chip-cookies.jpg',
            alt_es: 'Galletas con chispas de chocolate',
            alt_en: 'Chocolate chip cookies',
            sortOrder: 1,
          },
        ],
      },
    },
  })

  // Bread
  await prisma.product.create({
    data: {
      slug: 'artisan-sourdough-bread',
      sku: 'BREAD-SOUR-001',
      name_es: 'Pan de Masa Madre Artesanal',
      name_en: 'Artisan Sourdough Bread',
      description_es: 'Pan de masa madre con corteza crujiente y miga suave.',
      description_en: 'Sourdough bread with crispy crust and soft crumb.',
      priceUSD: 800,
      priceMXN: 16000,
      priceEUR: 750,
      stock: 20,
      stockStatus: StockStatus.IN_STOCK,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      isNew: false,
      categoryId: breadCategory.id,
      weight: 500,
      servings: 6,
      preparationTime: 1440, // 24 hours
      images: {
        create: [
          {
            url: '/images/products/sourdough-bread.jpg',
            alt_es: 'Pan de masa madre artesanal',
            alt_en: 'Artisan sourdough bread',
            sortOrder: 1,
          },
        ],
      },
    },
  })

  console.log(`✅ Created ${7} products`)

  // ============================================
  // REVIEWS
  // ============================================
  console.log('Creating reviews...')

  await prisma.review.create({
    data: {
      rating: 5,
      title: 'Absolutely delicious!',
      comment: 'The best chocolate cake I have ever tasted. Rich, moist, and not too sweet.',
      isApproved: true,
      userId: testUser.id,
      productId: chocolateCake.id,
    },
  })

  await prisma.review.create({
    data: {
      rating: 5,
      title: 'Perfect for birthdays',
      comment: "Ordered this for my daughter's birthday and everyone loved it!",
      isApproved: true,
      userId: testUser.id,
      productId: strawberryCake.id,
    },
  })

  console.log(`✅ Created ${2} reviews`)

  // ============================================
  // ADDRESSES
  // ============================================
  console.log('Creating addresses...')

  await prisma.address.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+52 55 1234 5678',
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zip: '06600',
      country: 'MX',
      isDefault: true,
      userId: testUser.id,
    },
  })

  console.log(`✅ Created ${1} address`)

  console.log('✅ Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
