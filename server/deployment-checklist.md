# Backend Deployment Checklist

This guide covers deploying the StudyNotion backend to production and configuring all required services.

## Prerequisites

Before deploying, ensure you have accounts for:
- **MongoDB Atlas** (database)
- **Cloudinary** (file storage)
- **Gmail** or SMTP service (email sending)
- **Razorpay** (payment processing) - Optional if not using payments
- **Google AI Studio** (Gemini API) - Optional if not using AI features

---

## Required Environment Variables

### 1. Database Configuration

**`MONGODB_URL`**
- **Purpose**: MongoDB connection string
- **How to get**:
  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a cluster (free tier available)
  3. Click "Connect" → "Connect your application"
  4. Copy the connection string
  5. Replace `<password>` with your database password
- **Example**: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studynotion?retryWrites=true&w=majority`

### 2. Authentication

**`JWT_SECRET`**
- **Purpose**: Secret key for signing JWT tokens
- **How to get**: Generate a random secure string
- **Generate command**: 
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Example**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### 3. Email Configuration (CRITICAL for OTP)

**`MAIL_HOST`**
- **For Gmail**: `smtp.gmail.com`
- **For Outlook**: `smtp-mail.outlook.com`
- **For SendGrid**: `smtp.sendgrid.net`

**`MAIL_USER`**
- **Purpose**: Email address to send from
- **Example**: `your-email@gmail.com`

**`MAIL_PASS`**
- **Purpose**: Email account password or app-specific password
- **For Gmail**:
  1. Enable 2-factor authentication on your Google account
  2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
  3. Create a new app password for "Mail"
  4. Use the generated 16-character password (remove spaces)
- **Example**: `abcd efgh ijkl mnop` → Use as `abcdefghijklmnop`

> [!WARNING]
> **Never use your actual Gmail password!** Always use an App Password for security.

### 4. Cloudinary Configuration (File Uploads)

**`CLOUD_NAME`**, **`API_KEY`**, **`API_SECRET`**
- **How to get**:
  1. Go to [Cloudinary](https://cloudinary.com/) and sign up
  2. Go to Dashboard
  3. Find "Account Details" section
  4. Copy Cloud name, API Key, and API Secret

**`FOLDER_NAME`**
- **Purpose**: Folder name in Cloudinary to organize uploads
- **Example**: `studynotion` or `studynotion-prod`

### 5. Payment Gateway (Optional)

**`RAZORPAY_KEY`**, **`RAZORPAY_SECRET`**
- **How to get**:
  1. Go to [Razorpay](https://razorpay.com/) and create account
  2. Navigate to Settings → API Keys
  3. Generate Test/Live keys
  4. Copy Key ID and Key Secret

> [!IMPORTANT]
> Use **Test Mode** keys for testing, **Live Mode** for production.

### 6. AI Features (Optional)

**`GEMINI_API_KEY`**
- **How to get**:
  1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
  2. Click "Create API Key"
  3. Copy the generated key

### 7. Server Configuration

**`PORT`**
- **Purpose**: Port number for the server
- **Default**: `4000`
- **Note**: Most hosting platforms assign this automatically

---

## Deployment Platforms

### Render

1. Create new Web Service
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in "Environment" tab
6. Deploy

### Railway

1. Create new project from GitHub repo
2. Select `server` directory as root (if monorepo)
3. Add all environment variables in "Variables" tab
4. Deploy automatically

### Heroku

```bash
heroku create your-app-name
heroku config:set MONGODB_URL="your_mongodb_url"
heroku config:set JWT_SECRET="your_jwt_secret"
# ... add all other variables
git push heroku main
```

---

## Testing Deployment

### 1. Health Check

Test if server is running:
```bash
curl https://your-deployed-url.com/
```

**Expected response:**
```json
{
  "success": true,
  "message": "Your server is up and running..."
}
```

### 2. Test OTP Sending

**Frontend steps:**
1. Go to signup page
2. Enter email address
3. Click "Send OTP"
4. Check email inbox (and spam folder)

**Troubleshooting if OTP doesn't arrive:**
- Check deployment logs for email errors
- Verify `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` are set correctly
- For Gmail, ensure App Password is used (not regular password)
- Check Gmail "Less secure app access" is not blocking

### 3. Test Login

1. Complete signup with OTP
2. Try logging in with email/password
3. Should redirect to dashboard

### 4. Check Backend Logs

View logs on your deployment platform:
- **Render**: Logs tab
- **Railway**: Deployment logs
- **Heroku**: `heroku logs --tail`

Look for:
- ✅ "App is listening at PORT"
- ✅ "DB connected successfully"
- ❌ Any errors about missing environment variables
- ❌ Nodemailer errors

---

## Common Issues & Solutions

### Issue: OTP Email Not Received

**Causes:**
- Email credentials not configured
- Using Gmail password instead of App Password
- SMTP host/port incorrect

**Solution:**
```bash
# Check if variables are set in deployment platform
echo $MAIL_HOST
echo $MAIL_USER
echo $MAIL_PASS
```
- Verify `MAIL_HOST=smtp.gmail.com` for Gmail
- Use App Password (16 characters, no spaces)
- Check spam/junk folder

### Issue: Login Returns 500 Error

**Cause:** `JWT_SECRET` not set

**Solution:**
- Set `JWT_SECRET` environment variable
- Restart the deployment

### Issue: Database Connection Failed

**Cause:** `MONGODB_URL` incorrect or not set

**Solution:**
- Verify MongoDB Atlas connection string
- Ensure database user has read/write permissions
- Check IP whitelist (use `0.0.0.0/0` to allow all)

### Issue: File Upload Fails

**Cause:** Cloudinary not configured

**Solution:**
- Set all 4 Cloudinary variables: `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME`
- Verify credentials in Cloudinary dashboard

---

## Environment Variables Summary

Copy this into your deployment platform:

```bash
# Database
MONGODB_URL=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_random_secret_key

# Email (CRITICAL)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your_app_password

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
FOLDER_NAME=studynotion

# Razorpay (Optional)
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# AI (Optional)
GEMINI_API_KEY=your_gemini_api_key

# Server
PORT=4000
```

---

## Security Best Practices

- ✅ Never commit `.env` file to Git
- ✅ Use App Passwords for Gmail (not main password)
- ✅ Use Test Mode for Razorpay during development
- ✅ Rotate secrets periodically
- ✅ Use different credentials for dev/staging/prod
- ✅ Set up MongoDB IP whitelist properly
- ❌ Never expose API keys in frontend code

---

## Next Steps After Deployment

1. Update frontend `API_URL` to point to deployed backend
2. Update CORS origin in [index.js](file:///d:/studynotion/server/index.js#L51) to include your frontend URL
3. Test all features: signup, login, courses, payments, AI chat
4. Set up monitoring and error tracking (e.g., Sentry)
5. Configure automatic backups for MongoDB

---

## Support

If you encounter issues:
1. Check deployment platform logs
2. Verify all environment variables are set
3. Test each endpoint individually using the `verify_backend.js` script
4. Check email spam folder for OTP emails
