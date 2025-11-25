# 🚀 Quick Deployment Guide

## **Option 1: Deploy Now (5 minutes)**

Run these commands to deploy your app:

```bash
# Login to Vercel (will open browser)
vercel login

# Deploy your app
vercel --prod

# Set environment variables in Vercel dashboard:
# DATABASE_URL, FITBIT_CLIENT_ID, FITBIT_CLIENT_SECRET, ENCRYPTION_KEY
```

After deployment, you'll get a URL like: `https://your-app-name.vercel.app`

Then use this URL for Fitbit registration:
- **Application Website:** `https://your-app-name.vercel.app`
- **Callback URL:** `https://your-app-name.vercel.app/api/fitbit/callback`

## **Option 2: Test Locally First**

Go to https://dev.fitbit.com/apps and register with:
- **Application Website:** `http://localhost:3000`
- **Callback URL:** `http://localhost:3000/api/fitbit/callback`
- **OAuth 2.0 Application Type:** Personal

You can update these URLs later when you deploy!

## **Recommended: Option 2 (Test Locally)**

Start with localhost, test everything, then deploy and update URLs.

**Which approach do you prefer?**