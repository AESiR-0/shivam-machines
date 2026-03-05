import { createClient } from 'next-sanity';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-11',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const urlsToScrape = [
    { url: 'https://www.fermatmachinery.com/used-machines/machining-centres/vertical/ma-600-h-ii-en-251189/', category: 'cnc' },
    { url: 'https://www.fermatmachinery.com/used-machines/machining-centres/horizontal/h-40-en-251791/', category: 'cnc' },
    { url: 'https://www.fermatmachinery.com/used-machines/borers-horizontal/table-diameter-of-spindle-over-90-mm/w-100-a-en-251737/', category: 'boring' },
    { url: 'https://www.fermatmachinery.com/used-machines/borers-horizontal/table-diameter-of-spindle-to-90-mm/w-75-en-261173/', category: 'boring' },
    { url: 'https://www.fermatmachinery.com/used-machines/borers-horizontal/h-floor-type/afp-180-en-221138/', category: 'boring' },
    { url: 'https://www.fermatmachinery.com/used-machines/borers-horizontal/rotary-table/drts3100-en-231340/', category: 'boring' },
    { url: 'https://www.fermatmachinery.com/used-machines/vertical-lathes/single-column/ds-12-nc-en-231267/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/vertical-lathes/double-column/1525-cnc-en-241421/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/lathes/cnc-diameter-up-to-800-mm/nef-400-en-251684/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/lathes/cnc-diameter-over-800-mm/sng-1600x10000-en-231675/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/lathes/cnc-multi-axis/gls-200y-en-252017/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/lathes/centre-to-diameter-800-mm/sn-320-750-en-251913/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/lathes/centre-diameters-over-800-mm/sr-2000x8-en-201865/', category: 'lathe' },
    { url: 'https://www.fermatmachinery.com/used-machines/lathes/automatic/sl-154sy-en-221725/', category: 'lathe' },
];

const reverseSpecMapping: { [key: string]: string } = {
    'Control system': 'controlSystem',
    'Diameter of working spindle': 'workingSpindleDiameter',
    'Travel X-axis': 'travelX',
    'Travel Y-axis': 'travelY',
    'Spindle speed': 'spindleSpeed',
    'Spindle travel - W axis': 'travelW',
    'Cooling through spindle': 'coolingThroughSpindle',
    'Pressure of cooling': 'coolingPressure',
    'Tool magazine': 'toolMagazine',
    'Spindle taper': 'spindleTaper',
    'Travel Z-axis': 'travelZ',
    'Axis V': 'axisV',
    'Clamping area of table': 'clampingAreaOfTable',
    'Max. load of table': 'maxLoadOfTable',
    'Main motor power': 'mainMotorPower',
    'Machine dimensions l x w x h': 'machineDimensions',
    'Machine weight': 'machineWeight',
    'Clamping area of rotary table': 'clampingAreaOfRotaryTable',
    'Number of positions in magazine': 'numberOfPositionsInMagazine',
    'Total input': 'totalInput',
    'Face plate diameter': 'facePlateDiameter',
    'Max. diameter of face turning': 'maxDiameterOfFaceTurning',
    'Rapid feed': 'rapidFeed',
    'Table dimensions': 'tableDimensions',
    'Ram dimensions': 'ramDimensions',
    'Ram travel (Z)': 'ramTravelZ',
    'Max. diameter of milled wheel': 'maxDiameterOfMilledWheel',
    'X-axis rapid feed': 'rapidFeedX',
    'Y-axis rapid feed': 'rapidFeedY',
    'Z-axis rapid feed': 'rapidFeedZ',
    'Number of driven axes': 'numberOfDrivenAxes',
    'Max. weight of workpiece': 'maxWeightOfWorkpiece',
    'Number of pallets': 'numberOfPallets',
    'Axis B': 'axisB',
    'Axis C': 'axisC',
    'Space of machine': 'spaceOfMachine',
    'Accuracy - repeatability': 'accuracyRepeatability',
    'Accuracy - positioning': 'accuracyPositioning',
    'Max. diameter of workpiece': 'maxDiameterOfWorkpiece',
    'Max. length of workpiece': 'maxLengthOfWorkpiece',
    'Max. workpiece height': 'maxWorkpieceHeight',
    'Driven Tools': 'drivenTools',
    'Axis W': 'axisW',
    'Table Rotation': 'tableRotation',
    'Turret head': 'turretHead',
    'Clamping diameter of rotary table': 'clampingDiameterOfRotaryTable',
    'Max. torque of spindle': 'maxTorqueOfSpindle',
    'Swing over cross slide': 'swingOverCrossSlide',
    'Spindle bore': 'spindleBore',
    'Rotations of clamping plate': 'rotationsOfClampingPlate',
    'Feeding speed': 'feedingSpeed',
    'Number of tool positions (driven)': 'numberOfToolPositionsDriven',
    'Speed driven tools': 'speedDrivenTools',
    'Turn table diameter': 'turnTableDiameter',
    'Turning length': 'turningLength',
    'Bar loader': 'barLoader',
    'Sloping bed': 'slopingBed',
    'Max. bar diameter': 'maxBarDiameter',
    'Swing over bed': 'swingOverBed',
    'Chuck diameter': 'chuckDiameter',
    'Distance between centres': 'distanceBetweenCentres',
    'Milling head': 'millingHead',
    'Counterspindle': 'counterspindle',
    'Travel Y-axis (lathe)': 'travelYLathe',
    'Max. drilling diameter': 'maxDrillingDiameter',
    'Grinding spindle speed': 'grindingSpindleSpeed',
};

