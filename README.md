# Secure User Management API

A secure backend REST API built with Node.js, Express.js, MongoDB, and Mongoose.  
This project supports user registration, login, JWT authentication, protected routes, validation, password hashing, and user CRUD operations.

## Features

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected routes using middleware
- Get all users
- Get one user by ID
- Update user
- Delete user
- Input validation
- Duplicate email checking
- Environment variables with dotenv
- Organized routes, controllers, models, and middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- Postman

## Installation

```bash
npm install

```

## Environment Variables

Create a `.env` file in the root folder and add:

```txt
JWT_SECRET=yourSecretKey
```

## Run the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Routes

```txt
POST   /register
POST   /login
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```

Protected routes require this header:

```txt
Authorization: Bearer your_token_here
```