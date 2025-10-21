import React from "react";

// PUBLIC_INTERFACE
export default function RecipeDetail({ recipe }) {
  /**
   * Recipe detail section with image, ingredients, and instructions.
   * Expects a recipe object with fields: title, image, category, description, ingredients[], instructions[].
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

  return (
    <article aria-label={`Details for ${recipe.title}`}>
      <div className="detail-hero">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="kicker">Recipe Detail</span>
            <div className="badge">
              <span>🍽️</span>{recipe.category}
            </div>
          </div>
          <h1 style={{ margin: "8px 0 0 0" }}>{recipe.title}</h1>
          <p style={{ margin: "8px 0 0 0", maxWidth: 720, color: "var(--color-muted)" }}>{recipe.description}</p>
        </div>
      </div>

      <div className="container" style={{ padding: "18px" }}>
        <div className="detail-card">
          <img className="detail-media" src={recipe.image} alt={`${recipe.title} hero`} />
          <div className="detail-body">
            <h2 style={{ marginTop: 0 }}>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((step, i) => (
                <li key={i} style={{ marginBottom: 8 }}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
}
