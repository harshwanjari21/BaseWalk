# 🏃‍♂️ Fitbit Developer Account Setup - Step by Step

## ✅ **Prerequisites**
- ✅ Your local server is running at: http://localhost:3000
- ✅ Aiven MySQL database is configured and working
- ✅ All code is ready and error-free

## 📋 **Step-by-Step Instructions**

### **Step 1: Create Fitbit Account (if needed)**
1. Go to: https://accounts.fitbit.com/signup
2. Create a Fitbit account (or use existing one)
3. Verify your email address

### **Step 2: Access Developer Console**
1. Go to: https://dev.fitbit.com/apps
2. Click "Login" (top right)
3. Sign in with your Fitbit account

### **Step 3: Register Your Application**
Click "Register a New App" and fill in:

**Application Details:**
```
App Name: Fitbit Steps Tracker - Farcaster Mini App
Description: A Farcaster mini app that tracks daily steps from Fitbit
Application Website: http://localhost:3000
Organization: [Your Name or Organization]
Organization Website: http://localhost:3000
```

**OAuth 2.0 Application Type:**
- Select: `Personal`

**Callback URL:**
```
http://localhost:3000/api/fitbit/callback
```

**Default Access Type:**
- Select: `Read-Only`

**Application Type:**
- Select: `Browser`

### **Step 4: Copy Your Credentials**
After registration, you'll see:

```
OAuth 2.0 Client ID: [COPY THIS]
Client Secret: [COPY THIS - Click "Show" to reveal]
```

### **Step 5: Update Your .env File**
Replace the placeholder values in your `.env` file:

```env
FITBIT_CLIENT_ID="paste_your_client_id_here"
FITBIT_CLIENT_SECRET="paste_your_client_secret_here"
```

### **Step 6: Test the Integration**

1. **Keep your server running**: `npm run dev` (already running ✅)

2. **Open your app**: http://localhost:3000

3. **Click "Connect to Fitbit"**

4. **Complete OAuth flow**:
   - You'll be redirected to Fitbit
   - Login with your Fitbit account
   - Grant permissions
   - You'll be redirected back to localhost:3000

5. **View your steps data**!

## 🔄 **Important: Keep Server Running**

**Yes, you need to keep your local server running** during development because:
- ✅ Fitbit needs to redirect back to `http://localhost:3000/api/fitbit/callback`
- ✅ Your app needs to handle the OAuth response
- ✅ API routes need to process the authentication

## 🚨 **Common Issues & Solutions**

**If callback fails:**
- ✅ Make sure server is running on port 3000
- ✅ Check callback URL is exactly: `http://localhost:3000/api/fitbit/callback`
- ✅ Ensure no trailing slashes in URLs

**If OAuth fails:**
- ✅ Double-check Client ID and Secret in .env
- ✅ Restart your dev server after updating .env
- ✅ Clear browser cache

## 🎯 **After Testing Locally**

Once everything works locally, you can:
1. Deploy to production (Vercel/Railway/etc.)
2. Update Fitbit app settings with production URLs
3. Update .env with production callback URL

---

## 📋 **Quick Checklist**

- [ ] Go to https://dev.fitbit.com/apps
- [ ] Register new app with localhost URLs
- [ ] Copy Client ID and Secret
- [ ] Update .env file
- [ ] Test at http://localhost:3000
- [ ] Celebrate! 🎉

**Ready? Let's create that Fitbit developer account!**