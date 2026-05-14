# Yaycha Frontend

React + Vite frontend for the Yaycha social app. The UI lets users register, log in, create posts, reply to posts, like posts or comments, browse profiles, and receive live notification updates over WebSocket.

## Stack

- React 18
- Vite 5
- Material UI
- React Router
- React Query
- `react-use-websocket`

## Features

- Register and login flow
- Home feed with latest posts
- Create and delete posts
- Comment on posts
- Like posts and comments
- Profile page for each user
- Notifications page with mark-as-read actions
- Live notification refresh through WebSocket invalidation
- Light/dark theme toggle support in app state

## Prerequisites

- Node.js 18+ recommended
- The API running locally

## Environment Variables

Create a `.env` file in this folder:

```env
VITE_API=http://localhost:8000
VITE_WS=ws://localhost:8000/subscribe
```

## Install

```bash
npm install
```

## Run

Development server:

```bash
npm run dev
```

The Vite dev server is configured to run on `http://localhost:3000`.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## App Routes

- `/` - home feed
- `/login` - login page
- `/register` - account creation page
- `/comments/:id` - post details and replies
- `/profile/:id` - user profile
- `/likes/:id` - likes list
- `/notis` - notifications

## API Integration

The frontend expects these backend capabilities:

- Auth endpoints for login and token verification
- Content endpoints for posts, comments, likes, and notifications
- A WebSocket endpoint at `/subscribe`

Auth tokens are stored in `localStorage` under the `token` key and sent as `Authorization: Bearer <token>`.

## Project Structure

```text
src/
  components/   Reusable UI pieces such as header, drawer, item cards, and buttons
  libs/         Fetch helpers for API requests
  pages/        Route-level screens
  AppSocket.jsx WebSocket subscription for live updates
  Template.jsx  Shared layout
  ThemedApp.jsx Router, theme, context, and React Query setup
```

## Notes

- The app does not use a Vite proxy; it calls the API directly through `VITE_API`.
- Live notifications depend on `VITE_WS` pointing to the backend WebSocket server.
