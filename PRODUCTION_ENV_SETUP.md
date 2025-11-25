# 🚀 Vercel Environment Variables Setup

## Your Production URL: https://base-walk.vercel.app/

## 🔧 **Add These Environment Variables in Vercel Dashboard:**

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

### **Add Each Variable:**

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

4. **FITBIT_REDIRECT_URI**
   ```
   https://base-walk.vercel.app/api/fitbit/callback
   ```

5. **ENCRYPTION_KEY**
   ```
   8fce07ac162d39e7271e78508d5aa0dd
   ```

6. **NEXT_PUBLIC_APP_URL**
   ```
   https://base-walk.vercel.app
   ```

## 🔄 **Update Your Fitbit App Settings**

Go to: https://dev.fitbit.com/apps → Edit your app:

1. **Application Website URL:**
   ```
   https://base-walk.vercel.app
   ```

2. **Organization Website URL:**
   ```
   https://base-walk.vercel.app
   ```

3. **Redirect URL:**
   ```
   https://base-walk.vercel.app/api/fitbit/callback
   ```

4. **Terms of Service URL:**
   ```
   https://base-walk.vercel.app/terms
   ```

5. **Privacy Policy URL:**
   ```
   https://base-walk.vercel.app/privacy
   ```

## ✅ **After Setup:**

1. **Redeploy** your Vercel app (to pick up new environment variables)
2. **Test** at https://base-walk.vercel.app
3. **Connect to Fitbit** and complete OAuth flow
4. **Celebrate!** 🎉

---

**Your app will be fully functional once these environment variables are set in Vercel!**