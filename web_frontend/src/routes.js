import React, { useMemo } from "react";
import { recipes as allRecipes } from "./data/recipes";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";

/**
 * Lightweight hash-based router utilities and AppRoutes.
 * Supported patterns:
 *  - "#/" (home)
 *  - "#/category/:name" (category listing)
 *  - "#/recipe/:id" (detail)
 *
 * Public exports:
 *  - getRoute(): { name: 'home'|'category'|'detail', params: {...} }
 *  - subscribe(cb): () => void   // unsubscribe function
 */

// Normalize and safely return the current hash or "#/"
function getHash() {
  const raw = typeof window !== "undefined" ? window.location.hash || "" : "";
  return raw && raw.startsWith("#") ? raw : "#/";
}

// PUBLIC_INTERFACE
export function getRoute() {
  /** Return the parsed route from the current location hash. */
  return parseRoute(getHash());
}

function safeDecode(segment) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function parseRoute(hash) {
  const cleaned = (hash || "").replace(/^#/, ""); // remove leading "#"
  const path = cleaned || "/"; // if empty -> "/"
  const parts = path.split("/").filter(Boolean); // split and remove empty

  // Home routes: "#", "#/", "#//"
  if (parts.length === 0) {
    return { name: "home", params: {} };
  }

  // Detail: "#/recipe/:id"
  if (parts[0] === "recipe" && parts[1]) {
    const id = safeDecode(parts[1]);
    return { name: "detail", params: { id } };
  }

  // Category: "#/category/:name"
  if (parts[0] === "category" && parts[1]) {
    const name = safeDecode(parts.slice(1).join("/")); // support slashes in names if ever encoded
    return { name: "category", params: { name } };
  }

  // Fallback to home
  return { name: "home", params: {} };
}

// PUBLIC_INTERFACE
export function subscribe(callback) {
  /**
   * Subscribe to hashchange events and invoke callback with the parsed route.
   * Returns an unsubscribe function.
   */
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    try {
      const route = getRoute();
      callback?.(route);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("[routes] subscribe callback error", e);
      }
    }
  };
  window.addEventListener("hashchange", handler);
  // also fire once immediately with current route
  setTimeout(handler, 0);
  return () => {
    window.removeEventListener("hashchange", handler);
  };
}

function useHashLocation() {
  const [hash, setHash] = React.useState(getHash());

  React.useEffect(() => {
    const onHashChange = () => setHash(getHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

// PUBLIC_INTERFACE
export function AppRoutes({ filtered, onOpenDetail }) {
  /** Decides what to render based on hash route */
  const hash = useHashLocation();
  const route = useMemo(() => parseRoute(hash), [hash]);

  if (route.name === "detail") {
    const recipe = allRecipes.find((r) => String(r.id) === String(route.params.id));
    return <RecipeDetail recipe={recipe} />;
  }

  // For "category" route, we only render the list; filtering is provided by parent.
  // The parent should read route via getRoute/subscribe and set active category/search state if desired.
  return <RecipeGrid recipes={filtered} onOpen={(r) => onOpenDetail?.(r)} />;
}
