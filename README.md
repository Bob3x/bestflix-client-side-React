# Bestflix — Frontend

Professional single-page React frontend for the Bestflix movie app.

Summary

- Purpose: Browse movies, view details (genre/director), manage user accounts and favorites.
- Frontend: React + Redux, built with Parcel.

Key Features

- Sign up / sign in / sign out (auth via backend API).
- Update user profile and avatar.
- Browse, search and view movie details.
- Add / remove favorite movies per user.
- Responsive UI components and basic form validation.

Quickstart (development)

1. Install dependencies:

```bash
npm install
```

2. Local environment variables (create a `.env` in project root):

- `REACT_APP_API_URL` — backend base URL (e.g. `http://localhost:3001` or `https://bestflix-api.onrender.com`)
- `REACT_APP_TMDB_API_KEY` — TMDB API key for movie data

Example `.env`:

```
REACT_APP_API_URL=https://bestflix-api.onrender.com
REACT_APP_TMDB_API_KEY=your_tmdb_key
```

3. Run the dev server:

```bash
npm start
```

Build & Deploy

- Build for production:

```bash
npm run build
```

- Frontend is deployed on Netlify in your setup. Ensure Netlify environment variables match the values above (do not commit `.env`).

- Backend is deployed on Render at `https://bestflix-api.onrender.com` — set matching env vars there.

Configuration & Notes

- All frontend API calls use `process.env.REACT_APP_API_URL`. The code normalizes trailing slashes so values ending with `/` are OK.
- Keep secrets out of git. `.gitignore` already excludes `.env`, `.agents/`, and `skills-lock.json`.
- The repository contains a `server/mockServer.js` used for local testing of the frontend against an in-memory API.

Repository structure (important parts)

- `src/` — React source (components, pages, hooks, features)
- `src/apiClient.js` — centralized API wrapper (uses `REACT_APP_API_URL`)
- `src/services/` — lightweight service helpers (some files may use `apiClient`)
- `server/` — development/mock backend
- `cypress/` — end-to-end tests
- `dist/` — built artifacts (should not be committed)

Testing

- Unit tests: `npm test` (project contains some Jest/RTL tests in `src/__tests__`)
- E2E: `cypress` folder is configured for integration tests.

Contributing

- Fork → feature branch → PR. Write small, focused commits. Update or add tests for new behavior.

License

- This project is licensed under the MIT License — see the `LICENSE` file for details.

Contact

- For questions about the repo or deployment, reach me at borislav.ginov@gmail.com.
