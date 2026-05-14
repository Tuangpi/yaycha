# Yaycha

Yaycha is a small social app with a React frontend and an Express + Prisma backend. Users can register, log in, create posts, comment on posts, like content, and receive live notification updates through WebSocket events.

## Project Structure

```text
yaycha/      Frontend app built with React, Vite, Material UI, and React Query
yaycha-api/  Backend API built with Express, Prisma, SQLite, and WebSocket support
```

## Features

- User registration and login
- Post feed
- Post creation and deletion
- Comments and replies
- Post and comment likes
- Profile pages
- Notifications with read status
- Live notification refresh over WebSocket

## Tech Stack

### Frontend

- React
- Vite
- Material UI
- React Router
- React Query

### Backend

- Node.js
- Express
- Prisma
- SQLite
- JWT authentication
- `express-ws`

## Quick Start

### 1. Install dependencies

Frontend:

```bash
cd yaycha
npm install
```

Backend:

```bash
cd yaycha-api
npm install
```

### 2. Configure environment variables

Create `yaycha/.env`:

```env
VITE_API=http://localhost:8000
VITE_WS=ws://localhost:8000/subscribe
```

Create `yaycha-api/.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="replace-with-a-secure-secret"
```

### 3. Prepare the database

From `yaycha-api/`:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

### 4. Start the backend

From `yaycha-api/`:

```bash
node index.js
```

The API runs on `http://localhost:8000`.

### 5. Start the frontend

From `yaycha/`:

```bash
npm run dev
```

The frontend runs on `http://localhost:3000`.

## How the Apps Connect

- The frontend sends HTTP requests to `VITE_API`
- The frontend opens a WebSocket connection to `VITE_WS`
- Auth uses JWT tokens stored in `localStorage`
- Notifications are refreshed when the backend emits a `notis` event

## Documentation

- Frontend details: [yaycha/README.md](./yaycha/README.md)
- Backend details: [yaycha-api/README.md](./yaycha-api/README.md)

## Notes

- The backend currently starts with `node index.js`
- The backend uses SQLite through Prisma
- A sample database file already exists at `yaycha-api/prisma/dev.db`
