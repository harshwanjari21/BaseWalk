# 🗄️ Database Inspection Commands

## 📊 **Option 1: Visual Database Browser (Recommended)**
```bash
npx prisma studio
```
This opens a web interface at http://localhost:5555 where you can:
- ✅ View all tables and data
- ✅ Add/edit/delete records
- ✅ Browse relationships
- ✅ Filter and search data

## 🔍 **Option 2: Check Database Status**
```bash
# Check if database is accessible
npx prisma db execute --stdin --schema ./prisma/schema.prisma
```
Then type: `SHOW TABLES;` and press Ctrl+D

## 📋 **Option 3: View Database Schema**
```bash
# Generate a visual representation of your database
npx prisma db pull
```

## 🔄 **Option 4: Check Connection**
```bash
# Test database connection
npx prisma db execute --stdin --schema ./prisma/schema.prisma
```
Then type: `SELECT 1;` and press Ctrl+D

## 📈 **Option 5: View Table Data via API**
Since your server is running, you can also check data via your API:

```bash
# In a new terminal or browser:
curl "http://localhost:3000/api/fitbit/status?userId=test_user"
```

## 🏗️ **Current Database Schema**

Your database has these tables:
- **User**: Stores Fitbit user info and encrypted tokens
- **StepsData**: Stores daily step counts

**Columns in User table:**
- id (Primary Key)
- farcasterFid 
- fitbitUserId
- accessToken (encrypted)
- refreshToken (encrypted)
- tokenExpiresAt
- createdAt, updatedAt

**Columns in StepsData table:**
- id (Primary Key)
- userId (Foreign Key to User)
- steps (Integer)
- date (Date)
- syncedAt (Timestamp)

## 🎯 **Quick Check Commands**

**Check if tables exist:**
```bash
npx prisma db execute --stdin
# Then type: SHOW TABLES;
```

**Count records:**
```bash
npx prisma db execute --stdin
# Then type: SELECT COUNT(*) FROM User;
# And: SELECT COUNT(*) FROM StepsData;
```

**View recent data:**
```bash
npx prisma db execute --stdin
# Then type: SELECT * FROM User LIMIT 5;
# And: SELECT * FROM StepsData LIMIT 5;
```

---

**🚀 Start with: `npx prisma studio` - it's the easiest way to see everything!**