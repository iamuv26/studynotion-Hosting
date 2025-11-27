# StudyNotion Backend Server

This is the backend server for the StudyNotion EdTech platform built with Node.js and Express.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your credentials
   ```

3. **Validate configuration:**
   ```bash
   node validate-env.js
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

## Deployment

**📋 For detailed deployment instructions, see [deployment-checklist.md](./deployment-checklist.md)**

This comprehensive guide covers:
- Setting up all required services (MongoDB, Cloudinary, Email, etc.)
- Configuring environment variables
- Deploying to various platforms (Render, Railway, Heroku)
- Testing and troubleshooting

### Quick Deployment Checklist

✅ MongoDB Atlas database configured  
✅ Email credentials (Gmail App Password) configured  
✅ JWT secret generated  
✅ Cloudinary account set up  
✅ All environment variables added to deployment platform  
✅ Validation passed: `node validate-env.js`

## Environment Variables

See [.env.example](./.env.example) for a complete list of required environment variables with descriptions.

### Critical Variables (Required)
- `MONGODB_URL` - Database connection
- `JWT_SECRET` - Authentication
- `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` - Email/OTP sending

### Important Variables (Highly Recommended)
- `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME` - File uploads

### Optional Variables
- `RAZORPAY_KEY`, `RAZORPAY_SECRET` - Payments
- `GEMINI_API_KEY` - AI features

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /signup` - User registration
- `POST /sendotp` - Send OTP for verification
- `POST /login` - User login
- `POST /changepassword` - Change password
- `POST /reset-password-token` - Request password reset
- `POST /reset-password` - Reset password

### Profile (`/api/v1/profile`)
- User profile management

### Course (`/api/v1/course`)
- Course creation and management

### Payment (`/api/v1/payment`)
- Payment processing with Razorpay

### Contact (`/api/v1/reach`)
- Contact form submissions

### AI (`/api/v1/ai`)
- AI-powered features

## Testing

Run the backend verification script:
```bash
node verify_backend.js
```

## Troubleshooting

### OTP emails not sending
- Verify `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` are set
- For Gmail, use App Password (not regular password)
- Check deployment logs for email errors

### Login fails with 500 error
- Ensure `JWT_SECRET` is set
- Check MongoDB connection

### File uploads fail
- Verify all Cloudinary variables are set
- Check Cloudinary dashboard for errors

**For more troubleshooting, see [deployment-checklist.md](./deployment-checklist.md)**

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node validate-env.js` - Validate environment configuration
- `node verify_backend.js` - Verify backend endpoints

## Security

- Never commit `.env` file
- Use App Passwords for email services
- Rotate secrets regularly
- Use different credentials for dev/staging/production

## Support

For deployment issues, refer to the [deployment-checklist.md](./deployment-checklist.md) guide.
