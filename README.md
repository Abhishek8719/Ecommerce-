# 🛒 E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, and shopping cart functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**
  - Secure user registration and login
  - Password hashing with bcrypt
  - JWT-based authentication
  - Protected routes with authentication middleware

- **Product Management**
  - Create and manage products
  - View all available products
  - Product listing with pricing

- **Shopping Cart**
  - Add products to cart
  - Manage cart items
  - Track quantity for each product

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.0.1) - MongoDB object modeling
- **bcryptjs** (v3.0.3) - Password hashing
- **JSON Web Token** (v9.0.3) - Secure authentication
- **CORS** (v2.8.5) - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server

### Development Tools
- **Nodemon** - Automatic server restart during development
- **ESLint** - Code linting

## 📁 Project Structure

```
Ecommerce-/
├── backend/
│   ├── models/
│   │   ├── User.js         # User schema
│   │   ├── product.js      # Product schema
│   │   └── Cart.js         # Cart schema
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── server.js           # Express server setup
│   ├── package. json
│   └── . gitignore
├── Fronted/
│   ├── src/                # React source files
│   ├── public/             # Public assets
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed: 

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Abhishek8719/Ecommerce-. git
cd Ecommerce-
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../Fronted
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/amazonClone

# JWT Secret (change this to a secure random string)
JWT_SECRET=secret123

# Server Port
PORT=5000
```

> ⚠️ **Security Note**: Make sure to change `JWT_SECRET` to a strong, randomly generated string in production.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user and get JWT token | No |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| POST | `/api/products` | Create new product(s) | No |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user's cart | Yes |
| POST | `/api/cart` | Add item to cart | Yes |

## 💻 Usage

### Running the Backend

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:5000` (or your specified PORT)

### Running the Frontend

```bash
cd Fronted

# Development mode
npm run dev
```

The frontend development server will start on `http://localhost:5173`

### Testing the API

You can test the API endpoints using tools like: 
- **Postman**
- **Thunder Client** (VS Code extension)
- **cURL**

Example signup request: 

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example. com",
    "password": "securePassword123"
  }'
```

Example login request:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":  "john@example.com",
    "password": "securePassword123"
  }'
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. 

## 👤 Author

**Abhishek8719**
- GitHub: [@Abhishek8719](https://github.com/Abhishek8719)

---

⭐ If you found this project helpful, please give it a star! 
