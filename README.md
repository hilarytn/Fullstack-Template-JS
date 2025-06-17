# Fullstack-Template-JS - MERN Stack (MongoDB, ExpressJS, ReactJS and NodeJS)
#  Auth API Backend

A modern Node.js backend providing secure **User Authentication** via **Email/Password** and **Google OAuth 2.0**, equipped with access/refresh token handling, password recovery, and detailed API documentation via Swagger.

##  Features

- ✅ User Registration & Login
- ✅ Email Verification
- ✅ Google OAuth 2.0 Login
- ✅ Refresh Tokens & Secure Cookie Storage
- ✅ Password Reset via Email
- ✅ Rate Limiting & Helmet for Security
- ✅ Swagger UI for API Documentation
- ✅ JWT Access Tokens with Expiration
- ✅ Fully Modular Structure with Middlewares, Controllers, and Validations

##  Tech Stack

- **Backend:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT, Google OAuth (via `google-auth-library`)
- **Validation:** Joi
- **Security:** Helmet, Rate Limiting, bcryptjs
- **Documentation:** Swagger UI + JSDoc comments
- **ReactJS (Frontend coming soon...)

## 📁 Folder Structure

├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validations/
├── server.js
└── .env


## 📄 API Documentation

Available at:  
**`/api-docs`** → Example: `https://your-deployment-url.com/api-docs`  
Auto-generated from route JSDoc using `swagger-jsdoc` and `swagger-ui-express`.

---

## 🧪 Environment Variables

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/v1/auth/google/callback
EMAIL_HOST=smtp.mailtrap.io or smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

