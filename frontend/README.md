# Task Management - Frontend

React-based user interface for task management application with authentication, task CRUD, and filtering.

## Tech Stack

- **React** 18+ - UI framework
- **Vite** - Build tool
- **React Router** v6 - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Vitest & React Testing Library** - Testing
- **CSS Modules** - Component-scoped styling

## Prerequisites

- Node.js 18+
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

Edit `.env` with your backend API URL:

```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development mode

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

Build output is in the `dist/` directory.

### Preview production build

```bash
npm run preview
```

## Testing

### Run all tests

```bash
npm test
```

Tests use Mock Service Worker (MSW) to intercept API calls and provide mocked responses. No backend server is required to run tests.

### Run tests in watch mode

```bash
npm test -- --watch
```

### Generate coverage report

```bash
npm run test:coverage
```

### Test Files

Test files are in the `tests/` directory:

- `setup.js` - MSW configuration with mocked API handlers for all endpoints
- `AuthContext.test.jsx` - Authentication context tests
- `Login.test.jsx` - Login form tests
- `TaskList.test.jsx` - Task list display and filtering tests
- `TaskForm.test.jsx` - Task creation/editing tests
- `TaskItem.test.jsx` - Individual task card component tests
- `TaskFilter.test.jsx` - Filter panel and date range tests

### Test Coverage

Target coverage: **70%+** for all modules

### Mock Service Worker (MSW)

Tests use MSW to mock all API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/current-user` - Current user info (token validation)
- `GET /api/tasks` - List tasks with filtering and pagination
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

MSW intercepts requests at the network level and returns mocked responses. No actual API calls are made during testing.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Layout.jsx         # Main layout with header/footer
│   │   │   ├── PrivateRoute.jsx   # Protected route wrapper
│   │   │   └── Loader.jsx         # Loading spinner
│   │   ├── auth/
│   │   │   ├── Login.jsx          # Login form
│   │   │   └── Register.jsx       # Registration form
│   │   └── tasks/
│   │       ├── TaskList.jsx       # Task grid/list view
│   │       ├── TaskItem.jsx       # Individual task card
│   │       ├── TaskForm.jsx       # Create/edit form
│   │       └── TaskFilter.jsx     # Filter controls
│   ├── context/
│   │   └── AuthContext.jsx        # Global auth state
│   ├── services/
│   │   ├── api.js                 # Axios instance & API calls
│   │   └── taskService.js         # Task API wrapper
│   ├── utils/
│   │   └── toast.js               # Toast notification helpers
│   ├── styles/
│   │   ├── App.css                # Component styles
│   │   └── index.css              # Global styles
│   ├── App.jsx                    # Main app with routing
│   └── main.jsx                   # Entry point
├── tests/
│   ├── setup.js                   # Test configuration
│   ├── AuthContext.test.jsx       # Auth tests
│   └── Login.test.jsx             # Login tests
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── package.json
├── .env.example
├── .eslintrc.json
├── Dockerfile
└── nginx.conf
```

## Features

### Authentication

- User registration with email and password
- JWT-based login
- Persistent authentication (localStorage)
- Automatic logout on 401 errors
- Protected routes (PrivateRoute component)

### Task Management

- Create tasks with title, description, and status
- View all user's tasks
- Edit task details
- Delete tasks
- Multi-level filtering:
  - Filter by status (pending, in-progress, completed)
  - Search by title/description
  - Pagination support

### UI/UX

- Responsive design (mobile, tablet, desktop)
- Toast notifications for feedback
- Loading states
- Empty states
- Form validation
- Error handling and display
- Accessible components (labels, ARIA attributes)

## Component Details

### Layout

- Header with logo, navigation, user menu
- Main content area
- Footer
- Responsive mobile menu

### AuthContext

- Global auth state management
- Token storage in localStorage
- Auto-login from saved token
- Login/register/logout functions
- Loading state for auth checks

### TaskList

- Displays grid of tasks
- Integrated filtering
- Pagination controls
- Empty state with CTA
- Loading indicator

### TaskForm

- Create new tasks
- Edit existing tasks
- Form validation
- Submit/cancel buttons
- Status dropdown

### TaskFilter

- Status filter (dropdown)
- Search filter (text input)
- Clear filters button
- Responsive layout

## API Integration

All API calls go through `src/services/api.js`:

```javascript
import { taskAPI, authAPI } from "./services/api";

// Auth
authAPI.register(email, password, name);
authAPI.login(email, password);
authAPI.getCurrentUser();

// Tasks
taskAPI.getTasks(filters);
taskAPI.getTask(id);
taskAPI.createTask(title, description, status);
taskAPI.updateTask(id, data);
taskAPI.deleteTask(id);
```

## Authentication Flow

1. User registers/logs in
2. API returns JWT token
3. Token stored in localStorage
4. Token added to all subsequent requests via interceptor
5. Token expires after 7 days
6. 401 responses trigger redirect to login

## Styling Approach

- CSS Modules for component-scoped styles
- Global CSS in `src/styles/`
- CSS variables for theming
- Flexbox and CSS Grid for layouts
- Mobile-first responsive design
- Utility classes for common styles

### Colors

- Primary: `#667eea` (gradient: `#667eea` to `#764ba2`)
- Success: `#10b981` (green)
- Danger: `#ef4444` (red)
- Dark: `#1f2937` (gray)

## Performance

- Lazy loading of routes (can be added)
- Optimized bundle with Vite
- CSS minification in production
- Gzip compression via nginx

## Accessibility

- Semantic HTML
- ARIA labels on buttons
- Form labels properly associated
- Keyboard navigation support
- Color contrast compliant
- Focus visible styles

## Development Guidelines

### Adding a New Component

1. Create component file: `src/components/section/ComponentName.jsx`
2. Create styles: `src/components/section/ComponentName.module.css`
3. Add exports to parent component
4. Write tests in `tests/ComponentName.test.jsx`

### State Management

- Use React hooks (useState, useEffect)
- Global state via Context API (AuthContext)
- Local component state for forms
- localStorage for persistence

### Naming Conventions

- Components: PascalCase
- Functions/variables: camelCase
- CSS classes: kebab-case
- Files: PascalCase for components, camelCase for utilities

## Deployment

### Docker

See [Dockerfile](./Dockerfile) and [docker-compose.yml](../docker-compose.yml)

### Static Hosting

1. Build: `npm run build`
2. Deploy `dist/` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Firebase Hosting

### Environment Variables

- `VITE_API_URL`: Backend API base URL

## Common Issues

### CORS Errors

- Ensure backend has correct `ALLOWED_ORIGINS`
- Check API URL in `.env`

### 401 Errors

- Token may have expired
- Try logging in again
- Check localStorage for valid token

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Support

For issues, check the main [README.md](../README.md) or create an issue on GitHub.
