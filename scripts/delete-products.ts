import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-11',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function deleteAllProducts() {
    console.log('Fetching all products...');
    const products = await client.fetch(`*[_type == "product"]{_id}`);

    if (products.length === 0) {
        console.log('No products found.');
        return;
    }

    console.log(`Found ${products.length} products to delete. Removing...`);

    for (const product of products) {
        try {
            await client.delete(product._id);
            console.log(`✅ Deleted product ${product._id}`);
        } catch (err: any) {
            console.error(`❌ Failed to delete product ${product._id}: ${err.message}`);
        }
    }
}

deleteAllProducts().catch(console.error);
