# Seeding Sanity - Permission Guide

## Error: Insufficient Permissions

If you see the error `Insufficient permissions; permission "create" required`, your API token doesn't have write permissions.

## How to Fix

### Step 1: Create a Token with Write Permissions

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project (`t5ek8ov6`)
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Give it a name (e.g., "Seeding Script")
6. **Important**: Select **Editor** or **Admin** role (not Viewer!)
7. Click **Save**
8. Copy the token (you'll only see it once)

### Step 2: Add Token to .env.local

Add or update the token in your `.env.local` file:

```env
SANITY_API_TOKEN=your-token-here
```

### Step 3: Run the Seed Script Again

```bash
npm run seed
```

## Alternative: Manual Seeding via Studio

If you prefer to add content manually:

1. Start Sanity Studio: `npm run studio`
2. Go to `http://localhost:3333`
3. Create documents manually:
   - Hero (create one document)
   - Products (create multiple)
   - About (create one document)
   - Footer (create one document)
   - Contact (create one document)
   - Machine Tool Categories (create multiple)
   - Recently Added (create one document)
   - CTAs (create multiple)

## Token Roles Explained

- **Viewer**: Read-only access (not sufficient for seeding)
- **Editor**: Can create, update, and delete documents (recommended for seeding)
- **Admin**: Full access including project settings (use if Editor doesn't work)

## Troubleshooting

### Token not working?
- Make sure there are no extra spaces in `.env.local`
- Restart your terminal after updating `.env.local`
- Verify the token is correct in Sanity Manage

### Still getting errors?
- Check that your project ID matches: `t5ek8ov6`
- Verify dataset name: `production`
- Ensure the token hasn't been revoked

