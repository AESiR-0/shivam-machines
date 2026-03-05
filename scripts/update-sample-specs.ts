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

async function updateSampleSpecs() {
    console.log('Fetching products...');
    const products = await client.fetch(`*[_type == "product"][0...2]`);

    if (products.length === 0) {
        console.log('No products found.');
        return;
    }

    for (const product of products) {
        console.log(`Updating ${product.title}...`);

        // Adding some sample technical specs based on what we added
        const sampleSpecs = {
            controlSystem: 'Fanuc / Siemens / Mitsubishi',
            workingSpindleDiameter: '80 mm',
            travelX: '400 mm',
            travelY: '300 mm',
            spindleSpeed: '6000 RPM',
            mainMotorPower: '7.5 kW',
            machineWeight: '3200 kg'
        };

        await client
            .patch(product._id)
            .set({ technicalSpecs: sampleSpecs })
            .commit();

        console.log(`✅ Updated ${product.title}`);
    }
}

updateSampleSpecs().catch(console.error);
