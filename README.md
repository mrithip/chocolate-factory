# 🍫 Chocolate Factory

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<div align="center">
  <h3>A modern MERN stack e-commerce platform specializing in premium handcrafted chocolates</h3>
</div>

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

### 🛒 **E-Commerce Core**
- **Product Catalog**: Browse premium chocolates with detailed information
- **Advanced Filtering**: Filter by categories, price ranges, and ratings
- **Shopping Cart**: Add, remove, and update cart items with real-time updates
- **Secure Checkout**: Integrated Razorpay payment gateway
- **Order Management**: Complete order tracking and confirmation system

### 🔐 **User Management**
- **Authentication**: Secure user registration and login
- **Profile Management**: User account management and preferences
- **Session Handling**: JWT-based authentication with secure session management

### 🎨 **User Interface**
- **Modern Design**: Beautiful UI built with Tailwind CSS
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Smooth animations and transitions
- **Toast Notifications**: User-friendly feedback with React Toastify
- **Loading States**: Professional loading indicators and skeleton screens

### 📱 **Pages & Routing**
- **Home Page**: Featured products and chocolate categories
- **Products Page**: Comprehensive product listing with search
- **Product Details**: Detailed product information and reviews
- **Cart & Checkout**: Full shopping cart and payment flow
- **Order Confirmation**: Order summary and tracking
- **About Us**: Company story and mission
- **Contact Page**: Contact form and business information
- **Legal Pages**: Terms & Conditions and Privacy Policy

### 🔧 **Technical Features**
- **RESTful API**: Well-structured backend API
- **File Upload**: Image upload functionality for products
- **Error Handling**: Comprehensive error handling and logging
- **Data Validation**: Robust input validation and sanitization
- **Security**: Authentication middleware and protected routes

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern UI framework with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Toastify** - Notification system
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### **Payment Integration**
- **Razorpay** - Payment gateway integration

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18.x or higher)
  ```bash
  # Check if Node.js is installed
  node --version
  npm --version
  ```

- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mrithip/chocolate-factory.git
cd chocolate-factory
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

## 🔧 Environment Setup

### Backend (.env)

```bash
# Database
MONGO_URI=mongodb://localhost:27017/chocolate-factory

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Server Configuration
NODE_ENV=development
PORT=5000

# File Upload
UPLOAD_PATH=./uploads

# Razorpay Configuration (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend (.env)

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Razorpay Public Key
VITE_RAZORPAY_KEY_ID=your_razorpay_public_key
```

## 🚀 Usage

### Development Mode

#### Backend
```bash
# From backend directory
npm run dev
# Server will start on http://localhost:5000
```

#### Frontend
```bash
# From frontend directory
npm run dev
# Frontend will start on http://localhost:5173
```

#### Seeding Database (Optional)
```bash
# From backend directory
node seedProducts.js
# This will populate your database with sample products
```

### Production Build

#### Frontend Build
```bash
cd frontend
npm run build
# Production build will be created in dist/ folder
```

#### Backend Production
```bash
cd backend
npm start
# Production server will start
```

## 📁 Project Structure

```
chocolate-factory/
│
├── backend/                      # Express.js backend
│   ├── middleware/              # Custom middleware
│   │   ├── authMiddleware.js   # JWT authentication
│   │   └── errorMiddleware.js  # Error handling
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   └── Order.js           # Order model
│   ├── routes/                # API route handlers
│   │   ├── users.js           # User management
│   │   ├── products.js        # Product CRUD
│   │   ├── orders.js          # Order management
│   │   └── payment.js         # Payment processing
│   ├── uploads/               # Static file uploads
│   ├── server.js              # Main server file
│   ├── seedProducts.js        # Database seeding
│   └── package.json           # Backend dependencies
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   └── Footer.jsx     # Page footer
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Products.jsx   # Product listing
│   │   │   ├── Cart.jsx       # Shopping cart
│   │   │   └── Checkout.jsx   # Payment page
│   │   ├── content/           # Context providers
│   │   │   ├── AuthContext.jsx # Authentication
│   │   │   └── CartContext.jsx  # Shopping cart
│   │   ├── utils/             # Utility functions
│   │   │   └── api.js         # API configuration
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # React entry point
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Frontend dependencies
│
├── .gitignore                 # Git ignore rules
└── README.md                 # Project documentation
```

## 🌐 API Endpoints

### Authentication Routes
```
POST   /api/users/register    # User registration
POST   /api/users/login       # User login
```

### Product Routes
```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (Admin)
PUT    /api/products/:id      # Update product (Admin)
DELETE /api/products/:id      # Delete product (Admin)
```

### Cart Routes (Protected)
```
GET    /api/users/cart         # Get user cart
POST   /api/users/cart         # Add/update cart item
PUT    /api/users/cart/:id     # Update cart item quantity
DELETE /api/users/cart/:id     # Remove cart item
DELETE /api/users/cart         # Clear entire cart
```

### Order Routes (Protected)
```
GET    /api/orders            # Get user orders
POST   /api/orders            # Create new order
GET    /api/orders/:id        # Get specific order
```

### Payment Routes (Protected)
```
POST   /api/payment/orders     # Create Razorpay order
POST   /api/payment/verify     # Verify payment
```

## 🤝 Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

### Development Process

1. Fork the repo and create your branch from `master`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Chocolate Factory Team**
- Email: hello@chocolatefactory.com
- Website: https://chocolatefactory.com
- GitHub: [@mrithip](https://github.com/mrithip)

---

<div align="center">
  <p>Made with ❤️ for chocolate lovers everywhere</p>
  <p>
    <a href="#chocolate-factory">Back to Top</a>
  </p>
</div>

## 🔧 Available Scripts

### Frontend Scripts
```bash
# Frontend
npm run dev         # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend Scripts
```bash
# Backend
npm run dev        # Start development server with nodemon
npm run start      # Start production server
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Upload the dist/ folder contents
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables in your hosting platform
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
# Deploy backend code
```

## 🔐 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `PORT` | Server port (default: 5000) | No |
| `RAZORPAY_KEY_ID` | Razorpay public key | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay private key | Yes |
| `VITE_API_BASE_URL` | Backend API URL | Yes |

## 🐛 Known Issues & Troubleshooting

### Common Issues
1. **MongoDB connection errors** - Ensure MongoDB is running locally or provide correct Atlas URI
2. **Razorpay payment failures** - Check Razorpay keys and test mode configuration
3. **Build errors** - Ensure all dependencies are installed with `npm install`

### Debug Mode
```bash
# Enable debug logs
NODE_ENV=development DEBUG=* npm run dev
```

---

<div align="center">
  <h3>🌟 Star this repo if you found it helpful! 🌟</h3>
</div>
