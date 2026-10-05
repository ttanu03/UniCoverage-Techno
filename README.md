# Task Management REST API

A clean, well-structured REST API for managing personal tasks with JWT authentication.

## Features

- User registration and login with JWT
- Password hashing with bcrypt
- Full task CRUD (create, read, update, delete)
- Task ownership — users only access their own tasks
- Search by title/description
- Filter by status and priority
- Pagination
- Request validation and centralized error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- express-validator
- bcryptjs

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd assignment
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

4. **Start the server**

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000` by default.

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and get JWT |
| GET | `/api/auth/profile` | Yes | Get logged-in user profile |

### Tasks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/tasks` | Yes | Create a task |
| GET | `/api/tasks` | Yes | List tasks (search, filter, paginate) |
| GET | `/api/tasks/:id` | Yes | Get a single task |
| PUT | `/api/tasks/:id` | Yes | Update a task |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |

## Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Example Requests

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"secret123\"}"
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"secret123\"}"
```

### Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d "{\"title\":\"Finish assignment\",\"description\":\"Build the REST API\",\"status\":\"Pending\",\"priority\":\"High\",\"dueDate\":\"2026-10-15\"}"
```

### List Tasks (with filters)

```bash
curl "http://localhost:5000/api/tasks?status=Completed&priority=High&search=assignment&page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```

## Task Fields

| Field | Type | Values / Notes |
|-------|------|----------------|
| title | String | Required |
| description | String | Optional |
| status | String | `Pending`, `In Progress`, `Completed` |
| priority | String | `Low`, `Medium`, `High` |
| dueDate | Date | Required (ISO 8601) |
| createdAt | Date | Auto-set by MongoDB |
| updatedAt | Date | Auto-set by MongoDB |

## Query Parameters (`GET /api/tasks`)

| Param | Description |
|-------|-------------|
| `search` | Search in title and description |
| `status` | Filter by status |
| `priority` | Filter by priority |
| `page` | Page number (default: 1) |
| `limit` | Items per page (default: 10) |

Example:

```
GET /api/tasks?status=Completed&page=1&limit=10
```

## Project Structure

```
├── src/
│   ├── config/          # Database connection
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, validation, errors
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Helpers (JWT)
│   ├── validators/      # express-validator rules
│   └── app.js           # Express app setup
├── postman/             # Postman collection
├── server.js            # Entry point
├── .env.example
├── package.json
└── README.md
```

## Postman

Import [`postman/Task_Management_API.postman_collection.json`](postman/Task_Management_API.postman_collection.json) into Postman.

1. Register or login — the collection can store the returned JWT in a collection variable.
2. Use protected task endpoints with the saved token.

## License

ISC
