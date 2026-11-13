# MovieFlix

A responsive movie discovery application built with vanilla HTML, CSS, and JavaScript, powered by The Movie Database (TMDB) API.

## Features
- Live weekly trending movie catalogue from TMDB
- Live movie search and genre discovery
- Movie detail dialogs and ratings
- Personal watchlist persisted in browser localStorage
- Responsive desktop, tablet, and mobile layouts
- Server-side API proxy so the TMDB bearer token is not committed to the repository
- Demo catalogue fallback when the API is not configured or unavailable

## Deploy with Vercel
1. Import this GitHub repository into Vercel.
2. Set the project root to the repository root.
3. In Vercel, open **Project Settings → Environment Variables**.
4. Add `TMDB_BEARER_TOKEN` with your TMDB **API Read Access Token** (the long bearer token, not the short v3 API key).
5. Apply it to Preview and Production environments, save, and redeploy.

Get your token from [TMDB account settings → API](https://www.themoviedb.org/settings/api). Do not paste the token into source files, commit it to GitHub, or expose it in frontend JavaScript.

The frontend calls `/api/tmdb`; the Vercel serverless function in `api/tmdb.js` adds the bearer token and only allows the endpoints needed by this app. The API route requires a server runtime, so GitHub Pages alone will not run the proxy. For local development, use the Vercel CLI and add the same environment variable to a local `.env.local` file (never commit that file).

## Run locally
For a static preview without a configured API, open `index.html` in a browser or run:

```bash
python -m http.server 8000
```

For full live API functionality, use the Vercel development server after installing the Vercel CLI and configuring `TMDB_BEARER_TOKEN`:

```bash
vercel dev
```

## Data, images, and attribution
Movie data and images are supplied by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB. See [TMDB API documentation](https://developer.themoviedb.org/docs) and [TMDB terms and attribution requirements](https://developer.themoviedb.org/docs/faq).

This project is a movie discovery interface; it does not host or stream films. The API is free for non-commercial use with attribution. Contact TMDB for permission before using its API or content commercially.

## Project structure
- `index.html` — page structure and TMDB credits
- `styles.css` — responsive visual design
- `app.js` — catalogue, search, filters, details, and watchlist
- `api/tmdb.js` — server-side TMDB API proxy for Vercel
- `netflip.html`, `trending.html` — redirects from the original page URLs
