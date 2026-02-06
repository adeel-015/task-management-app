# Task Management API Documentation

## Overview

Complete REST API for task management with user authentication, task CRUD operations, and advanced filtering.

**Base URL:** `http://localhost:5000/api` (development)

**Authentication:** JWT Bearer token in Authorization header

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201 Created):**

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImlhdCI6MTcwNDEwNzYwMCwiZXhwIjoxNzA0NzEyNDAwfQ.signature"
  }
}
```

**Validation Rules:**

- `email` - Required, must be valid email format
- `password` - Required, minimum 6 characters
- `name` - Optional, minimum 2 characters if provided

**Error Responses:**

- `400 Bad Request` - Validation failed or email already registered
- `400 Bad Request` - Duplicate email

---

### Login User

Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
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

**Validation Rules:**

- `email` - Required, valid email format
- `password` - Required

**Error Responses:**

- `401 Unauthorized` - Invalid credentials

---

### Get Current User

Retrieve authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Authentication:** Required (JWT Bearer token)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token

---

## Task Endpoints

### Get All Tasks

Retrieve user's tasks with optional filters and pagination.

**Endpoint:** `GET /tasks`

**Authentication:** Required (JWT Bearer token)

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | string | Filter by status: pending, in-progress, completed, or all | `pending` |
| `startDate` | string | Filter tasks created after this date (ISO 8601) | `2024-01-01` |
| `endDate` | string | Filter tasks created before this date (ISO 8601) | `2024-01-31` |
| `search` | string | Search in title and description | `groceries` |
| `page` | number | Page number for pagination (default: 1) | `1` |
| `limit` | number | Items per page (default: 10) | `10` |

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "650e8400-e29b-41d4-a716-446655440001",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "pending",
        "userId": "550e8400-e29b-41d4-a716-446655440000",
        "createdAt": "2024-01-01T12:00:00.000Z",
        "updatedAt": "2024-01-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "limit": 10,
      "pages": 2
    }
  }
}
```

**Example Requests:**

```bash
# Get all tasks
GET /tasks

# Get pending tasks
GET /tasks?status=pending

# Search tasks
GET /tasks?search=groceries

# Paginate
GET /tasks?page=2&limit=5

# Combined filters
GET /tasks?status=pending&search=buy&page=1&limit=20
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token

---

### Get Single Task

Retrieve a specific task by ID.

**Endpoint:** `GET /tasks/:id`

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**

- `id` - Task ID (UUID)

**Response (200 OK):**

```json
{
  "success": true,
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

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Task not found or not owned by user

---

### Create Task

Create a new task.

**Endpoint:** `POST /tasks`

**Authentication:** Required (JWT Bearer token)

**Request Body:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}
```

**Response (201 Created):**

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

**Validation Rules:**

- `title` - Required, minimum 1 character
- `description` - Optional
- `status` - Optional, must be: pending, in-progress, completed

**Error Responses:**

- `400 Bad Request` - Validation failed
- `401 Unauthorized` - Missing or invalid token

---

### Update Task

Update an existing task.

**Endpoint:** `PUT /tasks/:id`

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**

- `id` - Task ID (UUID)

**Request Body (all fields optional):**

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "title": "Updated title",
      "description": "Updated description",
      "status": "in-progress",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-02T15:30:00.000Z"
    }
  }
}
```

**Validation Rules:**

- `title` - Optional, minimum 1 character if provided
- `description` - Optional
- `status` - Optional, must be: pending, in-progress, completed

**Error Responses:**

- `400 Bad Request` - Validation failed
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Task not found or not owned by user

---

### Delete Task

Delete a task.

**Endpoint:** `DELETE /tasks/:id`

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**

- `id` - Task ID (UUID)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Task not found or not owned by user

---

## Health Check Endpoint

### Server Health

Check if API is running.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Response (200 OK):**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation message"
    }
  ]
}
```

### HTTP Status Codes

| Code | Meaning      | Example                     |
| ---- | ------------ | --------------------------- |
| 200  | OK           | Successful GET, PUT, DELETE |
| 201  | Created      | Successful POST             |
| 400  | Bad Request  | Validation errors           |
| 401  | Unauthorized | Missing/invalid token       |
| 404  | Not Found    | Resource doesn't exist      |
| 500  | Server Error | Unexpected error            |

---

## Authentication

### JWT Bearer Token

Include token in Authorization header:

```
Authorization: Bearer <token>
```

**Token Details:**

- Algorithm: HS256
- Expires in: 7 days (configurable)
- Contains: User ID
- Issued by: /auth/register or /auth/login

**Token Usage Example:**

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:5000/api/tasks
```

---

## Rate Limiting & Pagination

### Pagination

- Default limit: 10 items per page
- Maximum limit: 100 items per page
- Responses include pagination metadata

**Response structure:**

```json
{
  "data": {
    "tasks": [ ... ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
}
```

---

## Filter Examples

### Get pending tasks

```bash
GET /tasks?status=pending
```

### Get completed tasks from January 2024

```bash
GET /tasks?status=completed&startDate=2024-01-01&endDate=2024-01-31
```

### Search and paginate

```bash
GET /tasks?search=work&page=2&limit=15
```

### All filters combined

```bash
GET /tasks?status=in-progress&search=urgent&startDate=2024-01-01&page=1&limit=20
```

---

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Create task (replace TOKEN)
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My task",
    "description": "Task description",
    "status": "pending"
  }'

# Get tasks
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/tasks?status=pending
```

### Using Postman

1. Set `{{baseUrl}}` to `http://localhost:5000/api`
2. Create environment variable `token` from login response
3. Use `Bearer {{token}}` in Authorization header for protected endpoints

---

## Changelog

### Version 1.0.0 (2024-01-01)

- Initial release
- User authentication (register, login, get current user)
- Task CRUD operations
- Task filtering (status, date range, search)
- Pagination support
- Input validation
- Error handling
