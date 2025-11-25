# Fitbit Steps Tracker - Farcaster Mini App

A Farcaster mini app that connects to your Fitbit account and displays your daily step count with automatic syncing every 3 hours.

## Features

- 🔐 Secure OAuth 2.0 authentication with Fitbit
- 👟 Real-time step tracking
- 🔄 Automatic data sync every 3 hours
- 💾 MySQL database with encrypted token storage
- 🎨 Clean, responsive UI built with shadcn/ui
- ⚡ Built with Next.js 16 and React 19

## Current Status

✅ **Completed Setup:**
- Next.js 16 + React 19 project initialized
- All necessary dependencies installed
- Prisma ORM configured with MySQL
- Fitbit API routes created
- UI components built
- Farcaster integration ready
- Database schema defined
- Encryption utilities implemented

📋 **Next Steps:**
1. Set up your Aiven MySQL database
2. Create your Fitbit developer app  
3. Update environment variables
4. Push database schema
5. Test the application

## Prerequisites

Before you begin, you need:

1. **Fitbit Developer Account**
   - Register at [dev.fitbit.com](https://dev.fitbit.com/)
   - Create a new application
   - Note down your Client ID and Client Secret

2. **Aiven MySQL Database** (Free)
   - Sign up at [aiven.io](https://aiven.io)
   - Create a free MySQL service
   - Get your connection string

3. **Node.js 18+** ✅ (Already satisfied)

## Quick Setup Guide

### 1. Dependencies ✅ 
Dependencies are already installed.

### 2. Set Up Aiven MySQL Database

1. Go to [aiven.io](https://aiven.io) and create a free account
2. Click "Create Service" → Select MySQL → Choose Free Plan (1GB)
3. Select a region closest to you → Click "Create Service"
4. Wait 2-3 minutes for the database to start
5. Copy the Service URI from the "Overview" tab

### 3. Create Fitbit Developer App

1. Go to [dev.fitbit.com/apps](https://dev.fitbit.com/apps)
2. Click "Register a New Application"
3. Fill in the details:
   - **Callback URL**: `http://localhost:3000/api/fitbit/callback`
   - **OAuth 2.0 Application Type**: Server
   - **Default Access Type**: Read-Only
4. Save and copy your Client ID and Client Secret

### 4. Update Environment Variables

Edit the `.env` file with your actual credentials:

```env
# Replace with your Aiven MySQL connection string
DATABASE_URL="mysql://your-username:your-password@your-host:your-port/defaultdb?ssl-mode=REQUIRED"

# Replace with your Fitbit app credentials
FITBIT_CLIENT_ID="your_actual_fitbit_client_id"
FITBIT_CLIENT_SECRET="your_actual_fitbit_client_secret"
FITBIT_REDIRECT_URI="http://localhost:3000/api/fitbit/callback"

# Already generated for you
ENCRYPTION_KEY="8fce07ac162d39e7271e78508d5aa0dd"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Push Database Schema

```bash
npx prisma db push
```

### 6. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Included

### ✅ API Routes
- `/api/fitbit/auth` - Initiate OAuth flow
- `/api/fitbit/callback` - OAuth callback handler
- `/api/fitbit/refresh-token` - Refresh expired tokens
- `/api/fitbit/steps` - Fetch step data
- `/api/fitbit/sync` - Manual sync trigger
- `/api/fitbit/status` - Check connection status

### ✅ Components
- `FitbitConnectButton` - OAuth connection interface
- `StepsDisplay` - Step count visualization
- `FarcasterWrapper` - Farcaster integration
- UI components (Button, Card, Skeleton)

### ✅ Database Schema
- `User` table with encrypted token storage
- `StepsData` table for daily step tracking
- Proper indexes and relationships

### ✅ Security Features
- AES-256 token encryption
- Automatic token refresh
- Secure credential storage

## Deployment to Vercel

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Deploy on [vercel.com](https://vercel.com):
   - Import your GitHub repository
   - Add all environment variables
   - Deploy

3. Update Fitbit callback URL to production domain

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: TypeScript, Next.js API Routes
- **Database**: MySQL (Aiven) with Prisma ORM
- **Authentication**: OAuth 2.0
- **Encryption**: AES-256-CBC

## Support

For issues or questions:
1. Check Fitbit API docs: [dev.fitbit.com/build/reference](https://dev.fitbit.com/build/reference)
2. Review Prisma docs: [prisma.io/docs](https://prisma.io/docs)
3. Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
