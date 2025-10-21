import React, { useMemo } from "react";
import { recipes as allRecipes } from "./data/recipes";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";

/**
 * Very lightweight hash-based router to avoid adding react-router as a dependency.
 * Supports:
 *  - List: #/ or no hash
 *  - Detail: #/recipe/:id
 */
function useHashLocation() {
  const [hash, setHash] = React.useState(window.location.hash || "#/");

  React.useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

function parseRoute(hash) {
  const cleaned = hash.replace(/^#/, "");
  const parts = cleaned.split("/").filter(Boolean);
  if (parts[0] === "recipe" && parts[1]) {
    return { name: "detail", params: { id: parts[1] } };
  }
  return { name: "home", params: {} };
}

// PUBLIC_INTERFACE
export function AppRoutes({ filtered, onOpenDetail }) {
  /** Decides what to render based on hash route */
  const hash = useHashLocation();
  const route = useMemo(() => parseRoute(hash), [hash]);

  if (route.name === "detail") {
    const recipe = allRecipes.find(r => r.id === route.params.id);
    return <RecipeDetail recipe={recipe} />;
  }

  // default list
  return <RecipeGrid recipes={filtered} onOpen={(r) => onOpenDetail?.(r)} />;
}
