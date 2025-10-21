import React from "react";

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onClick }) {
  /** Displays a compact recipe summary card. */
  return (
    <article className="card" tabIndex={0} aria-label={`Recipe ${recipe.title}`} onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.(recipe);
      }
    }}>
      <img className="recipe-img" src={recipe.image} alt={`${recipe.title} image`} />
      <div className="recipe-content">
        <div className="badge" aria-label={`Category ${recipe.category}`}>
          <span>🍽️</span>
          {recipe.category}
        </div>
        <h4 className="recipe-title">{recipe.title}</h4>
        <p style={{ margin: "6px 0 0 0", color: "var(--color-muted)", fontSize: 14 }}>
          {recipe.description}
        </p>
        <div className="recipe-meta" aria-label="Meta information">
          <span>⏱ {recipe.time}</span>
        </div>
        <button
          className="btn"
          style={{ marginTop: 10 }}
          onClick={() => onClick?.(recipe)}
          aria-label={`View details for ${recipe.title}`}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
