# Yaycha API

Express + Prisma backend for the Yaycha social app. It provides authentication, posts, comments, likes, notifications, and a WebSocket channel used by the frontend to refresh notification data in real time.

## Stack

- Node.js
- Express
- Prisma
- SQLite
- JSON Web Tokens
- `express-ws`
- bcrypt

## Features

- User registration
- Username/password login
- Token-based auth middleware
- Post CRUD support for create, list, detail, and delete
- Comment creation and deletion
- Post likes and comment likes
- Notification listing and read status updates
- WebSocket push for notification refresh events
- Prisma seeders for sample data

## Prerequisites

- Node.js 18+ recommended

## Environment Variables

Create a `.env` file in this folder:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="replace-with-a-secure-secret"
```

## Install

```bash
npm install
```

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate deploy
```

For local development, `npx prisma migrate dev` also works if you want Prisma to manage the SQLite database interactively.

Seed sample data:

```bash
npx prisma db seed
```

## Run

This project currently starts directly with Node:

```bash
node index.js
```

The API listens on `http://localhost:8000`.

Health/info check:

```http
GET /info
```

## REST Endpoints

### Auth and Users

- `POST /login` - login with `username` and `password`
- `GET /verify` - verify token and return current user
- `GET /users` - list recent users
- `GET /users/:id` - get a user with posts and comments
- `POST /users` - create a user

### Posts and Comments

- `GET /content/posts` - list recent posts
- `GET /content/posts/:id` - get one post with comments and likes
- `POST /content/posts` - create a post
- `DELETE /content/posts/:id` - delete a post
- `POST /content/comments` - create a comment
- `DELETE /content/comments/:id` - delete a comment

### Likes

- `POST /content/like/posts/:id` - like a post
- `DELETE /content/unlike/posts/:id` - unlike a post
- `POST /content/like/comments/:id` - like a comment
- `DELETE /content/unlike/comments/:id` - unlike a comment
- `GET /content/likes/posts/:id` - list users who liked a post
- `GET /content/likes/comments/:id` - list users who liked a comment

### Notifications

- `GET /content/notis` - list recent notifications for the authenticated user
- `PUT /content/notis/read` - mark all notifications as read
- `PUT /content/notis/read/:id` - mark one notification as read

## WebSocket

WebSocket endpoint:

```text
ws://localhost:8000/subscribe
```

Expected client message:

```json
{ "token": "<jwt>" }
```

When a relevant like or comment is created, the server sends:

```json
{ "event": "notis" }
```

The frontend uses this event to refetch notifications.

## Data Model

Main Prisma models:

- `User`
- `Post`
- `Comment`
- `PostLike`
- `CommentLike`
- `Follow`
- `Noti`

Database schema is defined in [`prisma/schema.prisma`](./prisma/schema.prisma).

## Project Structure

```text
middlewares/   Auth and ownership middleware
prisma/        Prisma schema, migrations, and seeders
routers/       Express routers for users, content, and WebSocket
index.js       App entry point
prismaClient.js Prisma client singleton
```

## Notes

- The repository includes a SQLite database file at `prisma/dev.db`.
- The default `package.json` does not currently define a `dev` or `start` script, so `node index.js` is the current documented way to run the server.
