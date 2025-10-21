import React from "react";

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onClick }) {
  /** Displays a compact recipe summary card with safe fallbacks. */
  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='32'>No image</text></svg>`
    );

  const title = recipe?.title || "Untitled";
  const image = recipe?.image || placeholder;
  const category = recipe?.category || "Uncategorized";
  const description = recipe?.description || "";
  const time = recipe?.time || "";

  return (
    <article
      className="card"
      tabIndex={0}
      aria-label={`Recipe ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(recipe);
        }
      }}
    >
      <img className="recipe-img" src={image} alt={`${title} image`} />
      <div className="recipe-content">
        <div className="badge" aria-label={`Category ${category}`}>
          <span>🍽️</span>
          {category}
        </div>
        <h4 className="recipe-title">{title}</h4>
        {description ? (
          <p style={{ margin: "6px 0 0 0", color: "var(--color-muted)", fontSize: 14 }}>
            {description}
          </p>
        ) : null}
        {time ? (
          <div className="recipe-meta" aria-label="Meta information">
            <span>⏱ {time}</span>
          </div>
        ) : null}
        <button
          className="btn"
          style={{ marginTop: 10 }}
          onClick={() => onClick?.(recipe)}
          aria-label={`View details for ${title}`}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
