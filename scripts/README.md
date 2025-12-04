# Sanity Seeding Script

This script seeds your Sanity dataset with the existing website content.

## Prerequisites

1. Make sure you have `.env.local` file with:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (required for write operations)

2. Ensure your Sanity project is set up and accessible

## Usage

Run the seeding script:

```bash
npm run seed
```

## What Gets Seeded

The script will create/update:

1. **Hero** - Homepage hero section content
2. **Products** - 10 machine/product listings
3. **About** - About section with stats and features
4. **Footer** - Footer links and contact information
5. **Contact** - Contact page information
6. **Machine Tool Categories** - 8 machine categories
7. **Recently Added** - References to 4 most recent products
8. **CTAs** - Call-to-action sections

## Notes

- The script uses `createOrReplace` for singleton documents (Hero, About, Footer, Contact, Recently Added)
- Products and Categories use `create` and will skip if they already exist (based on slug)
- If you run the script multiple times, it will update existing documents instead of creating duplicates
- Make sure your `SANITY_API_TOKEN` has write permissions

## Troubleshooting

If you get permission errors:
- Check that your `SANITY_API_TOKEN` has Editor or Admin permissions
- Verify your project ID and dataset are correct

If documents already exist:
- The script will update them instead of creating new ones
- Check Sanity Studio to see the seeded content

