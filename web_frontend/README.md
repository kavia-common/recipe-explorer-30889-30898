# Recipe Explorer - Web Frontend

A Vite + React + TypeScript frontend that renders a search-driven recipe explorer UI with a category sidebar, recipe grid, and a detail modal placeholder.

## Tech
- Vite + React + TypeScript
- No external APIs; uses local mock data
- Theming via CSS variables following the provided style guide

## Scripts
- `npm install` — install dependencies
- `npm start` — start dev server on port 3000 (HOST=0.0.0.0, BROWSER=none)
- `npm run dev` — same as start, starts Vite on port 3000
- `npm run build` — typecheck and build for production
- `npm run preview` — preview production build on port 3000
- `npm run lint` — lint TypeScript/React code
- `npm run format` — format code with Prettier

## Run locally
1. cd recipe-explorer-30889-30898/web_frontend
2. npm install
3. npm start
4. Navigate to http://localhost:3000

The UI includes:
- Top navigation bar with search
- Sidebar with categories
- Main grid of recipe cards with images
- Click a card to open the detail modal placeholder

No environment variables or external services are required.
