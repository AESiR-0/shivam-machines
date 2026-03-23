require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false
});

async function run() {
  const products = await client.fetch(`*[_type == "product"]`);
  const categories = await client.fetch(`*[_type == "machineToolCategory"]`);
  const mappedCategories = categories.map(c => ({ name: c.name, slug: c.slug?.current, href: c.href }));
  const uniquePCats = new Set(products.map(p => p.category));
  fs.writeFileSync('out.json', JSON.stringify({ mappedCategories, uniquePCats: Array.from(uniquePCats) }, null, 2));
}

run();
