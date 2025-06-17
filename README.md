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
**`/api-docs`** → Example: `https://fullstack-template-js.onrender.com/api-docs/`  
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
EMAIL_HOST=smtp.mailtrap.io or smtp.gmail.com  //adjust to suit your host
EMAIL_PORT=587 //adjust to suit your port
EMAIL_USER=your_email_user //adjust to suit your user
EMAIL_PASS=your_email_password //adjust to suit your password



# 🔐 Auth API – Node.js Authentication System

A full-featured authentication module built with **Express**, **MongoDB**, and **JWT**, including support for **email verification**, **Google OAuth**, **refresh tokens**, and **Swagger API documentation**.

---

## 📆 Tech Stack

* **Backend:** Express 5, Node.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JWT, Refresh Tokens, Google OAuth
* **Validation:** Joi
* **Docs:** Swagger (OpenAPI 3.0)
* **Security:** Helmet, Rate Limiting, Cookie-Parser
* **Email:** Nodemailer
* **Others:** Google Auth Library, node-fetch, dotenv, morgan

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/hilarytn/Fullstack-Template-JS.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file in the root with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_root_url/api/v1/auth/google/callback

EMAIL_USER=your_email
EMAIL_PASS=your_email_password //this is the application password
```

### 4. Run the server

```bash
npm run dev
```

---

## 🔐 Authentication Flow

### Register

* `POST /api/v1/auth/register`
  Returns success message and sends email verification link.

### Verify Email

* `GET /api/v1/auth/verify-email?token=JWT`

### Login

* `POST /api/v1/auth/login`
  Returns `accessToken`, sets `refreshToken` in httpOnly cookie.

### Logout

* `POST /api/v1/auth/logout`
  Clears the user's `refreshToken` from DB and cookie.

### Refresh Access Token

* `POST /api/v1/auth/refresh-token`
  Generates a new `accessToken` if valid `refreshToken` cookie exists.

### Forgot & Reset Password

* `POST /api/v1/auth/forgot-password`
  Sends reset link via email.

* `POST /api/v1/auth/reset-password/:token`
  Sets a new password using the token.

---

## 🌐 Google OAuth 2.0

### Redirect to Google

* `GET /api/v1/auth/google`

### Google Callback

* `GET /api/v1/auth/google/callback`
  Verifies the token, logs user in, sets `refreshToken`, and returns `accessToken`.

---

## 📘 API Documentation

View Swagger UI at:
**[`/api-docs`](https://fullstack-template-js.onrender.com/api-docs/api-docs)**
Note: render free instances spin down due to inactivity. You may need to wait for at least 50 seconds for the page to load in such a scenario

---

## 🌍 Deployment (Render)

1. Connect your GitHub repo to [Render](https://render.com)
2. Add environment variables via the dashboard
3. Use Build Command: `npm install`
4. Use Start Command: `npm start`
5. Set root directory to `/backend`

---

## 🤝 Contributing

Pull requests are welcome! Here's how:

1. Fork the repository
2. Create your feature branch

   ```bash
   git checkout -b feat/my-feature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add my feature"
   ```
4. Push to your branch

   ```bash
   git push origin feat/my-feature
   ```
5. Open a pull request

---

## 🗘️ Roadmap

* [ ] Add user profile endpoints (`GET /me`, `PUT /me`)
* [ ] Role-based access control (Admin, User)
* [ ] Docker support for containerization
* [ ] Frontend with ReactJS

---

# Frontend with ReactJS
**Coming soon...

## 📝 License

This project is licensed under the [ISC License](LICENSE).

---

> © 2025 Hilary Titus Naor – Built with passion for secure and scalable authentication systems.
