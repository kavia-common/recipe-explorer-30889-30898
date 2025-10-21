import React from "react";
import RecipeCard from "./RecipeCard";

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes, onOpen }) {
  /** Displays a responsive grid of recipe cards with defensive checks. */
  if (!Array.isArray(recipes) || recipes.length === 0) {
    return (
      <div className="card" style={{ padding: 18 }}>
        <strong>No recipes found.</strong>
        <p style={{ marginTop: 6, color: "var(--color-muted)" }}>
          Try adjusting your search or selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <section className="grid" aria-label="Recipe results">
      {recipes.filter(Boolean).map((r) => (
        <RecipeCard key={String(r.id ?? Math.random())} recipe={r} onClick={onOpen} />
      ))}
    </section>
  );
}
