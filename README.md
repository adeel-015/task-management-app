# Task Management Application

A full-stack task management application built with Node.js/Express, React, and MySQL. Features JWT authentication, task filtering, and responsive UI with comprehensive testing and Docker deployment.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Advanced Filtering**: Filter tasks by status, date range, and search keywords
- **User-Specific Tasks**: Each user sees only their own tasks
- **Responsive Design**: Mobile-first UI with tablet and desktop support
- **Comprehensive Testing**: Unit and integration tests for both backend and frontend
- **Docker Support**: Containerized deployment with docker-compose
- **Production-Ready**: Error handling, logging, validation, and security best practices

## Tech Stack

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MySQL 8
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Testing**: Jest + Supertest
- **Validation**: express-validator

### Frontend

- **Framework**: React 18+
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Notifications**: react-toastify
- **Testing**: React Testing Library + Vitest
- **Styling**: CSS Modules

### DevOps

- **Containerization**: Docker & Docker Compose
- **Package Managers**: npm/yarn
- **Version Control**: Git

## Prerequisites

- Node.js 18+ and npm/yarn
- MySQL 8+ (or use Docker)
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd task_mgt
```

### 2. Install dependencies

**Backend**:

```bash
cd backend
npm install
```

**Frontend**:

```bash
cd frontend
npm install
```

### 3. Configure environment variables

**Backend** - Create `backend/.env`:

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials
```

**Frontend** - Create `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your backend API URL
```

## Running Locally

### Development Mode (Separate terminals)

**Terminal 1 - Backend**:

```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend**:

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Running with Docker

Ensure Docker and Docker Compose are installed, then:

```bash
docker-compose up --build
```

This starts:

- MySQL on port 3306
- Backend API on http://localhost:5000
- Frontend on http://localhost:80

## Running Tests

### Backend Tests

```bash
cd backend
npm test              # Run tests once
npm run test:watch   # Run tests in watch mode
```

### Frontend Tests

```bash
cd frontend
npm test             # Run tests
npm run test:coverage # With coverage report
```

## Project Structure

```
task_mgt/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── config/      # Database, JWT, environment configs
│   │   ├── models/      # Sequelize models
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API route definitions
│   │   ├── middleware/  # Auth, validation, error handling
│   │   ├── utils/       # Helper functions
│   │   ├── app.js       # Express app setup
│   │   └── server.js    # Entry point
│   ├── tests/           # Jest test files
│   ├── package.json
│   └── Dockerfile
│
├── frontend/             # React application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # State management
│   │   ├── services/    # API client
│   │   ├── hooks/       # Custom hooks
│   │   ├── styles/      # Global styles
│   │   ├── utils/       # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tests/           # Vitest test files
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml   # Docker services orchestration
├── .gitignore
└── README.md           # This file
```

## API Documentation

See [backend/API.md](backend/API.md) for detailed API documentation.

### Quick Reference

**Authentication**:

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

**Tasks**:

- `GET /api/tasks` - List tasks with filters
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Deployment

### Heroku

1. Create Heroku app and provision MySQL add-on
2. Set environment variables: `heroku config:set VAR=value`
3. Deploy: `git push heroku main`

### Railway / Render

Follow their documentation for Node.js + MySQL deployment.

### AWS / DigitalOcean

Use EC2/App Platform with RDS for MySQL and manage with nginx.

See [deployment guide](docs/DEPLOYMENT.md) for detailed instructions.

## Development Guidelines

### Code Style

- ESLint configured with Airbnb style guide
- Format code before committing

### Commit Messages

- Use conventional commits: `feat:`, `fix:`, `docs:`, `test:`, etc.

### Testing

- Write tests for all new features
- Maintain 70%+ code coverage
- Run tests before submitting PRs

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'feat: add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- Open an issue on GitHub
- Check existing documentation in backend/README.md and frontend/README.md
