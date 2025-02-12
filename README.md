# Edgistify E-commerce Platform

## Introduction
This project is an e-commerce platform that allows users to register, log in, add products to a cart, and place orders. It consists of a frontend built with React and a backend built with Node.js and MongoDB.

## Project Type
Fullstack

## Deployed App
Frontend: https://reliable-pixie-7106e7.netlify.app/
Backend: https://edgistify-e-commerce-backend.onrender.com/api





## Features
List out the key features of your application.

- User Registration
- User Login
- Add Products to Cart
- Place Orders

## Design Decisions or Assumptions
List your design decisions & assumptions

- Products are already available in the database.
- Only authenticated users can perform actions related to the cart and orders.

## Installation & Getting Started
Detailed instructions on how to install, configure, and get the project running.

```bash
npm install
cd Edgistify_E-commerce-Frontend
npm start
```






## Technology Stack
List and provide a brief overview of the technologies used in the project.

- React.js
- Redux
- Axios
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

## API Endpoints
In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.

### User Registration
- **POST /api/register**: Register a new user
  - Request: `{ "fullName": "John Doe", "email": "john@example.com", "password": "password123" }`
  - Response: `{ "message": "User registered successfully" }`

### User Login
- **POST /api/login**: Authenticate a user
  - Request: `{ "email": "john@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt-token" }`

### Add Products to Cart
- **POST /api/cart**: Add a product to the cart
  - Request: `{ "productId": "123", "quantity": 1 }`
  - Response: `{ "message": "Product added to cart" }`

### Place Orders
- **POST /api/orders**: Place an order
  - Request: `{ "shippingAddress": "123 Main St", "paymentStatus": "Paid" }`
  - Response: `{ "message": "Order placed successfully" }`


