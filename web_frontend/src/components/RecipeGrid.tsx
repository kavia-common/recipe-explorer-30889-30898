import React from 'react';
import { Recipe } from '../data/mockRecipes';

type Props = {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
};

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes, onSelect }: Props): JSX.Element {
  /** Responsive grid of recipe cards. */
  if (recipes.length === 0) {
    return <p className="muted">No recipes found. Try a different search.</p>;
  }
  return (
    <div className="grid">
      {recipes.map((r) => (
        <article key={r.id} className="card" onClick={() => onSelect(r)} role="button" tabIndex={0}
                 onKeyDown={(e) => (e.key === 'Enter' ? onSelect(r) : null)}>
          <div className="card-media">
            <img src={r.image} alt={r.title} loading="lazy" />
            <span className="badge">{r.category}</span>
          </div>
          <div className="card-body">
            <h3 className="card-title">{r.title}</h3>
            <p className="card-desc">{r.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
