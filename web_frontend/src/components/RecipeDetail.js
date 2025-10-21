import React from "react";

// PUBLIC_INTERFACE
export default function RecipeDetail({ recipe }) {
  /**
   * Recipe detail section with image, ingredients, and instructions.
   * Expects a recipe object with fields: title, image, category, description, ingredients[], instructions[].
   * Fields are rendered with safe fallbacks to support API variations and missing data.
   */
  if (!recipe) {
    return (
      <div className="card" style={{ padding: 18 }}>
        <strong>Recipe not found</strong>
        <p style={{ marginTop: 6, color: "var(--color-muted)" }}>
          The recipe you are looking for does not exist.
        </p>
      </div>
    );
  }

  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='32'>No image</text></svg>`
    );

  const title = recipe?.title || "Untitled";
  const category = recipe?.category || "Uncategorized";
  const description = recipe?.description || "";
  const image = recipe?.image || placeholder;
  const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
  const instructions = Array.isArray(recipe?.instructions) ? recipe.instructions : [];

  return (
    <article aria-label={`Details for ${title}`}>
      <div className="detail-hero">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="kicker">Recipe Detail</span>
            <div className="badge">
              <span>🍽️</span>
              {category}
            </div>
          </div>
          <h1 style={{ margin: "8px 0 0 0" }}>{title}</h1>
          {description ? (
            <p style={{ margin: "8px 0 0 0", maxWidth: 720, color: "var(--color-muted)" }}>
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="container" style={{ padding: "18px" }}>
        <div className="detail-card">
          <img className="detail-media" src={image} alt={`${title} hero`} />
          <div className="detail-body">
            <h2 style={{ marginTop: 0 }}>Ingredients</h2>
            {ingredients.length > 0 ? (
              <ul>
                {ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "var(--color-muted)" }}>No ingredients listed.</p>
            )}

            <h2>Instructions</h2>
            {instructions.length > 0 ? (
              <ol>
                {instructions.map((step, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ color: "var(--color-muted)" }}>No instructions provided.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
