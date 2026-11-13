# MovieFlix

A responsive, client-side movie discovery and watchlist demo built with vanilla HTML, CSS, and JavaScript.

## Features
- Responsive layout for desktop, tablet, and mobile
- Movie catalogue with genre filters and live search
- Movie detail dialog
- Personal watchlist persisted in browser localStorage
- Keyboard-visible focus states and reduced-motion support
- No build step, framework, API key, or backend required

## Run locally
Open `index.html` in a modern browser, or serve the folder with a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes
- Movie entries and ratings are sample catalogue content for demonstration, not live rankings.
- Poster artwork is generated with CSS gradients; it is not official movie key art.
- The watchlist is stored only in the current browser on the current device.
- MovieFlix does not host or stream films and is not affiliated with Netflix or another streaming provider.

## Project structure
- `index.html` — page structure
- `styles.css` — responsive visual design
- `app.js` — catalogue, filters, details, and watchlist interactions
- `netflip.html`, `trending.html` — compatibility redirects for the original page URLs
