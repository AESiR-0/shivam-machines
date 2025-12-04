import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't5ek8ov6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN is not set in .env.local')
  console.error('\n📝 To fix this:')
  console.error('1. Go to https://www.sanity.io/manage')
  console.error('2. Select your project')
  console.error('3. Go to API → Tokens')
  console.error('4. Create a new token with "Editor" or "Admin" permissions')
  console.error('5. Add it to your .env.local file as SANITY_API_TOKEN=your-token-here')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-07-11',
})

async function seedSanity() {
  console.log('🌱 Starting Sanity seeding...')
  console.log(`📦 Project: ${projectId}`)
  console.log(`📊 Dataset: ${dataset}\n`)

  // Test token permissions - try to create a test document
  console.log('🔐 Testing token permissions...')
  try {
    // Try to create a test document to verify write permissions
    const testDoc = {
      _type: 'hero',
      _id: 'test-permission-check',
      title: 'Test',
    }
    await client.create(testDoc)
    // Clean up test document
    await client.delete('test-permission-check')
    console.log('✅ Token has write permissions\n')
  } catch (error: any) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      console.error('\n❌ Error: Token does not have write permissions')
      console.error('\n📝 To fix this:')
      console.error('1. Go to https://www.sanity.io/manage')
      console.error('2. Select your project (t5ek8ov6)')
      console.error('3. Navigate to API → Tokens')
      console.error('4. Click "Add API token"')
      console.error('5. Give it a name (e.g., "Seeding Script")')
      console.error('6. ⚠️  IMPORTANT: Select "Editor" or "Admin" role (NOT Viewer!)')
      console.error('7. Click "Save" and copy the token')
      console.error('8. Update SANITY_API_TOKEN in your .env.local file')
      console.error('\n💡 Current token appears to have read-only (Viewer) permissions')
      console.error('💡 You need Editor or Admin permissions to create/update documents')
      process.exit(1)
    }
    // If it's a different error (like document already exists), that's fine
    if (error.statusCode !== 409) {
      console.error('⚠️  Warning: Could not verify write permissions, but continuing...\n')
    } else {
      // Document exists, try to delete it
      try {
        await client.delete('test-permission-check')
      } catch {
        // Ignore delete errors
      }
      console.log('✅ Token has write permissions\n')
    }
  }

  try {
    // 1. Seed Hero
    console.log('📝 Seeding Hero...')
    const heroDoc = {
      _type: 'hero',
      badge: 'Trusted Since 1997',
      title: 'Industrial',
      titleHighlight: 'Machine Tools',
      titleSuffix: 'Excellence',
      description: "India's premier supplier of premium used machine tools. Specializing in cylindrical grinding, boring machines, and precision manufacturing equipment for industrial excellence.",
      features: [
        'Premium Quality Machines',
        'Expert Technical Support',
        'Competitive Pricing',
        'Nationwide Delivery',
      ],
      primaryButtonText: 'Explore Machines',
      primaryButtonLink: '/products',
      secondaryButtonText: 'Watch Demo',
      secondaryButtonLink: '#',
      stats: [
        { label: 'Years of Excellence', value: '25+' },
        { label: 'Machines Supplied', value: '1000+' },
        { label: 'Happy Clients', value: '500+' },
      ],
    }
    await client.createOrReplace({
      ...heroDoc,
      _id: 'hero',
    })
    console.log('✅ Hero seeded\n')

    // 2. Seed Products
    console.log('📝 Seeding Products...')
    const products = [
      {
        _type: 'product',
        title: 'Cylindrical Grinding Machines',
        slug: { _type: 'slug', current: 'cylindrical-grinding-machines' },
        description: 'High-precision cylindrical grinding machines for external and internal grinding operations with exceptional surface finish.',
        category: 'grinding',
        specifications: 'Max Grinding Length: 1000mm, Max Swing: 400mm',
        features: ['Precision Grinding', 'CNC Control', 'Heavy Duty'],
        isInStock: true,
        dateAdded: '2024-01-15',
      },
      {
        _type: 'product',
        title: 'Horizontal Boring Machines',
        slug: { _type: 'slug', current: 'horizontal-boring-machines' },
        description: 'Heavy-duty horizontal boring machines for large-scale manufacturing operations with exceptional accuracy and reliability.',
        category: 'boring',
        specifications: 'Max Boring Diameter: 200mm, Table Size: 2000x1500mm',
        features: ['Large Capacity', 'High Precision', 'Heavy Duty'],
        isInStock: true,
        dateAdded: '2024-01-10',
      },
      {
        _type: 'product',
        title: 'Automatic Production Bore Grinding',
        slug: { _type: 'slug', current: 'automatic-production-bore-grinding' },
        description: 'Fully automated bore grinding machines for high-volume production with consistent quality and efficiency.',
        category: 'grinding',
        specifications: 'Production Rate: 200 pieces/hour, Accuracy: ±0.005mm',
        features: ['Automated', 'High Volume', 'Consistent Quality'],
        isInStock: true,
        dateAdded: '2024-01-05',
      },
      {
        _type: 'product',
        title: 'Precision Lathe Machines',
        slug: { _type: 'slug', current: 'precision-lathe-machines' },
        description: 'Advanced precision lathe machines for complex turning operations with superior accuracy and surface finish.',
        category: 'lathe',
        specifications: 'Max Turning Length: 1500mm, Max Swing: 500mm',
        features: ['High Precision', 'CNC Control', 'Versatile'],
        isInStock: true,
        dateAdded: '2023-12-20',
      },
      {
        _type: 'product',
        title: 'Gear Grinding Machines',
        slug: { _type: 'slug', current: 'gear-grinding-machines' },
        description: 'Specialized gear grinding machines for precision gear manufacturing with exceptional accuracy and surface quality.',
        category: 'gear',
        specifications: 'Max Gear Diameter: 800mm, Module Range: 1-20',
        features: ['Gear Grinding', 'High Accuracy', 'Precision'],
        isInStock: true,
        dateAdded: '2023-12-15',
      },
      {
        _type: 'product',
        title: 'CNC Machining Centers',
        slug: { _type: 'slug', current: 'cnc-machining-centers' },
        description: 'Advanced CNC machining centers for complex manufacturing operations with automation and precision control.',
        category: 'cnc',
        specifications: 'Work Envelope: 1000x800x600mm, Spindle Speed: 8000 RPM',
        features: ['CNC Control', 'Automation', 'High Productivity'],
        isInStock: true,
        dateAdded: '2023-12-10',
      },
      {
        _type: 'product',
        title: 'Horizontal Boring Machine - Table Type',
        slug: { _type: 'slug', current: 'horizontal-boring-machine-table-type' },
        description: 'High-precision horizontal boring machine with table type configuration.',
        category: 'boring',
        specifications: 'X-2200, Y-2000 | Table: 1500 x 1800',
        features: ['Table Type', 'High Precision', 'Large Capacity'],
        isInStock: true,
        dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
      },
      {
        _type: 'product',
        title: 'Cylindrical Grinding Machine',
        slug: { _type: 'slug', current: 'cylindrical-grinding-machine' },
        description: 'Advanced cylindrical grinding machine for external and internal operations.',
        category: 'grinding',
        specifications: 'Max Length: 1000mm | Max Swing: 400mm',
        features: ['External Grinding', 'Internal Grinding', 'CNC Control'],
        isInStock: true,
        dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
      },
      {
        _type: 'product',
        title: 'Vertical Lathe Machine',
        slug: { _type: 'slug', current: 'vertical-lathe-machine' },
        description: 'Heavy-duty vertical lathe machine for complex turning operations.',
        category: 'lathe',
        specifications: 'Max Turning: 1500mm | Max Swing: 500mm',
        features: ['Vertical Design', 'Heavy Duty', 'High Precision'],
        isInStock: true,
        dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week ago
      },
      {
        _type: 'product',
        title: 'CNC Machining Centre',
        slug: { _type: 'slug', current: 'cnc-machining-centre' },
        description: 'Advanced CNC machining center with automation and precision control.',
        category: 'cnc',
        specifications: 'Work Envelope: 1000x800x600mm | Spindle: 8000 RPM',
        features: ['CNC Control', 'Automation', 'High Productivity'],
        isInStock: true,
        dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week ago
      },
    ]

    const productIds: string[] = []
    for (const product of products) {
      try {
        const result = await client.create(product)
        productIds.push(result._id)
        console.log(`  ✅ Created: ${product.title}`)
      } catch (error: any) {
        if (error.statusCode === 409) {
          // Document already exists, try to update
          const existing = await client.fetch(`*[_type == "product" && slug.current == "${product.slug.current}"][0]`)
          if (existing) {
            await client.patch(existing._id).set(product).commit()
            productIds.push(existing._id)
            console.log(`  ✅ Updated: ${product.title}`)
          }
        } else {
          console.error(`  ❌ Error creating ${product.title}:`, error.message)
        }
      }
    }
    console.log('✅ Products seeded\n')

    // 3. Seed About
    console.log('📝 Seeding About...')
    const aboutDoc = {
      _type: 'about',
      title: 'About',
      titleHighlight: 'Shivam Enterprise',
      description: 'Since 1997, we have been India\'s trusted supplier of premium used machine tools. Our commitment to quality, reliability, and customer satisfaction has made us a leading name in the industrial machinery sector.',
      stats: [
        {
          icon: 'Award',
          title: '25+ Years Experience',
          description: 'Decades of expertise in machine tool industry',
          value: '25+',
          color: 'from-brand-orange to-accent-600',
        },
        {
          icon: 'Users',
          title: '500+ Happy Clients',
          description: 'Satisfied customers across India',
          value: '500+',
          color: 'from-brand-darkBlue to-primary-800',
        },
        {
          icon: 'Clock',
          title: '24/7 Support',
          description: 'Round-the-clock customer service',
          value: '24/7',
          color: 'from-brand-gray to-gray-600',
        },
        {
          icon: 'Shield',
          title: 'Quality Assured',
          description: 'All machines thoroughly tested',
          value: '100%',
          color: 'from-green-500 to-green-600',
        },
      ],
      features: [
        {
          title: 'Premium Quality',
          description: 'All our used machine tools are carefully inspected and refurbished to ensure optimal performance and reliability.',
        },
        {
          title: 'Expert Service',
          description: 'Our experienced team provides comprehensive support from selection to installation and maintenance.',
        },
        {
          title: 'Wide Inventory',
          description: 'Extensive range of machine tools including grinding, boring, lathe, and CNC machines from top manufacturers.',
        },
        {
          title: 'Competitive Pricing',
          description: 'Best value for money with competitive pricing on premium used machine tools without compromising quality.',
        },
      ],
    }
    await client.createOrReplace({
      ...aboutDoc,
      _id: 'about',
    })
    console.log('✅ About seeded\n')

    // 4. Seed Footer
    console.log('📝 Seeding Footer...')
    const footerDoc = {
      _type: 'footer',
      companyName: 'Shivam Enterprise',
      description: 'Leading supplier of premium used machine tools since 1997. We deliver precision, reliability, and innovation to industries across India with our extensive inventory and expert service.',
      phone: '+91-9824080055',
      email: 'shivamenterprise@yahoo.com',
      address: '6- Ganpat Colony, Opp, Civil Hospital, Shahibaug, Ahmedabad, Gujarat - 380016',
      companyLinks: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'News', href: '/news' },
      ],
      productLinks: [
        { name: 'Boring Machines', href: '/products/boring' },
        { name: 'Lathe Machines', href: '/products/lathe' },
        { name: 'Gear Machines', href: '/products/gear' },
        { name: 'CNC Machines', href: '/products/cnc' },
      ],
      serviceLinks: [
        { name: 'Machine Installation', href: '/services/installation' },
        { name: 'Maintenance', href: '/services/maintenance' },
        { name: 'Training', href: '/services/training' },
        { name: 'Support', href: '/services/support' },
      ],
      supportLinks: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Privacy Policy', href: '/privacy' },
      ],
      socialLinks: [
        { platform: 'Facebook', url: '#' },
        { platform: 'Twitter', url: '#' },
        { platform: 'LinkedIn', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
    }
    await client.createOrReplace({
      ...footerDoc,
      _id: 'footer',
    })
    console.log('✅ Footer seeded\n')

    // 5. Seed Contact
    console.log('📝 Seeding Contact...')
    const contactDoc = {
      _type: 'contact',
      title: 'Get In',
      titleHighlight: 'Touch',
      description: 'Ready to find the perfect machinery solution for your business? Contact our experts today for personalized assistance and quotes.',
      contactInfo: [
        {
          type: 'phone',
          title: 'Phone',
          details: ['+91-9824080055'],
          color: 'from-blue-500 to-blue-600',
        },
        {
          type: 'email',
          title: 'Email',
          details: ['shivamenterprise@yahoo.com'],
          color: 'from-green-500 to-green-600',
        },
        {
          type: 'address',
          title: 'Address',
          details: [
            '6- Ganpat Colony, Opp, Civil Hospital',
            'Shahibaug, Ahmedabad, Gujarat - 380016',
            'India',
          ],
          color: 'from-red-500 to-red-600',
        },
        {
          type: 'hours',
          title: 'Business Hours',
          details: [
            'Mon - Fri: 9:00 AM - 6:00 PM',
            'Sat: 9:00 AM - 2:00 PM',
            'Sun: Closed',
          ],
          color: 'from-purple-500 to-purple-600',
        },
      ],
      stats: [
        { value: '25+', label: 'Years Experience' },
        { value: '1000+', label: 'Machines Supplied' },
        { value: '500+', label: 'Happy Clients' },
        { value: '24/7', label: 'Support' },
      ],
    }
    await client.createOrReplace({
      ...contactDoc,
      _id: 'contact',
    })
    console.log('✅ Contact seeded\n')

    // 6. Seed Machine Tool Categories
    console.log('📝 Seeding Machine Tool Categories...')
    const categories = [
      {
        _type: 'machineToolCategory',
        name: 'Boring Machines',
        slug: { _type: 'slug', current: 'boring-machines' },
        description: 'Horizontal and floor type boring machines for precision manufacturing',
        icon: 'Wrench',
        count: '25+ Machines',
        href: '/products?category=boring',
        color: 'from-blue-500 to-blue-600',
        order: 1,
      },
      {
        _type: 'machineToolCategory',
        name: 'Grinding Machines',
        slug: { _type: 'slug', current: 'grinding-machines' },
        description: 'Cylindrical, surface, and roll grinders for superior finish',
        icon: 'Settings',
        count: '30+ Machines',
        href: '/products?category=grinding',
        color: 'from-green-500 to-green-600',
        order: 2,
      },
      {
        _type: 'machineToolCategory',
        name: 'Lathe Machines',
        slug: { _type: 'slug', current: 'lathe-machines' },
        description: 'Vertical and horizontal lathes for turning operations',
        icon: 'Gauge',
        count: '20+ Machines',
        href: '/products?category=lathe',
        color: 'from-orange-500 to-orange-600',
        order: 3,
      },
      {
        _type: 'machineToolCategory',
        name: 'CNC Machines',
        slug: { _type: 'slug', current: 'cnc-machines' },
        description: 'CNC machining centers and turning centers',
        icon: 'Cog',
        count: '15+ Machines',
        href: '/products?category=cnc',
        color: 'from-purple-500 to-purple-600',
        order: 4,
      },
      {
        _type: 'machineToolCategory',
        name: 'Milling Machines',
        slug: { _type: 'slug', current: 'milling-machines' },
        description: 'Plano millers and vertical milling machines',
        icon: 'Drill',
        count: '18+ Machines',
        href: '/products?category=milling',
        color: 'from-red-500 to-red-600',
        order: 5,
      },
      {
        _type: 'machineToolCategory',
        name: 'Gear Machines',
        slug: { _type: 'slug', current: 'gear-machines' },
        description: 'Gear cutting and finishing machines',
        icon: 'Layers',
        count: '12+ Machines',
        href: '/products?category=gear',
        color: 'from-indigo-500 to-indigo-600',
        order: 6,
      },
      {
        _type: 'machineToolCategory',
        name: 'Drill Machines',
        slug: { _type: 'slug', current: 'drill-machines' },
        description: 'Radial drills and precision drilling equipment',
        icon: 'Drill',
        count: '10+ Machines',
        href: '/products?category=drill',
        color: 'from-cyan-500 to-cyan-600',
        order: 7,
      },
      {
        _type: 'machineToolCategory',
        name: 'Others',
        slug: { _type: 'slug', current: 'others' },
        description: 'Planning machines and specialized equipment',
        icon: 'Factory',
        count: '15+ Machines',
        href: '/products?category=others',
        color: 'from-gray-500 to-gray-600',
        order: 8,
      },
    ]

    for (const category of categories) {
      try {
        await client.create(category)
        console.log(`  ✅ Created: ${category.name}`)
      } catch (error: any) {
        if (error.statusCode === 409) {
          const existing = await client.fetch(`*[_type == "machineToolCategory" && slug.current == "${category.slug.current}"][0]`)
          if (existing) {
            await client.patch(existing._id).set(category).commit()
            console.log(`  ✅ Updated: ${category.name}`)
          }
        } else {
          console.error(`  ❌ Error creating ${category.name}:`, error.message)
        }
      }
    }
    console.log('✅ Machine Tool Categories seeded\n')

    // 7. Seed Recently Added (references products)
    console.log('📝 Seeding Recently Added...')
    const recentlyAddedDoc = {
      _type: 'recentlyAdded',
      title: 'Recently',
      titleHighlight: 'Added Machines',
      description: 'Check out our latest additions to the inventory. Premium quality machines imported from Europe and UK.',
      machines: productIds.slice(-4).map((id) => ({
        _type: 'reference',
        _ref: id,
      })),
    }
    await client.createOrReplace({
      ...recentlyAddedDoc,
      _id: 'recentlyAdded',
    })
    console.log('✅ Recently Added seeded\n')

    // 8. Seed CTAs
    console.log('📝 Seeding CTAs...')
    const ctas = [
      {
        _type: 'cta',
        title: 'Looking for Something Specific?',
        description: 'Our extensive inventory includes machines from leading manufacturers. Contact us to find the perfect solution for your manufacturing needs.',
        primaryButtonText: 'Browse All Machines',
        primaryButtonLink: '/products',
        secondaryButtonText: 'Request Quote',
        secondaryButtonLink: '/contact',
        order: 1,
      },
    ]

    for (const cta of ctas) {
      try {
        await client.create(cta)
        console.log(`  ✅ Created: ${cta.title}`)
      } catch (error: any) {
        console.error(`  ❌ Error creating ${cta.title}:`, error.message)
      }
    }
    console.log('✅ CTAs seeded\n')

    console.log('🎉 All data seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seedSanity()

