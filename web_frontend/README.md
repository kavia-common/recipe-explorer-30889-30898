# Recipe Explorer — Web Frontend

Recipe Explorer is a lightweight React application to browse, search, and view food recipes. It ships with an Ocean Professional theme that uses blue and amber accents, subtle shadows, rounded corners, and minimalist styling.

## Overview

The UI consists of a top navigation bar with search, a left sidebar for category selection, and a main content area for the recipe grid or detail view. The theme tokens live in `src/styles/theme.css` and are applied consistently across navigation, sidebar, cards, and detail pages.

- Application theme: Ocean Professional (blue primary #2563EB, amber secondary #F59E0B)
- Layout: Top navbar with search, categories sidebar, main grid/list, and a detail page
- Routing: Lightweight hash-based routes without react-router

## How to Run

In the `web_frontend` directory, run:

- npm start — Starts the dev server.  
  Open http://localhost:3000 to preview the app in your browser.
- npm test — Runs tests in watch mode.
- npm run build — Builds an optimized production bundle in the `build` folder.

No additional configuration is necessary for mock data; the app defaults to using the local mock dataset.

## Routing

This app uses a small hash-based router implemented in `src/routes.js`. The following routes are supported:

- #/ — Home, shows the main grid of recipes. The grid is filtered by the current in-app search and category state.
- #/category/:name — Category listing for the given category name. Names are URL-encoded in the hash and decoded in the app.
- #/recipe/:id — Detailed view for a specific recipe by id.

Route parsing is handled by exported helpers in `src/routes.js`:

- getRoute() returns an object describing the current route name and params.
- subscribe(callback) lets the App sync state when the hash changes.
- AppRoutes is the route-aware renderer that shows either the grid or the detail page.

## Search and Category Behavior

Search is performed via the navbar search field (`src/components/Navbar.js`). The input is controlled and calls the parent `onSearch` handler on submit. Search updates the in-memory state only; it does not modify the URL.

Category selection is driven by the sidebar (`src/components/CategoriesSidebar.js`) and is synchronized with the hash route:

- Clicking a category updates the location hash to either `#/` for “All” or `#/category/:name` for a specific category.
- The App (`src/App.js`) initializes state from the current route on mount and subscribes to future hash changes to keep the active category in sync.
- The detail route does not modify search or category state.

The main recipe grid (`src/components/RecipeGrid.js`) receives the already-filtered list from the App. Filtering combines the search term and the active category against the local dataset or, when a backend is configured, the server response.

## Mock API Strategy

The app includes an API abstraction layer with swappable backends:

- `src/api/client.js` — A thin HTTP client that builds URLs from an optional base and parses JSON safely. It supports query parameters via an `opts.params` object.
- `src/api/recipes.js` — High-level recipes API with mock switching. It provides:
  - listRecipes({ q, category, page, pageSize }) — Returns a paginated set of recipes.
  - getRecipe(id) — Returns a single recipe by id.
  - When `REACT_APP_USE_MOCK` is not set or set to anything other than the string "false", the app uses the local dataset from `src/data/recipes.js` and filters in-memory.
  - When `REACT_APP_USE_MOCK` is set to "false", the app calls the backend routes using `client.get()`.

The mock dataset and filtering utilities live in `src/data/recipes.js`. The normalization step inside `src/api/recipes.js` ensures the recipe shape is consistent between mock and real backends.

## Environment Variables

You can control API behavior with the following environment variables:

- REACT_APP_USE_MOCK — Defaults to true.  
  Any value other than the string "false" will enable mock data. Set to "false" to use a real backend.
- REACT_APP_API_BASE — Optional.  
  When using a backend, this is the base URL used by `src/api/client.js` to construct calls (for example, `https://api.example.com`).

Create a `.env` file in `web_frontend` if you need to override defaults:

```
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE=https://api.example.com
```

## Switching to a Real Backend Later

When you are ready to wire up a backend, follow these steps:

1. Provide an HTTP API that supports the following endpoints:
   - GET /recipes — Returns either:
     - An object: `{ items: Recipe[], total: number, page: number, pageSize: number }`, or
     - An array: `Recipe[]` (the frontend will paginate locally in this case).
     Query parameters supported:  
     - q (string): full-text search across title, description, ingredients  
     - category (string): category filter; use "All" or omit to include all  
     - page (number): 1-based page index  
     - pageSize (number): number of items per page
   - GET /recipes/:id — Returns a single recipe object.

   Each Recipe should include: `id`, `title`, `category`, `description`, `image`, `ingredients[]`, `instructions[]`, and optionally `time`.

2. Configure the frontend to use the backend:
   - Set `REACT_APP_USE_MOCK=false` in `.env`.
   - Set `REACT_APP_API_BASE` to your server’s base URL (e.g., `https://api.example.com`).
   - Restart the dev server so the environment changes take effect.

3. Verify the integration:
   - Home `#/` renders paginated results from the server (or uses local pagination when the server returns an array).
   - Category routes like `#/category/Seafood` pass the `category` query param to the backend.
   - Search via the navbar passes the `q` query param on list calls.
   - Detail routes `#/recipe/:id` call `GET /recipes/:id` and render the full recipe.

If you need to adapt backend field names, update the `normalizeRecipe` function in `src/api/recipes.js` to map server fields into the UI’s expected shape without touching UI components.

## Theming and Accessibility

- Theme tokens and component styles are defined in `src/styles/theme.css`. The Ocean Professional tokens provide color, radius, elevation, and focus styles. Minor layout and component-specific styles are also present in `src/App.css`.
- Focus indicators and keyboard navigation are provided across buttons, links, and inputs. Category buttons use `aria-pressed` to signal the active state, and the search form is labeled for assistive technologies.

## Project Structure

Key files for the behavior documented above:

- src/routes.js — Hash routing utilities, route parsing, and `AppRoutes`.
- src/App.js — App-level state for search and category, route syncing, and layout composition.
- src/components/Navbar.js — Controlled search input and submission handler.
- src/components/CategoriesSidebar.js — Category navigation using hash routes with accessible buttons.
- src/components/RecipeGrid.js and src/components/RecipeDetail.js — Grid and detail presentation.
- src/api/client.js and src/api/recipes.js — API abstraction, mock switching, and normalization.
- src/data/recipes.js — Local mock recipes and filtering utilities.

With this setup, the app runs fully offline using mock data and can be switched to a real backend later with environment variables and compatible endpoints.
