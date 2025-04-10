# Tripsyar Operator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack application for managing travel agencies, tours, and user authentication with modern security practices and RESTful API design.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Data Models](#data-models)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [Security](#security)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

### Client-Side

- JWT-based authentication flow
- Multi-step agency registration form
- Dark/Light theme toggle
- Agency listing with search
- Social media integration management
- Tour package management
- Responsive UI with Shadcn components
- Form validation and error handling

### Server-Side

- RESTful API with CRUD operations
- JWT authentication middleware
- MongoDB data storage
- Zod schema validation
- Swagger API documentation
- Password hashing with bcrypt
- Conflict checking for unique fields
- Error handling middleware
- CORS configuration

## Tech Stack

### Frontend

- **Framework**: Next.js 15
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Routing**: Next.js Navigation
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcryptjs
- **Validation**: Zod
- **Documentation**: Swagger UI
- **Middleware**: CORS, Express JSON

## Installation

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB 6.0+
- Git

```bash
# Clone repository
git clone https://github.com/https://github.com/asadullah1s/Tripsyar-operator.git
cd Tripsyar-operator

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Configuration

Create `.env` files in both client and server directories:

**client/.env.local**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**server/.env**

```env
MONGODB_URI=mongodb://localhost:27017/agency_db
JWT_SECRET_KEY=your_secure_secret_here
PORT=3001
```

## Running the Project

```bash
# Start client (from client directory)
npm run dev

# Start server (from server directory)
npm start
```

Access applications at:

- Client: `http://localhost:3000`
- Server: `http://localhost:3001`
- API Docs: `http://localhost:3001/api-docs`

## API Documentation

### Authentication

| Endpoint             | Method | Description       |
| -------------------- | ------ | ----------------- |
| `/api/auth/sessions` | POST   | User login        |
| `/api/auth/register` | POST   | User registration |

### Agency Management

| Endpoint            | Method | Description        |
| ------------------- | ------ | ------------------ |
| `/api/agencies`     | GET    | List all agencies  |
| `/api/agencies`     | POST   | Create new agency  |
| `/api/agencies/:id` | GET    | Get agency details |
| `/api/agencies/:id` | PUT    | Update agency      |
| `/api/agencies/:id` | DELETE | Delete agency      |

## Data Models

### User Model

```javascript
{
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
}
```

### Agency Model

```javascript
{
  // Personal Information
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,

  // Company Details
  companyName: { type: String, unique: true },
  businessType: String,

  // Social Media
  socialMediaDetails: [{
    platform: String,
    url: String,
    rating: Number,
    followers: Number,
    likes: Number
  }],

  // Tour Packages
  tourDetails: [{
    name: String,
    source: String,
    destination: String,
    price: Number
  }]
}
```

## Validation Rules

- **Authentication**

  - Email: Valid format check
  - Password: Minimum 6 characters
  - Username: Unique constraint

- **Agency**
  - Company Name: Unique constraint
  - Phone: Pakistani format validation (+92XXXXXXXXXX or 0XXXXXXXXXX)
  - Email: Unique constraint and valid format
  - Required Fields: firstName, lastName, companyName

## Error Handling

Standard error response format:

```json
{
  "success": false,
  "error": "Descriptive error message",
  "details": {
    "fieldName": "Specific validation error",
    "conflictType": "company/email (for 409 errors)"
  }
}
```

**Common Status Codes:**

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Validation Error
- 500: Internal Server Error

## Security

- JWT Authentication with 30-day expiration
- BCrypt password hashing (salt rounds: 10)
- CORS restricted to client origin
- Environment variables for sensitive data
- Input validation and sanitization
- HTTPS ready (enable in production)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js Team for framework support
- MongoDB for database solution
- Shadcn UI for component library
- Zod for schema validation
- Swagger for API documentation
