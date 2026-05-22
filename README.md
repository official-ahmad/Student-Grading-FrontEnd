**Student Grading System — Front-End**

Overview

- **Purpose:** Front-end UI for the Student Grading System. Provides student and admin views, authentication, and recommendation features that interact with the Back-End API.
- **Tech stack:** React (with Vite), React Router, Axios, Bootstrap + Tailwind (utility styles), react-hot-toast, react-toastify.

Key Features

- Login / Protected routes
- Student dashboard and grades view
- Admin controls (manage students, recommendations)
- Recommendations UI integrated with recommendation service

Project structure (important files)

- `src/main.jsx` — App entry and router setup
- `src/App.jsx` — Top-level app layout
- `src/Login.jsx` — Login page
- `src/Dashboard.jsx` — Dashboard for users
- `src/ProtectedRoute.jsx` — Route guard for authenticated pages
- `src/Recommendations.jsx` — Recommendations page

Prerequisites

- Node.js (LTS recommended) and npm or yarn

Environment variables

- This project uses Vite. Provide the API base URL via `VITE_API_BASE_URL`.
  - Example: `VITE_API_BASE_URL=http://localhost:5173`

Common scripts (see `package.json`)

- `npm install` — install dependencies
- `npm run dev` — start development server (Vite, usually on port 5173)
- `npm run build` — create production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

Run locally

1. Install dependencies:

```powershell
npm install
```

2. Set environment variable (Windows PowerShell example):

```powershell
$env:VITE_API_BASE_URL = "http://localhost:8000"
npm run dev
```

3. Open the app in your browser at the URL Vite prints (commonly `http://localhost:5173`).

Build & Deploy

- Build for production:

```powershell
npm run build
```

- The `dist/` folder produced by the build can be deployed to any static hosting (Vercel, Netlify, GitHub Pages, or a static file server).
- If deploying to a platform that supports environment variables (Vercel/Netlify), set `VITE_API_BASE_URL` in the platform settings to point to your Back-End deployment.

Backend integration notes

- The front-end expects a REST API at `VITE_API_BASE_URL`. Common endpoints used by the UI include authentication, student data, and recommendations. When testing locally, run the Back-End server (for example from the `Back-End` folder) on the configured port.

Troubleshooting

- CORS: If API calls fail in the browser, ensure the Back-End allows the front-end origin or uses a permissive CORS setup during development.
- Environment not picked up: make sure variables start with `VITE_` so Vite exposes them to the client.

If you want the README in Urdu or need specific deployment instructions (Vercel/Netlify/Docker), tell me which platform and I will add step-by-step commands.