async function uploadImageFromUrl(imageUrl: string) {
    try {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Determine filename
        const filename = imageUrl.split('/').pop()?.split('?')[0] || 'scraped-image.jpg';

        const asset = await client.assets.upload('image', buffer, {
            filename: filename
        });

        console.log(`Uploaded image: ${asset._id}`);
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id,
            },
            options: { hotspot: true }
        };
    } catch (err) {
        console.error(`Failed to upload image from ${imageUrl}:`, err);
        return null;
    }
}

function normalizeTitle(titleHtml: string) {
    return titleHtml.replace(/<[^>]+>/g, '').trim().split(' / ').pop() || titleHtml;
}

// Ensure the title represents a valid slug
function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function scrapeAndUpload() {
    console.log(`Starting to scrape ${urlsToScrape.length} products...`);

    for (const { url, category } of urlsToScrape) {
        console.log(`\nScraping: ${url}`);

        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            // Extract general product information
            // In typical fermatmachinery format, the title is in h1
            let rawTitle = $('h1').first().text().trim();
            let title = normalizeTitle(rawTitle);

            // Fallback if H1 wasn't found properly or has strange characters
            if (!title || title.length === 0) {
                title = $('title').text().split('|')[0].trim();
            }

            console.log(`-> Title: ${title}`);

            // Extract description
            let description = $('#description').text().trim() ||
                $('.product-description').text().trim() ||
                $('meta[name="description"]').attr('content') ||
                'Premium used machine tool imported directly from Europe.';

            let year = null;
            let manufacturer = null;
            const technicalSpecs: Record<string, string> = {};

            // Parse the technical specifications table
            // Let's assume there are dt/dd pairs or table rows
            $('dt').each((i, el) => {
                const keyText = $(el).text().trim().replace(/:$/, '');
                const valText = $(el).next('dd').text().trim();

                if (keyText === 'YOM' || keyText.includes('Year')) {
                    year = parseInt(valText, 10);
                } else if (keyText === 'Producer') {
                    manufacturer = valText;
                } else {
                    // Look up mapped key
                    const mappedKey = reverseSpecMapping[keyText];
                    if (mappedKey) {
                        technicalSpecs[mappedKey] = valText;
                    } else {
                        // Unmapped spec, ignoring or log
                        if (keyText !== 'Inventory number' && keyText !== 'Machine type') {
                            console.log(`   Unmapped spec: ${keyText} = ${valText}`);
                        }
                    }
                }
            });

            // Also check standard table formats just in case
            $('tr').each((i, el) => {
                const keyText = $(el).find('th').text().trim() || $(el).find('td').first().text().trim();
                const valText = $(el).find('th').length > 0 ? $(el).find('td').text().trim() : $(el).find('td').last().text().trim();

                if (keyText && valText && keyText !== valText) {
                    if (keyText === 'YOM' || keyText.includes('Year')) {
                        year = parseInt(valText, 10);
                    } else if (keyText === 'Producer') {
                        manufacturer = valText;
                    } else {
                        const mappedKey = reverseSpecMapping[keyText];
                        if (mappedKey) {
                            technicalSpecs[mappedKey] = valText;
                        }
                    }
                }
            });

            // Extract Images
            const images: any[] = [];
            const imageSet = new Set<string>();

            // Look for og:image first as a reliable main image
            const ogImage = $('meta[property="og:image"]').attr('content');
            if (ogImage) {
                let cleanImage = ogImage.startsWith('//') ? 'https:' + ogImage : ogImage;
                if (cleanImage.startsWith('/')) cleanImage = 'https://www.fermatmachinery.com' + cleanImage;
                imageSet.add(cleanImage);
            }

            // Look for gallery images
            $('a[data-fancybox], .gallery img').each((i, el) => {
                let imgSrc = $(el).attr('href') || $(el).attr('src');
                if (imgSrc) {
                    let cleanImage = imgSrc.startsWith('//') ? 'https:' + imgSrc : imgSrc;
                    if (cleanImage.startsWith('/')) cleanImage = 'https://www.fermatmachinery.com' + cleanImage;
                    imageSet.add(cleanImage);
                }
            });

            // Only take up to 5 images to save time and space
            let imgCount = 0;
            for (const imgUrl of Array.from(imageSet)) {
                if (imgCount >= 5) break;
                console.log(`-> Found image: ${imgUrl}`);
                const uploadedImg = await uploadImageFromUrl(imgUrl);
                if (uploadedImg) {
                    images.push(uploadedImg);
                    imgCount++;
                }
            }

            const slug = slugify(title);

            // Create product document
            const doc = {
                _type: 'product',
                title: title,
                slug: { _type: 'slug', current: slug },
                description: description,
                category: category,
                technicalSpecs: technicalSpecs,
                images: images.length > 0 ? images : undefined,
                isInStock: true,
                dateAdded: new Date().toISOString().split('T')[0],
                year: isNaN(year!) ? undefined : year,
                manufacturer: manufacturer,
                condition: 'very-good',
                price: 'Price on Request'
            };

            await client.create(doc);
            console.log(`✅ Successfully migrated product: ${title}`);

        } catch (err: any) {
            console.error(`❌ Failed to scrape ${url}: ${err.message}`);
        }
    }
}

scrapeAndUpload().catch(console.error);
