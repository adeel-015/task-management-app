# Task Management - Backend API

Express.js REST API for task management with JWT authentication and MySQL database.

## Tech Stack

- **Node.js** 18+
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Jest & Supertest** - Testing
- **express-validator** - Input validation

## Prerequisites

- Node.js 18+
- MySQL 8+
- npm or yarn

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=taskmanager
DB_PORT=3306
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

### 3. Create MySQL database

```bash
mysql -u root -p
CREATE DATABASE taskmanager;
EXIT;
```

## Running the Application

### Development mode (with auto-reload)

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### Production mode

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks

- `GET /api/tasks` - Get all tasks (protected)
  - Query params: `status`, `startDate`, `endDate`, `search`, `page`, `limit`
- `GET /api/tasks/:id` - Get task by ID (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Health Check

- `GET /api/health` - Check server health

## Request/Response Examples

### Register

**Request:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

**Request:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Task

**Request:**

```bash
POST /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  }
}
```

### Get Tasks with Filters

**Request:**

```bash
GET /api/tasks?status=pending&page=1&limit=10&search=groceries
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "success": true,
  "data": {
    "tasks": [ ... ],
    "pagination": {
      "total": 5,
      "page": 1,
      "limit": 10,
      "pages": 1
    }
  }
}
```

## Database Schema

### User Table

```
id (UUID) - Primary Key
email (String) - Unique
password (String) - Hashed
name (String)
createdAt (DateTime)
updatedAt (DateTime)
```

### Task Table

```
id (UUID) - Primary Key
title (String)
description (Text)
status (Enum: pending, in-progress, completed)
userId (UUID) - Foreign Key to User
createdAt (DateTime)
updatedAt (DateTime)

Indexes: userId, status
```

## Testing

### Run all tests

```bash
npm test
```

Tests automatically run with an isolated in-memory SQLite database and do not modify your development MySQL database.

### Run tests in watch mode

```bash
npm run test:watch
```

### Generate coverage report

```bash
npm test -- --coverage
```

Test files are in the `tests/` directory:

- `auth.test.js` - Authentication tests (register, login, token validation)
- `tasks.test.js` - Task CRUD tests (filtering, pagination, authorization)

### Test Database Configuration

Tests automatically use an in-memory SQLite database instead of MySQL. This is configured by:

1. Setting `TEST_DATABASE=true` environment variable in test files
2. Database config (`src/config/database.js`) switches to `:memory:` SQLite when test mode is detected
3. Database is synced with `force: true` in `beforeAll` to ensure clean state
4. No actual database changes persist after tests complete

### Test Coverage

To run tests with coverage report:

```bash
npm test -- --coverage
```

Target coverage: **70%+** for all modules

## Environment Variables

| Variable          | Description                          | Default                                 |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `DB_HOST`         | MySQL host                           | localhost                               |
| `DB_USER`         | MySQL user                           | root                                    |
| `DB_PASSWORD`     | MySQL password                       | password                                |
| `DB_NAME`         | Database name                        | taskmanager                             |
| `DB_PORT`         | MySQL port                           | 3306                                    |
| `JWT_SECRET`      | JWT signing secret                   | (required)                              |
| `JWT_EXPIRES_IN`  | Token expiration time                | 7d                                      |
| `PORT`            | Server port                          | 5000                                    |
| `NODE_ENV`        | Environment (development/production) | development                             |
| `ALLOWED_ORIGINS` | CORS allowed origins                 | localhost:5173,localhost:3000,localhost |

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # Database connection
│   │   ├── jwt.js            # JWT utilities
│   │   └── sync.js           # Database sync
│   ├── models/
│   │   ├── User.js           # User model
│   │   └── Task.js           # Task model
│   ├── controllers/
│   │   ├── authController.js # Auth logic
│   │   └── taskController.js # Task logic
│   ├── routes/
│   │   ├── authRoutes.js     # Auth routes
│   │   └── taskRoutes.js     # Task routes
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   ├── validation.js     # Input validation
│   │   └── errorHandler.js   # Error handling
│   ├── utils/
│   │   └── logger.js         # Logging utility
│   └── app.js                # Express app
├── tests/
│   ├── auth.test.js          # Auth tests
│   └── tasks.test.js         # Task tests
├── server.js                 # Entry point
├── package.json
├── .env.example
└── Dockerfile
```

## Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation message"
    }
  ]
}
```

Common status codes:

- `200` - Success
- `201` - Created
- `400` - Bad request / Validation error
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

Token expires in 7 days by default. Use login/register endpoints to get new token.

## Development Guidelines

### Code Style

- ESLint configured with Airbnb style
- Run: `npm run lint`

### Adding New Endpoint

1. Create controller function in `src/controllers/`
2. Create route in `src/routes/`
3. Mount route in `src/app.js`
4. Add validation middleware if needed
5. Write tests in `tests/`

### Database Changes

- Model changes auto-sync in development (alter: true)
- For production, create migration scripts
- Update model in `src/models/`
- Changes sync automatically on server start

## Deployment

### Docker

See [docker-compose.yml](../docker-compose.yml) in project root.

Build image:

```bash
docker build -t task-api .
```

Run container:

```bash
docker run -p 5000:5000 \
  -e DB_HOST=mysql \
  -e DB_USER=root \
  -e DB_PASSWORD=password \
  --link mysql:mysql \
  task-api
```

### Environment Variables for Production

- Set strong `JWT_SECRET`
- Update `ALLOWED_ORIGINS` for your domain
- Use RDS or managed MySQL database
- Enable HTTPS (reverse proxy with nginx)

## Support

For issues or questions, check the main [README.md](../README.md) or create an issue on GitHub.
