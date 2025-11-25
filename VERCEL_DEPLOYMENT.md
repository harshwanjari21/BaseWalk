# 🚀 Vercel Deployment Guide

## ✅ **Step 1: Fixed vercel.json (Done!)**
The `scripts` property error has been fixed.

## 🔧 **Step 2: Set Environment Variables in Vercel**

Go to your Vercel project dashboard and add these environment variables:

### **Required Environment Variables:**

1. **DATABASE_URL**
   ```
   mysql://avnadmin:YOUR_AIVEN_PASSWORD@mysql-35ecb954-harshproject9-1a3a.h.aivencloud.com:23258/defaultdb?ssl-mode=REQUIRED
   ```

2. **FITBIT_CLIENT_ID**
   ```
   YOUR_FITBIT_CLIENT_ID
   ```

3. **FITBIT_CLIENT_SECRET**
   ```
   YOUR_FITBIT_CLIENT_SECRET
   ```

4. **ENCRYPTION_KEY**
   ```
   YOUR_32_CHARACTER_ENCRYPTION_KEY
   ```

5. **NEXT_PUBLIC_APP_URL**
   ```
   https://your-vercel-domain.vercel.app
   ```

6. **FITBIT_REDIRECT_URI**
   ```
   https://your-vercel-domain.vercel.app/api/fitbit/callback
   ```

## 📋 **How to Add Environment Variables in Vercel:**

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" 
4. Add each variable above (Name and Value)
5. Make sure to select "Production", "Preview", and "Development" for all variables

## 🔄 **Step 3: Update Your Fitbit App After Deployment**

After Vercel gives you a domain (e.g., `your-app-name.vercel.app`):

1. Go to https://dev.fitbit.com/apps
2. Edit your Fitbit app
3. Update these URLs:
   - **Application Website URL**: `https://your-vercel-domain.vercel.app`
   - **Organization Website URL**: `https://your-vercel-domain.vercel.app`
   - **Redirect URL**: `https://your-vercel-domain.vercel.app/api/fitbit/callback`
4. Save changes

## 🚀 **Step 4: Deploy**

After adding environment variables, trigger a new deployment:
- Commit and push your changes, OR
- Click "Redeploy" in Vercel dashboard

## ✅ **Deployment Checklist**

- [x] Fixed vercel.json configuration
- [ ] Add all 6 environment variables in Vercel
- [ ] Deploy and get your domain URL
- [ ] Update Fitbit app with production URLs
- [ ] Test the complete OAuth flow

**Ready to proceed with adding environment variables in Vercel?**